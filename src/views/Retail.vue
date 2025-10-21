<template>
  <div class="min-h-screen bg-gray-900">
    <Navbar />
    
    <!-- Retail Plan Section -->
    <div class="pt-28 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Plan Retail</h1>
          <p class="text-gray-400">¡Soky Recargas te invita a ser parte de nuestro Plan Retail!</p>
        </div>

        <!-- Invitation Banner -->
        <div class="mb-8">
          <div class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
            <div class="flex items-center gap-4">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-white mb-2">Únete a Nuestro Programa de Revendedores</h2>
                <p class="text-gray-300">Estamos en búsqueda de revendedores. Con nuestro Plan Retail, tendrás acceso a precios exclusivos.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pricing Rule Section -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Regla de Venta al Por Mayor
          </h2>
          
          <div class="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-yellow-400/30 shadow-2xl">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-yellow-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-white text-lg leading-relaxed">
                 
                  es necesario realizar un depósito mínimo de <span class="font-bold text-green-400">100 USDT</span> 
                  en nuestra web cada vez que desees recargar saldo en tu cuenta.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Services with Discounts -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            Servicios Disponibles con Descuento
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-blue-500/30 transition-all duration-300">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-bold">Recargas internacionales</h3>
                  <p class="text-gray-400 text-sm">Todas las operadoras mundiales</p>
                </div>
              </div>
            </div>
            
            <div class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-green-500/30 transition-all duration-300">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-bold">Nauta Plus</h3>
                  <p class="text-gray-400 text-sm">Navegación premium en Cuba</p>
                </div>
              </div>
            </div>
            
            <div class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-purple-500/30 transition-all duration-300">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-bold">Nauta Hogar Plus</h3>
                  <p class="text-gray-400 text-sm">2, 4, 6, 8 y 10 Mbps</p>
                </div>
              </div>
            </div>
            
            <div class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-indigo-500/30 transition-all duration-300">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-bold">Planes de datos internacionales</h3>
                  <p class="text-gray-400 text-sm">Paquetes globales de datos</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Benefits Section -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Beneficios del Plan Retail
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-green-500/30 transition-all duration-300">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-bold mb-2">Precios preferenciales exclusivos para mayoristas</h3>
                  <p class="text-gray-400">Accede a tarifas especiales que maximizan tus ganancias</p>
                </div>
              </div>
            </div>
            
            <div class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-blue-500/30 transition-all duration-300">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.25-4.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 5.25v13.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V5.25a2.25 2.25 0 00-2.25-2.25H12.75z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-bold mb-2">Plataforma segura y rápida con soporte en todo momento</h3>
                  <p class="text-gray-400">Transacciones protegidas y atención 24/7</p>
                </div>
              </div>
            </div>
            
            <div class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-purple-500/30 transition-all duration-300">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-bold mb-2">Oportunidad de ampliar tu red de clientes con nuestro respaldo</h3>
                  <p class="text-gray-400">Crecimiento garantizado con nuestro soporte</p>
                </div>
              </div>
            </div>
            
            <div class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-indigo-500/30 transition-all duration-300">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-white font-bold mb-2">Disponible API con fácil integración por si tienen plataforma</h3>
                  <p class="text-gray-400">Conecta tu sistema existente sin complicaciones</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action - Fondo sólido sin rayas del gradiente -->
        <div class="text-center">
          <div class="bg-gray-900 rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
            <!-- Fondo sólido para evitar interferencias del gradiente -->
            <div class="absolute inset-0 bg-gray-900 z-0"></div>
            
            <div class="relative z-10">
              <div class="mb-6">
                <h2 class="text-2xl font-bold text-white mb-4">¿Listo para Comenzar?</h2>
                <p class="text-gray-400 mb-6">
                  Únete hoy y comienza a generar más ingresos con precios exclusivos
                </p>
              </div>
              
              <div class="mb-6 space-y-3">
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/20 border border-yellow-400/30 rounded-xl backdrop-blur-sm">
                  <svg class="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                  </svg>
                  <span class="text-yellow-400 font-semibold">Depósito mínimo: 100 USDT</span>
                </div>
                <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-400/30 rounded-xl backdrop-blur-sm">
                  <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span class="text-green-400 font-semibold">Precio especial: 19.99 USDT por recarga</span>
                </div>
              </div>

              <button
                @click="handleRetailApplication"
                class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 relative z-10"
              >
                Solicitar Plan Retail
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()

const handleRetailApplication = () => {
  router.push('/retail-application')
}
</script>

<style scoped>
/* Card effects matching the site design */
.bg-black\/40 {
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.bg-black\/40:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px -12px rgba(0, 0, 0, 0.5);
}

/* Button hover effects */
button:not(:disabled):hover {
  transform: translateY(-2px);
}

/* Responsive improvements */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

/* Glass morphism effects */
@supports (backdrop-filter: blur(20px)) {
  .backdrop-blur-md {
    backdrop-filter: blur(20px);
  }
}
</style>