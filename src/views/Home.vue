<template>
  <div class="min-h-screen relative">
    <!-- Banner como fondo -->
    <div class="fixed inset-0 z-0">
      <img
        src="@/assets/images/offer_phpqvu0b1h9ad7g92AMXgY_1760792874.webp"
        alt="Soky Recargas - Recargas a Cuba"
        class="object-cover"
      >
      <!-- Overlay para mejor legibilidad -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
    </div>

    <!-- Contenido sobre el banner -->
    <div class="relative z-10">
      <Navbar />
      
      <!-- Hero Section con transparencia -->
      <section class="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div class="max-w-7xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Text Content con fondo semitransparente -->
          <div class="bg-black/50 backdrop-blur-md rounded-2xl p-8 border border-white/10">
            <h1 class="text-4xl md:text-6xl font-bold text-white mb-6">
                Recargas a 
                <span class="animated-gradient  ">Cuba</span> 
                <div class=" typewriter-cuba animated-gradient">al instante</div>
            </h1>
              <p class="text-xl text-gray-200 mb-8">
                La forma más rápida y segura de enviar recargas telefónicas a tus seres queridos en Cuba.
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <router-link 
                  to="/recargas" 
                  class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 text-center"
                >
                  Comenzar Recarga
                </router-link>
                <router-link 
                  to="/login" 
                  class="border border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition duration-300 text-center"
                >
                  Mi Cuenta
                </router-link>
              </div>
            </div>

            <!-- Stats Card con transparencia -->
            <div class="bg-black/50  backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div class="text-center mb-8">
                <div class="w-20 h-20 bg-blue-500/80 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">3,083</h3>
                <p class="text-gray-300">Clientes Satisfechos</p>
              </div>

              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <span class="text-gray-200">Recargas Completadas</span>
                  <span class="text-blue-300 font-semibold">1,250+</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <span class="text-gray-200">Tiempo Promedio</span>
                  <span class="text-green-300 font-semibold">2-5 min</span>
                </div>
                <div class="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                  <span class="text-gray-200">Soporte 24/7</span>
                  <span class="text-yellow-300 font-semibold">Activo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


