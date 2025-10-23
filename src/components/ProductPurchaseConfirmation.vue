<template>
  <Modal :isOpen="isOpen" @close="$emit('close')">
    <div class="bg-transparent rounded-2xl p-6 sm:p-8 border border-transparent text-white text-center">
      <!-- Success animation -->
      <div class="mb-4 flex justify-center">
        <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce-in animate-pulse-success relative">
          <div class="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-25"></div>
          <div class="absolute inset-0 bg-green-500 rounded-full animate-pulse opacity-50"></div>
          <svg class="w-8 h-8 relative z-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path class="animate-check-draw" d="M5 13l4 4L19 7" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-dasharray="20" stroke-dashoffset="20" />
          </svg>
          <div class="absolute top-0 left-0 w-1 h-1 bg-yellow-400 rounded-full animate-confetti-1"></div>
          <div class="absolute top-2 right-0 w-1 h-1 bg-blue-400 rounded-full animate-confetti-2"></div>
          <div class="absolute bottom-0 left-2 w-1 h-1 bg-purple-400 rounded-full animate-confetti-3"></div>
          <div class="absolute bottom-2 right-2 w-1 h-1 bg-pink-400 rounded-full animate-confetti-1" style="animation-delay: 0.5s;"></div>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-green-400 mb-1">¡Compra completada!</h2>
      <p class="text-gray-300 mb-4">Tu pedido ha sido registrado correctamente.</p>

      <div class="bg-[#0f1213] rounded-xl p-4 border border-transparent text-left inline-block max-w-full">
        <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm items-center">
          <div class="text-gray-400">Producto</div>
          <div class="font-medium text-white text-right">{{ productName }}</div>

          <div class="text-gray-400">Precio</div>
          <div class="font-medium text-white text-right">${{ price.toFixed(2) }} USD</div>

          <div class="text-gray-400">ID de pedido</div>
          <div class="text-right flex items-center justify-end gap-2">
            <code class="bg-black/40 border border-white/10 rounded px-2 py-1 tracking-wider">{{ orderId }}</code>
            <button @click="copyId" class="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white" title="Copiar ID">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2M16 8h2a2 2 0 012 2v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <button @click="$emit('close')" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Aceptar</button>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import Modal from './Modal.vue'

const props = defineProps<{ isOpen: boolean; productName: string; price: number; orderId: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const copyId = async () => {
  try { await navigator.clipboard.writeText(props.orderId) } catch {}
}
</script>

<style scoped>
@keyframes bounce-in {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  50% { transform: scale(1.3) rotate(-90deg); opacity: 0.8; }
  80% { transform: scale(0.9) rotate(0deg); opacity: 1; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

@keyframes pulse-success {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  50% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
}

@keyframes check-draw {
  0% { stroke-dasharray: 0 20; stroke-dashoffset: 20; opacity: 0; }
  50% { stroke-dasharray: 10 20; stroke-dashoffset: 10; opacity: 1; }
  100% { stroke-dasharray: 20 0; stroke-dashoffset: 0; opacity: 1; }
}

@keyframes confetti-1 { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-50px) rotate(360deg); opacity: 0; } }
@keyframes confetti-2 { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-60px) rotate(-360deg); opacity: 0; } }
@keyframes confetti-3 { 0% { transform: translateY(0) rotate(0deg); opacity: 1; } 100% { transform: translateY(-40px) rotate(180deg); opacity: 0; } }

.animate-bounce-in { animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55); }
.animate-pulse-success { animation: pulse-success 2s ease-in-out infinite; }
.animate-check-draw { stroke-dasharray: 20; stroke-dashoffset: 20; animation: check-draw 0.6s ease-out 0.4s both; opacity: 1; }
.animate-confetti-1 { animation: confetti-1 2s ease-out infinite; }
.animate-confetti-2 { animation: confetti-2 2.2s ease-out infinite; animation-delay: 0.3s; }
.animate-confetti-3 { animation: confetti-3 1.8s ease-out infinite; animation-delay: 0.6s; }
</style>
