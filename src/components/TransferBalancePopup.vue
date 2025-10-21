<template>
  <Modal :isOpen="isOpen" @close="closePopup">
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-white">Transferir Saldo</h3>
          <p class="text-purple-100 text-sm">Envía dinero a otro usuario</p>
        </div>
        <button @click="closePopup" class="text-white/80 hover:text-white transition-colors p-1">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
    </template>

    <div>
      <div class="mb-6">
        <label class="block text-sm text-gray-300 mb-2">Email del destinatario</label>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
          <input v-model="recipientEmail" type="email" placeholder="usuario@ejemplo.com" class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" :class="{ 'border-red-500': emailError }" />
        </div>
        <div v-if="emailError" class="text-red-400 text-xs mt-1">{{ emailError }}</div>
      </div>

      <div class="mb-6">
        <label class="block text-sm text-gray-300 mb-2">Monto a transferir</label>
        <div class="relative">
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
          <input v-model="transferAmount" type="number" step="0.01" min="1" :max="availableBalance" placeholder="0.00" class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500" :class="{ 'border-red-500': amountError }" />
        </div>
        <div class="flex justify-between items-center mt-1"><div v-if="amountError" class="text-red-400 text-xs">{{ amountError }}</div><div class="text-gray-500 text-xs ml-auto">Disponible: ${{ availableBalance.toFixed(2) }}</div></div>
      </div>

      <div class="mb-6">
        <div class="text-sm text-gray-300 mb-3">Montos rápidos:</div>
        <div class="grid grid-cols-4 gap-2">
          <button v-for="amount in quickAmounts" :key="amount" @click="setAmount(amount)" :disabled="amount > availableBalance" class="p-2 rounded-lg border border-gray-600 bg-gray-700/50 hover:border-purple-500 hover:bg-purple-500/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-white text-sm">${{ amount }}</button>
        </div>
      </div>

      <div class="mb-6">
        <label class="block text-sm text-gray-300 mb-2">Mensaje (opcional)</label>
        <textarea v-model="transferMessage" placeholder="Descripción de la transferencia..." rows="3" maxlength="200" class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"></textarea>
        <div class="text-gray-500 text-xs mt-1">{{ transferMessage.length }}/200</div>
      </div>

      <div v-if="isValidTransfer" class="mb-6 p-4 bg-purple-900/20 border border-purple-700/50 rounded-lg">
        <div class="text-sm text-purple-300 font-medium mb-2">Resumen de transferencia:</div>
        <div class="space-y-1 text-xs text-gray-300">
          <div class="flex justify-between"><span>Para:</span><span>{{ recipientEmail }}</span></div>
          <div class="flex justify-between"><span>Monto:</span><span class="font-medium">${{ transferAmount }}</span></div>
          <div class="flex justify-between"><span>Comisión:</span><span>${{ transferFee.toFixed(2) }}</span></div>
          <div class="border-t border-purple-700/30 pt-1 mt-2"><div class="flex justify-between font-medium"><span>Total a deducir:</span><span>${{ totalDeduction.toFixed(2) }}</span></div></div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex space-x-3">
        <button @click="initiateTransfer" :disabled="!isValidTransfer || isProcessing" class="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition duration-300">
          <span v-if="isProcessing" class="flex items-center justify-center space-x-2"><svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>Procesando...</span></span>
          <span v-else>Transferir ${{ transferAmount || 0 }}</span>
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Modal from './Modal.vue'

interface Props {
  isOpen: boolean
  availableBalance: number
}

interface Emits {
  close: []
  transferInitiated: [recipient: string, amount: number, message: string, fee: number]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const recipientEmail = ref('')
const transferAmount = ref<number | null>(null)
const transferMessage = ref('')
const isProcessing = ref(false)

const quickAmounts = computed(() => {
  const amounts = [10, 25, 50, 100]
  return amounts.filter(amount => amount <= props.availableBalance)
})

const emailError = computed(() => {
  if (!recipientEmail.value) return ''
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(recipientEmail.value) ? '' : 'Email inválido'
})

const amountError = computed(() => {
  if (!transferAmount.value) return ''
  if (transferAmount.value < 1) return 'Monto mínimo: $1.00'
  if (transferAmount.value > props.availableBalance) return 'Saldo insuficiente'
  return ''
})

const transferFee = computed(() => {
  if (!transferAmount.value) return 0
  // 2% de comisión, mínimo $0.50
  return Math.max(transferAmount.value * 0.02, 0.50)
})

const totalDeduction = computed(() => {
  return (transferAmount.value || 0) + transferFee.value
})

const isValidTransfer = computed(() => {
  return (
    recipientEmail.value &&
    !emailError.value &&
    transferAmount.value &&
    transferAmount.value > 0 &&
    !amountError.value &&
    totalDeduction.value <= props.availableBalance
  )
})

const setAmount = (amount: number) => {
  transferAmount.value = amount
}

const initiateTransfer = async () => {
  if (!isValidTransfer.value || isProcessing.value) return
  
  isProcessing.value = true
  
  try {
    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    emit('transferInitiated', 
      recipientEmail.value, 
      transferAmount.value!, 
      transferMessage.value, 
      transferFee.value
    )
    
    closePopup()
  } catch (error) {
    console.error('Transfer error:', error)
  } finally {
    isProcessing.value = false
  }
}

const closePopup = () => {
  recipientEmail.value = ''
  transferAmount.value = null
  transferMessage.value = ''
  isProcessing.value = false
  emit('close')
}
</script>

<style scoped>
input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>