<!-- Sección de Cartas -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
           <FeatureCard
          title="Recarga internacional"
          :description="`Desde ${minPrice} USDT - Recargas rápidas y seguras`"
          :img="bannerImage"
          :button-text="`Desde ${minPrice} USDT`"
          :offer="cardOffers.recharge"
          color="blue"
          @select="handleCardSelect"
        />
    
         <FeatureCard
          title="Nauta hogar plus"
          :description="`Desde ${minPrice} USDT - Internet a mayor velocidad`"
          :img="nautaImage"
          :button-text="`Desde ${minPrice} USDT`"
          :offer="cardOffers.nauta"
          color="blue"
          @select="handleCardSelect"
        />
        <FeatureCard
          title="Nauta Plus"
          :description="`Desde ${minPrice} USDT - Conexión rápida y estable`"
          :img="nautaPlusImage"
          :button-text="`Desde ${minPrice} USDT`"
          :offer="cardOffers.nauta_plus"
          color="green"
          @select="handleCardSelect"
        />
           <FeatureCard
          title="Planes de datos"
          :description="`Desde ${minPrice} USDT - Procesamiento en 2-5 minutos las 24 horas del día`"
          :img="dataImage"
          :button-text="`Desde ${minPrice} USDT`"
          :offer="cardOffers.data"
          color="green"
          @select="handleCardSelect"
        />
          <FeatureCard
          title="Ofertas especiales"
          :description="`Desde ${minPrice} USDT - Los mejores precios del mercado`"
          :img="specialImage"
          :button-text="`Desde ${minPrice} USDT`"
          :offer="cardOffers.special"
          color="blue"
          @select="handleCardSelect"
        />
             <FeatureCard
          title="Recargas múltiples"
          :description="`Desde ${minPrice} USDT - Hasta 5 números a la vez`"
          :img="multipleImage"
          :button-text="`Desde ${minPrice} USDT`"
          :offer="cardOffers.multiple"
          color="blue"
          @select="handleCardSelect"
        />

        </div>
      </div>
    </section>


    <!-- Features Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 bg-black/50 ">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-bold text-white text-center mb-12">
          ¿Por qué elegir <span class="text-blue-400">SokyRecargas</span>?
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-[#1f1f1f]/80 p-6 rounded-xl border border-gray-700 text-center">
            <div class="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Instantáneo</h3>
            <p class="text-gray-400">Recargas en 2-5 minutos las 24 horas del día</p>
          </div>

          <div class="bg-[#1f1f1f]/80 p-6 rounded-xl border border-gray-700 text-center">
            <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">100% Seguro</h3>
            <p class="text-gray-400">Transacciones protegidas y cifradas</p>
          </div>

          <div class="bg-[#1f1f1f]/80 p-6 rounded-xl border border-gray-700 text-center">
            <div class="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Soporte 24/7</h3>
            <p class="text-gray-400">Atención personalizada cuando la necesites</p>
          </div>
        </div>
      </div>
    </section>
   

    <Footer />
    
    <!-- Phone Number Popup -->
    <PhoneNumberPopup 
      :is-open="showPopup"
      :selected-offer="selectedOffer"
      @close="closePopup"
      @proceed="proceedToRecharge"
      @subscribe="proceedToRecharge"
    />
    <RechargeStatus
      :transaction="currentTransaction"
      @close="handleStatusClose"
      @retry="handleRetryFromHome"
    />
    </div>
  </div>
</template>

<script setup lang="ts">

import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import FeatureCard from '../components/Card.vue'
import PhoneNumberPopup from '../components/PhoneNumberPopup.vue'
import RechargeStatus from '../components/RechargeStatus.vue'
import { LightningIcon, ShieldIcon, CurrencyIcon, SupportIcon } from '../components/icon'
import { useRecharge, type RechargeOffer, type PhoneNumber } from '../composables/useRecharge'
import backgroundImage from '@/assets/images/offer_phpqvu0b1h9ad7g92AMXgY_1760792874.webp'
import bannerImage from '@/assets/images/offer_phpqvu0b1h9ad7g92AMXgY_1760792874.webp'
import rechargeImage from '@/assets/images/offer_phpqvu0b1h9ad7g92AMXgY_1760792874.webp'
import nautaImage from '@/assets/images/offer_phpvAETPl_1752334228.webp'
import nautaPlusImage from '@/assets/images/offer_phpvs6t513o1seq2HjVWek_1759183674.webp'
import dataImage from '@/assets/images/offer_phpsm6RzF_1750409890.webp'
import specialImage from '@/assets/images/offer_phpsgr4K8_1754776835.webp'
import multipleImage from '@/assets/images/offer_phph1je9vurekis8bYDwm3_1759729559.jpg'

const router = useRouter()
const { availableOffers, minPrice, selectOffer, resetTransaction, processRecharge, currentTransaction } = useRecharge()

// Estado del popup
const showPopup = ref(false)
const selectedOffer = ref<RechargeOffer | null>(null)

// Crear ofertas específicas para cada card
const cardOffers = computed(() => ({
  recharge: {
    id: 'recharge',
    title: 'Recarga internacional',
    data: '9GB',
    minutes: '75MIN', 
    sms: '80SMS',
    price: 20.50,
    priceUSDT: minPrice.value
  } as RechargeOffer,
  nauta: {
    id: 'nauta',
    title: 'Nauta hogar plus',
    data: '14GB',
    minutes: '0MIN',
    sms: '0SMS', 
    price: 30.50,
    priceUSDT: minPrice.value
  } as RechargeOffer,
  nauta_plus: {
    id: 'nauta_plus',
    title: 'Nauta Plus',
    data: '7GB',
    minutes: '0MIN',
    sms: '0SMS', 
    price: 18.50,
    priceUSDT: minPrice.value
  } as RechargeOffer,
  data: {
    id: 'data',
    title: 'Planes de datos',
    data: '20GB',
    minutes: '165MIN',
    sms: '160SMS',
    price: 40.50,
    priceUSDT: minPrice.value
  } as RechargeOffer,
  special: {
    id: 'special',
    title: 'Ofertas especiales',
    data: '2MB',
    minutes: '0MIN',
    sms: '0SMS',
    price: 21.50,
    priceUSDT: minPrice.value
  } as RechargeOffer,
  multiple: {
    id: 'multiple',
    title: 'Recargas múltiples',
    data: '9GB',
    minutes: '75MIN',
    sms: '80SMS', 
    price: 20.50,
    priceUSDT: minPrice.value
  } as RechargeOffer
}))

const handleCardSelect = (offer: RechargeOffer | null) => {
  if (offer) {
    selectedOffer.value = offer
    showPopup.value = true
    resetTransaction() // Reset any previous transaction state
  }
}

const closePopup = () => {
  showPopup.value = false
  selectedOffer.value = null
}

const navigationPending = ref<null | { name: string }>(null)

const proceedToRecharge = async (phoneNumbers: PhoneNumber[], offer: RechargeOffer, email?: string, selectedPlan?: any, autoRenewal?: boolean) => {
  // Seleccionar la oferta globalmente
  selectOffer(offer)
  closePopup()

  // Determinar si es una suscripción o recarga normal
  const isSubscription = offer.id === 'nauta' || offer.id === 'nauta_plus'
  
  if (isSubscription && phoneNumbers.length > 0) {
    // Para suscripciones, procesar una vez y mostrar confirmación específica
    const primaryPhone = phoneNumbers[0] // Tomar el primer número para suscripciones
    
    if (primaryPhone) {
      // Crear transacción con información del plan seleccionado
      const enrichedOffer = {
        ...offer,
        selectedPlan: selectedPlan,
        autoRenewal: autoRenewal,
        priceUSDT: selectedPlan?.price || selectedPlan?.priceUSDT || offer.priceUSDT
      }
      
      await processRecharge(primaryPhone.number, email || '')
      // Defer navigation until user closes the status popup
      navigationPending.value = { name: 'Subscriptions' }
    }
  } else {
    // Para recargas normales, procesar secuencialmente todos los números
    for (const p of phoneNumbers) {
      await processRecharge(p.number, email || '')
      // pequeña pausa para que el usuario perciba la transición si lo desea
      await new Promise(resolve => setTimeout(resolve, 400))
    }
    // Después de procesar todo, defer navigation until user closes status popup
    navigationPending.value = { name: 'Profile' }
  }
}

const handleRetryFromHome = async (tx: any) => {
  resetTransaction()
  setTimeout(() => {
    processRecharge(tx.phoneNumber, tx.email || '')
  }, 500)
}

const handleStatusClose = () => {
  // Clear composable transaction state
  resetTransaction()
  // If a navigation was deferred, perform it now
  if (navigationPending.value) {
    router.push(navigationPending.value)
    navigationPending.value = null
  }
}
import '@/assets/home.css'
</script>

<style scoped>
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