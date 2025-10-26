<template>
  <div class="bg-black/50 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/10">
    <div class="flex items-center justify-between mb-4 sm:mb-6">
      <h3 class="text-lg sm:text-xl font-bold text-white">Números de teléfono</h3>
      <span class="text-sm text-gray-400">{{ phoneNumbers.length }}/5</span>
    </div>

    <!-- Input para agregar número -->
    <div class="mb-4 sm:mb-6">
      <div class="flex space-x-2 sm:space-x-3">
        <div class="flex-1 relative">
          <input
            v-model="newPhoneNumber"
            type="tel"
            placeholder="+535XXXXXXX"
            class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-2.5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            :class="{ 'border-red-500': showValidationError }"
            @keyup.enter="handleAddPhone"
            @input="showValidationError = false"
          />
          <div class="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              v-if="isValidating"
              class="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        </div>
        <button
          @click="handleAddPhone"
          :disabled="phoneNumbers.length >= 5 || !newPhoneNumber.trim()"
          class="bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-3 sm:p-3 rounded-lg transition duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
        </button>
      </div>
      
      <!-- Mensaje de error -->
      <div v-if="errorMessage" class="mt-2 text-red-400 text-sm">
        {{ errorMessage }}
      </div>
      
      <!-- Mensaje de ayuda -->
      <div class="mt-2 text-gray-400 text-xs">
        Formato: +535XXXXXXX (números cubanos)
      </div>
    </div>

    <!-- Lista de números agregados -->
    <div v-if="phoneNumbers.length > 0" class="space-y-2.5 sm:space-y-3">
      <div
        v-for="phone in phoneNumbers"
        :key="phone.id"
        class="flex items-center justify-between p-3 bg-[#2a2a2a] rounded-lg border"
        :class="{
          'border-green-500': phone.isValid,
          'border-red-500': !phone.isValid
        }"
      >
        <div class="flex items-center space-x-3">
          <!-- Icono de estado -->
          <div class="flex-shrink-0">
            <svg
              v-if="phone.isValid"
              class="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <svg
              v-else
              class="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          
          <!-- Información del número -->
          <div>
            <div class="text-white font-medium">{{ formatPhoneNumber(phone.number) }}</div>
            <div class="text-xs" :class="phone.isValid ? 'text-green-400' : 'text-red-400'">
              {{ phone.isValid ? 'Número válido' : 'Formato incorrecto' }}
            </div>
          </div>
        </div>

        <!-- Botón eliminar -->
        <button
          @click="removePhone(phone.id)"
          class="text-red-400 hover:text-red-300 p-1 rounded transition duration-200"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Estado vacío -->
    <div v-else class="text-center py-6 sm:py-8">
      <svg class="mx-auto h-12 w-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
      </svg>
      <p class="text-gray-400 mt-2">No hay números agregados</p>
      <p class="text-gray-500 text-sm">Agrega hasta 5 números para recargar</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PhoneNumber } from '@/composables/useRecharge'

interface Props {
  phoneNumbers: PhoneNumber[]
  validatePhone: (phone: string) => boolean
}

interface Emits {
  addPhone: [phone: string]
  removePhone: [id: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const newPhoneNumber = ref('')
const errorMessage = ref('')
const showValidationError = ref(false)
const isValidating = ref(false)

const handleAddPhone = async () => {
  if (!newPhoneNumber.value.trim()) {
    errorMessage.value = 'Por favor ingresa un número'
    return
  }

  if (props.phoneNumbers.length >= 5) {
    errorMessage.value = 'Máximo 5 números permitidos'
    return
  }

  // Verificar duplicados
  const formattedNumber = newPhoneNumber.value.replace(/\s/g, '')
  const isDuplicate = props.phoneNumbers.some(phone => 
    phone.number === formattedNumber
  )

  if (isDuplicate) {
    errorMessage.value = 'Este número ya fue agregado'
    showValidationError.value = true
    return
  }

  isValidating.value = true
  
  // Simular validación
  setTimeout(() => {
    emit('addPhone', newPhoneNumber.value)
    newPhoneNumber.value = ''
    errorMessage.value = ''
    showValidationError.value = false
    isValidating.value = false
  }, 500)
}

const removePhone = (id: string) => {
  emit('removePhone', id)
}

const formatPhoneNumber = (number: string) => {
  // Formato: +53 5XXX XXXX
  if (number.startsWith('+53')) {
    const digits = number.slice(3)
    if (digits.length === 8) {
      return `+53 ${digits.slice(0, 4)} ${digits.slice(4)}`
    }
  } else if (number.startsWith('53')) {
    const digits = number.slice(2)
    if (digits.length === 8) {
      return `+53 ${digits.slice(0, 4)} ${digits.slice(4)}`
    }
  } else if (number.length === 8) {
    return `+53 ${number.slice(0, 4)} ${number.slice(4)}`
  }
  
  return number
}

const validPhoneCount = computed(() => 
  props.phoneNumbers.filter(phone => phone.isValid).length
)
</script>

<style scoped>
/* Animaciones personalizadas */
.phone-enter-active,
.phone-leave-active {
  transition: all 0.3s ease;
}

.phone-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.phone-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>