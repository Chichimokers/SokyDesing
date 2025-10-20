<script lang="ts" setup>
import { useLogin } from '@/composables/Login';
import { useRippleEffect } from '@/composables/ripleEffects';

const { email, password, showPassword, login } = useLogin();
const { ripples, handleMouseLeave } = useRippleEffect();
</script>

<template>
  <div
    class="login-background  flex items-center justify-center h-screen bg-repeat bg-center relative overflow-hidden"
  >
  
  

    <!-- Tu contenido del login (sin cambios) -->
    <div class="login-content bg-[#1f1f1f]/95 p-8 rounded-2xl shadow-xl w-96 text-white">
      <div class="flex justify-center mb-4">
        <div
          class="bg-blue-500 p-3 rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.21 0 4.299.476 6.121 1.322M12 12a5 5 0 100-10 5 5 0 000 10z"
            />
          </svg>
        </div>
      </div>

      <h1 class="text-2xl font-bold text-center mb-6 text-blue-400">
        Inicio de Sesión
      </h1>

      <p class="text-center text-gray-400 mb-6 text-sm">
        Inicia con tu cuenta para disfrutar de nuestros servicios de recargas
      </p>

      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-sm font-semibold mb-1 text-gray-300"
            >Correo</label
          >
          <div class="relative">
            <input
              v-model="email"
              type="email"
              placeholder="example@email.com"
              class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 absolute left-3 top-2.5 text-gray-400"
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

        <div class="mb-6">
          <label class="block text-sm font-semibold mb-1 text-gray-300">
            Contraseña
          </label>
          <div class="relative">
            <svg 
              class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 password-icon"
              viewBox="0 0 24 24"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C21.4816 5.82475 21.7706 6.69989 21.8985 8"
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
              class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg pl-10 pr-10 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              @click="showPassword = !showPassword"
              :class="[
                'h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer password-icon',
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
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M3 3l18 18M10.477 10.477A3 3 0 0113.5 13.5m1.72 1.72A9.956 9.956 0 0112 21c-4.418 0-8.167-2.833-9.64-6.757a.993.993 0 010-.486A9.978 9.978 0 017.02 7.02m1.84-1.84A9.956 9.956 0 0112 3c4.418 0 8.167 2.833 9.64 6.757.09.236.09.51 0 .747A9.977 9.977 0 0118.98 16.98"
              />
            </svg>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Acceder
        </button>
      </form>

      <div class="text-center mt-3">
        <a href="#" class="text-sm text-blue-400 hover:underline"
          >¿Olvidó su contraseña?</a
        >
      </div>

      <p class="text-center text-sm mt-4 text-gray-400">
        ¿No tienes cuenta?
        <router-link to="/register" class="text-blue-400 hover:underline"
          >Regístrate</router-link
        >
      </p>
    </div>
  </div>
</template>

<style src="@/assets/login.css"></style>