<template>
  <div class="min-h-screen bg-[#0f0f0f] text-white relative overflow-hidden">
    <!-- Fondo estático sin recortes (contain) con relleno blur -->
    <div class="home-background-container">
      <!-- Capa base desenfocada para rellenar bordes -->
      <img 
        :src="backgroundImage" 
        alt="Soky Recargas Background blur"
        class="home-background-blur"
      >
      <!-- Imagen nítida completa sin recortes -->
      <img 
        :src="backgroundImage" 
        alt="Soky Recargas Background"
        class="home-background-image"
      >
      <!-- Overlay para mejor legibilidad -->
      <div class="home-background-overlay"></div>
    </div>

    <!-- Contenido principal -->
    <div class="relative z-10">
      <Navbar />
      
      <div class="container mx-auto px-4 py-8">
        <!-- Header -->
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold mb-4">
            Recargas a <span class="animated-gradient">Cuba</span>
          </h1>
          <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Envía recargas telefónicas a tus seres queridos de forma rápida y segura
          </p>
        </div>

        <!-- Progreso del proceso -->
        <div class="max-w-4xl mx-auto mb-12">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                :class="{
                  'bg-blue-500 text-white': currentStep >= 1,
                  'bg-gray-600 text-gray-400': currentStep < 1
                }"
              >
                1
              </div>
              <span class="text-sm font-medium" :class="currentStep >= 1 ? 'text-white' : 'text-gray-400'">
                Números
              </span>
            </div>
            
            <div class="flex-1 h-0.5 mx-4" :class="currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-600'"></div>
            
            <div class="flex items-center space-x-2">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                :class="{
                  'bg-blue-500 text-white': currentStep >= 2,
                  'bg-gray-600 text-gray-400': currentStep < 2
                }"
              >
                2
              </div>
              <span class="text-sm font-medium" :class="currentStep >= 2 ? 'text-white' : 'text-gray-400'">
                Plan
              </span>
            </div>
            
            <div class="flex-1 h-0.5 mx-4" :class="currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-600'"></div>
            
            <div class="flex items-center space-x-2">
              <div 
                class="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                :class="{
                  'bg-blue-500 text-white': currentStep >= 3,
                  'bg-gray-600 text-gray-400': currentStep < 3
                }"
              >
                3
              </div>
              <span class="text-sm font-medium" :class="currentStep >= 3 ? 'text-white' : 'text-gray-400'">
                Procesar
              </span>
            </div>
          </div>
        </div>

        <!-- Contenido por pasos -->
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <!-- Paso 1: Gestión de números -->
            <div class="order-1">
              <PhoneNumberManager
                :phone-numbers="phoneNumbers"
                :validate-phone="validateCubanPhone"
                @add-phone="addPhoneNumber"
                @remove-phone="removePhoneNumber"
              />
            </div>

            <!-- Paso 2: Selección de plan -->
            <div class="order-2">
              <PlanSelector
                :offers="availableOffers"
                :selected-offer="selectedOffer"
                @select-offer="selectOffer"
              />
            </div>
          </div>

          <!-- Resumen y botón de procesar -->
          <div v-if="validPhoneNumbers.length > 0 && selectedOffer" class="mt-8">
            <div class="bg-black/50 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <h3 class="text-xl font-bold text-white mb-4">Resumen de la recarga</h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <!-- Números válidos -->
                <div>
                  <h4 class="font-semibold text-gray-300 mb-2">Números a recargar ({{ validPhoneNumbers.length }})</h4>
                  <div class="space-y-2">
                    <div 
                      v-for="phone in validPhoneNumbers" 
                      :key="phone.id"
                      class="flex items-center space-x-2 p-2 bg-[#2a2a2a] rounded-lg"
                    >
                      <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      <span class="text-sm text-white">{{ formatPhoneDisplay(phone.number) }}</span>
                    </div>
                  </div>
                </div>

                <!-- Detalles del plan -->
                <div>
                  <h4 class="font-semibold text-gray-300 mb-2">Plan seleccionado</h4>
                  <div class="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div class="flex items-center justify-between mb-2">
                      <span class="font-medium text-white">{{ selectedOffer.data }} + {{ selectedOffer.minutes }} + {{ selectedOffer.sms }}</span>
                      <span class="text-blue-400 font-bold">${{ selectedOffer.priceUSDT }} USDT</span>
                    </div>
                    <div class="text-xs text-gray-400">
                      Por número • Total: ${{ (selectedOffer.priceUSDT * validPhoneNumbers.length).toFixed(2) }} USDT
                    </div>
                  </div>
                </div>
              </div>

        
             

              <!-- Botón de procesar -->
              <button
                @click="startRechargeProcess"
                :disabled="!canProcess || isProcessing"
                class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
              >
                <span v-if="isProcessing" class="flex items-center justify-center space-x-2">
                  <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Procesando...</span>
                </span>
                <span v-else>
                  Procesar {{ validPhoneNumbers.length }} recarga{{ validPhoneNumbers.length > 1 ? 's' : '' }} • ${{ totalCost }} USDT
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>

    <!-- Modal de estado de recarga -->
    <RechargeStatus
      :transaction="currentTransaction"
      @close="handleCloseRechargeStatus"
      @retry="handleRetry"
    />


  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PhoneNumberManager from '@/components/PhoneNumberManager.vue'
