import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted } from 'vue'

export function useRippleEffect() {
  const ripples = ref<Array<{x: number, y: number, size: number, id: number}>>([])
  let rippleId = 0

  const createRipple = (x: number, y: number) => {
    const ripple = {
      x,
      y,
      size: Math.random() * 100 + 50, // Tamaño aleatorio entre 50-150px
      id: rippleId++
    }
    
    ripples.value.push(ripple)
    
    // Remover la onda después de la animación
    setTimeout(() => {
      ripples.value = ripples.value.filter(r => r.id !== ripple.id)
    }, 2000)
  }

  const handleMouseMove = (event: MouseEvent) => {
    createRipple(event.clientX, event.clientY)
  }

  const handleMouseLeave = () => {
    // Limpiar todas las ondas al salir
    ripples.value = []
  }

  onMounted(() => {
    // Agregar event listener al montar
    document.addEventListener('mousemove', handleMouseMove)
  })

  onUnmounted(() => {
    // Limpiar event listener al desmontar
    document.removeEventListener('mousemove', handleMouseMove)
  })

  return {
    ripples,
    handleMouseLeave
  }
}