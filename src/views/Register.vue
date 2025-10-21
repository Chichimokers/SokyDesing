<template>
  <div class="login-background flex items-center justify-center min-h-screen bg-repeat bg-center relative overflow-hidden px-4 py-8">
    <!-- Contenedor del registro responsive -->
    <div class="login-content bg-[#1f1f1f]/95 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto text-white">
      
      <!-- Icono principal -->
      <div class="flex justify-center mb-6">
        <div class="bg-blue-500 p-3 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>

      <h1 class="text-2xl font-bold text-center mb-4 text-blue-400">Crear Cuenta</h1>

      <p class="text-center text-gray-400 mb-6 text-sm">
        Completa los siguientes datos para registrarte
      </p>

      <!-- Formulario -->
      <form @submit.prevent="register" class="space-y-4">
        <!-- Nombre completo -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-300">Nombre completo</label>
          <div class="relative">
            <input
              v-model="form.fullName"
              type="text"
              placeholder="Tu nombre"
              class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        <!-- Correo -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-300">Correo</label>
          <div class="relative">
            <input
              v-model="form.email"
              type="email"
              placeholder="example@email.com"
              class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 17H21M18.5 14.5V19.5M12 19H6.2C5.08 19 4.52 19 4.09 18.78C3.71 18.59 3.4 18.28 3.22 17.91C3 17.48 3 16.92 3 15.8V8.2C3 7.08 3 6.52 3.22 6.09C3.41 5.72 3.72 5.41 4.09 5.22C4.52 5 5.08 5 6.2 5H17.8C18.92 5 19.48 5 19.91 5.22C20.28 5.41 20.59 5.72 20.78 6.09C21 6.52 21 7.08 21 8.2V11" />
            </svg>
          </div>
        </div>

        <!-- Teléfono -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-300">Teléfono</label>
          <div class="relative">
            <input
              v-model="form.phone"
              type="tel"
              placeholder="+53 58126024"
              class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.68l1.5 4.49a1 1 0 01-.5 1.21l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.21-.5l4.49 1.5a1 1 0 01.68.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z" />
            </svg>
          </div>
        </div>

        <!-- Contraseña -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-300">Contraseña</label>
          <div class="relative">
            <input
              v-model="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <svg xmlns="http://www.w3.org/2000/svg" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" @click="showPassword = !showPassword" :class="['h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors', showPassword ? 'text-blue-400' : 'text-gray-400']" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
          </div>
        </div>

        <!-- Confirmar contraseña -->
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-300">Confirmar contraseña</label>
          <div class="relative">
            <input
              v-model="form.confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Repite tu contraseña"
              class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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

        <!-- Términos y Condiciones -->
        <div class="flex items-start gap-3 mt-4">
          <input
            id="acceptTerms"
            v-model="form.acceptTerms"
            type="checkbox"
            class="mt-1 w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            required
          />
          <label for="acceptTerms" class="text-xs sm:text-sm text-gray-300">
            Acepto los 
            <button 
              type="button"
              @click="showTermsModal"
              class="text-blue-400 hover:text-blue-300 underline"
            >
              términos y condiciones
            </button>
            y la política de privacidad de Soky Recargas.
          </label>
        </div>

        <!-- Botón registrar -->
        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-6">
          Crear cuenta
        </button>
      </form>

      <p class="text-center text-sm mt-4 text-gray-400">
        ¿Ya tienes cuenta?
        <router-link to="/login" class="text-blue-400 hover:text-blue-300 hover:underline transition-colors ml-1">Inicia sesión</router-link>
      </p>
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
import { ref, reactive } from 'vue'
import { useTermsAndConditions } from '@/composables/useTermsAndConditions'
import TermsAndConditionsPopup from '@/components/TermsAndConditionsPopup.vue'

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Terms and conditions
const { showTermsPopup, showTerms, hideTerms, acceptTerms } = useTermsAndConditions()

// Terms and conditions functions
const showTermsModal = () => {
  showTerms()
}

const acceptTermsAndClose = () => {
  acceptTerms()
  form.acceptTerms = true
}


const register = () => {
  console.log(form)
}
</script>

<style src="@/assets/login.css"></style>
