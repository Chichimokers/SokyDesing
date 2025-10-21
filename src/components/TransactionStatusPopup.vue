<template>
  <Modal :isOpen="show" @close="$emit('close')">
    <div class="relative bg-black/40 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 border shadow-2xl"
         :class="modalClasses">
      <div class="text-center">
        <!-- Icon -->
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
             :class="iconBgClasses">
          <svg class="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath"/>
          </svg>
        </div>

        <!-- Title -->
        <h3 class="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">{{ title }}</h3>

        <!-- Message -->
        <p class="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">{{ message }}</p>

        <!-- Transaction Details (if provided) -->
        <div v-if="transaction" class="bg-white/5 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-left">
          <div class="space-y-1.5 sm:space-y-2">
            <div class="flex justify-between text-xs sm:text-sm">
              <span class="text-gray-400">Número:</span>
              <span class="text-white truncate ml-2">{{ transaction.phoneNumber }}</span>
            </div>
            <div class="flex justify-between text-xs sm:text-sm">
              <span class="text-gray-400">Plan:</span>
              <span class="text-white truncate ml-2">{{ transaction.offer?.data || 'N/A' }}</span>
            </div>
            <div class="flex justify-between text-xs sm:text-sm">
              <span class="text-gray-400">Monto:</span>
              <span class="text-white">${{ transaction.offer?.priceUSDT || '0' }} USDT</span>
            </div>
            <div class="flex justify-between text-xs sm:text-sm">
              <span class="text-gray-400">Fecha:</span>
              <span class="text-white text-right ml-2">{{ formatDate(transaction.timestamp) }}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2 sm:gap-3">
          <!-- Retry button for errors -->
          <button 
            v-if="status === 'error' && showRetry"
            @click="$emit('retry')"
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
          >
            <span class="hidden sm:inline">Reintentar</span>
            <span class="sm:hidden">Retry</span>
          </button>
          
          <!-- Continue button for success -->
          <button 
            v-if="status === 'success'"
            @click="$emit('continue')"
            class="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
          >
            <span class="hidden sm:inline">Continuar</span>
            <span class="sm:hidden">Continuar</span>
          </button>
          
          <!-- Close/Cancel button -->
          <button 
            @click="$emit('close')"
            class="flex-1 transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base"
            :class="closeButtonClasses"
          >
            {{ closeButtonText }}
          </button>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Modal from './Modal.vue'

interface Props {
  show: boolean
  status: 'success' | 'error' | 'pending'
  title?: string
  message?: string
  transaction?: any
  showRetry?: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'retry'): void
  (e: 'continue'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  message: '',
  showRetry: true
})

const emit = defineEmits<Emits>()

// Computed properties for dynamic styling
const modalClasses = computed(() => {
  switch (props.status) {
    case 'success':
      return 'border-green-400/30'
    case 'error':
      return 'border-red-400/30'
    case 'pending':
      return 'border-yellow-400/30'
    default:
      return 'border-white/10'
  }
})

const iconBgClasses = computed(() => {
  switch (props.status) {
    case 'success':
      return 'bg-green-500/20'
    case 'error':
      return 'bg-red-500/20'
    case 'pending':
      return 'bg-yellow-500/20'
    default:
      return 'bg-gray-500/20'
  }
})

const iconPath = computed(() => {
  switch (props.status) {
    case 'success':
      return 'M5 13l4 4L19 7'
    case 'error':
      return 'M6 18L18 6M6 6l12 12'
    case 'pending':
      return 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    default:
      return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
})

const title = computed(() => {
  if (props.title) return props.title
  
  switch (props.status) {
    case 'success':
      return '¡Transacción Exitosa!'
    case 'error':
      return 'Error en la Transacción'
    case 'pending':
      return 'Procesando Transacción...'
    default:
      return 'Estado de Transacción'
  }
})

const message = computed(() => {
  if (props.message) return props.message
  
  switch (props.status) {
    case 'success':
      return 'Tu recarga se ha procesado correctamente y el saldo ha sido agregado.'
    case 'error':
      return 'Hubo un problema al procesar tu recarga. Por favor intenta nuevamente.'
    case 'pending':
      return 'Tu recarga está siendo procesada. Esto puede tomar unos momentos.'
    default:
      return 'Estado de la transacción actualizado.'
  }
})

const closeButtonClasses = computed(() => {
  switch (props.status) {
    case 'success':
      return 'bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30'
    case 'error':
      return 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30'
    case 'pending':
      return 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/30'
    default:
      return 'bg-white/20 hover:bg-white/30 text-white'
  }
})

const closeButtonText = computed(() => {
  switch (props.status) {
    case 'success':
      return 'Perfecto'
    case 'error':
      return 'Cerrar'
    case 'pending':
      return 'Entendido'
    default:
      return 'OK'
  }
})

const formatDate = (date: Date | string) => {
  const d = new Date(date)
  return d.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
/* Loading animation for pending state */
@keyframes pulse-ring {
  0% {
    transform: scale(.8);
    opacity: 1;
  }
  80%, 100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.bg-yellow-500\/20::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(234, 179, 8, 0.2);
  animation: pulse-ring 2s infinite;
}
</style>