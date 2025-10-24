<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Retail Application Section -->
    <div class="pt-28 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Solicitud Plan Retail</h1>
          <p class="text-gray-400">Únete a nuestro programa de revendedores y obtén acceso a precios exclusivos</p>
        </div>

        <!-- Application Info Banner -->
        <div class="mb-8">
          <div class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-white mb-2">Aplicación para Programa de Revendedores</h2>
                <p class="text-gray-300">Completa el formulario para solicitar tu acceso al Plan Retail con precios especiales.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Application Form -->
        <div class="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
          <div class="mb-6">
            <h3 class="text-xl font-bold text-white mb-2 flex items-center gap-3">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Información del Negocio
            </h3>
            <p class="text-gray-400">Proporciona los datos de tu negocio para la solicitud</p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Primera fila - Nombre y Teléfono -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Business Name -->
              <div>
                <label class="block text-sm font-semibold text-gray-300 mb-3">
                  Nombre del Negocio *
                </label>
                <input
                  v-model="form.businessName"
                  type="text"
                  class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Mi Negocio S.A."
                  required
                />
                <p v-if="errors.businessName" class="text-red-400 text-sm mt-2">{{ errors.businessName }}</p>
              </div>

              <!-- Contact Phone -->
              <div>
                <label class="block text-sm font-semibold text-gray-300 mb-3">
                  Teléfono de Contacto *
                </label>
                <input
                  v-model="form.contactPhone"
                  type="tel"
                  class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="+53 5812 6024"
                  required
                />
                <p v-if="errors.contactPhone" class="text-red-400 text-sm mt-2">{{ errors.contactPhone }}</p>
              </div>
            </div>

            <!-- Business Address - Fila completa -->
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-3">
                Dirección del Negocio *
              </label>
              <input
                v-model="form.businessAddress"
                type="text"
                class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="Calle 23 #456, Vedado, La Habana"
                required
              />
              <p v-if="errors.businessAddress" class="text-red-400 text-sm mt-2">{{ errors.businessAddress }}</p>
            </div>

            <!-- Contact Email - Fila completa -->
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-3">
                Correo Electrónico *
              </label>
              <input
                v-model="form.contactEmail"
                type="email"
                class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                placeholder="contacto@minegocio.cu"
                required
              />
              <p v-if="errors.contactEmail" class="text-red-400 text-sm mt-2">{{ errors.contactEmail }}</p>
            </div>

            <!-- Segunda fila - Tipo y Volumen -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Business Type -->
              <div>
                <label class="block text-sm font-semibold text-gray-300 mb-3">
                  Tipo de Negocio *
                </label>
                <select
                  v-model="form.businessType"
                  class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  required
                >
                  <option value="" disabled class="bg-gray-800">Selecciona el tipo</option>
                  <option value="tienda" class="bg-gray-800">Tienda</option>
                  <option value="cafeteria" class="bg-gray-800">Cafetería</option>
                  <option value="restaurante" class="bg-gray-800">Restaurante</option>
                  <option value="farmacia" class="bg-gray-800">Farmacia</option>
                  <option value="centro_servicios" class="bg-gray-800">Centro de Servicios</option>
                  <option value="otro" class="bg-gray-800">Otro</option>
                </select>
                <p v-if="errors.businessType" class="text-red-400 text-sm mt-2">{{ errors.businessType }}</p>
              </div>

              <!-- Expected Volume -->
              <div>
                <label class="block text-sm font-semibold text-gray-300 mb-3">
                  Volumen Mensual (USD)
                </label>
                <select
                  v-model="form.expectedVolume"
                  class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                >
                  <option value="" disabled class="bg-gray-800">Selecciona el volumen</option>
                  <option value="100-500" class="bg-gray-800">$100 - $500</option>
                  <option value="500-1000" class="bg-gray-800">$500 - $1,000</option>
                  <option value="1000-2500" class="bg-gray-800">$1,000 - $2,500</option>
                  <option value="2500-5000" class="bg-gray-800">$2,500 - $5,000</option>
                  <option value="5000+" class="bg-gray-800">Más de $5,000</option>
                </select>
              </div>
            </div>

            <!-- Additional Comments -->
            <div>
              <label class="block text-sm font-semibold text-gray-300 mb-3">
                Comentarios Adicionales
              </label>
              <textarea
                v-model="form.comments"
                rows="4"
                class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                placeholder="Cuéntanos más sobre tu negocio y por qué quieres ser revendedor..."
              ></textarea>
            </div>

            <!-- Terms Agreement -->
            <div class="flex items-start space-x-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <input
                v-model="form.acceptTerms"
                type="checkbox"
                id="acceptRetailTerms"
                class="mt-1 h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                required
              />
              <label for="acceptRetailTerms" class="text-sm text-gray-300 leading-relaxed">
                Acepto los términos y condiciones del programa de revendedores y autorizo el procesamiento de mis datos para evaluar mi solicitud.
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
                :disabled="isLoading || !form.acceptTerms || !isFormValid"
                class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-4 rounded-xl text-lg font-semibold transition-all duration-300 disabled:cursor-not-allowed"
              >
                <span v-if="isLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
                <span v-else>Enviar Solicitud</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

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
          <h3 class="text-2xl font-bold text-white mb-4">¡Solicitud Enviada!</h3>
          <p class="text-green-100 mb-6">Hemos recibido tu solicitud para el programa retail. Te contactaremos pronto para revisar tu aplicación.</p>
          <button 
            @click="$router.push('/retail')"
            class="w-full bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Volver a Retail
          </button>
        </div>
      </div>
    </div>

    <Footer />

    <!-- Success Popup -->
    <div v-if="showSuccessPopup" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="closeSuccessPopup"></div>
      <div class="relative bg-gradient-to-br from-green-600/90 to-emerald-600/90 backdrop-blur-xl rounded-3xl p-8 border border-green-400/30 shadow-2xl max-w-md w-full mx-4">
        <div class="text-center">
          <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">¡Solicitud Enviada!</h3>
          <p class="text-green-100 mb-6 leading-relaxed">
            Tu solicitud para el Plan Retail ha sido enviada exitosamente. 
            Nuestro equipo revisará tu información y te contactaremos pronto con los próximos pasos.
          </p>
          <div class="flex gap-3">
            <button 
              @click="closeSuccessPopup"
              class="flex-1 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Continuar
            </button>
            <button 
              @click="goToRetail"
              class="flex-1 bg-white hover:bg-gray-100 text-green-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Ver Plan Retail
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Terms and Conditions Modal -->
    <Modal 
      :isOpen="showTermsModal" 
      @close="showTermsModal = false" 
      :closeOnOverlay="false"
      ariaLabelledby="terms-title"
      ariaDescribedby="terms-description"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <div>
            <h3 id="terms-title" class="text-xl sm:text-2xl font-bold text-white">Términos y Condiciones</h3>
            <p id="terms-description" class="text-gray-400 text-sm">Soky Recargas - Última actualización: Octubre 2024</p>
          </div>
          <button 
            @click="showTermsModal = false"
            class="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label="Cerrar términos y condiciones"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </template>

      <div class="space-y-6 text-gray-300">
        <!-- Introducción -->
        <section>
          <p class="text-sm leading-relaxed mb-4">
            Al utilizar los servicios de Soky Recargas, usted acepta estar sujeto a estos términos y condiciones. 
            Por favor, léalos cuidadosamente antes de utilizar nuestros servicios.
          </p>
        </section>

        <!-- Contenido de términos... (mantener el contenido existente) -->
        <!-- 1. Servicios -->
        <section>
          <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
            Servicios Ofrecidos
          </h4>
          <div class="text-gray-300 text-sm space-y-2">
            <ul class="list-disc list-inside space-y-1 ml-4">
              <li>Recargas de saldo móvil para múltiples operadoras</li>
              <li>Servicios de internet Nauta para Cuba</li>
              <li>Suscripciones automáticas de servicios</li>
              <li>Transferencias de saldo entre usuarios</li>
              <li>Programa de socios retail para revendedores</li>
            </ul>
          </div>
        </section>

        <!-- Resto del contenido de términos existente... -->
        <!-- (Incluir todas las secciones existentes del componente original) -->
      </div>

      <template #footer>
        <div class="flex justify-between items-center">
          <div class="text-xs text-gray-400">
            © 2024 Soky Recargas. Todos los derechos reservados.
          </div>
          <div class="flex gap-2">
            <button 
              @click="acceptTerms"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              Aceptar
            </button>
            <button 
              @click="showTermsModal = false"
              class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500/50"
            >
              Cerrar
            </button>
          </div>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import {computed, ref} from 'vue'
