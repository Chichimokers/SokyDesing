import { ref, computed, readonly } from 'vue'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

// Estado global de autenticación
const isLoggedIn = ref(false)
const currentUser = ref<User | null>(null)

export const useAuth = () => {
  // Simular login (aquí conectarías con tu backend)
  const login = (userData: User) => {
    isLoggedIn.value = true
    currentUser.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('isLoggedIn', 'true')
  }

  // Logout
  const logout = () => {
    isLoggedIn.value = false
    currentUser.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('isLoggedIn')
  }

  // Obtener inicial del nombre del usuario
  const getUserInitial = computed(() => {
    if (!currentUser.value?.name) return '?'
    return currentUser.value.name.charAt(0).toUpperCase()
  })

  // Verificar estado de autenticación al cargar
  const checkAuthStatus = () => {
    const savedUser = localStorage.getItem('user')
    const savedLoginState = localStorage.getItem('isLoggedIn')
    
    if (savedUser && savedLoginState === 'true') {
      currentUser.value = JSON.parse(savedUser)
      isLoggedIn.value = true
    }
  }

  // Simular login rápido para testing
  const simulateLogin = () => {
    const testUser: User = {
      id: '1',
      name: 'Juan Pérez',
      email: 'juan@email.com'
    }
    login(testUser)
  }

  return {
    isLoggedIn: readonly(isLoggedIn),
    currentUser: readonly(currentUser),
    getUserInitial,
    login,
    logout,
    checkAuthStatus,
    simulateLogin
  }
}