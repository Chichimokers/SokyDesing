<template>
  <Modal :isOpen="isOpen" @close="$emit('close')">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
        <button @click="$emit('close')" class="text-white/80 hover:text-white transition-colors p-1">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </template>

    <div class="text-gray-200 whitespace-pre-line leading-relaxed text-sm">
      {{ body }}
    </div>

    <template #footer>
      <div class="flex gap-2">
        <button @click="$emit('close')" class="flex-1 bg-white/15 hover:bg-white/25 text-white py-2.5 rounded-lg font-semibold transition">Cerrar</button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from './Modal.vue'

const props = defineProps<{ isOpen: boolean; title: string; body: string }>()
const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<style scoped>
</style>
