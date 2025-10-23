<template>
  <Modal :isOpen="isOpen" @close="closePopup">
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-white">{{ selectedOffer?.title || 'Recarga' }}</h3>
          <p class="text-blue-100 text-sm">Desde {{ selectedOffer?.priceUSDT }} USDT</p>
        </div>
        <button @click="closePopup" class="text-white/80 hover:text-white transition-colors p-1"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
      </div>
    </template>

    <div>
    
      <div v-if="selectedOffer && selectedOffer.id === 'nauta'" class="mb-4">
        <label class="block text-sm text-gray-300 mb-2">Email</label>
        <div class="flex items-center space-x-3">
          <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12H8m8 0l-4 4m4-4l-4-4"/></svg>
          <input v-model="email" type="email" placeholder="correo@nauta.com.cu" class="w-full bg-[#1a1a1a] border border-white/10 rounded-md px-3 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div class="mb-6">
        <PopupPlanSelector :plan-type="getPlanType()" :mobile-plans="mobilePlans" :selected-plan="selectedPlan" @select-plan="handlePlanSelection" @auto-renewal-change="handleAutoRenewalChange" />
      </div>

      <PhoneNumberManager :phone-numbers="phoneNumbers" :validate-phone="validatePhone" @add-phone="handleAddPhone" @remove-phone="handleRemovePhone" />
    </div>

    <template #footer>
      <div class="flex items-center justify-between">
        <div class="text-sm text-gray-400">
          <div>
        <span v-if="validPhoneCount > 0">{{ validPhoneCount }} número{{ validPhoneCount !== 1 ? 's' : '' }} válido{{ validPhoneCount !== 1 ? 's' : '' }}</span>
        <span v-else>Sin números válidos</span>
          </div>

          <!-- Mostrar estado del correo sólo para nauta -->
          <div v-if="selectedOffer && selectedOffer.id === 'nauta'" class="mt-1">
        <span v-if="!email" class="text-yellow-300 text-xs">Correo requerido (debe ser @nauta.com.cu)</span>
        <span v-else-if="!/@nauta\.com\.cu$/i.test(email)" class="text-red-400 text-xs">El correo debe terminar en @nauta.com.cu</span>
        <span v-else class="text-green-400 text-xs">Correo válido</span>
          </div>
        </div>

        <div class="flex space-x-3">
          <button @click="closePopup" class="px-4 py-2 text-gray-400 hover:text-white transition-colors">Cancelar</button>

          <template v-if="selectedOffer && selectedOffer.id === 'nauta'">

        <button
          @click="proceedToRecharge"
          :disabled="validPhoneCount === 0 || !/@nauta\.com\.cu$/i.test(email) || !selectedPlan"
          class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
        >
          Recargar ({{ totalPrice.toFixed(2) }} USDT)
        </button>
          </template>

          <template v-else-if="selectedOffer && selectedOffer.id === 'nauta_plus'">
        <button
          @click="proceedToSubscribe"
          :disabled="validPhoneCount === 0 || !selectedPlan"
          class="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
        >
          Suscribirse
        </button>
          </template>

          <template v-else>
        <button
          @click="proceedToRecharge"
          :disabled="validPhoneCount === 0 || !selectedPlan"
          class="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
        >
          Continuar ({{ totalPrice.toFixed(2) }} USDT)
        </button>
          </template>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from './Modal.vue'
import { computed, ref } from 'vue'
import PhoneNumberManager from './PhoneNumberManager.vue'
import PopupPlanSelector from './PopupPlanSelector.vue'
import { useRecharge, type RechargeOffer, type PhoneNumber } from '../composables/useRecharge'

interface Props {
  isOpen: boolean
  selectedOffer: RechargeOffer | null
}

interface Emits {
  close: []
  proceed: [phoneNumbers: PhoneNumber[], offer: RechargeOffer, email?: string, selectedPlan?: any, autoRenewal?: boolean]
  subscribe: [phoneNumbers: PhoneNumber[], offer: RechargeOffer, email?: string, selectedPlan?: any, autoRenewal?: boolean]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// expose a local computed alias for easier template usage
const selectedOffer = computed(() => props.selectedOffer)

// Import all used functions from useRecharge
const { phoneNumbers, validateCubanPhone, addPhoneNumber, removePhoneNumber, availableOffers } = useRecharge()

// Plan selector state
const selectedPlan = ref<any>(null)
const autoRenewal = ref(false)

// Mobile plans from useRecharge
const mobilePlans = computed(() => availableOffers.value)

const validPhoneCount = computed(() => 
  phoneNumbers.value.filter(phone => phone.isValid).length
)

const totalPrice = computed(() => {
  if (!selectedPlan.value) return 0
  
  // Calculate price based on selected plan
  if (props.selectedOffer?.id === 'nauta' || props.selectedOffer?.id === 'nauta_plus') {
    return selectedPlan.value.price * validPhoneCount.value
  } else {
    return selectedPlan.value.priceUSDT * validPhoneCount.value
  }
})

const email = ref('')

const handleAddPhone = (phone: string) => {
  addPhoneNumber(phone)
}

const handleRemovePhone = (id: string) => {
  removePhoneNumber(id)
}

const validatePhone = (phone: string) => {
  return validateCubanPhone(phone)
}

const getPlanType = () => {
  if (!props.selectedOffer) return 'mobile'
  
  if (props.selectedOffer.id === 'nauta') return 'nauta_hogar'
  if (props.selectedOffer.id === 'nauta_plus') return 'nauta_plus'
  return 'mobile'
}

const handlePlanSelection = (plan: any) => {
  selectedPlan.value = plan
}

const handleAutoRenewalChange = (enabled: boolean) => {
  autoRenewal.value = enabled
}

const closePopup = () => {
  emit('close')
}

const proceedToRecharge = () => {
  if (props.selectedOffer && validPhoneCount.value > 0 && selectedPlan.value) {
    const validPhones = phoneNumbers.value.filter(phone => phone.isValid)
    emit('proceed', validPhones, props.selectedOffer, email.value, selectedPlan.value, autoRenewal.value)
  }
}

const proceedToSubscribe = () => {
  if (props.selectedOffer && validPhoneCount.value > 0 && selectedPlan.value) {
    const validPhones = phoneNumbers.value.filter(phone => phone.isValid)
    emit('subscribe', validPhones, props.selectedOffer, email.value, selectedPlan.value, autoRenewal.value)
  }
}
</script>

<style scoped>
/* Animaciones para el modal */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>