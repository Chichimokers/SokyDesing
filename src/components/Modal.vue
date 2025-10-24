<template>
  <teleport to="body">
  <transition name="modal-fade" @before-enter="handleBeforeEnter" @enter="handleEnter" @leave="handleLeave" @after-leave="handleAfterLeave">
      <div v-if="isOpen" class="fixed inset-0 z-[55] flex items-center justify-center p-2 sm:p-4 md:p-6" @click="onOverlayClick">
        <!-- Overlay - Cobertura completa de pantalla (por debajo de la barra) -->
        <div ref="overlayRef" class="fixed inset-0 bg-black/70 backdrop-blur-sm z-[45]"></div>

        <!-- Container - Perfecto centrado responsive (por encima de la barra) -->
        <div class="relative w-35 max-w-[95vw] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto z-[60]">
          <div 
            ref="modalRef"
            @click.stop 
            class="bg-black/70 rounded-lg sm:rounded-xl border border-white/10 text-left overflow-hidden shadow-2xl w-full flex flex-col max-h-[95vh] sm:max-h-[90vh] md:max-h-[85vh] modal-content"
            role="dialog"
            aria-modal="true"
          >
        <header v-if="$slots.header" class="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 border-b border-white/5 flex-shrink-0">
          <slot name="header"></slot>
        </header>

        <div class="px-6 py-2.5 sm:py-3 md:py-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <slot></slot>
        </div>

        <footer v-if="$slots.footer" class="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[#2a2a2a] border-t border-white/5 flex-shrink-0">
          <slot name="footer"></slot>
        </footer>
        </div>
      </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch, onMounted, onUnmounted, nextTick, ref } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({ 
  isOpen: Boolean, 
  closeOnOverlay: { type: Boolean, default: true },
  originRect: { type: Object as PropType<{ left: number; top: number; width: number; height: number } | null>, default: null }
})
const emit = defineEmits(['close'])

const modalRef = ref<HTMLElement>()
const overlayRef = ref<HTMLElement>()
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
    // No limpiar aquí: esperar a que termine la animación (@after-leave)
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

// Leave transition to zoom back to the source element
const handleLeave = (el: Element, done: () => void) => {
  const panel = modalRef.value
  if (!panel) {
    done();
    return
  }
  const from = panel.getBoundingClientRect()
  const to = (props as any).originRect as undefined | { left: number; top: number; width: number; height: number }

  // Fallback to default fade if no origin provided
  if (!to) {
    const ov = overlayRef.value
    if (ov) {
      ov.style.transition = 'opacity 220ms ease'
      ov.style.opacity = '0'
    }
    panel.style.transition = 'transform 250ms ease, opacity 250ms ease'
    panel.style.transform = 'translateY(-12px)'
    panel.style.opacity = '0'
    panel.addEventListener('transitionend', () => done(), { once: true })
    return
  }

  const fromCenterX = from.left + from.width / 2
  const fromCenterY = from.top + from.height / 2
  const toCenterX = to.left + to.width / 2
  const toCenterY = to.top + to.height / 2
  const dx = toCenterX - fromCenterX
  const dy = toCenterY - fromCenterY

  // Efecto "tragado": escalamos a ~0 y movemos al centro del origen
  const targetScale = 0.001

  panel.style.willChange = 'transform, opacity, filter'
  panel.style.transformOrigin = 'center center'
  // Cubic-bezier con aceleración marcada para succión
  panel.style.transition = 'transform 420ms cubic-bezier(.2,.75,.2,1), opacity 260ms ease-out, filter 260ms ease-out'
  const ov = overlayRef.value
  if (ov) {
    // Fondo se desvanece ligeramente antes para revelar la tarjeta
    ov.style.transition = 'opacity 220ms ease-out'
    ov.style.opacity = '0'
  }

  requestAnimationFrame(() => {
    panel.style.transform = `translate(${dx}px, ${dy}px) scale(${targetScale})`
    panel.style.opacity = '0.15'
    panel.style.filter = 'blur(1px)'
  })

  panel.addEventListener('transitionend', () => {
    // Cleanup
    panel.style.transform = ''
    panel.style.opacity = ''
    panel.style.transition = ''
    panel.style.willChange = ''
    if (ov) {
      ov.style.opacity = ''
      ov.style.transition = ''
    }
    done()
  }, { once: true })
}

