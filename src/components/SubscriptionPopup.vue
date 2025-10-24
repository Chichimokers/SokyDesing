<template>
  <Modal :isOpen="show" @close="$emit('close')">
    <template #header>
      <div class="text-center">
        <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-2xl">
          <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getServiceIcon()"/>
          </svg>
        </div>
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 px-2">{{ plan?.name }}</h2>
        <p class="text-xs sm:text-sm text-gray-300 px-2 mb-2">{{ plan?.description }}</p>
        <div class="text-center">
          <span class="text-2xl sm:text-3xl font-bold text-blue-400">${{ plan?.price.toFixed(2) }}</span>
          <span class="text-xs sm:text-sm text-gray-400">/mes</span>
        </div>
      </div>
    </template>

    <!-- Subscription Form Content -->
    <div class="space-y-4">
      <!-- Phone Number (Required for all) -->
      <div>
        <label class="block text-sm font-semibold text-gray-300 mb-2">
          Número de Teléfono *
        </label>
        <div class="relative">
          <input
            v-model="form.phoneNumber"
            type="tel"
            class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            placeholder="+53 5812 6024"
            required
          />
          <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
        </div>
        <p v-if="errors.phoneNumber" class="text-red-400 text-sm mt-2">{{ errors.phoneNumber }}</p>
      </div>

      <!-- Email (Only for Nauta Hogar) -->
      <div v-if="isNautaHogar">
        <label class="block text-sm font-semibold text-gray-300 mb-2">
          Correo Nauta *
        </label>
        <div class="relative">
          <input
            v-model="form.nautaEmail"
            type="email"
            class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            placeholder="usuario@nauta.com.cu"
            :required="isNautaHogar"
          />
          <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
          </svg>
        </div>
        <p v-if="errors.nautaEmail" class="text-red-400 text-sm mt-2">{{ errors.nautaEmail }}</p>
        <p v-else-if="isNautaHogar && form.nautaEmail && !nautaEmailValid" class="text-red-400 text-sm mt-2">Debe ser un correo válido terminado en <code>@nauta.com.cu</code></p>
      </div>

      <!-- Terms and Conditions -->
      <div class="flex items-start space-x-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        <input
          v-model="form.acceptTerms"
          type="checkbox"
          id="acceptTerms"
          class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          required
        />
        <label for="acceptTerms" class="text-sm text-gray-300 leading-relaxed">
          Acepto los 
          <button 
            type="button"
            @click="showTerms"
            class="text-blue-400 hover:text-blue-300 underline font-medium transition-colors duration-200"
          >
            términos y condiciones
          </button>
          del servicio y autorizo el procesamiento de mis datos personales para la prestación del servicio de {{ plan?.name }}.
        </label>
      </div>
    </div>

    <template #footer>
      <div class="flex gap-3 justify-end">
        <button
          type="button"
          @click="$emit('close')"
          class="border border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300"
        >
          Cancelar
        </button>
        
        <button
          type="button"
          @click="handleSubmit"
          :disabled="isLoading || !form.acceptTerms || !form.phoneNumber || (isNautaHogar && (!form.nautaEmail || !nautaEmailValid))"
          class="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Procesando...
          </span>
          <span v-else>Suscribirse</span>
        </button>
      </div>
    </template>
  </Modal>

  <!-- Terms and Conditions Popup -->
  <TermsAndConditionsPopup
    :show="showTermsPopup"
    @close="hideTerms"
    @accept="acceptTermsAndClose"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useTermsAndConditions } from '@/composables/useTermsAndConditions'
import TermsAndConditionsPopup from './TermsAndConditionsPopup.vue'
import Modal from './Modal.vue'

interface Plan {
  id: number
  name: string
  type: string
  description: string
  price: number
  features: string[]
  terms: string
}

interface Props {
  show: boolean
  plan: Plan | null
}

