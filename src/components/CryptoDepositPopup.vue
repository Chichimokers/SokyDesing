<template>
  <Modal :isOpen="isOpen" @close="closePopup">
    <template #header>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-white">Acreditar Saldo</h3>
          <p class="text-blue-100 text-sm">Selecciona tu criptomoneda</p>
          <!-- Badge del fee de NowPayments -->
          <div class="flex items-center gap-2 mt-2">
            <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Fee: 2.5% + $0.50 (NowPayments)
            </span>
          </div>
        </div>
        <button @click="closePopup" class="text-white/80 hover:text-white transition-colors p-1"><svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
      </div>
    </template>

    <div class="min-h-[400px] flex flex-col">
      <div v-if="currentStep === 1" class="space-y-3 max-w-md mx-auto w-full">
        <div v-for="crypto in supportedCryptos" :key="crypto.id">
          <button @click="selectCrypto(crypto)" class="w-full p-4 rounded-lg border border-gray-600 bg-gray-700/50 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 text-left">
            <div class="flex items-center space-x-4">
              <div class="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden">
                <img :src="crypto.icon" :alt="crypto.symbol" class="w-8 h-8">
              </div>
              <div class="flex-1">
                <div class="text-white font-medium">{{ crypto.name }}</div>
                <div class="text-gray-400 text-sm">{{ crypto.network }}</div>
              </div>
              <div class="text-gray-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div v-else-if="currentStep === 2" class="max-w-md mx-auto">
        <div class="mb-6">
          <label class="block text-sm text-gray-300 mb-2">Monto en USD</label>
          <div class="relative">
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
            <input v-model="depositAmount" type="number" step="0.01" min="10" max="1000" placeholder="100.00" class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div class="text-xs text-gray-500 mt-1">Mínimo: $10.00 - Máximo: $1,000.00</div>
        </div>

        <!-- Desglose del fee y total -->
        <div v-if="depositAmount && depositAmount > 0" class="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
          <div class="text-sm text-gray-300 mb-2">Resumen del pago:</div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Monto solicitado:</span>
              <span class="text-white">${{ depositAmount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Fee (2.5% + $0.50):</span>
              <span class="text-orange-400">+${{ feeAmount.toFixed(2) }}</span>
            </div>
            <div class="border-t border-gray-600 pt-2 flex justify-between font-medium">
              <span class="text-gray-300">Total a transferir:</span>
              <span class="text-green-400 text-lg">${{ totalAmount.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <div class="text-sm text-gray-300 mb-3">Montos populares:</div>
          <div class="grid grid-cols-4 gap-2">
            <button v-for="amount in popularAmounts" :key="amount" @click="setAmount(amount)" class="p-2 rounded-lg border border-gray-600 bg-gray-700/50 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 text-white text-sm">${{ amount }}</button>
          </div>
        </div>

        <button @click="generateQR" :disabled="!isValidAmount" class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition duration-300">Generar Código QR</button>
      </div>

      <div v-else-if="currentStep === 3" class="flex flex-col items-center text-center max-w-md mx-auto">
        <!-- QR Code Section -->
        <div class="mb-6 w-full">
          <div class="w-48 h-48 mx-auto bg-white rounded-xl p-4 mb-4 shadow-lg">
            <div class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
              <span class="text-gray-500 text-xs">QR Code</span>
            </div>
          </div>
          
          <div class="text-white font-medium mb-3 text-center">Dirección de {{ selectedCrypto?.name }}</div>
          
          <div class="bg-[#2a2a2a] rounded-lg p-3 mb-3 border border-gray-600 w-full">
            <div class="text-xs text-gray-300 font-mono break-all text-center">{{ generatedAddress }}</div>
          </div>
          
          <div class="flex justify-center">
            <button @click="copyAddress" class="flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 px-3 py-1.5 rounded-lg border" :class="copied ? 'text-green-400 border-green-500/30 bg-green-500/10' : 'text-blue-400 hover:text-blue-300 border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20'">
              <template v-if="!copied">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.5 16.5L19.5 4.5L18.75 3.75H9L8.25 4.5L8.25 7.5L5.25 7.5L4.5 8.25V20.25L5.25 21H15L15.75 20.25V17.25H18.75L19.5 16.5ZM15.75 15.75L15.75 8.25L15 7.5L9.75 7.5V5.25L18 5.25V15.75H15.75ZM6 9L14.25 9L14.25 19.5L6 19.5L6 9Z" fill="currentColor"/>
                </svg>
                Copiar dirección
              </template>
              <template v-else>
                <svg class="w-4 h-4 text-green-400 animate-check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                ¡Copiado!
              </template>
            </button>
          </div>
        </div>

        <!-- Important Information Section -->
        <div class="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-6 w-full">
          <div class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
            <div class="text-sm flex-1">
              <div class="text-yellow-300 font-medium mb-2 text-center">Importante:</div>
              
              <!-- Total Amount Box -->
              <div class="bg-gray-800/50 p-3 rounded-lg border border-gray-600 mb-3 text-center">
                <div class="text-xs text-gray-400 mb-1">Monto total a transferir:</div>
                <div class="text-lg font-bold text-green-400">${{ totalAmount.toFixed(2) }} USD</div>
                <div class="text-xs text-gray-400 mt-1">
                  (Incluye ${{ depositAmount?.toFixed(2) }} + ${{ feeAmount.toFixed(2) }} fee)
                </div>
              </div>
              
              <!-- Instructions List -->
              <ul class="text-yellow-200 space-y-1 text-xs text-left">
                <li>• Envía exactamente <span class="font-bold text-green-300">${{ totalAmount.toFixed(2) }} USD</span> en {{ selectedCrypto?.symbol }}</li>
                <li>• Red: {{ selectedCrypto?.network }}</li>
                <li>• Tu saldo se acreditará con ${{ depositAmount?.toFixed(2) }}</li>
                <li>• Tiempo estimado: 10-30 minutos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex space-x-3">
        <button v-if="currentStep !== 1" @click="goBack" class="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold transition duration-300">Atrás</button>
        <!-- Only show confirmation after QR generated (step 3) -->
        <button v-if="currentStep === 3" @click="confirmDeposit" class="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-300">Ya Envié</button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Modal from './Modal.vue'
// Importar iconos de criptomonedas
import usdtIcon from '@/assets/images/crypto/usdt.svg'
import usdcIcon from '@/assets/images/crypto/usdc.svg'
import btcIcon from '@/assets/images/crypto/btc.svg'
import ethIcon from '@/assets/images/crypto/eth.svg'
import bnbIcon from '@/assets/images/crypto/bnb.svg'

const copied = ref(false)
interface Crypto {
  id: string
  name: string
  symbol: string
  network: string
  bgColor: string
  textColor: string
  address: string
  icon: string
}

interface Props {
  isOpen: boolean
}

interface Emits {
  close: []
  depositInitiated: [cryptoSymbol: string, amount: number, address: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const currentStep = ref(1)
const selectedCrypto = ref<Crypto | null>(null)
const depositAmount = ref<number | null>(null)
const generatedAddress = ref('')

const popularAmounts = [25, 50, 100, 200]

const supportedCryptos: Crypto[] = [
  {
    id: 'usdt_bep20',
    name: 'Tether USDT',
    symbol: 'USDT',
    network: 'BEP-20 (BSC)',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
    address: '0x55d398326f99059fF775485246999027B3197955',
    icon: usdtIcon
  },
  {
    id: 'usdt_trc20',
    name: 'Tether USDT',
    symbol: 'USDT',
    network: 'TRC-20 (Tron)',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
    address: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE',
    icon: usdtIcon
  },
  {
    id: 'usdc_erc20',
    name: 'USD Coin',
    symbol: 'USDC',
    network: 'ERC-20 (Ethereum)',
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-400',
    address: '0x742d35Cc6486C5c9cC4b4b5E5f5A5FC3E0c1a543',
    icon: usdcIcon
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin Network',
    bgColor: 'bg-orange-500/20',
    textColor: 'text-orange-400',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    icon: btcIcon
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    network: 'Ethereum Network',
    bgColor: 'bg-purple-500/20',
    textColor: 'text-purple-400',
    address: '0x742d35Cc6486C5c9cC4b4b5E5f5A5FC3E0c1a543',
    icon: ethIcon
  }
]

const isValidAmount = computed(() => {
  return depositAmount.value && depositAmount.value >= 10 && depositAmount.value <= 1000
})

// Calcular fee y total
const feeAmount = computed(() => {
  if (!depositAmount.value) return 0
  return (depositAmount.value * 0.025) + 0.50 // 2.5% + $0.50
})

const totalAmount = computed(() => {
  if (!depositAmount.value) return 0
  return depositAmount.value + feeAmount.value
})

const selectCrypto = (crypto: Crypto) => {
  selectedCrypto.value = crypto
  currentStep.value = 2
}

const setAmount = (amount: number) => {
  depositAmount.value = amount
}

const generateQR = () => {
  if (!isValidAmount.value || !selectedCrypto.value) return
  
  generatedAddress.value = selectedCrypto.value.address
  currentStep.value = 3
}

const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const copyAddress = async () => {
  try {
    await navigator.clipboard.writeText(generatedAddress.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (error) {
    console.error('Error copiando dirección:', error)
  }
}

const confirmDeposit = () => {
  if (selectedCrypto.value && depositAmount.value) {
    // emit simple symbol + amount + address so Balance.vue can handle
    emit('depositInitiated', selectedCrypto.value.symbol, depositAmount.value, generatedAddress.value)
    closePopup()
  }
}

const closePopup = () => {
  currentStep.value = 1
  selectedCrypto.value = null
  depositAmount.value = null
  generatedAddress.value = ''
  emit('close')
}
</script>

<style scoped>
/* Estilos específicos para el popup de crypto */
input[type="number"] {
  appearance: textfield;
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
@keyframes drawCheck {
  0% {
    stroke-dasharray: 0 24;
    stroke-dashoffset: 24;
  }
  100% {
    stroke-dasharray: 24 24;
    stroke-dashoffset: 0;
  }
}

.animate-check path {
  animation: drawCheck 0.4s ease forwards;
}
</style>