import {useRouter} from 'vue-router'
import Footer from '@/components/Footer.vue'
import Modal from '@/components/Modal.vue'

const router = useRouter()

// Form state
const form = ref({
  businessName: '',
  contactPhone: '',
  businessAddress: '',
  contactEmail: '',
  businessType: '',
  expectedVolume: '',
  comments: '',
  acceptTerms: false
})

const errors = ref({
  businessName: '',
  contactPhone: '',
  businessAddress: '',
  contactEmail: '',
  businessType: ''
})

const isLoading = ref(false)
const showSuccessPopup = ref(false)
const showTermsModal = ref(false)

// Computed
const isFormValid = computed(() => {
  return form.value.businessName.trim() &&
         form.value.contactPhone.trim() &&
         form.value.businessAddress.trim() &&
         form.value.contactEmail.trim() &&
         form.value.businessType &&
         form.value.acceptTerms
})

// Methods
const validateForm = () => {
  errors.value = {
    businessName: '',
    contactPhone: '',
    businessAddress: '',
    contactEmail: '',
    businessType: ''
  }
  let isValid = true

  // Validate business name
  if (!form.value.businessName.trim()) {
    errors.value.businessName = 'El nombre del negocio es requerido'
    isValid = false
  }

  // Validate phone
  if (!form.value.contactPhone.trim()) {
    errors.value.contactPhone = 'El teléfono de contacto es requerido'
    isValid = false
  } else if (!/^(\+53|53)?\s*[5-9]\d{7}$/.test(form.value.contactPhone.replace(/\s/g, ''))) {
    errors.value.contactPhone = 'Número de teléfono cubano inválido'
    isValid = false
  }

  // Validate address
  if (!form.value.businessAddress.trim()) {
    errors.value.businessAddress = 'La dirección del negocio es requerida'
    isValid = false
  }

  // Validate email
  if (!form.value.contactEmail.trim()) {
    errors.value.contactEmail = 'El correo electrónico es requerido'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.contactEmail)) {
    errors.value.contactEmail = 'Formato de correo electrónico inválido'
    isValid = false
  }

  // Validate business type
  if (!form.value.businessType) {
    errors.value.businessType = 'Debe seleccionar un tipo de negocio'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm() || !form.value.acceptTerms) return

  isLoading.value = true
  
  try {
    const applicationData = {
      businessName: form.value.businessName,
      contactPhone: form.value.contactPhone,
      businessAddress: form.value.businessAddress,
      contactEmail: form.value.contactEmail,
      businessType: form.value.businessType,
      expectedVolume: form.value.expectedVolume || 'No especificado',
      comments: form.value.comments || '',
      acceptedTerms: true,
      applicationDate: new Date().toISOString()
    }
    
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Retail application submitted:', applicationData)
    showSuccessPopup.value = true
  } catch (error) {
    console.error('Application submission error:', error)
  } finally {
    isLoading.value = false
  }
}

const closeSuccessPopup = () => {
  showSuccessPopup.value = false
  // Reset form after successful submission
  form.value = {
    businessName: '',
    contactPhone: '',
    businessAddress: '',
    contactEmail: '',
    businessType: '',
    expectedVolume: '',
    comments: '',
    acceptTerms: false
  }
  errors.value = {
    businessName: '',
    contactPhone: '',
    businessAddress: '',
    contactEmail: '',
    businessType: ''
  }
}

const goToRetail = () => {
  showSuccessPopup.value = false
  router.push('/retail')
}

const acceptTerms = () => {
  // Aquí puedes manejar la lógica cuando el usuario acepta los términos
  showTermsModal.value = false
  form.value.acceptTerms = true
}
</script>

<style scoped>
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

/* Checkbox custom styling */
input[type="checkbox"]:checked {
  background-color: #059669;
  border-color: #059669;
}

/* Select styling for options */
select option {
  background-color: #1f2937;
  color: white;
}
</style>