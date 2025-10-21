<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <Navbar />
    
    <!-- Change Password Header Section -->
    <div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <!-- Back Button -->
        <button 
          @click="$router.go(-1)"
          class="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Volver al Perfil
        </button>

        <!-- Change Password Card -->
        <div class="profile-card bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">Cambiar Contraseña</h1>
            <p class="text-gray-300">Actualiza tu contraseña para mantener tu cuenta segura</p>
          </div>

          <!-- Change Password Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Current Password -->
            <div>
              <label for="currentPassword" class="block text-sm font-semibold text-gray-300 mb-2">
                Contraseña Actual
              </label>
              <div class="relative">
                <input
                  id="currentPassword"
                  v-model="form.currentPassword"
                  :type="showCurrentPassword ? 'text' : 'password'"
                  class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Ingresa tu contraseña actual"
                  required
                />
                <button
                  type="button"
                  @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg v-if="showCurrentPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
              <p v-if="errors.currentPassword" class="text-red-400 text-sm mt-2">{{ errors.currentPassword }}</p>
            </div>

            <!-- New Password -->
            <div>
              <label for="newPassword" class="block text-sm font-semibold text-gray-300 mb-2">
                Nueva Contraseña
              </label>
              <div class="relative">
                <input
                  id="newPassword"
                  v-model="form.newPassword"
                  :type="showNewPassword ? 'text' : 'password'"
                  class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Ingresa tu nueva contraseña"
                  required
                />
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg v-if="showNewPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
              
              <!-- Password Strength Indicator -->
              <div class="mt-3">
                <div class="flex justify-between items-center mb-1">
                  <span class="text-xs text-gray-400">Seguridad de la contraseña</span>
                  <span class="text-xs" :class="passwordStrength?.color || ''">{{ passwordStrength?.text || '' }}</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all duration-300" 
                    :class="passwordStrength?.bgColor || ''"
                    :style="{ width: passwordStrength?.width || '0%' }"
                  ></div>
                </div>
              </div>
              
              <p v-if="errors.newPassword" class="text-red-400 text-sm mt-2">{{ errors.newPassword }}</p>
            </div>

            <!-- Confirm New Password -->
            <div>
              <label for="confirmPassword" class="block text-sm font-semibold text-gray-300 mb-2">
                Confirmar Nueva Contraseña
              </label>
              <div class="relative">
                <input
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="Confirma tu nueva contraseña"
                  required
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                >
                  <svg v-if="showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
              </div>
              <p v-if="errors.confirmPassword" class="text-red-400 text-sm mt-2">{{ errors.confirmPassword }}</p>
            </div>

            <!-- Security Tips -->
            <div class="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <h3 class="text-blue-300 font-semibold mb-2 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                Consejos de Seguridad
              </h3>
              <ul class="text-gray-300 text-sm space-y-1">
                <li>• Usa al menos 8 caracteres</li>
                <li>• Incluye mayúsculas, minúsculas y números</li>
                <li>• Agrega símbolos especiales (@, #, $, etc.)</li>
                <li>• Evita información personal</li>
              </ul>
            </div>

            <!-- Submit Button -->
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
                {{ isLoading ? 'Actualizando...' : 'Cambiar Contraseña' }}
              </button>
              
              <button
                type="button"
                @click="$router.push('/profile')"
                class="border border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const router = useRouter()

// Form state
const form = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// UI state
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

// Validation errors
const errors = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// Password strength calculation
const passwordStrength = computed(() => {
  const password = form.value.newPassword
  let score = 0
  
  if (password.length >= 8) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  
  const strengths = [
    { text: 'Muy débil', color: 'text-red-400', bgColor: 'bg-red-500', width: '20%' },
    { text: 'Débil', color: 'text-orange-400', bgColor: 'bg-orange-500', width: '40%' },
    { text: 'Regular', color: 'text-yellow-400', bgColor: 'bg-yellow-500', width: '60%' },
    { text: 'Fuerte', color: 'text-blue-400', bgColor: 'bg-blue-500', width: '80%' },
    { text: 'Muy fuerte', color: 'text-green-400', bgColor: 'bg-green-500', width: '100%' }
  ]
  
  if (password.length === 0) {
    return { text: '', color: '', bgColor: '', width: '0%' }
  }
  
  return strengths[Math.max(0, score - 1)] || strengths[0]
})

// Form validation
const isFormValid = computed(() => {
  return form.value.currentPassword.length > 0 &&
         form.value.newPassword.length >= 8 &&
         form.value.confirmPassword === form.value.newPassword &&
         Object.values(errors.value).every(error => !error)
})

// Validate form
const validateForm = () => {
  errors.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  if (form.value.currentPassword.length === 0) {
    errors.value.currentPassword = 'La contraseña actual es requerida'
  }

  if (form.value.newPassword.length < 8) {
    errors.value.newPassword = 'La nueva contraseña debe tener al menos 8 caracteres'
  }

  if (form.value.confirmPassword !== form.value.newPassword) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
  }

  if (form.value.currentPassword === form.value.newPassword) {
    errors.value.newPassword = 'La nueva contraseña debe ser diferente a la actual'
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
    
    // Here you would make the actual API call
    console.log('Changing password:', {
      currentPassword: form.value.currentPassword,
      newPassword: form.value.newPassword
    })

    // Success - redirect to profile with success message
    router.push({ 
      path: '/profile',
      query: { success: 'password-changed' }
    })
  } catch (error) {
    errors.value.currentPassword = 'Error al cambiar la contraseña. Intenta nuevamente.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.profile-card {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Glass morphism effects */
@supports (backdrop-filter: blur(20px)) {
  .profile-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
  }
}

/* Responsive improvements */
@media (max-width: 768px) {
  .profile-card {
    padding: 1.5rem;
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
</style>