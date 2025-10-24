<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Success Notification - Completamente responsive y bien posicionado -->
    <transition 
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 translate-y-[-20px] scale-95"
      leave-to-class="opacity-0 translate-y-[-20px] scale-95"
    >
      <div v-if="showSuccessMessage" class="fixed inset-x-2 top-20 sm:inset-x-4 sm:top-24 md:top-28 sm:left-1/2 sm:transform sm:-translate-x-1/2 z-[9998] sm:w-full sm:max-w-md">
        <div class="bg-green-500/95 backdrop-blur-md text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl border border-green-400/40 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div class="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-400/20 rounded-full flex items-center justify-center">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 text-green-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <span class="font-semibold text-sm sm:text-base truncate">{{ successMessage }}</span>
          </div>
          <button 
            @click="showSuccessMessage = false"
            class="flex-shrink-0 p-1 text-green-100 hover:text-white hover:bg-green-400/20 rounded-lg transition-all duration-200"
          >
            <svg class="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </transition>
    
    <!-- Profile Header Section -->
    <div class="pt-28 md:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Profile Card -->
        <div class="profile-card bg-black/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <!-- Profile Header -->
          <div class="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 mb-6 sm:mb-8">
            <!-- Avatar Section -->
            <div class="flex flex-col items-center">
              <div class="relative group">
                <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
                  <div class="w-full h-full rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                    <svg v-if="!user.avatar" class="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <img v-else :src="user.avatar" alt="Avatar" class="w-full h-full object-cover" />
                  </div>
                </div>
                <button class="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- User Info -->
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-2xl sm:text-3xl font-bold text-white mb-2">{{ user.name }}</h1>
              <p class="text-gray-300 mb-3 sm:mb-4 flex items-center justify-center md:justify-start gap-2">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {{ user.email }}
              </p>
              <p class="text-gray-400 mb-4 sm:mb-6 flex items-center justify-center md:justify-start gap-2">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {{ user.phone }}
              </p>
              
              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center md:justify-start">
                <router-link 
                  to="/profile/edit"
                  class="profile-btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-center text-sm sm:text-base"
                >
                  Editar Perfil
                </router-link>
                <router-link 
                  to="/profile/change-password"
                  class="profile-btn border border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 text-center text-sm sm:text-base"
                >
                  Cambiar Contraseña
                </router-link>
              </div>
            </div>
          </div>

          <!-- Stats Section -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div class="stats-card bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-4 sm:p-6 text-center">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-blue-300 mb-1">{{ user.stats.totalRecharges }}</h3>
              <p class="text-gray-300 text-xs sm:text-sm">Recargas Totales</p>
            </div>
            
            <div class="stats-card bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-4 sm:p-6 text-center">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-green-300 mb-1">${{ user.stats.totalSpent }}</h3>
              <p class="text-gray-300 text-xs sm:text-sm">Total Gastado</p>
            </div>
            
            <div class="stats-card bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-4 sm:p-6 text-center">
              <div class="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <h3 class="text-xl sm:text-2xl font-bold text-purple-300 mb-1">{{ user.stats.loyaltyPoints }}</h3>
              <p class="text-gray-300 text-xs sm:text-sm">Puntos de Fidelidad</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Historial de Recargas -->
    <div class="pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-black/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <h2 class="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Historial de Recargas
          </h2>

          <div v-if="history.length" class="space-y-3 sm:space-y-4">
            <button
              v-for="tx in history"
              :key="tx.id"
              type="button"
              class="w-full text-left activity-item flex items-center justify-between p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300"
              @click="openDetail(tx)"
            >
              <div class="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0"
                     :class="tx.status === 'completed' ? 'bg-green-500/20' : tx.status === 'processing' ? 'bg-yellow-500/20' : 'bg-red-500/20'">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6" :class="tx.status === 'completed' ? 'text-green-400' : tx.status === 'processing' ? 'text-yellow-400' : 'text-red-400'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tx.status === 'completed' ? 'M5 13l4 4L19 7' : tx.status === 'processing' ? 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' : 'M6 18L18 6M6 6l12 12'"/>
                  </svg>
                </div>
                <div class="min-w-0 flex-1">
                    <h4 class="text-white font-semibold text-sm sm:text-base truncate">{{ itemTitle(tx) }}</h4>
                    <p class="text-gray-400 text-xs sm:text-sm truncate">
                      <template v-if="tx.kind === 'sim'">
                        {{ tx.offer.title || 'SIM' }} • {{ tx.phoneNumber }}
                      </template>
                      <template v-else-if="tx.kind === 'modem'">
                        {{ tx.offer.title || 'Módem ETECSA' }} • {{ tx.phoneNumber }}
                      </template>
                      <template v-else>
                        {{ tx.offer.data }} • {{ tx.phoneNumber }}
                      </template>
                    </p>
                  </div>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-gray-300 font-semibold text-sm sm:text-base">${{ tx.offer.priceUSDT.toFixed(2) }}</p>
                <p class="text-gray-500 text-xs sm:text-sm">{{ formatDate(tx.timestamp) }}</p>
              </div>
            </button>
          </div>
          <div v-else class="text-gray-400 text-center py-8">Aún no tienes recargas en tu historial.</div>
        </div>
      </div>
    </div>

    <RechargeDetailPopup
      :transaction="selectedTx"
      @close="selectedTx = null"
      @edit="handleEdit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import {useRecharge} from '../composables/useRecharge'
