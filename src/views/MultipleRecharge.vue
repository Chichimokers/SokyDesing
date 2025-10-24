<template>
  <div class="min-h-screen bg-[#0f0f0f] text-white relative">
    <!-- Banner como fondo -->
    <div class="fixed inset-0 z-0">
      <img 
        src="@/assets/images/offer_phpqvu0b1h9ad7g92AMXgY_1760792874.webp" 
        alt="Soky Recargas Background"
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
    </div>

    <!-- Contenido principal -->
    <div class="relative z-10">
      <div class="container mx-auto px-4 pt-28 md:pt-32 pb-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <button 
            @click="goBack"
            class="inline-flex items-center text-blue-400 hover:text-blue-300 mb-4 transition-colors"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Volver
          </button>
          <h1 class="text-3xl md:text-4xl font-bold mb-4">
            Finalizar <span class="animated-gradient">Recargas</span>
          </h1>
          <p class="text-lg text-gray-300 max-w-2xl mx-auto">
            Revisa y confirma tu recarga múltiple
          </p>
        </div>

        <!-- Resumen de la recarga -->
        <div class="max-w-4xl mx-auto">
          <div class="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-8">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-bold text-white">{{ selectedOfferData ? `${selectedOfferData.data} • ${selectedOfferData.minutes}` : '' }}</h3>
              <div class="text-right">
                <div class="text-2xl font-bold text-blue-400">${{ totalCost }} USDT</div>
                <div class="text-sm text-gray-400">{{ phoneNumberList.length }} números</div>
              </div>
            </div>

            <!-- Detalles del plan -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 class="font-semibold text-gray-300 mb-3">Plan seleccionado</h4>
                <div class="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-medium text-white">
                      {{ selectedOfferData?.data }} + {{ selectedOfferData?.minutes }} + {{ selectedOfferData?.sms }}
                    </span>
                    <span class="text-blue-400 font-bold">${{ selectedOfferData?.priceUSDT }} USDT</span>
                  </div>
                  <div class="text-xs text-gray-400">
                    Por número • {{ phoneNumberList.length }} × ${{ selectedOfferData?.priceUSDT }}
                  </div>
                </div>
              </div>

              <div>
                <h4 class="font-semibold text-gray-300 mb-3">Números a recargar</h4>
                <div class="space-y-2 max-h-40 overflow-y-auto">
                  <div 
                    v-for="(phone, index) in phoneNumberList" 
                    :key="index"
                    class="flex items-center space-x-2 p-2 bg-[#2a2a2a] rounded-lg"
                  >
                    <svg class="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-sm text-white">{{ formatPhoneDisplay(phone) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Email opcional -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-300 mb-2">
                Email (opcional)
              </label>
              <input
                v-model="email"
                type="email"
                placeholder="tu@email.com"
                class="w-full bg-[#2a2a2a] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
              <p class="text-xs text-gray-500 mt-1">Para recibir confirmación de las recargas</p>
            </div>

            <!-- Botón de procesar -->
            <button
              @click="startMultipleRecharge"
              :disabled="isProcessing"
              class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
            >
              <span v-if="isProcessing" class="flex items-center justify-center space-x-2">
                <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Procesando {{ currentProcessing }}/{{ phoneNumberList.length }}...</span>
              </span>
              <span v-else>
                Procesar {{ phoneNumberList.length }} recarga{{ phoneNumberList.length > 1 ? 's' : '' }} • ${{ totalCost }} USDT
              </span>
            </button>
          </div>

          <!-- Progreso de recargas -->
          <div v-if="rechargeResults.length > 0" class="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <h3 class="text-xl font-bold text-white mb-4">Progreso de recargas</h3>
            <div class="space-y-3">
              <div 
                v-for="(result, index) in rechargeResults" 
                :key="index"
                class="flex items-center justify-between p-3 rounded-lg"
                :class="{
                  'bg-green-500/10 border border-green-500/30': result.status === 'completed',
                  'bg-red-500/10 border border-red-500/30': result.status === 'error',
                  'bg-yellow-500/10 border border-yellow-500/30': result.status === 'processing'
                }"
              >
                <div class="flex items-center space-x-3">
                  <div class="flex-shrink-0">
                    <svg 
                      v-if="result.status === 'completed'"
                      class="w-5 h-5 text-green-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <svg 
                      v-else-if="result.status === 'error'"
                      class="w-5 h-5 text-red-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
                    </svg>
                    <svg 
                      v-else
                      class="animate-spin w-5 h-5 text-yellow-500" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                  <div>
                    <div class="text-white font-medium">{{ formatPhoneDisplay(result.phoneNumber) }}</div>
                    <div class="text-sm" :class="{
                      'text-green-400': result.status === 'completed',
                      'text-red-400': result.status === 'error',
                      'text-yellow-400': result.status === 'processing'
                    }">
                      {{ getStatusText(result.status) }}
                    </div>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-sm text-gray-400">${{ selectedOfferData?.priceUSDT }} USDT</div>
                  <div v-if="result.transactionId" class="text-xs text-gray-500">
                    ID: {{ result.transactionId.slice(-6) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Resumen final -->
            <div v-if="!isProcessing && rechargeResults.length === phoneNumberList.length" class="mt-6 pt-4 border-t border-gray-600">
              <div class="flex items-center justify-between">
                <div>
                  <span class="text-green-400 font-medium">
                    {{ completedRecharges }} exitosa{{ completedRecharges !== 1 ? 's' : '' }}
                  </span>
                  <span v-if="failedRecharges > 0" class="text-red-400 font-medium ml-4">
                    {{ failedRecharges }} fallida{{ failedRecharges !== 1 ? 's' : '' }}
                  </span>
                </div>
                <button 
                  @click="goToHome"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Finalizar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import Footer from '@/components/Footer.vue'
import {type RechargeOffer, useRecharge} from '@/composables/useRecharge'

interface RechargeResult {
  phoneNumber: string
  status: 'processing' | 'completed' | 'error'
  transactionId?: string
  timestamp: Date
}

const route = useRoute()
const router = useRouter()
const { processRecharge, pushToHistory } = useRecharge()

// Estados
const phoneNumberList = ref<string[]>([])
const selectedOfferData = ref<RechargeOffer | null>(null)
const email = ref('')
const isProcessing = ref(false)
const currentProcessing = ref(0)
const rechargeResults = ref<RechargeResult[]>([])

// Cargar datos de la ruta
onMounted(() => {
  try {
    if (route.params.phoneNumbers && route.params.offer) {
      phoneNumberList.value = JSON.parse(route.params.phoneNumbers as string)
      selectedOfferData.value = JSON.parse(route.params.offer as string)
    } else {
      // Si no hay parámetros, redirigir al home
      router.replace('/')
    }
  } catch (error) {
    console.error('Error parsing route params:', error)
    router.replace('/')
  }
})

// Computed properties
const totalCost = computed(() => {
  if (!selectedOfferData.value) return '0.00'
  return (selectedOfferData.value.priceUSDT * phoneNumberList.value.length).toFixed(2)
})

const completedRecharges = computed(() => 
  rechargeResults.value.filter(r => r.status === 'completed').length
)

const failedRecharges = computed(() => 
  rechargeResults.value.filter(r => r.status === 'error').length
)

// Métodos
const formatPhoneDisplay = (phone: string) => {
  if (phone.startsWith('+53')) {
    const digits = phone.slice(3)
    if (digits.length === 8) {
      return `+53 ${digits.slice(0, 4)} ${digits.slice(4)}`
    }
  } else if (phone.startsWith('53')) {
    const digits = phone.slice(2)
    if (digits.length === 8) {
      return `+53 ${digits.slice(0, 4)} ${digits.slice(4)}`
    }
  } else if (phone.length === 8) {
    return `+53 ${phone.slice(0, 4)} ${phone.slice(4)}`
  }
  return phone
}

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Recarga completada'
    case 'error':
      return 'Error en recarga'
    case 'processing':
      return 'Procesando...'
    default:
      return 'Pendiente'
  }
}

