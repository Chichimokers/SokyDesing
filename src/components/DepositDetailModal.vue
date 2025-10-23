<template>
  <Modal :isOpen="isOpen" @close="$emit('close')">
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-white">Detalle de Acreditación</h3>
          <p class="text-white/70 text-sm">Información de la transacción</p>
        </div>
        <button @click="$emit('close')" class="text-white/80 hover:text-white transition-colors p-1">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </template>

    <div class="space-y-4 sm:space-y-6">
      <!-- Estado -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="stateBg">
          <svg class="w-5 h-5" :class="stateIconClass" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="statePath"/>
          </svg>
        </div>
        <div>
          <div class="text-white font-semibold">{{ transaction?.title || 'Transacción' }}</div>
          <div class="text-gray-400 text-sm">Estado: {{ transaction?.status }}</div>
        </div>
      </div>

      <!-- Detalles -->
      <div class="bg-white/5 rounded-xl p-4 border border-white/10">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-400">Monto esperado:</span>
            <span class="text-white">${{ (transaction?.expectedAmount ?? Math.abs(transaction?.amount || 0)).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between" v-if="transaction?.receivedAmount">
            <span class="text-gray-400">Recibido:</span>
            <span class="text-yellow-300">${{ transaction?.receivedAmount?.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Método:</span>
            <span class="text-white">QR {{ transaction?.cryptoSymbol?.toUpperCase() || '—' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400">Fecha:</span>
            <span class="text-white">{{ formatDate(transaction?.date) }}</span>
          </div>
          <div class="flex justify-between" v-if="transaction?.transactionId">
            <span class="text-gray-400">ID:</span>
            <span class="text-white">{{ transaction?.transactionId }}</span>
          </div>
        </div>
      </div>

      <!-- QR + contador para En espera / Parcial -->
      <div v-if="showPaymentSection" class="space-y-3">
        <div class="text-center text-sm text-gray-300">
          <span>Tienes</span>
          <span class="font-semibold text-white mx-1">{{ countdown }}</span>
          <span>para transferir el monto.</span>
        </div>

        <!-- QR -->
        <div class="w-full flex flex-col items-center">
          <div class="w-40 h-40 bg-white rounded-xl p-3 shadow mb-3">
            <div class="w-full h-full bg-gray-200 rounded flex items-center justify-center">
              <span class="text-gray-500 text-xs">QR Code</span>
            </div>
          </div>
          <div class="bg-[#2a2a2a] rounded-lg p-2 border border-gray-600 w-full">
            <div class="text-xs text-gray-300 font-mono break-all text-center leading-relaxed">{{ transaction?.address || '—' }}</div>
          </div>
          <button @click="copyAddress" class="mt-2 flex items-center gap-2 text-xs text-blue-300 hover:text-blue-200 border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 px-3 py-1.5 rounded-lg">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="currentColor"/>
            </svg>
            Copiar dirección
          </button>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <button @click="$emit('close')" class="flex-1 bg-white/15 hover:bg-white/25 text-white py-2.5 rounded-lg font-semibold transition">Cerrar</button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import Modal from './Modal.vue'

interface TxLike {
  title: string
  status: string
  amount: number
  expectedAmount?: number
  receivedAmount?: number
  cryptoSymbol?: string
  address?: string
  date: Date
  transactionId?: string
  startedAt?: Date
}

const props = defineProps<{ isOpen: boolean; transaction: TxLike | null }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const remaining = ref(0)
let timer: any = null

const showPaymentSection = computed(() => {
  const s = (props.transaction?.status || '').toLowerCase()
  return (s.includes('espera') || s.includes('parcial')) && !!props.transaction?.address
})

const statePath = computed(() => {
  const s = (props.transaction?.status || '').toLowerCase()
  if (s.includes('parcial')) return 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
  if (s.includes('fall')) return 'M6 18L18 6M6 6l12 12'
  if (s.includes('complet') || s.includes('exitos')) return 'M5 13l4 4L19 7'
  return 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
})

const stateIconClass = computed(() => {
  const s = (props.transaction?.status || '').toLowerCase()
  if (s.includes('parcial')) return 'text-yellow-300'
  if (s.includes('fall')) return 'text-red-400'
  if (s.includes('complet') || s.includes('exitos')) return 'text-green-400'
  return 'text-blue-300'
})

const stateBg = computed(() => {
  const s = (props.transaction?.status || '').toLowerCase()
  if (s.includes('parcial')) return 'bg-yellow-500/20'
  if (s.includes('fall')) return 'bg-red-500/20'
  if (s.includes('complet') || s.includes('exitos')) return 'bg-green-500/20'
  return 'bg-blue-500/20'
})

const formatDate = (d?: Date) => {
  if (!d) return '—'
  return new Date(d).toLocaleString('es-ES', {
    year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
  })
}

const countdown = computed(() => {
  const sec = Math.max(0, remaining.value)
  const m = Math.floor(sec / 60).toString().padStart(2, '0')
  const s = Math.floor(sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
})

const setupTimer = () => {
  clearInterval(timer)
  if (!props.transaction?.startedAt) return
  // 20 minutos desde el inicio
  const endAt = new Date(props.transaction.startedAt).getTime() + 20 * 60 * 1000
  const tick = () => {
    remaining.value = Math.max(0, Math.floor((endAt - Date.now()) / 1000))
    if (remaining.value <= 0) clearInterval(timer)
  }
  tick()
  timer = setInterval(tick, 1000)
}

watch(() => props.isOpen, (open) => {
  if (open) setupTimer()
  else clearInterval(timer)
})

watch(() => props.transaction?.startedAt, () => {
  if (props.isOpen) setupTimer()
})

onMounted(() => {
  if (props.isOpen) setupTimer()
})

onUnmounted(() => clearInterval(timer))

const copyAddress = async () => {
  try {
    if (!props.transaction?.address) return
    await navigator.clipboard.writeText(props.transaction.address)
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped>
</style>
