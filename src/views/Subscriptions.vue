<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <Navbar />
    
    <!-- Subscriptions Section -->
    <div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        
        <!-- Header -->
        <div class="mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Suscripciones</h1>
          <p class="text-gray-400">Gestiona tus suscripciones activas y explora nuevos planes</p>
        </div>

        <!-- Active Subscriptions -->
        <div class="mb-12">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Suscripciones Activas
          </h2>
          
          <div v-if="activeSubscriptions.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="subscription in activeSubscriptions" :key="subscription.id" 
                 class="subscription-card bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
              <div class="flex items-start justify-between mb-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSubscriptionIcon(subscription.type)"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-white font-semibold">{{ subscription.name }}</h3>
                    <p class="text-gray-400 text-sm">{{ subscription.type }}</p>
                  </div>
                </div>
                <span class="bg-green-500/20 text-green-400 px-2 py-1 rounded-lg text-xs font-medium border border-green-500/30">
                  Activa
                </span>
              </div>
              
              <div class="space-y-3 mb-4">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">Próximo pago:</span>
                  <span class="text-white">{{ formatDate(subscription.nextPayment) }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">Precio:</span>
                  <span class="text-white font-semibold">${{ subscription.price.toFixed(2) }}/mes</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-400">Beneficiario:</span>
                  <span class="text-white">{{ subscription.beneficiary }}</span>
                </div>
              </div>
              
              <div class="flex gap-2">
                <button class="flex-1 bg-blue-500/20 text-blue-400 py-2 px-4 rounded-xl text-sm font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-all">
                  Gestionar
                </button>
                <button class="flex-1 bg-red-500/20 text-red-400 py-2 px-4 rounded-xl text-sm font-medium border border-red-500/30 hover:bg-red-500/30 transition-all">
                  Cancelar
                </button>
              </div>
            </div>
          </div>
          
          <div v-else class="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4m0 0L9 8m-5 5l5-5"/>
            </svg>
            <h3 class="text-xl font-semibold text-white mb-2">No tienes suscripciones activas</h3>
            <p class="text-gray-400 mb-4">Explora nuestros planes disponibles y suscríbete para obtener beneficios exclusivos</p>
          </div>
        </div>

        <!-- Available Plans -->
        <div>
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            Planes Disponibles
          </h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="plan in availablePlans" :key="plan.id" 
                 class="plan-card bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl hover:border-blue-500/30 transition-all duration-300 group">
              
              <!-- Plan Header -->
              <div class="text-center mb-6">
                <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSubscriptionIcon(plan.type)"/>
                  </svg>
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">{{ plan.name }}</h3>
                <p class="text-gray-400 text-sm mb-4">{{ plan.description }}</p>
                <div class="text-center">
                  <span class="text-4xl font-bold text-white">${{ plan.price.toFixed(2) }}</span>
                  <span class="text-gray-400">/mes</span>
                </div>
              </div>

              <!-- Plan Features -->
              <div class="space-y-3 mb-6">
                <div v-for="feature in plan.features" :key="feature" class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span class="text-gray-300 text-sm">{{ feature }}</span>
                </div>
              </div>

              <!-- Plan Action -->
              <button class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Suscribirse
              </button>
              
              <p class="text-gray-500 text-xs text-center mt-3">{{ plan.terms }}</p>
            </div>
          </div>
        </div>

        <!-- Subscription Benefits -->
        <div class="mt-16 bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
          <h2 class="text-2xl font-bold text-white mb-6 text-center">¿Por qué suscribirse?</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Automático</h3>
              <p class="text-gray-400 text-sm">Recargas automáticas sin preocupaciones</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Descuentos</h3>
              <p class="text-gray-400 text-sm">Precios preferenciales para suscriptores</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01M12 12h.01M12 12h.01"/>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Soporte Premium</h3>
              <p class="text-gray-400 text-sm">Atención prioritaria 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'

interface Subscription {
  id: number
  name: string
  type: string
  price: number
  nextPayment: Date
  beneficiary: string
  status: 'active' | 'inactive'
}

interface Plan {
  id: number
  name: string
  type: string
  description: string
  price: number
  features: string[]
  terms: string
}

// Active subscriptions (empty for new users)
const activeSubscriptions = ref<Subscription[]>([
  // Example of an active subscription:
  // {
  //   id: 1,
  //   name: 'Plan Familia',
  //   type: 'recargas',
  //   price: 25.00,
  //   nextPayment: new Date('2024-02-15'),
  //   beneficiary: '+5358126024',
  //   status: 'active'
  // }
])

// Available subscription plans
const availablePlans = ref<Plan[]>([
  {
    id: 1,
    name: 'Plan Básico',
    type: 'recargas',
    description: 'Ideal para uso personal',
    price: 15.00,
    features: [
      'Recargas automáticas mensuales',
      '10% de descuento en recargas',
      'Soporte por email',
      'Hasta 2 números beneficiarios'
    ],
    terms: 'Cancelable en cualquier momento'
  },
  {
    id: 2,
    name: 'Plan Familia',
    type: 'recargas',
    description: 'Perfecto para la familia',
    price: 25.00,
    features: [
      'Recargas automáticas mensuales',
      '15% de descuento en recargas',
      'Soporte prioritario',
      'Hasta 5 números beneficiarios',
      'Reporte mensual de gastos'
    ],
    terms: 'Cancelable en cualquier momento'
  },
  {
    id: 3,
    name: 'Plan Premium',
    type: 'nauta',
    description: 'Acceso completo a servicios',
    price: 35.00,
    features: [
      'Recargas y Nauta automáticos',
      '20% de descuento en todos los servicios',
      'Soporte 24/7 prioritario',
      'Números beneficiarios ilimitados',
      'Reporte detallado mensual',
      'Notificaciones en tiempo real'
    ],
    terms: 'Primer mes gratis, cancelable en cualquier momento'
  }
])

const getSubscriptionIcon = (type: string) => {
  const icons: Record<string, string> = {
    recargas: 'M13 10V3L4 14h7v7l9-11h-7z',
    nauta: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
    premium: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
  }
  return icons[type] || icons.recargas
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
}
</script>

<style scoped>
.subscription-card,
.plan-card {
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px -12px rgba(59, 130, 246, 0.3);
  border-color: rgba(59, 130, 246, 0.5);
}

.subscription-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.3);
}

/* Glass morphism effects */
@supports (backdrop-filter: blur(20px)) {
  .subscription-card,
  .plan-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
  }
}

/* Responsive improvements */
@media (max-width: 768px) {
  .subscription-card,
  .plan-card {
    padding: 1.5rem;
  }
}
</style>