import RechargeDetailPopup from '../components/RechargeDetailPopup.vue'

const route = useRoute()
const showSuccessMessage = ref(false)
const successMessage = ref('')

// Handle success messages from query params
onMounted(() => {
  if (route.query.success) {
    const successType = route.query.success as string
    switch (successType) {
      case 'password-changed':
        successMessage.value = 'Contraseña actualizada exitosamente'
        break
      case 'profile-updated':
        successMessage.value = 'Perfil actualizado exitosamente'
        break
      default:
        successMessage.value = 'Operación completada exitosamente'
    }
    showSuccessMessage.value = true
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 5000)
  }
})

// User data (in real app, this would come from an API)
const user = ref({
  name: 'Ernesto',
  email: 'developer1575@gmail.com',
  phone: '+5358126024',
  avatar: null,
  stats: {
    totalRecharges: 47,
    totalSpent: 2350,
    loyaltyPoints: 1240
  },

  recentActivity: [
    {
      id: 1,
      type: 'mobile_recharge',
      title: 'Recarga Móvil Completada',
      description: '700 CUP + Internet ilimitado 20 días',
      amount: '$50.00',
      date: new Date('2024-01-15')
    },
    {
      id: 2,
      type: 'nauta_hogar',
      title: 'Nauta Hogar Plus',
      description: 'Paquete de internet activado • correo@nauta.com.cu',
      amount: '$25.00',
      date: new Date('2024-01-10')
    },
    {
      id: 3,
      type: 'nauta_plus',
      title: 'Nauta Plus',
      description: 'Suscripción activada • +53 5812 6024',
      amount: '$18.50',
      date: new Date('2024-01-08')
    },
    {
      id: 4,
      type: 'mobile_recharge',
      title: 'Recarga Rápida',
      description: '500 CUP enviados',
      amount: '$35.00',
      date: new Date('2024-01-05')
    }
  ]
})

// Historial completo desde el composable
const { transactionHistory, editTransactionNumber, cancelRecharge } = useRecharge()
const history = computed(() => transactionHistory.value)
const selectedTx = ref(null as any)
const openDetail = (tx: any) => { selectedTx.value = tx }
const handleEdit = (id: string, newNumber: string) => {
  const ok = editTransactionNumber(id, newNumber)
  if (ok && selectedTx.value) selectedTx.value.phoneNumber = newNumber
}
const handleCancel = (id: string) => {
  const ok = cancelRecharge(id)
  if (ok && selectedTx.value && selectedTx.value.id === id) {
    selectedTx.value.status = 'error'
  }
}

interface IconConfig {
  bgClass: string
  iconClass: string
  path: string
}

const getActivityIcon = (type: string): IconConfig => {
  const icons: Record<string, IconConfig> = {
    // Recarga móvil normal
    mobile_recharge: {
      bgClass: 'bg-blue-500/20',
      iconClass: 'text-blue-400',
      path: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    // Recargas heredadas (compatibilidad)
    recharge: {
      bgClass: 'bg-blue-500/20',
      iconClass: 'text-blue-400',
      path: 'M13 10V3L4 14h7v7l9-11h-7z'
    },
    // Nauta Hogar Plus
    nauta_hogar: {
      bgClass: 'bg-green-500/20',
      iconClass: 'text-green-400',
      path: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0'
    },
    // Nauta Plus
    nauta_plus: {
      bgClass: 'bg-purple-500/20',
      iconClass: 'text-purple-400',
      path: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z'
    },
    // Nauta genérico (compatibilidad)
    nauta: {
      bgClass: 'bg-green-500/20',
      iconClass: 'text-green-400',
      path: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0'
    }
  }
  
  // Retornar el icono específico o el default de recarga móvil
  return icons[type] ?? icons.mobile_recharge!
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  })
}

const itemTitle = (tx: any) => {
  if (tx.kind === 'sim') {
    if (tx.status === 'error') return 'Compra SIM Fallida'
    if (tx.status === 'processing') return 'Compra SIM Pendiente'
    return 'Compra SIM Completada'
  }
  if (tx.kind === 'modem') {
    if (tx.status === 'error') return 'Compra Módem Fallida'
    if (tx.status === 'processing') return 'Compra Módem Pendiente'
    return 'Compra Módem Completada'
  }
  if (tx.status === 'error') return 'Recarga Fallida'
  if (tx.status === 'processing') return 'Recarga Pendiente'
  return 'Recarga Completada'
}
</script>

<style scoped>
.profile-card {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.stats-card {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.3);
}

.activity-item {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.profile-btn {
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.profile-btn:hover {
  transform: translateY(-2px);
}

/* Glass morphism effects */
@supports (backdrop-filter: blur(20px)) {
  .profile-card,
  .stats-card,
  .activity-item {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
  }
}

/* Responsive improvements */
@media (max-width: 768px) {
  .profile-card {
    padding: 1.5rem;
  }
  
  .stats-card {
    padding: 1rem;
  }
}
</style>
