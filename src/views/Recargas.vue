<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
    <Navbar />

    <div class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto space-y-12">
        
        <!-- Encabezado -->
        <div class="text-center">
          <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 drop-shadow-lg">
            Recargas Disponibles
          </h1>
          <p class="text-white/70 mt-3 text-lg">
            Elige la mejor opción para tus seres queridos en Cuba
          </p>
        </div>

        <!-- Ofertas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <!-- Oferta 1 -->
          <div class="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-2xl font-bold text-white">INTERNET ILIMITADO</h3>
              <span class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-md">
                POPULAR
              </span>
            </div>
            <p class="text-white/60 mb-4">Del 1 al 31 de octubre</p>
            <div class="text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              700 CUP
            </div>
            <ul class="space-y-2 mb-6 text-white/80">
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 13l4 4L19 7" />
                </svg>
                Datos ilimitados 24h
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 13l4 4L19 7" />
                </svg>
                Válido por 20 días
              </li>
            </ul>
            <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-400/30 transform hover:scale-105">
              Seleccionar
            </button>
          </div>

          <!-- Oferta 2 -->
          <div class="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]">
            <h3 class="text-2xl font-bold mb-4 text-white">OFERTA ESPECIAL</h3>
            <p class="text-white/60 mb-4">Del 21 al 26 de cada mes</p>
            <div class="text-4xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-white">
              3000 CUP
            </div>
            <ul class="space-y-2 mb-6 text-white/80">
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 13l4 4L19 7" />
                </svg>
                Internet Ilimitado
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 13l4 4L19 7" />
                </svg>
                Llamadas y SMS incluidos
              </li>
            </ul>
            <button class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-green-400/30 transform hover:scale-105">
              Seleccionar
            </button>
          </div>
        </div>

        <!-- Ofertas Internacionales -->
        <div class="bg-black/40 backdrop-blur-md rounded-3xl p-10 border border-white/10 shadow-2xl">
          <h2 class="text-2xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            Ofertas Internacionales de Datos
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              v-for="(offer, index) in internationalOffers"
              :key="index"
              class="bg-white/5 border border-white/10 rounded-2xl p-6 text-center shadow-lg backdrop-blur-xl hover:bg-white/10 transition-all transform hover:scale-105"
            >
              <div class="text-3xl font-extrabold text-blue-300 mb-2">{{ offer.data }}</div>
              <div class="text-white/70 mb-1">{{ offer.minutes }}</div>
              <div class="text-gray-500 mb-5">{{ offer.sms }}</div>
              <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-blue-400/30">
                Comprar
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const internationalOffers = [
  { data: '9GB', minutes: '75 min', sms: '80 SMS' },
  { data: '14GB', minutes: '115 min', sms: '120 SMS' },
  { data: '20GB', minutes: '145 min', sms: '140 SMS' },
]
</script>

<style scoped>
/* Adaptado del estilo de Balance.vue */
.backdrop-blur-xl {
  backdrop-filter: blur(25px);
}

.bg-white\/5 {
  background-color: rgba(255, 255, 255, 0.05);
}

.hover\:bg-white\/10:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

button {
  transition: all 0.3s ease;
}

@supports (backdrop-filter: blur(20px)) {
  .bg-white\/5 {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
  }
}
</style>
