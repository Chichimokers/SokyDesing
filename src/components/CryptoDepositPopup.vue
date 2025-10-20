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
        <!-- Paso 1: Seleccionar Criptomoneda -->
        <div v-if="currentStep === 1">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-white">Acreditar Saldo</h3>
                <p class="text-blue-100 text-sm">Selecciona tu criptomoneda</p>
              </div>
              <button @click="closePopup" class="text-white/80 hover:text-white transition-colors p-1">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="px-6 py-6">
            <div class="space-y-3">
              <button
                v-for="crypto in supportedCryptos"
                :key="crypto.id"
                @click="selectCrypto(crypto)"
                class="w-full p-4 rounded-lg border border-gray-600 bg-gray-700/50 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 text-left"
              >
                <div class="flex items-center space-x-4">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center" :class="crypto.bgColor">
                    <span class="text-lg font-bold" :class="crypto.textColor">{{ crypto.symbol }}</span>
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
        </div>

        <!-- Paso 2: Seleccionar Monto -->
        <div v-else-if="currentStep === 2">
          <!-- Header -->
          <div class="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-white">Monto a Acreditar</h3>
                <p class="text-blue-100 text-sm">{{ selectedCrypto?.name }}</p>
              </div>
              <button @click="goBack" class="text-white/80 hover:text-white transition-colors p-1">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="px-6 py-6">
            <!-- Monto Input -->
            <div class="mb-6">
              <label class="block text-sm text-gray-300 mb-2">Monto en USD</label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                <input
                  v-model="depositAmount"
                  type="number"
                  step="0.01"
                  min="10"
                  max="1000"
                  placeholder="100.00"
                  class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg pl-8 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="text-xs text-gray-500 mt-1">Mínimo: $10.00 - Máximo: $1,000.00</div>
            </div>

            <!-- Montos predefinidos -->
            <div class="mb-6">
              <div class="text-sm text-gray-300 mb-3">Montos populares:</div>
              <div class="grid grid-cols-4 gap-2">
                <button
                  v-for="amount in popularAmounts"
                  :key="amount"
                  @click="setAmount(amount)"
                  class="p-2 rounded-lg border border-gray-600 bg-gray-700/50 hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200 text-white text-sm"
                >
                  ${{ amount }}
                </button>
              </div>
            </div>

            <!-- Botón continuar -->
            <button
              @click="generateQR"
              :disabled="!isValidAmount"
              class="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Generar Código QR
            </button>
          </div>
        </div>

        <!-- Paso 3: Mostrar QR -->
        <div v-else-if="currentStep === 3">
          <!-- Header -->
          <div class="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold text-white">Envía {{ selectedCrypto?.symbol }}</h3>
                <p class="text-green-100 text-sm">${{ depositAmount }} USD</p>
              </div>
              <button @click="closePopup" class="text-white/80 hover:text-white transition-colors p-1">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="px-6 py-6 text-center">
            <!-- QR Code -->
            <div class="mb-6">
              <div class="w-48 h-48 mx-auto bg-white rounded-lg p-4 mb-4">
                <div class="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                  <span class="text-gray-500 text-xs">QR Code</span>
                </div>
              </div>
              <div class="text-white font-medium mb-2">Dirección de {{ selectedCrypto?.name }}</div>
              <div class="bg-[#2a2a2a] rounded-lg p-3 mb-2">
                <div class="text-xs text-gray-300 font-mono break-all">{{ generatedAddress }}</div>
              </div>
              <button
                @click="copyAddress"
                class="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
              >
                📋 Copiar dirección
              </button>
            </div>

            <!-- Información importante -->
            <div class="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-4 mb-6">
              <div class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                </svg>
                <div class="text-sm">
                  <div class="text-yellow-300 font-medium mb-1">Importante:</div>
                  <ul class="text-yellow-200 space-y-1 text-xs">
                    <li>• Envía exactamente ${{ depositAmount }} USD en {{ selectedCrypto?.symbol }}</li>
                    <li>• Red: {{ selectedCrypto?.network }}</li>
                    <li>• El saldo se acreditará automáticamente</li>
                    <li>• Tiempo estimado: 10-30 minutos</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Botones -->
            <div class="flex space-x-3">
              <button
                @click="goBack"
                class="flex-1 bg-gray-600 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold transition duration-300"
              >
                Atrás
              </button>
              <button
                @click="confirmDeposit"
                class="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition duration-300"
              >
                Ya Envié
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Crypto {
  id: string
  name: string
  symbol: string
  network: string
  bgColor: string
  textColor: string
  address: string
}

interface Props {
  isOpen: boolean
}

interface Emits {
  close: []
  depositConfirmed: [crypto: Crypto, amount: number, address: string]
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
    id: 'usdt_trc20',
    name: 'Tether USDT',
    symbol: 'USDT',
    network: 'TRC-20 (Tron)',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
    address: 'TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE'
  },
  {
    id: 'usdc_erc20',
    name: 'USD Coin',
    symbol: 'USDC',
    network: 'ERC-20 (Ethereum)',
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-400',
    address: '0x742d35Cc6486C5c9cC4b4b5E5f5A5FC3E0c1a543'
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin Network',
    bgColor: 'bg-orange-500/20',
    textColor: 'text-orange-400',
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh'
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    network: 'Ethereum Network',
    bgColor: 'bg-purple-500/20',
    textColor: 'text-purple-400',
    address: '0x742d35Cc6486C5c9cC4b4b5E5f5A5FC3E0c1a543'
  }
]

const isValidAmount = computed(() => {
  return depositAmount.value && depositAmount.value >= 10 && depositAmount.value <= 1000
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
    // Podrías mostrar una notificación aquí
  } catch (err) {
    console.error('Error copying address:', err)
  }
}

const confirmDeposit = () => {
  if (selectedCrypto.value && depositAmount.value) {
    emit('depositConfirmed', selectedCrypto.value, depositAmount.value, generatedAddress.value)
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
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>