<template>
  <nav class="bg-[#1f1f1f]/95 backdrop-blur-md shadow-2xl border-b border-gray-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 md:h-20">
        <!-- Logo - Responsive -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2 md:space-x-3 group">
            <div class="h-10 w-10 md:h-16 md:w-16 p-1 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300 shadow-lg">
              <img 
                src="@/assets/images/android-chrome-192x192.png" 
                alt="Soky Recargas"
                class="w-full h-full object-contain rounded-lg md:rounded-xl"
              >
            </div>
            <div class="flex flex-col">
              <span class="font-special text-lg md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SOKY RECARGAS
              </span>
              <span class="text-xs text-gray-400 font-medium hidden sm:block">Recargas a Cuba</span>
            </div>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center space-x-1">
          <router-link 
            to="/" 
            class="nav-link px-4 py-2 rounded-xl transition-all duration-300"
            :class="{ 'nav-link-active': $route.path === '/' }"
          >
            Inicio
          </router-link>
          <router-link 
            to="/recargas" 
            class="nav-link px-4 py-2 rounded-xl transition-all duration-300"
            :class="{ 'nav-link-active': $route.path === '/recargas' }"
          >
            Recargas
          </router-link>
          <router-link 
            to="/profile" 
            class="nav-link px-4 py-2 rounded-xl transition-all duration-300"
            :class="{ 'nav-link-active': $route.path === '/profile' }"
          >
            Perfil
          </router-link>
          <router-link 
            to="/balance" 
            class="nav-link px-4 py-2 rounded-xl transition-all duration-300"
            :class="{ 'nav-link-active': $route.path === '/balance' }"
          >
            Balance
          </router-link>
          <router-link 
            to="/subscription" 
            class="nav-link px-4 py-2 rounded-xl transition-all duration-300"
            :class="{ 'nav-link-active': $route.path === '/subscription' }"
          >
            Suscripción
          </router-link>
        </div>

        <!-- Mobile/Tablet Right Side -->
        <div class="flex items-center space-x-2">
          <!-- Login Button - Desktop -->
          <router-link 
            to="/login" 
            class="hidden md:block bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 lg:px-6 py-2 lg:py-3 rounded-lg lg:rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm lg:text-base"
          >
            Iniciar Sesión
          </router-link>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            :class="{ 'bg-white/10': isMobileMenuOpen }"
          >
            <div class="w-6 h-6 flex flex-col justify-center items-center">
              <span 
                class="block w-6 h-0.5 bg-current transition-all duration-300 origin-center"
                :class="isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'"
              ></span>
              <span 
                class="block w-6 h-0.5 bg-current transition-all duration-300"
                :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"
              ></span>
              <span 
                class="block w-6 h-0.5 bg-current transition-all duration-300 origin-center"
                :class="isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'"
              ></span>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <transition 
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        @click="closeMobileMenu"
      ></div>
    </transition>

    <!-- Mobile Menu Panel -->
    <transition 
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-300 ease-in"
      enter-from-class="transform translate-x-full"
      leave-to-class="transform translate-x-full"
    >
      <div 
        v-if="isMobileMenuOpen" 
        class="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-xl border-l border-gray-700 shadow-2xl z-50 lg:hidden"
      >
        <!-- Mobile Menu Header -->
        <div class="flex items-center justify-between p-4 border-b border-gray-700">
          <div class="flex items-center space-x-3">
            <div class="h-10 w-10 p-1 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <img 
                src="@/assets/images/android-chrome-192x192.png" 
                alt="Soky Recargas"
                class="w-full h-full object-contain rounded-lg"
              >
            </div>
            <div>
              <span class="font-special text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SOKY
              </span>
              <p class="text-xs text-gray-400">Menú</p>
            </div>
          </div>
          <button
            @click="closeMobileMenu"
            class="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu Content -->
        <div class="flex-1 overflow-y-auto py-4">
          <!-- Navigation Links -->
          <div class="space-y-1 px-4">
            <router-link 
              to="/" 
              @click="closeMobileMenu"
              class="mobile-nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300"
              :class="{ 'mobile-nav-link-active': $route.path === '/' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Inicio
            </router-link>
            
            <router-link 
              to="/recargas" 
              @click="closeMobileMenu"
              class="mobile-nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300"
              :class="{ 'mobile-nav-link-active': $route.path === '/recargas' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
              Recargas
            </router-link>
            
            <router-link 
              to="/profile" 
              @click="closeMobileMenu"
              class="mobile-nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300"
              :class="{ 'mobile-nav-link-active': $route.path === '/profile' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Perfil
            </router-link>
            
            <router-link 
              to="/balance" 
              @click="closeMobileMenu"
              class="mobile-nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300"
              :class="{ 'mobile-nav-link-active': $route.path === '/balance' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Balance
            </router-link>
            
            <router-link 
              to="/subscription" 
              @click="closeMobileMenu"
              class="mobile-nav-link flex items-center px-4 py-3 rounded-xl transition-all duration-300"
              :class="{ 'mobile-nav-link-active': $route.path === '/subscription' }"
            >
              <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
              </svg>
              Suscripción
            </router-link>
          </div>

          <!-- Mobile Login Section -->
          <div class="mt-8 px-4 pt-8 border-t border-gray-700">
            <router-link 
              to="/login"
              @click="closeMobileMenu"
              class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
              Iniciar Sesión
            </router-link>

            <!-- Quick Actions -->
            <div class="mt-4 space-y-3">
              <button class="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 flex items-center">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span class="text-sm">Ayuda y Soporte</span>
              </button>
              
              <button class="w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-300 flex items-center">
                <svg class="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-sm">Configuración</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Footer -->
        <div class="p-4 border-t border-gray-700">
          <p class="text-xs text-gray-500 text-center">
            © 2024 Soky Recargas. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // Prevent body scroll when menu is open
  if (isMobileMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = 'unset'
}