interface Emits {
  (e: 'close'): void
  (e: 'subscribe', data: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Form state
const form = ref({
  phoneNumber: '',
  nautaEmail: '',  
  acceptTerms: false
})

const errors = ref({
  phoneNumber: '',
  nautaEmail: ''
})

const isLoading = ref(false)

// Terms and conditions composable
const { 
  showTermsPopup, 
  showTerms, 
  hideTerms, 
  acceptTerms: acceptTermsAndClose 
} = useTermsAndConditions()

// Computed
const isNautaHogar = computed(() => props.plan?.type === 'nauta_hogar')

// Valid email for nauta: must end with @nauta.com.cu
const nautaEmailValid = computed(() => {
  if (!isNautaHogar.value) return true
  const email = form.value.nautaEmail || ''
  return /@nauta\.com\.cu$/i.test(email.trim())
})

// Methods
const getServiceIcon = () => {
  if (!props.plan) return "M12 6v6l4 2"
  
  switch (props.plan.type) {
    case 'nauta_hogar':
      return "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
    case 'movil_prepago':
      return "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    case 'movil_postpago':
      return "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    default:
      return "M12 6v6l4 2"
  }
}

const validateForm = () => {
  errors.value = { phoneNumber: '', nautaEmail: '' }
  let isValid = true

  // Validar teléfono (más flexible)
  if (!form.value.phoneNumber.trim()) {
    errors.value.phoneNumber = 'El número de teléfono es requerido'
    isValid = false
  } else {
    const cleanPhone = form.value.phoneNumber.replace(/\s+/g, '')
    // Permitir +535xxxxxxx, 535xxxxxxx, 5xxxxxxx (8 dígitos mínimo)
    if (!/^(\+?53)?[5-9]\d{7,8}$/.test(cleanPhone)) {
      errors.value.phoneNumber = 'Número de teléfono cubano inválido'
      isValid = false
    }
  }

  // Validar email para Nauta Hogar (debe terminar en @nauta.com.cu)
  if (isNautaHogar.value) {
    if (!form.value.nautaEmail.trim()) {
      errors.value.nautaEmail = 'El correo Nauta es requerido para Nauta Hogar'
      isValid = false
    } else if (!/@nauta\.com\.cu$/i.test(form.value.nautaEmail.trim())) {
      errors.value.nautaEmail = 'Debe ser un correo que termine en @nauta.com.cu'
      isValid = false
    }
  }

  return isValid
}

const handleSubmit = async () => {
  console.log('🔥 handleSubmit called')
  console.log('📝 Form data:', form.value)
  console.log('✅ Terms accepted:', form.value.acceptTerms)
  console.log('📞 Phone number:', form.value.phoneNumber)
  
  const isFormValid = validateForm()
  console.log('✔️ Form valid:', isFormValid)
  
  if (!isFormValid || !form.value.acceptTerms) {
    console.log('❌ Validation failed - form valid:', isFormValid, 'terms accepted:', form.value.acceptTerms)
    return
  }

  console.log('🚀 Starting subscription process...')
  isLoading.value = true
  
  try {
    // Simular tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const subscriptionData = {
      plan: {
        id: props.plan?.id,
        name: props.plan?.name,
        type: props.plan?.type,
        price: props.plan?.price
      },
      phoneNumber: form.value.phoneNumber,
      nautaEmail: isNautaHogar.value ? form.value.nautaEmail : null,
      acceptedTerms: true,
      billingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // +30 días
      subscriptionDate: new Date().toISOString()
    }
    
    console.log('📤 Emitting subscription data:', subscriptionData)
    emit('subscribe', subscriptionData)
  } catch (error) {
    console.error('Subscription error:', error)
  } finally {
    isLoading.value = false
  }
}

// Reset form cuando se abre el popup
watch(() => props.show, (isOpen) => {
  if (isOpen) {
    form.value = {
      phoneNumber: '',
      nautaEmail: '',
      acceptTerms: false
    }
    errors.value = {
      phoneNumber: '',
      nautaEmail: ''
    }
  }
})
</script>

<style scoped>
/* Glass morphism effects */
@supports (backdrop-filter: blur(20px)) {
  .bg-gray-900\/95 {
    background: rgba(17, 24, 39, 0.95);
    backdrop-filter: blur(20px);
  }
}

/* Form focus animations */
input:focus {
  transform: translateY(-1px);
}

/* Button hover effects */
button:not(:disabled):hover {
  transform: translateY(-2px);
}

/* Checkbox custom styling */
input[type="checkbox"]:checked {
  background-color: #3B82F6;
  border-color: #3B82F6;
}

/* Input and select styling improvements */
input, select {
  font-size: 0.875rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
}

@media (min-width: 640px) {
  input, select {
    font-size: 1rem;
    padding: 1rem;
    border-radius: 0.75rem;
  }
}

label {
  font-size: 0.75rem;
}

@media (min-width: 640px) {
  label {
    font-size: 0.875rem;
  }
}

/* Responsive improvements */
@media (max-width: 640px) {
  .max-w-lg {
    max-width: calc(100vw - 1rem);
  }
  
  h2, h3 {
    font-size: clamp(1.25rem, 5vw, 1.875rem);
  }
}
</style>