// Enter transition: zoom from source (shared element) when originRect is provided
const handleBeforeEnter = () => {
  const panel = modalRef.value
  if (!panel) return
  const to = (props as any).originRect as undefined | { left: number; top: number; width: number; height: number }

  if (!to) {
    // Fallback: let CSS classes handle default fade/scale
    return
  }

  // Set starting state at the origin element
  const target = panel.getBoundingClientRect()
  const targetCenterX = target.left + target.width / 2
  const targetCenterY = target.top + target.height / 2
  const fromCenterX = to.left + to.width / 2
  const fromCenterY = to.top + to.height / 2
  const dx = fromCenterX - targetCenterX
  const dy = fromCenterY - targetCenterY

  const scaleX = Math.max(0.001, to.width / target.width)
  const scaleY = Math.max(0.001, to.height / target.height)
  const scale = Math.max(0.001, Math.min(scaleX, scaleY))

  panel.style.willChange = 'transform, opacity, filter'
  panel.style.transformOrigin = 'center center'
  panel.style.transition = 'none'
  panel.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`
  panel.style.opacity = '0.15'
  panel.style.filter = 'blur(1px)'

  const ov = overlayRef.value
  if (ov) {
    ov.style.transition = 'none'
    ov.style.opacity = '0'
  }
}

const handleEnter = (_: Element, done: () => void) => {
  const panel = modalRef.value
  if (!panel) {
    done()
    return
  }
  const to = (props as any).originRect as undefined | { left: number; top: number; width: number; height: number }
  if (!to) {
    // Fallback to CSS-driven transition
    done()
    return
  }

  // Animate to final centered state
  panel.style.transition = 'transform 440ms cubic-bezier(.2,.75,.2,1), opacity 300ms ease-out, filter 300ms ease-out'
  requestAnimationFrame(() => {
    panel.style.transform = 'translate(0, 0) scale(1)'
    panel.style.opacity = '1'
    panel.style.filter = 'blur(0)'
  })

  const ov = overlayRef.value
  if (ov) {
    // Slightly delay overlay fade-in to emphasize source zoom
    requestAnimationFrame(() => {
      ov.style.transition = 'opacity 260ms ease-out'
      ov.style.opacity = '1'
    })
  }

  panel.addEventListener('transitionend', () => {
    // Cleanup inline styles to avoid interfering with layout
    panel.style.transition = ''
    panel.style.willChange = ''
    panel.style.transform = ''
    panel.style.opacity = ''
    panel.style.filter = ''
    if (ov) {
      ov.style.transition = ''
      ov.style.opacity = ''
    }
    done()
  }, { once: true })
}

// Do cleanup after the element is fully removed from DOM
const handleAfterLeave = () => {
  const scrollY = previousScrollPosition
  // Remover estilos de bloqueo del body
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.width = ''
  document.body.style.paddingRight = ''

  // Restaurar posición de scroll inmediatamente
  requestAnimationFrame(() => {
    window.scrollTo({ top: scrollY, behavior: 'instant' })
    document.body.offsetHeight
  })

  // Restaurar foco al elemento que estaba activo antes de abrir
  if (previousActiveElement) {
    setTimeout(() => {
      previousActiveElement?.focus()
      previousActiveElement = null
    }, 50)
  }
}
</script>

<style scoped>
/* Modal fade transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-active .modal-content,
.modal-fade-leave-active .modal-content {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-content,
.modal-fade-leave-to .modal-content {
  opacity: 0;
  transform: scale(0.95) translateY(-20px);
}

.modal-fade-enter-to .modal-content,
.modal-fade-leave-from .modal-content {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>
