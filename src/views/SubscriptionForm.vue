<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Subscription Form Section -->
    <div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Nueva Suscripción</h1>
          <p class="text-gray-400">Completa tu suscripción al plan seleccionado</p>
        </div>

        <!-- Plan Info Card -->
        <div v-if="plan" class="mb-8">
          <div class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getServiceIcon()"/>
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-white mb-2">{{ plan.name }}</h2>
                <p class="text-gray-300 mb-3">{{ plan.description }}</p>
                <div class="flex items-center gap-4">
                  <div class="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-xl">
                    <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-blue-400 font-semibold">${{ plan.price?.toFixed(2) }}/mes</span>
                  </div>
                  <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-xl">
                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-green-400 font-semibold">{{ plan.terms }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subscription Form -->
        <div class="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div class="mb-6">
            <h3 class="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Información de Suscripción
            </h3>
            <p class="text-gray-400">Completa los datos para activar tu suscripción</p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Primera fila - Nombre y Teléfono -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Phone Number -->
              <div>
                <label class="block text-sm font-semibold text-gray-300 mb-3">
                  Número de Teléfono *
                </label>
                <input
                  v-model="form.phoneNumber"
                  type="tel"
                  class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="+53 5812 6024"
                  required
                />
                <p v-if="errors.phoneNumber" class="text-red-400 text-sm mt-2">{{ errors.phoneNumber }}</p>
              </div>

              <!-- Email for Nauta Hogar -->
              <div v-if="isNautaHogar">
                <label class="block text-sm font-semibold text-gray-300 mb-3">
                  Correo Nauta *
                </label>
                <input
                  v-model="form.nautaEmail"
                  type="email"
                  class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="usuario@nauta.com.cu"
                  :required="isNautaHogar"
                />
                <p v-if="errors.nautaEmail" class="text-red-400 text-sm mt-2">{{ errors.nautaEmail }}</p>
              </div>
            </div>

            <!-- Plan Features -->
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 class="text-lg font-semibold text-white mb-4">Características del Plan</h3>
              <ul class="space-y-2">
                <li v-for="feature in plan?.features" :key="feature" class="flex items-center text-gray-300">
                  <svg class="w-5 h-5 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Terms and Conditions -->
            <div class="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <input
                v-model="form.acceptTerms"
                type="checkbox"
                id="acceptTerms"
                class="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                @click="$router.go(-1)"
                class="flex-1 border border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
              >
                Cancelar
              </button>
              
              <button
                type="submit"
                :disabled="isLoading || !form.acceptTerms || !form.phoneNumber || (isNautaHogar && !form.nautaEmail)"
                class="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed"
              >
                <span v-if="isLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
                <span v-else>Confirmar Suscripción</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Terms and Conditions Popup -->
    <TermsAndConditionsPopup
      :show="showTermsPopup"
      @close="hideTerms"
      @accept="acceptTermsAndClose"
    />

    <!-- Success Confirmation -->
    <div v-if="showSuccessPopup" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="showSuccessPopup = false"></div>
      <div class="relative bg-gradient-to-br from-green-600/90 to-emerald-600/90 backdrop-blur-xl rounded-3xl p-8 border border-green-400/30 shadow-2xl max-w-md w-full">
        <div class="text-center">
          <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">¡Suscripción Activada!</h3>
          <p class="text-green-100 mb-6">Tu suscripción a {{ plan?.name }} ha sido activada exitosamente.</p>
          <button 
            @click="$router.push('/subscription')"
            class="w-full bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Ver Mis Suscripciones
          </button>
        </div>
      </div>
    </div>

    <Footer />

    <!-- Success Popup -->
    <div v-if="showSuccessPopup" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeSuccessPopup"></div>
      <div class="relative bg-gradient-to-br from-blue-600/90 to-purple-600/90 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 shadow-2xl max-w-md w-full mx-4">
        <div class="text-center">
          <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">¡Suscripción Activada!</h3>
          <p class="text-blue-100 mb-6 leading-relaxed">
            Tu suscripción a <strong>{{ plan?.name }}</strong> ha sido activada exitosamente. 
            Ya puedes disfrutar de todos los beneficios de tu plan.
          </p>
          <div class="flex gap-3">
            <button 
              @click="closeSuccessPopup"
              class="flex-1 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Continuar
            </button>
            <button 
              @click="goToSubscriptions"
              class="flex-1 bg-white hover:bg-gray-100 text-blue-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Mis Suscripciones
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useTermsAndConditions} from '@/composables/useTermsAndConditions'
import Footer from '@/components/Footer.vue'
import TermsAndConditionsPopup from '@/components/TermsAndConditionsPopup.vue'