const startMultipleRecharge = async () => {
  if (!selectedOfferData.value || isProcessing.value) return
  
  isProcessing.value = true
  currentProcessing.value = 0
  rechargeResults.value = []

  // Procesar cada número secuencialmente
  for (let i = 0; i < phoneNumberList.value.length; i++) {
  const phone = phoneNumberList.value[i]
  if (!phone) continue
    currentProcessing.value = i + 1

    // Agregar resultado inicial como "procesando"
    const result: RechargeResult = {
      phoneNumber: phone,
      status: 'processing',
      timestamp: new Date()
    }
    rechargeResults.value.push(result)

    try {
      // Procesar recarga individual
      const transaction = await processRecharge(phone, email.value)
      
      // Simular tiempo de procesamiento (2-5 segundos)
      const processingTime = Math.random() * 3000 + 2000
      
      await new Promise(resolve => setTimeout(resolve, processingTime))

      // Actualizar resultado
  const success = Math.random() > 0.1
  result.status = success ? 'completed' : 'error'
  result.transactionId = transaction.id

      // history now updated by processRecharge when the transaction finalizes
      
    } catch (error) {
      console.error(`Error processing recharge for ${phone}:`, error)
      result.status = 'error'
      // Push failed transaction to history as well
      // history updated within processRecharge (if available); if process failed before creating transaction, we could add a manual failed entry here
    }

    // Pequeña pausa entre recargas
    if (i < phoneNumberList.value.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  isProcessing.value = false
  // Si todo terminó, redirigir al perfil para que el usuario vea el historial (mostrar primeras 3)
  await router.push({ name: 'Profile' })
}

const goBack = () => {
  router.go(-1)
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.animated-gradient {
  background: linear-gradient(
    45deg,
    #0056b3,
    #cf142b,
    #ffffff,
    #0056b3
  );
  background-size: 300% 300%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>