<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto" @click="closePopup">
    <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"></div>

      <!-- Modal -->
      <div
        class="inline-block align-bottom bg-[#1a1a1a] rounded-2xl border border-white/10 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"
        @click.stop
      >
        <!-- Content -->
        <div class="px-6 py-8">
          <!-- Status Icon -->
          <div class="flex justify-center mb-6">
            <!-- Success Icon -->
            <div v-if="status === 'success'" class="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            
            <!-- Pending Icon -->
            <div v-else-if="status === 'pending'" class="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-yellow-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            
            <!-- Error Icon -->
            <div v-else-if="status === 'error'" class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </div>
          </div>

          <!-- Status Title -->
          <div class="text-center mb-4">
            <h3 class="text-xl font-semibold text-white mb-2">
              {{ statusTitle }}
            </h3>
            <p class="text-gray-400 text-sm">
              {{ statusMessage }}
            </p>
          </div>

          <!-- Operation Details -->
          <div v-if="operationDetails" class="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
            <div class="text-sm text-gray-300 font-medium mb-3">Detalles de la operación:</div>
            <div class="space-y-2 text-xs text-gray-400">
              <div v-if="operationDetails.type" class="flex justify-between">
                <span>Tipo:</span>
                <span class="capitalize text-white">{{ operationTypeLabel }}</span>
              </div>
              <div v-if="operationDetails.amount" class="flex justify-between">
                <span>Monto:</span>
                <span class="text-white font-medium">${{ operationDetails.amount.toFixed(2) }}</span>
              </div>
              <div v-if="operationDetails.recipient" class="flex justify-between">
                <span>Destinatario:</span>
                <span class="text-white">{{ operationDetails.recipient }}</span>
              </div>
              <div v-if="operationDetails.cryptocurrency" class="flex justify-between">
                <span>Criptomoneda:</span>
                <span class="text-white uppercase">{{ operationDetails.cryptocurrency }}</span>
              </div>
              <div v-if="operationDetails.transactionId" class="flex justify-between">
                <span>ID Transacción:</span>
                <span class="text-white font-mono text-xs">{{ operationDetails.transactionId }}</span>
              </div>
              <div v-if="operationDetails.timestamp" class="flex justify-between">
                <span>Fecha:</span>
                <span class="text-white">{{ formatDate(operationDetails.timestamp) }}</span>
              </div>
            </div>
          </div>

          <!-- Additional Actions for Pending -->
          <div v-if="status === 'pending' && operationDetails?.type === 'deposit'" class="mb-6 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
            <div class="text-sm text-blue-300 font-medium mb-2">Esperando confirmación</div>
            <p class="text-xs text-gray-400 mb-3">
              Tu depósito está siendo procesado. Puedes verificar el estado de la transacción en la blockchain.
            </p>
            <button
              @click="checkTransactionStatus"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition duration-200"
            >
              Verificar Estado
            </button>
          </div>

          <!-- Progress Bar for Pending -->
          <div v-if="status === 'pending'" class="mb-6">
            <div class="flex justify-between text-xs text-gray-400 mb-2">
              <span>Progreso</span>
              <span>{{ progressPercentage }}%</span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-2">
              <div 
                class="bg-yellow-400 h-2 rounded-full transition-all duration-1000 ease-out"
                :style="{ width: `${progressPercentage}%` }"
              ></div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <!-- Primary Action -->
            <button
              v-if="primaryAction"
              @click="handlePrimaryAction"
              class="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold transition duration-200"
            >
              {{ primaryAction.label }}
            </button>
            
            <!-- Secondary Action / Close -->
            <button
              @click="closePopup"
              class="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded-lg font-semibold transition duration-200"
            >
              {{ status === 'pending' ? 'Cerrar' : 'Entendido' }}
            </button>
          </div>

          <!-- Error Details -->
          <div v-if="status === 'error' && errorDetails" class="mt-4 p-3 bg-red-900/20 border border-red-700/50 rounded-lg">
            <details class="text-xs">
              <summary class="text-red-300 cursor-pointer font-medium">Detalles del error</summary>
              <pre class="text-red-400 mt-2 whitespace-pre-wrap">{{ errorDetails }}</pre>
            </details>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface OperationDetails {
  type: 'deposit' | 'transfer'
  amount?: number
  recipient?: string
  cryptocurrency?: string
  transactionId?: string
  timestamp?: Date
}

interface PrimaryAction {
  label: string
  action: () => void
}

interface Props {
  isOpen: boolean
  status: 'success' | 'pending' | 'error'
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
      return props.operationDetails?.type === 'deposit'
        ? 'Tu depósito está siendo procesado. Te notificaremos cuando se confirme.'
        : 'Tu transferencia está siendo procesada.'
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