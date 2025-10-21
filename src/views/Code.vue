<script lang="ts" setup>
import { ref } from 'vue'
import { useRippleEffect } from '@/composables/ripleEffects'
import Navbar from '../components/Navbar.vue'

const { ripples, handleMouseLeave } = useRippleEffect()
const codigo = ref(['', '', '', '', '', ''])
const mensaje = ref('')

function handleInput(index: number, event: Event) {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '') // Solo números
  if (!value) return
  codigo.value[index] = value.slice(-1)
  const next = document.getElementById(`code-${index + 1}`)
  if (next) (next as HTMLInputElement).focus()
}

function handleKeyDown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !codigo.value[index] && index > 0) {
    const prev = document.getElementById(`code-${index - 1}`)
    if (prev) (prev as HTMLInputElement).focus()
  }
}

function verificarCodigo() {
  const code = codigo.value.join('')
  if (code.length === 6) {
    mensaje.value = '✅ Código verificado correctamente'
  } else {
    mensaje.value = '❌ El código debe tener 6 dígitos'
  }
}
</script>

<template>
  <Navbar />
  <div
    class="login-background flex items-center justify-center h-screen bg-repeat bg-center relative overflow-hidden pt-24 md:pt-28"
  >
    <div
      class="login-content bg-[#1f1f1f]/95 p-8 rounded-2xl shadow-xl w-96 text-white"
    >
      <!-- Ícono -->
      <div class="flex justify-center mb-4">
        <div class="bg-blue-500 p-3 rounded-full flex items-center justify-center">
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
              d="M16.862 4.487A9.986 9.986 0 0012 3C6.477 3 2 7.477 2 13a9.985 9.985 0 001.138 4.513M12 21v-8m0 0L8 9m4 4l4-4"
            />
          </svg>
        </div>
      </div>

      <!-- Título -->
      <h1 class="text-2xl font-bold text-center mb-6 text-blue-400">
        Verificar Código
      </h1>

      <p class="text-center text-gray-400 mb-6 text-sm">
        Ingresa el código de 6 dígitos que enviamos a tu correo electrónico
      </p>

      <!-- Cajas de código -->
      <div class="flex justify-between mb-6">
        <input
          v-for="(digit, index) in codigo"
          :key="index"
          :id="`code-${index}`"
          v-model="codigo[index]"
          maxlength="1"
          type="text"
          inputmode="numeric"
          pattern="[0-9]*"
          class="w-12 h-12 text-center text-2xl font-bold rounded-lg bg-[#2a2a2a] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          @input="handleInput(index, $event)"
          @keydown="handleKeyDown(index, $event)"
        />
      </div>

      <button
        @click="verificarCodigo"
        class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
      >
        Verificar
      </button>

      <p v-if="mensaje" class="text-center mt-4 text-sm" :class="mensaje.includes('✅') ? 'text-green-400' : 'text-red-400'">
        {{ mensaje }}
      </p>

      <div class="text-center mt-6">
        <p class="text-gray-400 text-sm">
          ¿No recibiste el código?
          <a href="#" class="text-blue-400 hover:underline">Reenviar</a>
        </p>
      </div>
    </div>
  </div>
</template>

<style src="@/assets/login.css"></style>
