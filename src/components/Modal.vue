<template>
  <teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[999999] flex items-center justify-center p-2 sm:p-4 md:p-6" @click="onOverlayClick" style="z-index: 999999 !important;">
      <!-- Overlay - Cobertura completa de pantalla -->
      <div class="fixed inset-0 bg-transparent backdrop-blur-sm transition-opacity duration-300" style="z-index: 999998 !important;"></div>

      <!-- Container - Perfecto centrado responsive -->
      <div class="relative w-full max-w-[95vw] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto" style="z-index: 999999 !important;">
        <div 
          ref="modalRef"
          @click.stop 
          class="bg-[#1a1a1a] rounded-lg sm:rounded-xl border border-white/10 text-left overflow-hidden shadow-2xl transform transition-all w-full flex flex-col max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh]"
          role="dialog"
          aria-modal="true"
          style="z-index: 999999 !important;"
        >
        <header v-if="$slots.header" class="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 border-b border-white/5 flex-shrink-0">
          <slot name="header"></slot>
        </header>

        <slot></slot>
      

        <footer v-if="$slots.footer" class="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#2a2a2a] border-t border-white/5 flex-shrink-0">
          <slot name="footer"></slot>
        </footer>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, onMounted, onUnmounted, nextTick, ref } from 'vue'

const props = defineProps({ isOpen: Boolean, closeOnOverlay: { type: Boolean, default: true } })
const emit = defineEmits(['close'])

const modalRef = ref<HTMLElement>()
let previousScrollPosition = 0
let previousActiveElement: HTMLElement | null = null

const onOverlayClick = () => {
  if (props.closeOnOverlay === false) return
  emit('close')
}

// Focus al primer elemento interactivo
const focusFirstElement = async () => {
  if (!modalRef.value) return
  
  await nextTick()
  
  const focusableElement = modalRef.value.querySelector('button, input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement
  if (focusableElement) {
    focusableElement.focus()
  }
}

// Manejar apertura/cierre del modal
watch(() => props.isOpen, async (isOpen) => {
  if (isOpen) {
    // Guardar elemento activo y posición de scroll
    previousActiveElement = document.activeElement as HTMLElement
    previousScrollPosition = window.pageYOffset
    
    // Bloquear scroll del body completamente
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${previousScrollPosition}px`
    document.body.style.width = '100%'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }
    
    // Asegurar que el viewport esté en la parte superior
    await nextTick()
    
    // Focus después de la transición
    setTimeout(() => {
      focusFirstElement()
    }, 100)
    
  } else {
    // Restaurar scroll del body
    document.body.style.overflow = ''
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    document.body.style.paddingRight = ''
    
    // Restaurar posición de scroll inmediatamente
    window.scrollTo(0, previousScrollPosition)
    
    // Restaurar foco
    if (previousActiveElement) {
      setTimeout(() => {
        if (previousActiveElement) {
          previousActiveElement.focus()
          previousActiveElement = null
        }
      }, 50)
    }
  }
})

// Manejar tecla Escape
const handleEscape = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

// Limpiar al desmontar
onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
})
</script>

<style scoped>
/* nothing here; styling uses Tailwind classes */
</style>
