<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4 sm:p-6 lg:p-8" @click="onOverlayClick">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"></div>

    <!-- Container - Mobile first approach -->
    <div class="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl my-auto">
      <div @click.stop class="bg-[#1a1a1a] rounded-xl sm:rounded-2xl border border-white/10 text-left overflow-hidden shadow-xl transform transition-all max-h-[90vh] flex flex-col">
        <header v-if="$slots.header" class="px-4 sm:px-6 py-3 sm:py-4 border-b border-white/5 flex-shrink-0">
          <slot name="header"></slot>
        </header>

        <div class="px-4 sm:px-6 py-4 sm:py-6 flex-1 overflow-y-auto">
          <slot></slot>
        </div>

        <footer v-if="$slots.footer" class="px-4 sm:px-6 py-3 sm:py-4 bg-[#2a2a2a] border-t border-white/5 flex-shrink-0">
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({ isOpen: Boolean, closeOnOverlay: { type: Boolean, default: true } })
const emit = defineEmits(['close'])

const onOverlayClick = () => {
  if (props.closeOnOverlay === false) return
  emit('close')
}
</script>

<style scoped>
/* nothing here; styling uses Tailwind classes */
</style>
