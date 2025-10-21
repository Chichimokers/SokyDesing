import { ref, nextTick } from 'vue'

// Estado global para modales múltiples
const activeModals = ref<Set<string>>(new Set())
const modalStack = ref<string[]>([])

export const useModal = (modalId?: string) => {
  const isOpen = ref(false)
  const currentModalId = modalId || `modal-${Math.random().toString(36).substr(2, 9)}`

  const openModal = async () => {
    isOpen.value = true
    activeModals.value.add(currentModalId)
    modalStack.value.push(currentModalId)
    
    // Scroll al top y bloquear scroll del body
    await nextTick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    setTimeout(() => {
      document.body.style.overflow = 'hidden'
      // Compensar el scrollbar que desaparece
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
    }, 100)
  }

  const closeModal = () => {
    isOpen.value = false
    activeModals.value.delete(currentModalId)
    
    // Remover del stack
    const index = modalStack.value.indexOf(currentModalId)
    if (index > -1) {
      modalStack.value.splice(index, 1)
    }
    
    // Si no hay más modales, restaurar scroll
    if (activeModals.value.size === 0) {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }

  const toggleModal = () => {
    if (isOpen.value) {
      closeModal()
    } else {
      openModal()
    }
  }

  // Función para obtener el z-index correcto basado en el stack
  const getZIndex = () => {
    const baseZIndex = 50
    const stackPosition = modalStack.value.indexOf(currentModalId)
    return baseZIndex + stackPosition
  }

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal,
    getZIndex,
    activeModalsCount: () => activeModals.value.size,
    isTopModal: () => modalStack.value[modalStack.value.length - 1] === currentModalId
  }
}

// Utilidad para cerrar todos los modales
export const closeAllModals = () => {
  activeModals.value.clear()
  modalStack.value = []
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

// Utilidad para verificar si hay modales abiertos
export const hasOpenModals = () => activeModals.value.size > 0