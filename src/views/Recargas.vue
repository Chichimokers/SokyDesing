<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
    <Navbar />
    
    <div class="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            Recargas Disponibles
          </h1>
          <p class="text-xl text-gray-300">
            Elige la mejor opción para tus seres queridos en Cuba
          </p>
        </div>

        <!-- Ofertas Destacadas -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <!-- Oferta 1 -->
          <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-2xl font-bold">INTERNET ILIMITADO</h3>
              <span class="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                POPULAR
              </span>
            </div>
            <p class="text-blue-100 mb-4">Del 1 al 31 de octubre</p>
            <div class="text-3xl font-bold mb-2">700 CUP</div>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Datos ilimitados 24h
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Válido por 20 días
              </li>
            </ul>
            <button class="w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Seleccionar
            </button>
          </div>

          <!-- Oferta 2 -->
          <div class="bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl p-8 text-white">
            <h3 class="text-2xl font-bold mb-4">OFERTA ESPECIAL</h3>
            <p class="text-green-100 mb-4">Del 21 al 26 de cada mes</p>
            <div class="text-3xl font-bold mb-2">3000 CUP</div>
            <ul class="space-y-2 mb-6">
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Internet Ilimitado
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                Llamadas y SMS incluidos
              </li>
            </ul>
            <button class="w-full bg-white text-green-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Seleccionar
            </button>
          </div>
        </div>

        <!-- Ofertas Internacionales -->
        <div class="bg-[#1f1f1f]/80 rounded-2xl p-8 border border-gray-700">
          <h2 class="text-2xl font-bold text-white mb-6 text-center">
            Ofertas Internacionales de Datos
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="(offer, index) in internationalOffers" :key="index" 
                 class="bg-gray-800/50 p-6 rounded-xl text-center border border-gray-600">
              <div class="text-2xl font-bold text-blue-400 mb-2">{{ offer.data }}</div>
              <div class="text-white mb-1">{{ offer.minutes }} minutos</div>
              <div class="text-gray-300 mb-4">{{ offer.sms }} SMS</div>
              <button class="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
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
  { data: '20GB', minutes: '145 min', sms: '140 SMS' }
]
</script>