const route = useRoute()
const router = useRouter()

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
const showSuccessPopup = ref(false)

// Plan data - normalmente vendría de una store o API
const plan = ref({
  id: parseInt(route.params.planId as string) || 1,
  name: route.query.name as string || 'Plan Básico',
  type: route.query.type as string || 'movil_prepago',
  description: route.query.description as string || 'Plan de datos móviles',
  price: parseFloat(route.query.price as string) || 19.99,
  features: [
    'Datos ilimitados',
    'Llamadas nacionales gratis',
    'SMS ilimitados',
    'Roaming incluido',
    'Soporte 24/7'
  ],
  terms: 'Términos y condiciones del servicio...'
})

// Terms and conditions composable
const { 
  showTermsPopup, 
  showTerms, 
  hideTerms, 
  acceptTerms: acceptTermsAndClose 
} = useTermsAndConditions()

// Computed
const isNautaHogar = computed(() => plan.value?.type === 'nauta_hogar')

// Methods
const getServiceIcon = () => {
  if (!plan.value) return "M12 6v6l4 2"
  
  switch (plan.value.type) {
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

  // Validar teléfono
  if (!form.value.phoneNumber.trim()) {
    errors.value.phoneNumber = 'El número de teléfono es requerido'
    isValid = false
  } else if (!/^(\+53|53)?\s*[5-9]\d{7}$/.test(form.value.phoneNumber.replace(/\s/g, ''))) {
    errors.value.phoneNumber = 'Número de teléfono cubano inválido'
    isValid = false
  }

  // Validar email para Nauta Hogar (solo dominios @nauta.com.cu)
  if (isNautaHogar.value) {
    if (!form.value.nautaEmail.trim()) {
      errors.value.nautaEmail = 'El correo Nauta es requerido para Nauta Hogar'
      isValid = false
    } else if (!/^[a-zA-Z0-9._%+-]+@nauta\.com\.cu$/i.test(form.value.nautaEmail.trim())) {
      errors.value.nautaEmail = 'Debe ser un correo @nauta.com.cu válido'
      isValid = false
    }
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm() || !form.value.acceptTerms) return

  isLoading.value = true
  
  try {
    const subscriptionData = {
      planId: plan.value?.id,
      planName: plan.value?.name,
      planType: plan.value?.type,
      phoneNumber: form.value.phoneNumber,
      nautaEmail: isNautaHogar.value ? form.value.nautaEmail : null,
      price: plan.value?.price,
      acceptedTerms: true,
      subscriptionDate: new Date().toISOString()
    }
    
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Subscription submitted:', subscriptionData)
    showSuccessPopup.value = true
  } catch (error) {
    console.error('Subscription error:', error)
  } finally {
    isLoading.value = false
  }
}

const closeSuccessPopup = () => {
  showSuccessPopup.value = false
  // Reset form after successful submission
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

const goToSubscriptions = () => {
  showSuccessPopup.value = false
  router.push('/subscription')
}

// Si no hay parámetros, redirigir a subscriptions
onMounted(() => {
  if (!route.query.name) {
    router.push('/subscription')
  }
})
</script>

<style scoped>
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
</style>