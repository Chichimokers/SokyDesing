<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/70 backdrop-blur-sm"
      @click="$emit('close')"
    ></div>

    <!-- Modal -->
    <div class="relative bg-gray-900/95 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
        <h2 class="text-3xl font-bold text-white mb-2">Aplicar al Plan Retail</h2>
        <p class="text-gray-300">Completa tu información para acceder a precios mayoristas</p>
      </div>

      <!-- Application Form -->
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Personal Information -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Información Personal
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                Nombre Completo *
              </label>
              <input
                v-model="form.fullName"
                type="text"
                class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Tu nombre completo"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                Correo Electrónico *
              </label>
              <input
                v-model="form.email"
                type="email"
                class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="tu@email.com"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                Teléfono *
              </label>
              <input
                v-model="form.phone"
                type="tel"
                class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="+1 234 567 8900"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                País *
              </label>
              <select
                v-model="form.country"
                class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                required
              >
                <option value="" disabled class="bg-gray-800">Selecciona tu país</option>
                <option value="Estados Unidos" class="bg-gray-800">Estados Unidos</option>
                <option value="España" class="bg-gray-800">España</option>
                <option value="México" class="bg-gray-800">México</option>
                <option value="Argentina" class="bg-gray-800">Argentina</option>
                <option value="Colombia" class="bg-gray-800">Colombia</option>
                <option value="Cuba" class="bg-gray-800">Cuba</option>
                <option value="Otro" class="bg-gray-800">Otro</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Business Information -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Información del Negocio
          </h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                Nombre del Negocio/Empresa
              </label>
              <input
                v-model="form.businessName"
                type="text"
                class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Nombre de tu empresa (opcional)"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                Tipo de Negocio *
              </label>
              <select
                v-model="form.businessType"
                class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                required
              >
                <option value="" disabled class="bg-gray-800">Selecciona el tipo</option>
                <option value="individual" class="bg-gray-800">Emprendedor Individual</option>
                <option value="pequena_empresa" class="bg-gray-800">Pequeña Empresa</option>
                <option value="mediana_empresa" class="bg-gray-800">Mediana Empresa</option>
                <option value="tienda_online" class="bg-gray-800">Tienda Online</option>
                <option value="agente_local" class="bg-gray-800">Agente Local</option>
                <option value="otro" class="bg-gray-800">Otro</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                Volumen Estimado de Recargas Mensual *
              </label>
              <select
                v-model="form.monthlyVolume"
                class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                required
              >
                <option value="" disabled class="bg-gray-800">Selecciona el volumen</option>
                <option value="100-500" class="bg-gray-800">100 - 500 USDT</option>
                <option value="500-1000" class="bg-gray-800">500 - 1,000 USDT</option>
                <option value="1000-2500" class="bg-gray-800">1,000 - 2,500 USDT</option>
                <option value="2500-5000" class="bg-gray-800">2,500 - 5,000 USDT</option>
                <option value="5000+" class="bg-gray-800">Más de 5,000 USDT</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Experience & Platform -->
        <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
          <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
          </svg>
          Experiencia y Plataforma
          </h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                Experiencia en Recargas/Remesas *
              </label>
              <select
                v-model="form.experience"
                class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                required
              >
                <option value="" disabled class="bg-gray-800">Selecciona tu experiencia</option>
                <option value="principiante" class="bg-gray-800">Principiante (menos de 6 meses)</option>
                <option value="intermedio" class="bg-gray-800">Intermedio (6 meses - 2 años)</option>
                <option value="avanzado" class="bg-gray-800">Avanzado (2+ años)</option>
                <option value="experto" class="bg-gray-800">Experto (5+ años)</option>
              </select>
            </div>

            <div class="space-y-3">
              <label class="block text-sm font-semibold text-gray-300">
                ¿Tienes plataforma propia? *
              </label>
              <div class="flex gap-6">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="form.hasOwnPlatform"
                    type="radio"
                    value="yes"
                    class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                    required
                  />
                  <span class="text-white">Sí, tengo plataforma</span>
                </label>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    v-model="form.hasOwnPlatform"
                    type="radio"
                    value="no"
                    class="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600"
                    required
                  />
                  <span class="text-white">No, trabajo manual</span>
                </label>
              </div>
            </div>

            <div v-if="form.hasOwnPlatform === 'yes'">
              <label class="block text-sm font-semibold text-gray-300 mb-2">
                URL de tu Plataforma
              </label>
              <input
                v-model="form.platformUrl"
                type="url"
                class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="https://tudominio.com"
              />
            </div>
          </div>
        </div>

        <!-- Additional Comments -->
        <div>
          <label class="block text-sm font-semibold text-gray-300 mb-2">
            Comentarios Adicionales
          </label>
          <textarea
            v-model="form.comments"
            rows="4"
            class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
            placeholder="Cuéntanos más sobre tu negocio, objetivos o cualquier pregunta que tengas..."
          ></textarea>
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
            <button 
              type="button"
              @click="showTermsModal"
              class="text-blue-400 hover:text-blue-300 underline"
            >
              términos y condiciones
            </button>
            del Plan Retail y entiendo que la aprobación está sujeta a revisión.
          </label>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="flex-1 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg v-if="isLoading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? 'Enviando...' : 'Enviar Aplicación' }}
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

    <!-- Terms and Conditions Popup -->
    <TermsAndConditionsPopup
      :show="showTermsPopup"
      @close="hideTerms"
      @accept="acceptTermsAndClose"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useTermsAndConditions } from '@/composables/useTermsAndConditions'
import TermsAndConditionsPopup from './TermsAndConditionsPopup.vue'

interface Props {
  show: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'submit', data: any): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Terms and conditions
const { showTermsPopup, showTerms, hideTerms, acceptTerms } = useTermsAndConditions()

// Form state
const form = ref({
  fullName: '',
  email: '',
  phone: '',
  country: '',
  businessName: '',
  businessType: '',
  monthlyVolume: '',
  experience: '',
  hasOwnPlatform: '',
  platformUrl: '',
  comments: '',
  acceptTerms: false
})

// UI state
const isLoading = ref(false)

// Form validation
const isFormValid = computed(() => {
  return form.value.fullName.length > 0 &&
         form.value.email.length > 0 &&
         form.value.phone.length > 0 &&
         form.value.country.length > 0 &&
         form.value.businessType.length > 0 &&
         form.value.monthlyVolume.length > 0 &&
         form.value.experience.length > 0 &&
         form.value.hasOwnPlatform.length > 0 &&
         form.value.acceptTerms
})

// Terms and conditions functions
const showTermsModal = () => {
  showTerms()
}

const acceptTermsAndClose = () => {
  acceptTerms()
  form.value.acceptTerms = true
}

// Handle form submission
const handleSubmit = async () => {
  if (!isFormValid.value) return

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    emit('submit', { ...form.value })
  } catch (error) {
    console.error('Application error:', error)
  } finally {
    isLoading.value = false
  }
}

// Reset form when modal closes
watch(() => props.show, (newValue) => {
  if (!newValue) {
    form.value = {
      fullName: '',
      email: '',
      phone: '',
      country: '',
      businessName: '',
      businessType: '',
      monthlyVolume: '',
      experience: '',
      hasOwnPlatform: '',
      platformUrl: '',
      comments: '',
      acceptTerms: false
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
input:focus,
select:focus,
textarea:focus {
  transform: translateY(-1px);
}

/* Button hover effects */
button:not(:disabled):hover {
  transform: translateY(-2px);
}

/* Responsive improvements */
@media (max-width: 640px) {
  .max-w-2xl {
    max-width: calc(100vw - 2rem);
  }
}
</style>