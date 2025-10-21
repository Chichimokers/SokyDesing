<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/70 backdrop-blur-sm"
      @click="$emit('close')"
    ></div>

    <!-- Modal -->
    <div class="relative bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getServiceIcon()"/>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-white mb-2">{{ plan?.name }}</h2>
        <p class="text-gray-300">{{ plan?.description }}</p>
        <div class="mt-4 text-center">
          <span class="text-4xl font-bold text-blue-400">${{ plan?.price.toFixed(2) }}</span>
          <span class="text-gray-400">/mes</span>
        </div>
      </div>

      <!-- Subscription Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
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
              placeholder="usuario@nauta.cu"
              :required="isNautaHogar"
            />
            <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </div>
          <p v-if="errors.nautaEmail" class="text-red-400 text-sm mt-2">{{ errors.nautaEmail }}</p>
        </div>

        <!-- Service Details -->
        <div class="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <h3 class="text-blue-300 font-semibold mb-3 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Detalles del Servicio
          </h3>
          <div class="space-y-2 text-sm">
            <div v-for="feature in plan?.features" :key="feature" class="flex items-start gap-2 text-gray-300">
              <svg class="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ feature }}
            </div>
          </div>
        </div>

        <!-- Billing Information -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
          <h3 class="text-white font-semibold mb-3">Información de Facturación</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Servicio:</span>
              <span class="text-white">{{ plan?.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Precio mensual:</span>
              <span class="text-white font-semibold">${{ plan?.price.toFixed(2) }} USDT</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Próximo cobro:</span>
              <span class="text-white">{{ nextBillingDate }}</span>
            </div>
            <div class="border-t border-gray-600 mt-3 pt-3">
              <div class="flex justify-between font-semibold">
                <span class="text-gray-300">Total:</span>
                <span class="text-blue-400">${{ plan?.price.toFixed(2) }} USDT</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Terms & Conditions -->
        <div class="flex items-start gap-3">
          <input
            id="acceptTerms"
            v-model="form.acceptTerms"
            type="checkbox"
            class="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            required
          />
          <label for="acceptTerms" class="text-sm text-gray-300">
            Acepto los 
            <a href="#" class="text-blue-400 hover:text-blue-300 underline">términos y condiciones</a>
            y autorizo el cobro mensual automático de esta suscripción.
          </label>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="isLoading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Procesando...' : 'Suscribirse Ahora' }}
          </button>
          
          <button
            type="button"
            @click="$emit('close')"
            class="border border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

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

// UI state
const isLoading = ref(false)

// Validation errors
const errors = ref({
  phoneNumber: '',
  nautaEmail: ''
})

// Computed properties
const isNautaHogar = computed(() => {
  return props.plan?.type === 'nauta_hogar'
})

const nextBillingDate = computed(() => {
  const date = new Date()
  date.setMonth(date.getMonth() + 1)
  return date.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
})

const isFormValid = computed(() => {
  return form.value.phoneNumber.length > 0 &&
         (!isNautaHogar.value || form.value.nautaEmail.length > 0) &&
         form.value.acceptTerms &&
         Object.values(errors.value).every(error => !error)
})

// Get service icon
const getServiceIcon = () => {
  const type = props.plan?.type
  const icons: Record<string, string> = {
    nauta_plus: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    nauta_hogar: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  }
  return icons[type || ''] || icons.nauta_plus
}

// Validation
const validateForm = () => {
  errors.value = {
    phoneNumber: '',
    nautaEmail: ''
  }

  // Phone validation
  const phoneRegex = /^\+?[1-9]\d{1,14}$/
  if (!phoneRegex.test(form.value.phoneNumber.replace(/\s/g, ''))) {
    errors.value.phoneNumber = 'Número de teléfono inválido'
  }

  // Email validation for Nauta Hogar
  if (isNautaHogar.value) {
    const emailRegex = /^[^\s@]+@nauta\.cu$/i
    if (!emailRegex.test(form.value.nautaEmail)) {
      errors.value.nautaEmail = 'Debe ser un correo @nauta.cu válido'
    }
  }

  return Object.values(errors.value).every(error => !error)
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Emit subscription data
    const subscriptionData = {
      plan: props.plan,
      phoneNumber: form.value.phoneNumber,
      nautaEmail: isNautaHogar.value ? form.value.nautaEmail : null,
      billingDate: nextBillingDate.value
    }
    
    emit('subscribe', subscriptionData)
  } catch (error) {
    console.error('Subscription error:', error)
  } finally {
    isLoading.value = false
  }
}

// Reset form when modal closes
watch(() => props.show, (newValue) => {
  if (!newValue) {
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

/* Responsive improvements */
@media (max-width: 640px) {
  .max-w-lg {
    max-width: calc(100vw - 2rem);
  }
}
</style>