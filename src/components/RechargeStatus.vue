<template>
  <div v-if="transaction" class="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
    <div class="bg-[#0b0b0b] rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-white/5">
      
      <!-- Estado: Procesando -->
      <div v-if="transaction.status === 'processing'" class="text-center">
        <!-- Animación de carga -->
        <div class="relative mb-6">
          <div class="flex justify-center">
            <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
          </div>
          <!-- Efectos decorativos -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-12 h-12 bg-blue-500/20 rounded-full animate-pulse"></div>
          </div>
          <!-- Partículas flotantes -->
          <div class="absolute top-0 left-1/2 transform -translate-x-1/2">
            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0s;"></div>
          </div>
          <div class="absolute top-4 right-1/4">
            <div class="w-1 h-1 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.5s;"></div>
          </div>
          <div class="absolute top-4 left-1/4">
            <div class="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style="animation-delay: 1s;"></div>
          </div>
        </div>

  <h2 class="text-2xl font-bold text-white mb-2">
    {{ isSubscription ? 'Procesando suscripción...' : 'Procesando recarga...' }}
  </h2>
  <p class="text-gray-400 mb-4">
    {{ isSubscription ? 'Tu suscripción está siendo procesada' : 'Tu recarga está siendo procesada' }}
  </p>
        
  <div class="bg-[#0f1213] rounded-lg p-4 mb-6 border border-white/5 text-white">
          <div class="flex items-center justify-between text-sm">
            <span class="text-gray-400">Teléfono:</span>
            <span class="font-semibold text-white">{{ formatPhone(transaction.phoneNumber) }}</span>
          </div>
          <div class="flex items-center justify-between text-sm mt-2">
            <span class="text-gray-400">Monto:</span>
            <span class="font-semibold text-green-400">${{ transaction.offer.priceUSDT }} USDT</span>
          </div>
          <div class="flex items-center justify-between text-sm mt-2">
            <span class="text-gray-400">Plan:</span>
            <span class="font-semibold text-white">{{ transaction.offer.data }}</span>
          </div>
        </div>
        
        <p class="text-xs text-gray-500">
          Tiempo estimado: 2-5 minutos
        </p>
      </div>

      <!-- Estado: Completada -->
      <div v-else-if="transaction.status === 'completed'" class="text-center">
        <!-- Icono de éxito con animación -->
        <div class="relative mb-6">
          <div class="flex justify-center">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center animate-bounce-in">
              <svg class="w-8 h-8 text-white animate-check-draw" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
          </div>
          
          <!-- Efectos de celebración -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-20 h-20 border-2 border-green-500/30 rounded-full animate-ping"></div>
          </div>
          
          <!-- Partículas de celebración -->
          <div class="absolute top-2 left-1/2 transform -translate-x-1/2">
            <div class="w-2 h-2 bg-yellow-400 rounded-full animate-confetti-1"></div>
          </div>
          <div class="absolute top-0 right-1/4">
            <div class="w-2 h-2 bg-blue-400 rounded-full animate-confetti-2"></div>
          </div>
          <div class="absolute top-1 left-1/4">
            <div class="w-2 h-2 bg-red-400 rounded-full animate-confetti-3"></div>
          </div>
        </div>

  <h2 class="text-2xl font-bold text-green-400 mb-2">
    {{ isSubscription ? '¡Suscripción Activada!' : '¡Recarga Completada!' }}
  </h2>
  <p class="text-gray-300 mb-6">
    {{ isSubscription ? 'Tu suscripción se activó exitosamente' : 'Tu recarga se procesó exitosamente' }}
  </p>
        
  <div class="bg-[#07110a] border border-green-800/30 rounded-lg p-4 mb-6 text-white">
          <div class="flex items-center justify-between text-sm mb-2">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <span class="text-gray-300">Teléfono: </span>
            <span class="font-semibold text-white">{{ formatPhone(transaction.phoneNumber) }}</span>
          </div>
          
          <div v-if="transaction.email" class="flex items-center justify-between text-sm mb-2">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            <span class="text-gray-300">Email: </span>
            <span class="font-medium text-white">{{ transaction.email }}</span>
          </div>
          
          <div class="flex items-center justify-between text-sm mb-2">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
            <span class="text-gray-300">Monto: </span>
            <span class="font-semibold text-green-400">${{ transaction.offer.priceUSDT }} USDT</span>
          </div>
          
          <div class="flex items-center justify-between text-sm">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.723 2.723 0 003 15.546V8.91c0-2.2.9-4.2 2.46-5.71A7.93 7.93 0 0111 1h.36a8.044 8.044 0 015.54 2.2c1.56 1.51 2.46 3.51 2.46 5.71v6.636z"/>
            </svg>
            <span class="text-gray-300">
              {{ isSubscription ? 'Servicio:' : 'Oferta:' }}
            </span>
            <span class="font-medium text-white">{{ transaction.offer.data }}</span>
          </div>
          
          <!-- Mensaje adicional para suscripciones -->
          <div v-if="isSubscription" class="mt-4 p-3 bg-blue-900/30 border border-blue-700/50 rounded-lg">
            <div class="flex items-start space-x-2">
              <svg class="w-4 h-4 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <div class="text-xs text-blue-300">
                <p class="font-medium mb-1">Suscripción activa</p>
                <p>Tu servicio se renovará automáticamente según el plan seleccionado.</p>
              </div>
            </div>
          </div>
          
          <div class="flex items-center justify-between text-sm mt-2">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span class="text-gray-300">Desde: </span>
            <span class="font-medium text-white">{{ formatTime(transaction.timestamp) }}</span>
          </div>
        </div>
        
        <button
          @click="closeStatus"
          class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-300"
        >
          {{ isSubscription ? 'Gestionar Suscripción' : 'Continuar' }}
        </button>
      </div>

      <!-- Estado: Error -->
      <div v-else-if="transaction.status === 'error'" class="text-center">
        <!-- Icono de error -->
        <div class="relative mb-6">
          <div class="flex justify-center">
            <div class="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-shake">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
          </div>
          
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-20 h-20 border-2 border-red-500/30 rounded-full animate-pulse"></div>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-red-600 mb-2">
          {{ isSubscription ? 'Error en la suscripción' : 'Error en la recarga' }}
        </h2>
        <p class="text-gray-600 mb-6">
          {{ isSubscription ? 'Hubo un problema al procesar tu suscripción' : 'Hubo un problema al procesar tu recarga' }}
        </p>
        
        <div class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-red-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <div class="text-sm">
              <div class="font-medium text-red-800 mb-1">¿Qué hacer?</div>
              <ul class="text-red-700 space-y-1">
                <li>• Verifica que el número sea correcto</li>
                <li>• Intenta nuevamente en unos minutos</li>
                <li>• Contacta soporte si persiste el problema</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="flex space-x-3">
          <button
            @click="closeStatus"
            class="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Cancelar
          </button>
          <button
            @click="retryRecharge"
            class="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold transition duration-300"
          >
            Reintentar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { RechargeTransaction } from '../composables/useRecharge'

