<template>
  <div class="min-h-screen relative">
    <!-- Banner como fondo -->
    <div class="fixed inset-0 z-0">
      <img 
        src="../assets/images/offer_phpqvu0b1h9ad7g92AMXgY_1760792874.webp" 
        alt="Soky Recargas - Recargas a Cuba"
        class="w-full h-full object-cover"
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
          description="700CUP + internet ilimitado 20 días"
          img="src/assets/images/offer_phpvs6t513o1seq2HjVWek_1759183674.webp"
          color="blue"
        />
    




         <FeatureCard
          title="Nauta hogar plus"
          description="Internet a mayor velocidad"
          img="src/assets/images/offer_phpvAETPl_1752334228.webp"
          color="blue"
        />
           <FeatureCard
          title="Recargas Rápidas"
          description="Recibe tu recarga al instante. Procesamiento en 2-5 minutos las 24 horas del día."
          img="src/assets/images/offer_phpsm6RzF_1750409890.webp"
          color="green"
        />
          <FeatureCard
          title="Recargas Rápidas"
          description="Recibe tu recarga al instante. Procesamiento en 2-5 minutos las 24 horas del día."
          img="src/assets/images/offer_phpsgr4K8_1754776835.webp"
          color="blue"
        />
             <FeatureCard
          title="Recargas Rápidas"
          description="Recibe tu recarga al instante. Procesamiento en 2-5 minutos las 24 horas del día."
          img="src/assets/images/offer_phph1je9vurekis8bYDwm3_1759729559.jpg"
          color="blue"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import FeatureCard from '@/components/Card.vue'
import { LightningIcon, ShieldIcon, CurrencyIcon, SupportIcon } from '@/components/icon'
</script>
<style src="../assets/home.css"></style>