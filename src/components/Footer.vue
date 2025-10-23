<template>
  <footer class="bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#1a1a1a] border-t border-gray-800 relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute inset-0" style="background-image: radial-gradient(circle at 25% 25%, rgba(156, 146, 172, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(96, 165, 250, 0.1) 0%, transparent 50%);"></div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
      <!-- Logo Section -->
      <div class="text-center mb-12">
        <div class="inline-block relative group">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700 scale-110"></div>
          <img 
            src="@/assets/images/logo.webp" 
            alt="Soky Recargas" 
            class="relative mx-auto w-40 sm:w-48 lg:w-56 transform hover:scale-105 transition-all duration-500 filter drop-shadow-2xl" 
          >
        </div>
        <div class="mt-6 max-w-2xl mx-auto">
          <p class="text-gray-300 text-lg font-light leading-relaxed">
            Tu plataforma confiable para recargas rápidas y seguras a Cuba
          </p>
          <div class="flex justify-center items-center mt-4 space-x-6">
            <div class="flex items-center space-x-2 text-green-400">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium">Servicio 24/7</span>
            </div>
            <div class="flex items-center space-x-2 text-blue-400">
              <div class="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span class="text-sm font-medium">Pagos Seguros</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Social Media Section -->
      <div class="mb-12">
        <h3 class="text-center text-white text-2xl font-bold mb-8">
          Síguenos en nuestras redes sociales
        </h3>
        <div class="flex flex-wrap justify-center items-center gap-6">
          <!-- Instagram -->
          <a 
            href="https://www.instagram.com/sokyrecargas" 
            target="_blank"
            class="social-link group bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-4 rounded-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 shadow-lg hover:shadow-2xl"
            title="Instagram"
          >
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.069-1.644-.069-4.849 0-3.204.013-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span class="text-white font-medium hidden sm:block">Instagram</span>
            </div>
          </a>

          <!-- Facebook -->
          <a 
            href="https://www.facebook.com/SokyRecargas" 
            target="_blank"
            class="social-link group bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 shadow-lg hover:shadow-2xl"
            title="Facebook"
          >
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
              <span class="text-white font-medium hidden sm:block">Facebook</span>
            </div>
          </a>

          <!-- Telegram -->
          <a 
            href="https://t.me/RecargasParaCuba" 
            target="_blank"
            class="social-link group bg-gradient-to-br from-sky-500 to-blue-600 p-4 rounded-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 shadow-lg hover:shadow-2xl"
            title="Telegram"
          >
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
              </svg>
              <span class="text-white font-medium hidden sm:block">Telegram</span>
            </div>
          </a>

          <!-- YouTube -->
          <a 
            href="https://www.youtube.com/@SokyRecargas" 
            target="_blank"
            class="social-link group bg-gradient-to-br from-red-600 to-red-700 p-4 rounded-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 shadow-lg hover:shadow-2xl"
            title="YouTube"
          >
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
              </svg>
              <span class="text-white font-medium hidden sm:block">YouTube</span>
            </div>
          </a>

          <!-- Linktree -->
          <a 
            href="https://linktr.ee/sokyrecargas" 
            target="_blank"
            class="social-link group bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 shadow-lg hover:shadow-2xl"
            title="Linktree"
          >
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.953 15.066c-.08 0-.16-.022-.23-.069l-2.52-1.646c-.13-.085-.167-.259-.082-.389.085-.13.259-.167.389-.082l2.29 1.498 2.267-1.498c.13-.085.304-.048.389.082.085.13.048.304-.082.389l-2.52 1.646c-.07.047-.15.069-.23.069zm0-3.998c-.08 0-.16-.022-.23-.069l-2.52-1.646c-.13-.085-.167-.259-.082-.389.085-.13.259-.167.389-.082l2.29 1.498 2.267-1.498c.13-.085.304-.048.389.082.085.13.048.304-.082.389l-2.52 1.646c-.07.047-.15.069-.23.069zm8.04 0c-.08 0-.16-.022-.23-.069l-2.52-1.646c-.13-.085-.167-.259-.082-.389.085-.13.259-.167.389-.082l2.29 1.498 2.267-1.498c.13-.085.304-.048.389.082.085.13.048.304-.082.389l-2.52 1.646c-.07.047-.15.069-.23.069zm0-3.998c-.08 0-.16-.022-.23-.069l-2.52-1.646c-.13-.085-.167-.259-.082-.389.085-.13.259-.167.389-.082l2.29 1.498 2.267-1.498c.13-.085.304-.048.389.082.085.13.048.304-.082.389l-2.52 1.646c-.07.047-.15.069-.23.069z"/>
              </svg>
              <span class="text-white font-medium hidden sm:block">Linktree</span>
            </div>
          </a>

          <!-- Trustpilot -->
          <a 
            href="https://www.trustpilot.com/review/sokyrecargas.com" 
            target="_blank"
            class="social-link group bg-gradient-to-br from-emerald-500 to-teal-600 p-4 rounded-2xl transform hover:scale-110 hover:rotate-3 transition-all duration-500 shadow-lg hover:shadow-2xl"
            title="Trustpilot"
          >
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="text-white font-medium hidden sm:block">Trustpilot</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-gray-800 pt-8">
        <div class="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
          <!-- Contact Info -->
          <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <a 
              href="https://t.me/sokyrecargas" 
              target="_blank"
              class="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-all duration-300 group"
            >
              <div class="bg-blue-500 p-2 rounded-lg group-hover:bg-blue-600 transition-all duration-300 group-hover:scale-110">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </div>
              <div>
                <div class="font-medium">Soporte Telegram</div>
                <div class="text-sm text-gray-400">@sokyrecargas</div>
              </div>
            </a>
            
            <a 
              href="mailto:SokyRecargas@gmail.com" 
              class="flex items-center space-x-3 text-gray-300 hover:text-red-400 transition-all duration-300 group"
            >
              <div class="bg-red-500 p-2 rounded-lg group-hover:bg-red-600 transition-all duration-300 group-hover:scale-110">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <div>
                <div class="font-medium">Email</div>
                <div class="text-sm text-gray-400">SokyRecargas@gmail.com</div>
              </div>
            </a>
          </div>

          <!-- Legal Links -->
          <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 text-sm">
            <button 
              @click="showTerms" 
              class="text-gray-400 hover:text-white transition-all duration-300 cursor-pointer hover:underline"
            >
              Términos y condiciones
            </button>
            <button 
              @click="showPrivacyPolicy" 
              class="text-gray-400 hover:text-white transition-all duration-300 cursor-pointer hover:underline"
            >
              Política de privacidad
            </button>
            <span class="text-gray-500 text-center">© 2025 SOKY RECARGAS. Todos los derechos reservados.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Terms and Conditions Popup -->
    <TermsAndConditionsPopup
      :show="showTermsPopup"
      @close="hideTerms"
      @accept="acceptTerms"
    />
  </footer>
</template>

<script setup lang="ts">
import { useTermsAndConditions } from '@/composables/useTermsAndConditions'
import TermsAndConditionsPopup from './TermsAndConditionsPopup.vue'

// Terms and conditions functionality
const { showTerms, showTermsPopup, hideTerms, acceptTerms } = useTermsAndConditions()

// Privacy policy (placeholder for now)
const showPrivacyPolicy = () => {
  alert('Política de Privacidad - Próximamente disponible')
}
</script>

<style scoped>
/* Custom animations and effects */
.social-link {
  position: relative;
  overflow: hidden;
}

.social-link::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
}

.social-link:hover::before {
  width: 120%;
  height: 120%;
}

.social-link:hover {
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

/* Pulse animation for status indicators */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Gradient animations */
.bg-gradient-to-br {
  background-size: 200% 200%;
  animation: gradientShift 6s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Hover effects for social links */
.social-link:hover {
  animation: none;
}

/* Custom scrollbar for better appearance */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #4a5568;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>