import PlanSelector from '@/components/PlanSelector.vue'
import RechargeStatus from '@/components/RechargeStatus.vue'
import { useRecharge } from '@/composables/useRecharge'
import backgroundImage from '@/assets/images/offer_phpqvu0b1h9ad7g92AMXgY_1760792874.webp'

const router = useRouter()

const {
  phoneNumbers,
  selectedOffer,
  currentTransaction,
  email,
  availableOffers,
  canProcess,
  addPhoneNumber,
  removePhoneNumber,
  selectOffer,
  processRecharge,
  validateCubanPhone,
  resetTransaction
} = useRecharge()

const isProcessing = ref(false)

// Estados calculados
const validPhoneNumbers = computed(() => 
  phoneNumbers.value.filter(phone => phone.isValid)
)

const totalCost = computed(() => {
  if (!selectedOffer.value) return 0
  return (selectedOffer.value.priceUSDT * validPhoneNumbers.value.length).toFixed(2)
})

const currentStep = computed(() => {
  if (validPhoneNumbers.value.length === 0) return 1
  if (!selectedOffer.value) return 2
  return 3
})

// Formatear número para mostrar
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

// Procesar todas las recargas
const startRechargeProcess = async () => {
  if (!canProcess.value || isProcessing.value) return
  
  isProcessing.value = true
  
  try {
    // Procesar la primera recarga (para el ejemplo, solo una)
    const firstPhone = validPhoneNumbers.value[0]
    if (!firstPhone) {
      console.warn('No hay números válidos para procesar')
      return
    }

    const transaction = await processRecharge(firstPhone.number, email.value)
    
    // Tu popup original ya maneja el resultado
    // No agregamos nada más aquí
    
  } catch (error) {
    console.error('Error processing recharge:', error)
  } finally {
    isProcessing.value = false
  }
}

// Manejar reintento
const handleRetry = async (transaction: any) => {
  resetTransaction()
  // Pequeña pausa para que se vea la transición
  setTimeout(() => {
    startRechargeProcess()
  }, 500)
}

// Manejar cierre del popup de estado de recarga
const handleCloseRechargeStatus = () => {
  // Si la transacción fue exitosa, redirigir a profile
  if (currentTransaction.value?.status === 'completed') {
    resetTransaction()
    router.push('/profile')
  } else {
    // Para otros estados (error, etc.), solo resetear
    resetTransaction()
  }
}



// Watch para actualizar el paso actual
watch([validPhoneNumbers, selectedOffer], () => {
  // Lógica adicional si es necesaria
})
</script>


<style scoped>
/* Estilos adicionales específicos para Recargas */
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

/* Optimizaciones para evitar saltos en el background */
.min-h-screen {
  /* Forzar aceleración por hardware */
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Estabilizar imagen de fondo */
img {
  /* Evitar re-rendering innecesario */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  /* Forzar GPU */
  transform: translate3d(0, 0, 0);
  will-change: transform;
}

/* Optimizar overlays */
.bg-black\/40,
.bg-black\/60 {
  /* Usar compositing optimizado */
  transform: translateZ(0);
  will-change: auto;
}

/* Prevenir layout shifts */
.fixed {
  contain: layout style paint;
}
</style>

<style src="@/assets/home.css"></style>