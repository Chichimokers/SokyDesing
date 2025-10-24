<template>
  <Navbar />
  <div class="login-background flex items-center justify-center min-h-screen bg-repeat bg-center relative overflow-hidden px-4 py-8 pt-24 md:pt-28">
    <!-- Contenedor responsive -->
    <div class="login-content bg-[#1f1f1f]/95 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto text-white">
      
      <!-- Paso 1: Solicitar email -->
      <div v-if="currentStep === 1">
        <!-- Icono principal -->
        <div class="flex justify-center mb-6">
          <div class="bg-blue-500 p-3 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>

        <h1 class="text-2xl font-bold text-center mb-4 text-blue-400">Recuperar Contraseña</h1>

        <p class="text-center text-gray-400 mb-6 text-sm">
          Ingresa tu correo electrónico y te enviaremos un código de verificación
        </p>

        <form @submit.prevent="sendResetCode" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-300">Correo electrónico</label>
            <div class="relative">
              <input
                v-model="email"
                type="email"
                placeholder="example@email.com"
                :disabled="isLoading"
                class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50"
                required
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 17H21M18.5 14.5V19.5M12 19H6.2C5.08 19 4.52 19 4.09 18.78C3.71 18.59 3.4 18.28 3.22 17.91C3 17.48 3 16.92 3 15.8V8.2C3 7.08 3 6.52 3.22 6.09C3.41 5.72 3.72 5.41 4.09 5.22C4.52 5 5.08 5 6.2 5H17.8C18.92 5 19.48 5 19.91 5.22C20.28 5.41 20.59 5.72 20.78 6.09C21 6.52 21 7.08 21 8.2V11" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading || !email"
            class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="!isLoading">Enviar código</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Enviando...
            </span>
          </button>
        </form>
      </div>

      <!-- Paso 2: Verificar código -->
      <div v-else-if="currentStep === 2">
        <div class="flex justify-center mb-6">
          <div class="bg-green-500 p-3 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h1 class="text-2xl font-bold text-center mb-4 text-blue-400">Verificar Código</h1>

        <p class="text-center text-gray-400 mb-2 text-sm">
          Hemos enviado un código de 6 dígitos a:
        </p>
        <p class="text-center text-blue-400 mb-6 text-sm font-medium">{{ email }}</p>

        <form @submit.prevent="verifyCode" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-300">Código de verificación</label>
            <div class="relative">
              <input
                v-model="verificationCode"
                type="text"
                placeholder="123456"
                maxlength="6"
                :disabled="isLoading"
                class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50 text-center text-2xl tracking-wider"
                required
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading || verificationCode.length !== 6"
            class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="!isLoading">Verificar código</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verificando...
            </span>
          </button>

          <div class="text-center">
            <button
              type="button"
              @click="resendCode"
              :disabled="resendTimer > 0 || isLoading"
              class="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="resendTimer > 0">Reenviar código en {{ resendTimer }}s</span>
              <span v-else>Reenviar código</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Paso 3: Nueva contraseña -->
      <div v-else-if="currentStep === 3">
        <div class="flex justify-center mb-6">
          <div class="bg-purple-500 p-3 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>

        <h1 class="text-2xl font-bold text-center mb-4 text-blue-400">Nueva Contraseña</h1>

        <p class="text-center text-gray-400 mb-6 text-sm">
          Ingresa tu nueva contraseña
        </p>

        <form @submit.prevent="resetPassword" class="space-y-4">
          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-300">Nueva contraseña</label>
            <div class="relative">
              <input
                v-model="newPassword"
                :type="showNewPassword ? 'text' : 'password'"
                placeholder="••••••••"
                :disabled="isLoading"
                class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50"
                required
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" @click="showNewPassword = !showNewPassword" :class="['h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors', showNewPassword ? 'text-blue-400' : 'text-gray-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!showNewPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </div>
          </div>

          <div>
            <label class="block text-sm font-semibold mb-2 text-gray-300">Confirmar nueva contraseña</label>
            <div class="relative">
              <input
                v-model="confirmNewPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="••••••••"
                :disabled="isLoading"
                class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all disabled:opacity-50"
                required
              />
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" @click="showConfirmPassword = !showConfirmPassword" :class="['h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors', showConfirmPassword ? 'text-blue-400' : 'text-gray-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!showConfirmPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
              </svg>
            </div>
          </div>

          <!-- Validación de contraseña -->
          <div v-if="newPassword || confirmNewPassword" class="text-xs space-y-1">
            <div :class="passwordValidation.length ? 'text-green-400' : 'text-red-400'" class="flex items-center">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path v-if="passwordValidation.length" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                <path v-else d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
              </svg>
              Al menos 8 caracteres
            </div>
            <div :class="passwordValidation.match ? 'text-green-400' : 'text-red-400'" class="flex items-center">
              <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path v-if="passwordValidation.match" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                <path v-else d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
              </svg>
              Las contraseñas coinciden
            </div>
          </div>

          <button
            type="submit"
            :disabled="isLoading || !isValidPassword"
            class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="!isLoading">Cambiar contraseña</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Cambiando...
            </span>
          </button>
        </form>
      </div>

      <!-- Paso 4: Éxito -->
      <div v-else-if="currentStep === 4">
        <div class="flex justify-center mb-6">
          <div class="bg-green-500 p-3 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h1 class="text-2xl font-bold text-center mb-4 text-green-400">¡Contraseña Cambiada!</h1>

        <p class="text-center text-gray-400 mb-6 text-sm">
          Tu contraseña ha sido cambiada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.
        </p>

        <router-link
          to="/login"
          class="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] inline-block text-center"
        >
          Ir a iniciar sesión
        </router-link>
      </div>

      <!-- Navegación inferior -->
      <div class="text-center mt-4 space-y-2">
        <div v-if="currentStep < 4">
          <router-link to="/login" class="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors">
            ← Volver al inicio de sesión
          </router-link>
        </div>
        
        <p v-if="currentStep === 1" class="text-center text-sm text-gray-400">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-blue-400 hover:text-blue-300 hover:underline transition-colors ml-1">
            Regístrate
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'

const router = useRouter()

// Estados
const currentStep = ref(1)
const isLoading = ref(false)
const resendTimer = ref(0)

// Datos del formulario
const email = ref('')
const verificationCode = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

// Visibilidad de contraseñas
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

// Timer para reenvío
let resendInterval: number | null = null

// Validaciones
const passwordValidation = computed(() => ({
  length: newPassword.value.length >= 8,
  match: newPassword.value === confirmNewPassword.value && newPassword.value.length > 0
}))

const isValidPassword = computed(() => 
  passwordValidation.value.length && passwordValidation.value.match
)

// Paso 1: Enviar código de recuperación
const sendResetCode = async () => {
  isLoading.value = true
  try {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Aquí harías la llamada real a tu API
    console.log('Enviando código a:', email.value)
    
    currentStep.value = 2
    startResendTimer()
  } catch (error) {
    console.error('Error al enviar código:', error)
    alert('Error al enviar el código. Inténtalo de nuevo.')
  } finally {
    isLoading.value = false
  }
}

// Paso 2: Verificar código
const verifyCode = async () => {
  isLoading.value = true
  try {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Aquí harías la llamada real a tu API
    console.log('Verificando código:', verificationCode.value)
    
    currentStep.value = 3
  } catch (error) {
    console.error('Error al verificar código:', error)
    alert('Código incorrecto. Inténtalo de nuevo.')
  } finally {
    isLoading.value = false
  }
}

// Paso 3: Cambiar contraseña
const resetPassword = async () => {
  if (!isValidPassword.value) return
  
  isLoading.value = true
  try {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Aquí harías la llamada real a tu API
    console.log('Cambiando contraseña para:', email.value)
    
    currentStep.value = 4
  } catch (error) {
    console.error('Error al cambiar contraseña:', error)
    alert('Error al cambiar la contraseña. Inténtalo de nuevo.')
  } finally {
    isLoading.value = false
  }
}

// Reenviar código
const resendCode = async () => {
  if (resendTimer.value > 0) return
  
  isLoading.value = true
  try {
    // Simular API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    console.log('Reenviando código a:', email.value)
    startResendTimer()
  } catch (error) {
    console.error('Error al reenviar código:', error)
    alert('Error al reenviar el código.')
  } finally {
    isLoading.value = false
  }
}

// Timer para reenvío
const startResendTimer = () => {
  resendTimer.value = 60
  resendInterval = setInterval(() => {
    resendTimer.value--
    if (resendTimer.value <= 0) {
      clearInterval(resendInterval!)
    }
  }, 1000)
}

// Limpiar timer al desmontar
onUnmounted(() => {
  if (resendInterval) {
    clearInterval(resendInterval)
  }
  
  // Limpiar estilos del body que puedan quedar de modales
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  document.body.style.paddingRight = ''
})
</script>

<style src="@/assets/login.css"></style>