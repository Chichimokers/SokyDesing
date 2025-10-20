<template>
  <div class="space-y-4">
    <!-- Título del selector -->
    <div>
      <h4 class="text-sm font-medium text-gray-300 mb-2">
        {{ getSelectorTitle() }}
      </h4>
    </div>

    <!-- Selector de planes -->
    <div class="grid grid-cols-2 gap-3" v-if="planType === 'nauta_hogar'">
      <!-- Planes Nauta Hogar -->
      <button
        v-for="plan in nautaHogarPlans"
        :key="plan.id"
        @click="selectPlan(plan)"
        class="p-3 rounded-lg border text-left transition-all duration-200"
        :class="{
          'border-blue-500 bg-blue-500/20 text-blue-300': selectedPlan?.id === plan.id,
          'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500': selectedPlan?.id !== plan.id
        }"
      >
        <div class="text-sm font-medium">{{ plan.speed }}</div>
        <div class="text-xs text-gray-400">${{ plan.price.toFixed(2) }}</div>
      </button>
    </div>

    <div class="grid grid-cols-1 gap-3" v-else-if="planType === 'nauta_plus'">
      <!-- Planes Nauta Plus -->
      <button
        v-for="plan in nautaPlusPlans"
        :key="plan.id"
        @click="selectPlan(plan)"
        class="p-3 rounded-lg border text-left transition-all duration-200"
        :class="{
          'border-purple-500 bg-purple-500/20 text-purple-300': selectedPlan?.id === plan.id,
          'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500': selectedPlan?.id !== plan.id
        }"
      >
        <div class="text-sm font-medium">{{ plan.name }}</div>
        <div class="text-xs text-gray-400">{{ plan.description }}</div>
        <div class="text-xs text-purple-400 font-medium">${{ plan.price.toFixed(2) }}/mes</div>
      </button>
    </div>

    <div class="grid grid-cols-1 gap-3" v-else>
      <!-- Planes Móviles (usar ofertas existentes) -->
      <button
        v-for="plan in mobilePlans"
        :key="plan.id"
        @click="selectPlan(plan)"
        class="p-3 rounded-lg border text-left transition-all duration-200"
        :class="{
          'border-blue-500 bg-blue-500/20 text-blue-300': selectedPlan?.id === plan.id,
          'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500': selectedPlan?.id !== plan.id
        }"
      >
        <div class="flex items-center justify-between">
          <div>
            <div class="text-sm font-medium">{{ plan.data }}</div>
            <div class="text-xs text-gray-400">
              {{ plan.minutes }} • {{ plan.sms }}
            </div>
          </div>
          <div class="text-right">
            <div class="text-sm font-bold text-blue-400">${{ plan.priceUSDT.toFixed(2) }}</div>
            <div class="text-xs text-gray-500">USDT</div>
          </div>
        </div>
      </button>
    </div>

    <!-- Toggle de renovación automática para Nauta -->
    <div v-if="planType === 'nauta_hogar' || planType === 'nauta_plus'" class="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-600">
      <div class="flex items-center space-x-3">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        <div>
          <div class="text-sm font-medium text-gray-300">Renovación Automática</div>
          <div class="text-xs text-gray-500">Se renovará automáticamente cada mes</div>
        </div>
      </div>
      <button
        @click="toggleAutoRenewal"
        class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors"
        :class="autoRenewal ? 'bg-blue-600' : 'bg-gray-600'"
      >
        <span
          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
          :class="autoRenewal ? 'translate-x-6' : 'translate-x-1'"
        />
      </button>
    </div>

    <!-- Información del plan seleccionado -->
    <div v-if="selectedPlan" class="p-3 bg-green-900/20 border border-green-700/50 rounded-lg">
      <div class="flex items-center space-x-2 mb-2">
        <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span class="text-sm font-medium text-green-400">Plan seleccionado</span>
      </div>
      <div class="text-xs text-gray-300">
        {{ getSelectedPlanDescription() }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { RechargeOffer } from '../composables/useRecharge'

interface NautaPlan {
  id: string
  speed?: string
  name?: string
  description?: string
  price: number
  data?: string
  minutes?: string
  sms?: string
  priceUSDT?: number
}

interface Props {
  planType: 'nauta_hogar' | 'nauta_plus' | 'mobile'
  mobilePlans?: RechargeOffer[]
  selectedPlan?: NautaPlan | RechargeOffer | null
}

interface Emits {
  selectPlan: [plan: NautaPlan | RechargeOffer]
  autoRenewalChange: [enabled: boolean]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const autoRenewal = ref(false)

// Planes Nauta Hogar según la imagen
const nautaHogarPlans = ref<NautaPlan[]>([
  { id: 'nh_2mbps', speed: '2 Mbps', price: 21.50 },
  { id: 'nh_4mbps', speed: '4 Mbps', price: 26.50 },
  { id: 'nh_6mbps', speed: '6 Mbps', price: 31.50 },
  { id: 'nh_8mbps', speed: '8 Mbps', price: 42.50 },
  { id: 'nh_10mbps', speed: '10 Mbps', price: 52.50 }
])

// Planes Nauta Plus
const nautaPlusPlans = ref<NautaPlan[]>([
  { 
    id: 'np_basic', 
    name: 'Nauta Plus Básico', 
    description: 'Acceso estándar', 
    price: 15.00 
  },
  { 
    id: 'np_premium', 
    name: 'Nauta Plus Premium', 
    description: 'Acceso prioritario + beneficios', 
    price: 25.00 
  }
])

const getSelectorTitle = () => {
  switch (props.planType) {
    case 'nauta_hogar':
      return 'Seleccione el monto a recargar'
    case 'nauta_plus':
      return 'Seleccione su plan de suscripción'
    case 'mobile':
      return 'Seleccione el plan de recarga'
    default:
      return 'Seleccione un plan'
  }
}

const selectPlan = (plan: NautaPlan | RechargeOffer) => {
  emit('selectPlan', plan)
}

const toggleAutoRenewal = () => {
  autoRenewal.value = !autoRenewal.value
  emit('autoRenewalChange', autoRenewal.value)
}

const getSelectedPlanDescription = () => {
  if (!props.selectedPlan) return ''
  
  if (props.planType === 'nauta_hogar') {
    const plan = props.selectedPlan as NautaPlan
    return `${plan.speed} - $${plan.price.toFixed(2)} ${autoRenewal.value ? '(renovación automática)' : ''}`
  } else if (props.planType === 'nauta_plus') {
    const plan = props.selectedPlan as NautaPlan
    return `${plan.name} - $${plan.price.toFixed(2)}/mes ${autoRenewal.value ? '(renovación automática)' : ''}`
  } else {
    const plan = props.selectedPlan as RechargeOffer
    return `${plan.data} + ${plan.minutes} + ${plan.sms} - $${plan.priceUSDT.toFixed(2)} USDT`
  }
}
</script>

<style scoped>
/* Animaciones para el toggle */
.transition-transform {
  transition: transform 0.2s ease-in-out;
}

.transition-colors {
  transition: background-color 0.2s ease-in-out;
}
</style>