interface Props {
  transaction: RechargeTransaction | null
}

interface Emits {
  close: []
  retry: [transaction: RechargeTransaction]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Computed para determinar si es una suscripción
const isSubscription = computed(() => {
  return props.transaction?.offer?.id === 'nauta' || props.transaction?.offer?.id === 'nauta_plus'
})

const closeStatus = () => {
  emit('close')
}

const retryRecharge = () => {
  if (props.transaction) {
    emit('retry', props.transaction)
  }
}

const formatPhone = (phone: string) => {
  if (phone.startsWith('+53')) {
    const digits = phone.slice(3)
    if (digits.length === 8) {
      return `+53 ${digits.slice(0, 4)} ${digits.slice(4)}`
    }
  }
  return phone
}

const formatTime = (timestamp: Date) => {
  return timestamp.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }) + ' horas'
}
</script>

<style scoped>
/* Animaciones personalizadas */
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes check-draw {
  0% {
    stroke-dasharray: 0 20;
  }
  100% {
    stroke-dasharray: 20 20;
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes confetti-1 {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-50px) rotate(360deg); opacity: 0; }
}

@keyframes confetti-2 {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-60px) rotate(-360deg); opacity: 0; }
}

@keyframes confetti-3 {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(-40px) rotate(180deg); opacity: 0; }
}

.animate-bounce-in {
  animation: bounce-in 0.6s ease-out;
}

.animate-check-draw {
  stroke-dasharray: 20;
  stroke-dashoffset: 20;
  animation: check-draw 0.5s ease-out 0.3s both;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

.animate-confetti-1 {
  animation: confetti-1 2s ease-out infinite;
}

.animate-confetti-2 {
  animation: confetti-2 2.2s ease-out infinite;
  animation-delay: 0.3s;
}

.animate-confetti-3 {
  animation: confetti-3 1.8s ease-out infinite;
  animation-delay: 0.6s;
}
</style>