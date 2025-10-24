<template>
  <div 
   class="bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 transition-all duration-300 group hover:transform hover:scale-105 overflow-hidden flex flex-col h-full"
    :class="cardClasses"
  >
    <!-- Imagen Principal - Altura fija -->
    <div class="h-50 w-50 overflow-hidden flex-shrink-0" >
      <img 
        :src="img" 
        :alt="title" 
        class="w-full h-full object-scale-down  group-hover:scale-110 transition duration-300"
        ref="imgRef"
      >
    </div>
    
    <!-- Contenido - Se expande para llenar el espacio -->
    <div class="p-6 flex flex-col flex-grow">
      <h3 class="text-xl font-bold text-white mb-2">{{ title }}</h3>
      <p class="text-gray-300 mb-4 flex-grow">{{ description }}</p>
      
      <!-- Botón fijo en la parte inferior -->
      <button 
        class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition duration-300 mt-auto"
        @click="handleSelect"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RechargeOffer } from '@/composables/useRecharge'

interface Props {
  title: string
  img: string
  description: string
  buttonText?: string
  color?: 'blue' | 'green' | 'purple' | 'orange'
  offer?: RechargeOffer | null
}

const props = withDefaults(defineProps<Props>(), {
  buttonText: 'Seleccionar',
  color: 'blue',
  offer: null
})

const emit = defineEmits<{
  select: [offer: RechargeOffer | null, originRect?: { left: number; top: number; width: number; height: number }]
}>()

const colorConfig = {
  blue: {
    card: 'from-blue-500/10 to-blue-600/5 border-blue-500/20 hover:border-blue-400'
  },
  green: {
    card: 'from-green-500/10 to-green-600/5 border-green-500/20 hover:border-green-400'
  },
  purple: {
    card: 'from-purple-500/10 to-purple-600/5 border-purple-500/20 hover:border-purple-400'
  },
  orange: {
    card: 'from-orange-500/10 to-orange-600/5 border-orange-500/20 hover:border-orange-400'
  }
}

const cardClasses = colorConfig[props.color].card

// Get image rect and emit with offer
import { ref } from 'vue'
const imgRef = ref<HTMLImageElement | null>(null)

const handleSelect = () => {
  let rect
  if (imgRef.value) {
    const r = imgRef.value.getBoundingClientRect()
    rect = { left: r.left, top: r.top, width: r.width, height: r.height }
  }
  emit('select', props.offer, rect)
}
</script>