<script lang="ts" setup>
import { useLogin } from '@/composables/Login';
import { useRippleEffect } from '@/composables/ripleEffects';
import Navbar from '../components/Navbar.vue'

const { email, password, showPassword, login } = useLogin();
const { ripples, handleMouseLeave } = useRippleEffect();
</script>

<template>
  <Navbar />
  <div class="login-background flex items-center justify-center min-h-screen bg-repeat bg-center relative overflow-hidden px-4 py-8 pt-24 md:pt-28">
    <!-- Contenedor del login responsive -->
    <div class="login-content bg-[#1f1f1f]/95 p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto text-white">
      <div class="flex justify-center mb-6">
        <div class="bg-blue-500 p-3 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.299.476 6.121 1.322M12 12a5 5 0 100-10 5 5 0 000 10z"/>
          </svg>
        </div>
      </div>

      <h1 class="text-2xl font-bold text-center mb-4 text-blue-400">Inicio de Sesión</h1>

      <p class="text-center text-gray-400 mb-6 text-sm">
        Inicia con tu cuenta para disfrutar de nuestros servicios de recargas
      </p>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-300">Correo</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="example@email.com"
              class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path 
                d="M16 17H21M18.5 14.5V19.5M12 19H6.2C5.0799 19 4.51984 19 4.09202 18.782C3.71569 18.5903 3.40973 18.2843 3.21799 17.908C3 17.4802 3 16.9201 3 15.8V8.2C3 7.0799 3 6.51984 3.21799 6.09202C3.40973 5.71569 3.71569 5.40973 4.09202 5.21799C4.51984 5 5.0799 5 6.2 5H17.8C18.9201 5 19.4802 5 19.908 5.21799C20.2843 5.40973 20.5903 5.71569 20.782 6.09202C21 6.51984 21 7.0799 21 8.2V11M20.6067 8.26229L15.5499 11.6335C14.2669 12.4888 13.6254 12.9165 12.932 13.0827C12.3192 13.2295 11.6804 13.2295 11.0677 13.0827C10.3743 12.9165 9.73279 12.4888 8.44975 11.6335L3.14746 8.09863"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold mb-2 text-gray-300">Contraseña</label>
          <div class="relative">
            <svg 
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path d="M9 12C9 12.5523 8.55228 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55228 11 9 11.4477 9 12Z" fill="currentColor"/>
              <path d="M13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12Z" fill="currentColor"/>
              <path d="M17 12C17 12.5523 16.5523 13 16 13C15.4477 13 15 12.5523 15 12C15 11.4477 15.4477 11 16 11C16.5523 11 17 11.4477 17 12Z" fill="currentColor"/>
            </svg>

            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg pl-10 pr-10 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              @click="showPassword = !showPassword"
              :class="[
                'h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer transition-colors',
                showPassword ? 'text-blue-400' : 'text-gray-400'
              ]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                v-if="!showPassword"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Acceder
        </button>
      </form>

      <div class="text-center mt-4">
        <router-link to="/forgot-password" class="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors">
          ¿Olvidó su contraseña?
        </router-link>
      </div>

      <p class="text-center text-sm mt-4 text-gray-400">
        ¿No tienes cuenta?
        <router-link to="/register" class="text-blue-400 hover:text-blue-300 hover:underline transition-colors ml-1">
          Regístrate
        </router-link>
      </p>
    </div>
  </div>
</template>

<style src="@/assets/login.css"></style>