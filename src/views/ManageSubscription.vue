<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <Navbar />
    
    <!-- Manage Subscription Section -->
    <div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        
        <!-- Header with Back Button -->
        <div class="mb-8">
          <div class="flex items-center gap-4 mb-4">
            <button 
              @click="goBack"
              class="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all duration-300"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <div>
              <h1 class="text-3xl sm:text-4xl font-bold text-white mb-2">Gestionar Suscripción</h1>
              <p class="text-gray-400">Administra los detalles de tu suscripción activa</p>
            </div>
          </div>
        </div>

        <!-- Subscription Overview Card -->
        <div class="subscription-overview-card bg-black/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl mb-8">
          <div class="flex flex-col md:flex-row items-start gap-6">
            <!-- Subscription Icon & Info -->
            <div class="flex items-start gap-4">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getSubscriptionIcon(subscription.type)"/>
                </svg>
              </div>
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h2 class="text-2xl font-bold text-white">{{ subscription.name }}</h2>
                  <span class="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-sm font-medium border border-green-500/30">
                    {{ subscription.status === 'active' ? 'Activa' : 'Inactiva' }}
                  </span>
                </div>
                <p class="text-gray-400 mb-3">{{ getSubscriptionDescription(subscription.type) }}</p>
                <div class="flex flex-wrap gap-4 text-sm">
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-white font-semibold">${{ subscription.price.toFixed(2) }}/mes</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span class="text-white">Próximo pago: {{ formatDate(subscription.nextPayment) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Subscription Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          
          <!-- Current Plan Details -->
          <div class="plan-details-card bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Detalles del Plan
            </h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-gray-400">Beneficiario:</span>
                <span class="text-white font-semibold">{{ subscription.beneficiary }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-gray-400">Fecha de inicio:</span>
                <span class="text-white">{{ formatDate(subscription.startDate) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-gray-400">Renovación automática:</span>
                <span :class="subscription.autoRenew ? 'text-green-400' : 'text-yellow-400'">
                  {{ subscription.autoRenew ? 'Activada' : 'Desactivada' }}
                </span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-400">Método de pago:</span>
                <span class="text-white">{{ subscription.paymentMethod }}</span>
              </div>
            </div>
          </div>

          <!-- Billing Information -->
          <div class="billing-card bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
            <h3 class="text-xl font-bold text-white mb-4 flex items-center gap-3">
              <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
              Información de Facturación
            </h3>
            
            <div class="space-y-4">
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-gray-400">Último pago:</span>
                <span class="text-white">${{ subscription.lastPayment.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-gray-400">Fecha último pago:</span>
                <span class="text-white">{{ formatDate(subscription.lastPaymentDate) }}</span>
              </div>
              <div class="flex justify-between items-center py-2 border-b border-white/10">
                <span class="text-gray-400">Próximo cobro:</span>
                <span class="text-white font-semibold">${{ subscription.price.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between items-center py-2">
                <span class="text-gray-400">Estado de pago:</span>
                <span class="text-green-400">Al día</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Payment History -->
        <div class="payment-history-card bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl mb-8">
          <h3 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Historial de Pagos
          </h3>
          
          <div class="space-y-3">
            <div v-for="payment in paymentHistory" :key="payment.id" 
                 class="payment-item flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
              <div class="flex items-center gap-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center" 
                     :class="getPaymentStatusIcon(payment.status).bgClass">
                  <svg class="w-5 h-5" :class="getPaymentStatusIcon(payment.status).iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getPaymentStatusIcon(payment.status).path"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-white font-semibold text-sm">{{ payment.description }}</h4>
                  <p class="text-gray-400 text-xs">{{ formatDate(payment.date) }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-white font-semibold">${{ payment.amount.toFixed(2) }}</p>
                <p class="text-xs" :class="getPaymentStatusColor(payment.status)">{{ payment.status }}</p>
              </div>
            </div>
          </div>
          
          <div class="mt-4 text-center">
            <button class="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300 text-sm">
              Ver historial completo →
            </button>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            @click="toggleAutoRenewal"
            class="action-btn bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            {{ subscription.autoRenew ? 'Pausar Renovación' : 'Activar Renovación' }}
          </button>
          
 
          <button 
            @click="showCancelModal = true"
            class="action-btn bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            Cancelar
          </button>
        </div>

        <!-- Subscription Benefits -->
        <div class="mt-12 bg-black/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <h3 class="text-xl font-bold text-white mb-6 text-center">Beneficios de tu Suscripción</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="text-center">
              <div class="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Renovación Automática</h4>
              <p class="text-gray-400 text-sm">Sin interrupciones en tu servicio</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 12h.01"/>
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Soporte Prioritario</h4>
              <p class="text-gray-400 text-sm">Atención especializada 24/7</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-white mb-2">Precios Preferenciales</h4>
              <p class="text-gray-400 text-sm">Descuentos exclusivos para suscriptores</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel Subscription Modal -->
    <div v-if="showCancelModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="showCancelModal = false"></div>
      <div class="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-red-500/30 shadow-2xl max-w-md w-full mx-4">
        <div class="text-center">
          <div class="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">¿Cancelar Suscripción?</h3>
          <p class="text-gray-300 mb-6 leading-relaxed">
            Tu suscripción se cancelará al final del período de facturación actual. 
            Seguirás teniendo acceso hasta el {{ formatDate(subscription.nextPayment) }}.
          </p>
          <div class="flex gap-3">
            <button 
              @click="showCancelModal = false"
              class="flex-1 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Mantener
            </button>
            <button 
              @click="cancelSubscription"
              class="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              Sí, Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Success/Status Modal -->
    <div v-if="showStatusModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="showStatusModal = false"></div>
      <div class="relative bg-gradient-to-br from-green-600/90 to-emerald-600/90 backdrop-blur-xl rounded-3xl p-8 border border-green-400/30 shadow-2xl max-w-md w-full mx-4">
        <div class="text-center">
          <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-white mb-4">{{ statusMessage.title }}</h3>
          <p class="text-green-100 mb-6 leading-relaxed">{{ statusMessage.description }}</p>
          <button 
            @click="showStatusModal = false"
            class="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const route = useRoute()

// State
const showCancelModal = ref(false)
const showStatusModal = ref(false)

interface Subscription {
  id: number
  name: string
  type: string
  price: number
  nextPayment: Date
  beneficiary: string
  status: 'active' | 'inactive'
  startDate: Date
  autoRenew: boolean
  paymentMethod: string
  lastPayment: number
  lastPaymentDate: Date
}

interface Payment {
  id: number
  description: string
  amount: number
  date: Date
  status: 'Completado' | 'Pendiente' | 'Fallido'
}

// Sample subscription data (in real app, this would come from API)
const subscription = ref<Subscription>({
  id: 1,
  name: 'Nauta Plus 30 días',
  type: 'nauta_plus',
  price: 35.00,
  nextPayment: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000),
  beneficiary: '+5352637415',
  status: 'active',
  startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
  autoRenew: true,
  paymentMethod: 'USDT (Tether)',
  lastPayment: 35.00,
  lastPaymentDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
})

// Payment history
const paymentHistory = ref<Payment[]>([
  {
    id: 1,
    description: 'Renovación Nauta Plus 30 días',
    amount: 35.00,
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    status: 'Completado'
  },
  {
    id: 2,
    description: 'Activación inicial Nauta Plus',
    amount: 35.00,
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    status: 'Completado'
  },
  {
    id: 3,
    description: 'Cargo de activación',
    amount: 0.00,
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    status: 'Completado'
  }
])

// Status message for modals
const statusMessage = ref({
  title: '',
  description: ''
})

// Methods
const goBack = () => {
  router.push('/subscriptions')
}

const getSubscriptionIcon = (type: string) => {
  const icons: Record<string, string> = {
    nauta: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
    nauta_plus: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    nauta_hogar: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
  }
  return icons[type] || icons.nauta
}

const getSubscriptionDescription = (type: string) => {
  const descriptions: Record<string, string> = {
    nauta_plus: 'Internet móvil por 30 días con acceso completo',
    nauta_hogar: 'Internet residencial de alta velocidad',
    nauta: 'Servicio básico de internet'
  }
  return descriptions[type] || 'Servicio de internet'
}

const getPaymentStatusIcon = (status: string) => {
  const icons: Record<string, any> = {
    'Completado': {
      bgClass: 'bg-green-500/20',
      iconClass: 'text-green-400',
      path: 'M5 13l4 4L19 7'
    },
    'Pendiente': {
      bgClass: 'bg-yellow-500/20',
      iconClass: 'text-yellow-400',
      path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
    },
    'Fallido': {
      bgClass: 'bg-red-500/20',
      iconClass: 'text-red-400',
      path: 'M6 18L18 6M6 6l12 12'
    }
  }
  return icons[status] || icons['Pendiente']
}

const getPaymentStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    'Completado': 'text-green-400',
    'Pendiente': 'text-yellow-400',
    'Fallido': 'text-red-400'
  }
  return colors[status] || 'text-gray-400'
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric' 
  })
}

const toggleAutoRenewal = () => {
  subscription.value.autoRenew = !subscription.value.autoRenew
  statusMessage.value = {
    title: subscription.value.autoRenew ? '¡Renovación Activada!' : '¡Renovación Pausada!',
    description: subscription.value.autoRenew 
      ? 'Tu suscripción se renovará automáticamente el ' + formatDate(subscription.value.nextPayment)
      : 'La renovación automática ha sido desactivada. Tu suscripción terminará el ' + formatDate(subscription.value.nextPayment)
  }
  showStatusModal.value = true
}

const updatePaymentMethod = () => {
  // In real app, this would open a payment method selection modal
  statusMessage.value = {
    title: 'Actualizar Método de Pago',
    description: 'Esta función estará disponible próximamente. Podrás cambiar tu método de pago desde aquí.'
  }
  showStatusModal.value = true
}

const changePlan = () => {
  // In real app, this would navigate to plan selection
  router.push('/subscriptions?change-plan=true')
}

const cancelSubscription = () => {
  subscription.value.status = 'inactive'
  subscription.value.autoRenew = false
  showCancelModal.value = false
  
  statusMessage.value = {
    title: 'Suscripción Cancelada',
    description: `Tu suscripción ha sido cancelada. Seguirás teniendo acceso hasta el ${formatDate(subscription.value.nextPayment)}.`
  }
  showStatusModal.value = true
}

// Load subscription details on component mount
onMounted(() => {
  // In real app, load subscription details from API based on route params
  const subscriptionId = route.params.id
  console.log('Loading subscription:', subscriptionId)
})
</script>

<style scoped>
.subscription-overview-card,
.plan-details-card,
.billing-card,
.payment-history-card {
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
}

.action-btn {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.action-btn:hover {
  transform: translateY(-2px);
}

.payment-item {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Glass morphism effects */
@supports (backdrop-filter: blur(20px)) {
  .subscription-overview-card,
  .plan-details-card,
  .billing-card,
  .payment-history-card,
  .action-btn,
  .payment-item {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
  }
}

/* Responsive improvements */
@media (max-width: 768px) {
  .subscription-overview-card,
  .plan-details-card,
  .billing-card,
  .payment-history-card {
    padding: 1.5rem;
  }
}
</style>