<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <Navbar />
    
    <!-- Profile Header Section -->
    <div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Profile Card -->
        <div class="profile-card bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
          <!-- Profile Header -->
          <div class="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            <!-- Avatar Section -->
            <div class="flex flex-col items-center">
              <div class="relative group">
                <div class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
                  <div class="w-full h-full rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                    <svg v-if="!user.avatar" class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                    <img v-else :src="user.avatar" alt="Avatar" class="w-full h-full object-cover" />
                  </div>
                </div>
                <button class="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- User Info -->
            <div class="flex-1 text-center md:text-left">
              <h1 class="text-3xl font-bold text-white mb-2">{{ user.name }}</h1>
              <p class="text-gray-300 mb-4 flex items-center justify-center md:justify-start gap-2">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                {{ user.email }}
              </p>
              <p class="text-gray-400 mb-6 flex items-center justify-center md:justify-start gap-2">
                <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {{ user.phone }}
              </p>
              
              <!-- Action Buttons -->
              <div class="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <button class="profile-btn bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Editar Perfil
                </button>
                <button class="profile-btn border border-blue-500 text-blue-300 hover:bg-blue-500 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          </div>

          <!-- Stats Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div class="stats-card bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-xl p-6 text-center">
              <div class="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-blue-300 mb-1">{{ user.stats.totalRecharges }}</h3>
              <p class="text-gray-300 text-sm">Recargas Totales</p>
            </div>
            
            <div class="stats-card bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-xl p-6 text-center">
              <div class="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-green-300 mb-1">${{ user.stats.totalSpent }}</h3>
              <p class="text-gray-300 text-sm">Total Gastado</p>
            </div>
            
            <div class="stats-card bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-xl p-6 text-center">
              <div class="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-purple-300 mb-1">{{ user.stats.loyaltyPoints }}</h3>
              <p class="text-gray-300 text-sm">Puntos de Fidelidad</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity Section -->
    <div class="pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div class="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
          <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Actividad Reciente
          </h2>
          
          <div class="space-y-4">
            <div v-for="activity in user.recentActivity" :key="activity.id" class="activity-item flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center" 
                     :class="getActivityIcon(activity.type).bgClass">
                  <svg class="w-6 h-6" :class="getActivityIcon(activity.type).iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getActivityIcon(activity.type).path"/>
                  </svg>
                </div>
                <div>
                  <h4 class="text-white font-semibold">{{ activity.title }}</h4>
                  <p class="text-gray-400 text-sm">{{ activity.description }}</p>
                </div>
              </div>
              <div class="text-right">
                <p class="text-gray-300 font-semibold">{{ activity.amount }}</p>
                <p class="text-gray-500 text-sm">{{ formatDate(activity.date) }}</p>
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
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'

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
      type: 'recharge',
      title: 'Recarga Completada',
      description: '700 CUP + Internet ilimitado 20 días',
      amount: '$50.00',
      date: new Date('2024-01-15')
    },
    {
      id: 2,
      type: 'nauta',
      title: 'Nauta Hogar Plus',
      description: 'Paquete de internet activado',
      amount: '$25.00',
      date: new Date('2024-01-10')
    },
    {
      id: 3,
      type: 'recharge',
      title: 'Recarga Rápida',
      description: '500 CUP enviados',
      amount: '$35.00',
      date: new Date('2024-01-05')
    }
  ]
})

interface IconConfig {
  bgClass: string
  iconClass: string
  path: string
}

const getActivityIcon = (type: string): IconConfig => {
  const defaultIcon: IconConfig = {
    bgClass: 'bg-blue-500/20',
    iconClass: 'text-blue-400',
    path: 'M13 10V3L4 14h7v7l9-11h-7z'
  }
  
  const icons: Record<string, IconConfig> = {
    recharge: defaultIcon,
    nauta: {
      bgClass: 'bg-green-500/20',
      iconClass: 'text-green-400',
      path: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0'
    }
  }
  
  return icons[type] ?? defaultIcon
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
