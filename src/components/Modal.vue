<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-8" @click="onOverlayClick">
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"></div>

    <!-- Container -->
    <div class="relative max-w-lg w-full my-auto">
      <div @click.stop class="bg-[#1a1a1a] rounded-2xl border border-white/10 text-left overflow-hidden shadow-xl transform transition-all">
        <header v-if="$slots.header" class="px-6 py-4 border-b border-white/5">
          <slot name="header"></slot>
        </header>

        <div class="px-6 py-6">
          <slot></slot>
        </div>

        <footer v-if="$slots.footer" class="px-6 py-4 bg-[#2a2a2a] border-t border-white/5">
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
