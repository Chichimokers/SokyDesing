<template>
  <Modal :isOpen="isOpen" @close="closePopup">
    <template #header>
    <div class="flex items-center justify-center">
      <div v-if="status === 'success'" class="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
        <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        </svg>
      </div>
        <div v-else-if="status === 'pending'" class="w-14 h-14 bg-yellow-500/20 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-yellow-400 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
        <div v-else-if="status === 'partial'" class="w-14 h-14 bg-orange-500/20 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"/>
          </svg>
        </div>
        <div v-else-if="status === 'error'" class="w-14 h-14 bg-red-500/20 rounded-full flex items-center justify-center">
          <svg class="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </div>
      </div>
    </template>

    <div>
      <div class="text-center mb-4">
        <h3 class="text-xl font-semibold text-white mb-2">{{ statusTitle }}</h3>
        <p class="text-gray-400 text-sm">{{ statusMessage }}</p>
      </div>

      <div v-if="operationDetails" class="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
        <div class="text-sm text-gray-300 font-medium mb-3">Detalles de la operación:</div>
  <div class="grid grid-cols-2 gap-y-2 text-xs text-gray-400">
          <template v-if="operationDetails.type">
            <div class="text-gray-300">Tipo:</div>
            <div class="text-white capitalize">{{ operationTypeLabel }}</div>
          </template>
          <template v-if="operationDetails.amount">
            <div class="text-gray-300">Monto:</div>
            <div class="text-white font-medium">${{ operationDetails.amount.toFixed(2) }}</div>
          </template>
          <template v-if="operationDetails.recipient">
            <div class="text-gray-300">Destinatario:</div>
            <div class="text-white">{{ operationDetails.recipient }}</div>
          </template>
          <template v-if="operationDetails.cryptocurrency">
            <div class="text-gray-300">Criptomoneda:</div>
            <div class="text-white uppercase">{{ operationDetails.cryptocurrency }}</div>
          </template>
          <template v-if="operationDetails.transactionId">
            <div class="text-gray-300">ID Transacción:</div>
            <div class="text-white font-mono text-xs">{{ operationDetails.transactionId }}</div>
          </template>
          <template v-if="operationDetails.receivedAmount !== undefined">
            <div class="text-gray-300">Recibido:</div>
            <div class="text-orange-400 font-medium">${{ operationDetails.receivedAmount?.toFixed(2) }}</div>
          </template>
          <template v-if="operationDetails.timestamp">
            <div class="text-gray-300">Fecha:</div>
            <div class="text-white">{{ formatDate(operationDetails.timestamp) }}</div>
          </template>
        </div>
      </div>

      <div v-if="status === 'pending' && operationDetails?.type === 'deposit'" class="mb-6 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
        <div class="text-sm text-blue-300 font-medium mb-2">Esperando confirmación</div>
        <p class="text-xs text-gray-400 mb-3">Tu depósito está siendo procesado. Puedes verificar el estado de la transacción en la blockchain.</p>
        <button @click="checkTransactionStatus" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-200">Verificar Estado</button>
      </div>

      <div v-if="status === 'pending'" class="mb-6">
        <div class="flex justify-between text-xs text-gray-400 mb-2"><span>Progreso</span><span>{{ progressPercentage }}%</span></div>
        <div class="w-full bg-gray-700 rounded-full h-2"><div class="bg-yellow-400 h-2 rounded-full transition-all duration-1000 ease-out" :style="{ width: `${progressPercentage}%` }"></div></div>
      </div>

      <div v-if="status === 'error' && errorDetails" class="mt-4 p-3 bg-red-900/20 border border-red-700/50 rounded-lg">
        <details class="text-xs"><summary class="text-red-300 cursor-pointer font-medium">Detalles del error</summary><pre class="text-red-400 mt-2 whitespace-pre-wrap">{{ errorDetails }}</pre></details>
      </div>
    </div>

    <template #footer>
      <div class="flex space-x-3">
        <button v-if="primaryAction" @click="handlePrimaryAction" class="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition duration-200">{{ primaryAction.label }}</button>
        <button @click="closePopup" class="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-200">{{ status === 'pending' ? 'Cerrar' : 'Entendido' }}</button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from './Modal.vue'
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface OperationDetails {
  type: 'deposit' | 'transfer'
  amount?: number
  recipient?: string
  cryptocurrency?: string
  transactionId?: string
  timestamp?: Date
  receivedAmount?: number
}

interface PrimaryAction {
  label: string
  action: () => void
}

interface Props {
  isOpen: boolean
  status: 'success' | 'pending' | 'error' | 'partial'
  operationDetails?: OperationDetails
  errorDetails?: string
  primaryAction?: PrimaryAction
}

interface Emits {
  close: []
  statusChecked: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const progressPercentage = ref(0)
let progressInterval: ReturnType<typeof setInterval> | null = null;

const statusTitle = computed(() => {
  switch (props.status) {
    case 'success':
      return props.operationDetails?.type === 'deposit' ? 'Depósito Exitoso' : 'Transferencia Exitosa'
    case 'pending':
      return props.operationDetails?.type === 'deposit' ? 'Procesando Depósito' : 'Procesando Transferencia'
    case 'partial':
      return 'Acreditación Parcial'
    case 'error':
      return props.operationDetails?.type === 'deposit' ? 'Error en Depósito' : 'Error en Transferencia'
    default:
      return 'Estado Desconocido'
  }
})

const statusMessage = computed(() => {
  switch (props.status) {
    case 'success':
      return props.operationDetails?.type === 'deposit' 
        ? 'Tu depósito ha sido confirmado y tu saldo ha sido actualizado.'
        : 'La transferencia se ha completado exitosamente.'
    case 'pending':
      return 'Esperando confirmación de tu pago…'
    case 'partial':
      return 'El monto enviado no coincide con el total esperado. Tu pago se registró como parcial.'
    case 'error':
      return 'Ha ocurrido un error durante la operación. Por favor, inténtalo de nuevo.'
    default:
      return ''
  }
})

const operationTypeLabel = computed(() => {
  switch (props.operationDetails?.type) {
    case 'deposit':
      return 'Depósito'
    case 'transfer':
      return 'Transferencia'
    default:
      return ''
  }
})

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const checkTransactionStatus = () => {
  // Simular verificación de estado
  emit('statusChecked')
}

const handlePrimaryAction = () => {
  if (props.primaryAction) {
    props.primaryAction.action()
  }
}

const closePopup = () => {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
  progressPercentage.value = 0
  emit('close')
}

const startProgressAnimation = () => {
  if (props.status === 'pending') {
    progressPercentage.value = 0
    progressInterval = setInterval(() => {
      if (progressPercentage.value < 90) {
        progressPercentage.value += Math.random() * 10
      }
    }, 1000)
  }
}


onMounted(() => {
  if (props.isOpen && props.status === 'pending') {
    startProgressAnimation()
  }
})

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval)
  }
})
</script>

<style scoped>
details summary::-webkit-details-marker {
  display: none;
}

details summary::marker {
  content: '';
}

details summary:before {
  content: '▶';
  display: inline-block;
  margin-right: 0.5rem;
  transition: transform 0.2s;
}

details[open] summary:before {
  transform: rotate(90deg);
}
</style>