<template>
  <div class="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-white/10">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="text-xl font-bold text-white">Seleccione el monto a recargar</h3>
        <p class="text-gray-400 text-sm mt-1">Planes de datos internacional</p>
      </div>
      <div v-if="selectedOffer" class="text-right">
        <div class="text-sm text-gray-400">Total</div>
        <div class="text-lg font-bold text-blue-400">${{ selectedOffer.priceUSDT }} USDT</div>
      </div>
    </div>

    <!-- Grid de planes -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <div
        v-for="offer in offers"
        :key="offer.id"
        class="relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 group"
        :class="{
          'border-blue-500 bg-blue-500/10': selectedOffer?.id === offer.id,
          'border-gray-600 bg-[#2a2a2a] hover:border-blue-400 hover:bg-blue-500/5': selectedOffer?.id !== offer.id
        }"
        @click="selectPlan(offer)"
      >
        <!-- Badge Popular -->
        <div
          v-if="offer.popular"
          class="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold"
        >
          Popular
        </div>

        <!-- Contenido del plan -->
        <div class="text-center">
          <!-- Datos -->
          <div class="mb-3">
            <div class="text-2xl font-bold text-white">{{ offer.data }}</div>
            <div class="text-xs text-gray-400">Datos móvil</div>
          </div>

          <!-- Detalles adicionales -->
          <div class="space-y-2 mb-4">
            <div v-if="parseInt(offer.minutes) > 0" class="flex items-center justify-center space-x-2">
              <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span class="text-gray-300 text-sm">{{ offer.minutes }}</span>
            </div>

            <div v-if="parseInt(offer.sms) > 0" class="flex items-center justify-center space-x-2">
              <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <span class="text-gray-300 text-sm">{{ offer.sms }}</span>
            </div>
          </div>

          <!-- Precio -->
          <div class="border-t border-gray-600 pt-3">
            <div class="text-sm text-gray-400 line-through">${{ offer.price.toFixed(2) }}</div>
            <div class="text-xl font-bold text-white">${{ offer.priceUSDT.toFixed(2) }}</div>
            <div class="text-xs text-blue-400">USDT</div>
          </div>
        </div>

        <!-- Indicador de selección -->
        <div
          v-if="selectedOffer?.id === offer.id"
          class="absolute top-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
        >
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </div>
    </div>

    <!-- Información adicional -->
    <div class="bg-[#2a2a2a] rounded-lg p-4 border border-gray-600">
      <div class="flex items-start space-x-3">
        <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <div class="text-sm">
          <div class="text-white font-medium mb-1">Información importante:</div>
          <ul class="text-gray-400 space-y-1 text-xs">
            <li>• Las recargas son procesadas en 2-5 minutos</li>
            <li>• Válido para números cubanos únicamente</li>
            <li>• Pago seguro con criptomonedas USDT</li>
            <li>• Soporte 24/7 disponible</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Resumen de selección -->
    <div v-if="selectedOffer" class="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
      <div class="flex items-center justify-between">
        <div>
          <div class="text-white font-medium">Plan seleccionado:</div>
          <div class="text-sm text-gray-300">
            {{ selectedOffer.data }} + {{ selectedOffer.minutes }} + {{ selectedOffer.sms }}
          </div>
        </div>
        <div class="text-right">
          <div class="text-xl font-bold text-blue-400">${{ selectedOffer.priceUSDT }} USDT</div>
          <div class="text-xs text-gray-400">Por número</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RechargeOffer } from '@/composables/useRecharge'

interface Props {
  offers: RechargeOffer[]
  selectedOffer: RechargeOffer | null
}

interface Emits {
  selectOffer: [offer: RechargeOffer]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectPlan = (offer: RechargeOffer) => {
  emit('selectOffer', offer)
}
</script>

<style scoped>
/* Animación para la selección */
.plan-card {
  position: relative;
  overflow: hidden;
}

.plan-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transform: rotate(45deg);
  transition: all 0.5s;
  opacity: 0;
}

.plan-card:hover::before {
  animation: shimmer 1.5s ease-in-out;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
    opacity: 0;
  }
}

/* Efectos de hover mejorados */
.group:hover .text-white {
  color: #60A5FA;
  transition: color 0.3s ease;
}

.group:hover svg {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}
</style>