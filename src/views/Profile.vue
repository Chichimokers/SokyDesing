<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <Navbar />
    
    <!-- Success Notification -->
    <transition 
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 translate-y-[-20px]"
      leave-to-class="opacity-0 translate-y-[-20px]"
    >
      <div v-if="showSuccessMessage" class="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
        <div class="bg-green-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-2xl border border-green-400/30 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <svg class="w-6 h-6 text-green-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
            <span class="font-semibold">{{ successMessage }}</span>
          </div>
          <button 
            @click="showSuccessMessage = false"
            class="text-green-100 hover:text-white transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </transition>
    
    <!-- Profile Header Section -->
    <div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
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

    <!-- Recent Activity Section -->
    <div class="pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-black/40 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
          <h2 class="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <svg class="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Actividad Reciente
          </h2>
          
          <div class="space-y-3 sm:space-y-4">
            <div v-for="activity in combinedRecent" :key="activity.id" class="activity-item flex items-center justify-between p-3 sm:p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
              <div class="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0" 
                     :class="getActivityIcon(activity.type).bgClass">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6" :class="getActivityIcon(activity.type).iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getActivityIcon(activity.type).path"/>
                  </svg>
                </div>
                <div class="min-w-0 flex-1">
                  <h4 class="text-white font-semibold text-sm sm:text-base truncate">{{ activity.title }}</h4>
                  <p class="text-gray-400 text-xs sm:text-sm truncate">{{ activity.description }}</p>
                </div>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-gray-300 font-semibold text-sm sm:text-base">{{ activity.amount }}</p>
                <p class="text-gray-500 text-xs sm:text-sm">{{ formatDate(activity.date) }}</p>
              </div>
            </div>
          </div>
          
          <div class="mt-6 text-center">
            <button class="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300">
              Ver Historial Completo →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRecharge } from '../composables/useRecharge'
import Navbar from '../components/Navbar.vue'

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
      description: 'Paquete de internet activado • correo@nauta.cu',
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

// Mostrar últimas 3 recargas desde el history compartido
const { getHistory } = useRecharge()
const recentFromHistory = getHistory(3)

// Mapea el history a la estructura de recentActivity para mostrar en el perfil
const historyActivities = recentFromHistory.map((tx, idx) => {
  // Determinar el tipo de recarga según el ID de la oferta
  let type = 'recharge'
  let title = 'Recarga Completada'
  
  if (tx.offer.id === 'nauta') {
    type = 'nauta_hogar'
    title = 'Nauta Hogar Plus'
  } else if (tx.offer.id === 'nauta_plus') {
    type = 'nauta_plus'
    title = 'Nauta Plus'
  } else {
    type = 'mobile_recharge'
    title = 'Recarga Móvil'
  }
  
  // Ajustar título según el status
  if (tx.status === 'error') {
    title = tx.offer.id === 'nauta' ? 'Nauta Hogar Fallida' : 
            tx.offer.id === 'nauta_plus' ? 'Nauta Plus Fallida' : 
            'Recarga Móvil Fallida'
  } else if (tx.status === 'processing') {
    title = tx.offer.id === 'nauta' ? 'Procesando Nauta Hogar' : 
            tx.offer.id === 'nauta_plus' ? 'Procesando Nauta Plus' : 
            'Procesando Recarga'
  }

  return {
    id: `h-${tx.id}-${idx}`,
    type: type,
    title: title,
    description: `${tx.offer.data} • ${tx.phoneNumber}${tx.email ? ` • ${tx.email}` : ''}`,
    amount: `$${tx.offer.priceUSDT.toFixed(2)}`,
    date: tx.timestamp
  }
})

// Prepend history activities to the existing recentActivity (without mutating original data)
const combinedRecent = [...historyActivities, ...user.value.recentActivity].slice(0, 6)

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
