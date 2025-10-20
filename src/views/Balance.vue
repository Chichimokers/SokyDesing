<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <Navbar />
    

    <div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
     
          <div class="lg:col-span-1">
            <div class="balance-card bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-white/10 shadow-2xl">
      
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-white/80 text-lg font-medium">Saldo</h2>
                <div class="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <svg class="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </div>
              </div>


              <div class="mb-8">
                <h1 class="text-5xl font-bold text-white mb-2">${{ balance.current.toFixed(2) }}</h1>
                <p class="text-white/60 text-sm">Disponible para usar</p>
              </div>

              <div class="space-y-3">
                <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Acreditar
                </button>
                <button class="w-full bg-white/10 hover:bg-white/20 text-white py-4 px-6 rounded-2xl font-semibold transition-all duration-300 border border-white/20">
                  Transferir
                </button>
              </div>
            </div>
          </div>


          <div class="lg:col-span-2 space-y-6">
            

            <div>
              <h2 class="text-2xl font-bold text-white mb-6">Estadísticas</h2>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                

                <div class="stats-card bg-gradient-to-br from-blue-500/20 to-blue-600/10 border border-blue-500/30 rounded-2xl p-6 text-center">
                  <div class="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                    </svg>
                  </div>
                  <h3 class="text-blue-300 text-sm font-medium mb-1">Recargas</h3>
                  <p class="text-3xl font-bold text-white">{{ stats.recharges }}</p>
                </div>


                <div class="stats-card bg-gradient-to-br from-green-500/20 to-green-600/10 border border-green-500/30 rounded-2xl p-6 text-center">
                  <div class="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <h3 class="text-green-300 text-sm font-medium mb-1">Acreditaciones</h3>
                  <p class="text-3xl font-bold text-white">{{ stats.credits }}</p>
                </div>


                <div class="stats-card bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/30 rounded-2xl p-6 text-center">
                  <div class="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                    </svg>
                  </div>
                  <h3 class="text-purple-300 text-sm font-medium mb-1">Transacciones</h3>
                  <p class="text-3xl font-bold text-white">{{ stats.transactions }}</p>
                </div>
              </div>
            </div>


            <div class="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold text-white flex items-center gap-3">
                  <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                  </svg>
                  Historial
                </h2>
                <div class="flex items-center gap-2">
                  <span class="text-green-400 text-sm font-medium">Depósito</span>
                  <span class="text-green-400 text-lg font-bold">${{ pendingDeposit.amount }}</span>
                  <span class="text-gray-400 text-xs">Pendiente {{ pendingDeposit.time }}</span>
                  <button class="bg-green-500/20 text-green-400 px-3 py-1 rounded-lg text-xs font-medium border border-green-500/30 hover:bg-green-500/30 transition-all">
                    Detalles
                  </button>
                </div>
              </div>
              
              <div class="space-y-3">
                <div v-for="transaction in transactions" :key="transaction.id" 
                     class="transaction-item flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-full flex items-center justify-center" 
                         :class="getTransactionIcon(transaction.type).bgClass">
                      <svg class="w-6 h-6" :class="getTransactionIcon(transaction.type).iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="getTransactionIcon(transaction.type).path"/>
                      </svg>
                    </div>
                    <div>
                      <h4 class="text-white font-semibold">{{ transaction.title }}</h4>
                      <p class="text-gray-400 text-sm">{{ transaction.description }}</p>
                      <p class="text-gray-500 text-xs">{{ formatDate(transaction.date) }}</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <p class="font-semibold" :class="transaction.type === 'credit' ? 'text-green-400' : 'text-red-400'">
                      {{ transaction.type === 'credit' ? '+' : '-' }}${{ Math.abs(transaction.amount).toFixed(2) }}
                    </p>
                    <p class="text-gray-500 text-sm">{{ transaction.status }}</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-6 text-center">
                <button class="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-300">
                  Ver Todo el Historial →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'

interface Transaction {
  id: number
  type: 'credit' | 'debit'
  title: string
  description: string
  amount: number
  status: string
  date: Date
}

interface IconConfig {
  bgClass: string
  iconClass: string
  path: string
}

// Balance data
const balance = ref({
  current: 0.00,
  pending: 22.00
})

const pendingDeposit = ref({
  amount: '22.00',
  time: '4 horas'
})

const stats = ref({
  recharges: 0,
  credits: 1,
  transactions: 0
})

const transactions = ref<Transaction[]>([
  {
    id: 1,
    type: 'credit',
    title: 'Depósito PayPal',
    description: 'Recarga de saldo desde PayPal',
    amount: 50.00,
    status: 'Completado',
    date: new Date('2024-01-15')
  },
  {
    id: 2,
    type: 'debit',
    title: 'Recarga Cuba',
    description: 'Recarga telefónica +5358126024',
    amount: -25.00,
    status: 'Completado',
    date: new Date('2024-01-14')
  },
  {
    id: 3,
    type: 'credit',
    title: 'Transferencia Recibida',
    description: 'De: usuario@email.com',
    amount: 30.00,
    status: 'Completado',
    date: new Date('2024-01-13')
  }
])

const getTransactionIcon = (type: string): IconConfig => {
  const defaultIcon: IconConfig = {
    bgClass: 'bg-blue-500/20',
    iconClass: 'text-blue-400',
    path: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
  
  const icons: Record<string, IconConfig> = {
    credit: {
      bgClass: 'bg-green-500/20',
      iconClass: 'text-green-400',
      path: 'M12 6v6m0 0v6m0-6h6m-6 0H6'
    },
    debit: {
      bgClass: 'bg-red-500/20',
      iconClass: 'text-red-400',
      path: 'M20 12H4'
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
.balance-card {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%);
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

.transaction-item {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Glass morphism effects */
@supports (backdrop-filter: blur(20px)) {
  .balance-card,
  .stats-card,
  .transaction-item {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
  }
}

/* Responsive improvements */
@media (max-width: 1024px) {
  .balance-card {
    margin-bottom: 2rem;
  }
}

@media (max-width: 768px) {
  .balance-card,
  .stats-card {
    padding: 1.5rem;
  }
}
</style>
