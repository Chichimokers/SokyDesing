<template>
  <Modal :isOpen="show" @close="$emit('close')">
    <template #header>
      <div class="text-center">
        <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-2xl">
          <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
        </div>
        <h2 class="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2">Solicitud de Retail</h2>
        <p class="text-xs sm:text-sm text-gray-300 mb-2">Únete a nuestra red de revendedores</p>
      </div>
    </template>

    <!-- Application Form Content -->
    <div class="space-y-4">
      <!-- Primera fila - Nombre y Teléfono -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Business Name -->
        <div>
          <label class="block text-sm font-semibold text-gray-300 mb-2">
            Nombre del Negocio *
          </label>
          <input
            v-model="form.businessName"
            type="text"
            class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            placeholder="Mi Negocio S.A."
            required
          />
          <p v-if="errors.businessName" class="text-red-400 text-sm mt-1">{{ errors.businessName }}</p>
        </div>

        <!-- Contact Phone -->
        <div>
          <label class="block text-sm font-semibold text-gray-300 mb-2">
            Teléfono de Contacto *
          </label>
          <input
            v-model="form.contactPhone"
            type="tel"
            class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            placeholder="+53 5812 6024"
            required
          />
          <p v-if="errors.contactPhone" class="text-red-400 text-sm mt-1">{{ errors.contactPhone }}</p>
        </div>
      </div>

      <!-- Business Address - Fila completa -->
      <div>
        <label class="block text-sm font-semibold text-gray-300 mb-2">
          Dirección del Negocio *
        </label>
        <input
          v-model="form.businessAddress"
          type="text"
          class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
          placeholder="Calle 23 #456, Vedado, La Habana"
          required
        />
        <p v-if="errors.businessAddress" class="text-red-400 text-sm mt-1">{{ errors.businessAddress }}</p>
      </div>

      <!-- Contact Email - Fila completa -->
      <div>
        <label class="block text-sm font-semibold text-gray-300 mb-2">
          Correo Electrónico *
        </label>
        <input
          v-model="form.contactEmail"
          type="email"
          class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
          placeholder="contacto@minegocio.cu"
          required
        />
        <p v-if="errors.contactEmail" class="text-red-400 text-sm mt-1">{{ errors.contactEmail }}</p>
      </div>

      <!-- Segunda fila - Tipo y Volumen -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Business Type -->
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
            <option value="tienda" class="bg-gray-800">Tienda</option>
            <option value="cafeteria" class="bg-gray-800">Cafetería</option>
            <option value="restaurante" class="bg-gray-800">Restaurante</option>
            <option value="farmacia" class="bg-gray-800">Farmacia</option>
            <option value="centro_servicios" class="bg-gray-800">Centro de Servicios</option>
            <option value="otro" class="bg-gray-800">Otro</option>
          </select>
          <p v-if="errors.businessType" class="text-red-400 text-sm mt-1">{{ errors.businessType }}</p>
        </div>

        <!-- Expected Volume -->
        <div>
          <label class="block text-sm font-semibold text-gray-300 mb-2">
            Volumen Mensual (USD)
          </label>
          <select
            v-model="form.expectedVolume"
            class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
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
        <label class="block text-sm font-semibold text-gray-300 mb-2">
          Comentarios Adicionales
        </label>
        <textarea
          v-model="form.comments"
          rows="3"
          class="w-full px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
          placeholder="Cuéntanos más sobre tu negocio y por qué quieres ser revendedor..."
        ></textarea>
      </div>

      <!-- Terms Agreement -->
      <div class="flex items-start space-x-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
        <input
          v-model="form.acceptTerms"
          type="checkbox"
          id="acceptRetailTerms"
          class="mt-1 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
          required
        />
        <label for="acceptRetailTerms" class="text-sm text-gray-300 leading-relaxed">
          Acepto los términos y condiciones del programa de revendedores y autorizo el procesamiento de mis datos para evaluar mi solicitud.
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
          :disabled="isLoading || !form.acceptTerms || !isFormValid"
          class="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed"
        >
          <span v-if="isLoading" class="flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </span>
          <span v-else>Enviar Solicitud</span>
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Modal from './Modal.vue'

interface Props {
  show: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  submit: [data: any]
}>()

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
    
    emit('submit', applicationData)
  } catch (error) {
    console.error('Application submission error:', error)
  } finally {
    isLoading.value = false
  }
}

// Reset form cuando se abre el popup
watch(() => props.show, (isOpen) => {
  if (isOpen) {
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
})
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