// Close menu on route change
import { useRouter } from 'vue-router'
const router = useRouter()

onMounted(() => {
  router.afterEach(() => {
    closeMobileMenu()
  })
})

// Clean up body overflow on unmount
onUnmounted(() => {
  document.body.style.overflow = 'unset'
})

// Close menu on escape key
const handleEscape = (event) => {
  if (event.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscape)
})
</script>

<style scoped>
/* Fuente especial para el logo */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rajdhani:wght@600&family=Titillium+Web:wght@600&display=swap');

.font-special {
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  letter-spacing: 1px;
}

/* Estilos para los links de navegación desktop */
.nav-link {
  color: #9CA3AF;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  font-size: 0.95rem;
}

.nav-link:hover {
  color: #FFFFFF;
  background: rgba(59, 130, 246, 0.1);
  transform: translateY(-1px);
}

.nav-link-active {
  color: #60A5FA;
  background: rgba(59, 130, 246, 0.15);
  font-weight: 600;
}

.nav-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 2px;
  background: linear-gradient(to right, #3B82F6, #8B5CF6);
  border-radius: 2px;
}

/* Estilos para los links de navegación móvil */
.mobile-nav-link {
  color: #9CA3AF;
  font-weight: 500;
  position: relative;
  font-size: 0.95rem;
}

.mobile-nav-link:hover {
  color: #FFFFFF;
  background: rgba(59, 130, 246, 0.1);
  transform: translateX(4px);
}

.mobile-nav-link-active {
  color: #60A5FA;
  background: rgba(59, 130, 246, 0.15);
  font-weight: 600;
  border-left: 3px solid #3B82F6;
}

.mobile-nav-link-active::before {
  content: '';
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: linear-gradient(to bottom, #3B82F6, #8B5CF6);
  border-radius: 2px;
}

/* Hamburger menu animation */
.hamburger-line {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center;
}

/* Mobile menu backdrop */
.mobile-menu-backdrop {
  backdrop-filter: blur(4px);
  background: rgba(0, 0, 0, 0.5);
}

/* Mobile menu panel */
.mobile-menu-panel {
  background: rgba(17, 24, 39, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: -10px 0 25px -5px rgba(0, 0, 0, 0.3);
}

/* Smooth transitions */
.nav-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Mobile responsive adjustments */
@media (max-width: 1024px) {
  .nav-link {
    font-size: 0.9rem;
    padding: 0.5rem 0.75rem;
  }
}

@media (max-width: 768px) {
  .mobile-nav-link svg {
    min-width: 1.25rem;
  }
}

@media (max-width: 640px) {
  .font-special {
    font-size: 1rem;
    letter-spacing: 0.5px;
  }
}

/* Focus states for accessibility */
.nav-link:focus,
.mobile-nav-link:focus,
button:focus {
  outline: 2px solid #3B82F6;
  outline-offset: 2px;
}

/* Prevent text selection on buttons */
button {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Glass morphism effect for mobile menu */
@supports (backdrop-filter: blur(20px)) {
  .mobile-menu-panel {
    background: rgba(17, 24, 39, 0.9);
    backdrop-filter: blur(20px);
  }
}

/* Animation for mobile menu items */
.mobile-nav-link {
  animation-delay: calc(var(--i, 0) * 50ms);
}

/* Hover effects */
.mobile-nav-link:hover svg {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

/* Active state enhancements */
.nav-link-active,
.mobile-nav-link-active {
  box-shadow: inset 0 0 20px rgba(59, 130, 246, 0.1);
}

/* Button press effect */
button:active {
  transform: scale(0.98);
}

/* Smooth logo hover effect */
.group:hover .bg-gradient-to-br {
  background: linear-gradient(135deg, #2563eb, #7c3aed, #2563eb);
  background-size: 200% 200%;
  animation: gradient-shift 2s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>