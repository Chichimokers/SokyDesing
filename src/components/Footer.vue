<template>
  <footer class="bg-[#1a1a1a] border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

        <!-- Brand Section -->
         <div class="col-span-1 lg:col-span-2">

        <div class="">
        <img 
            src="../assets/images/logo.webp" 
            alt="Soky Recargas" 
            class="mx-auto mb-4 w-48" 
        >
        </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Features -->
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                <span class="text-gray-300 font-medium">Recargas rápidas</span>
              </div>
              <p class="text-gray-400 text-sm">Recibe tu recarga al instante.</p>
              
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span class="text-gray-300 font-medium">Compra segura</span>
              </div>
              <p class="text-gray-400 text-sm">Tu seguridad es prioridad.</p>
              
              <div class="flex items-center space-x-2">
                <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span class="text-gray-300 font-medium">Precios competitivos</span>
              </div>
              <p class="text-gray-400 text-sm">Bajos precios, aceptamos USDT y PayPal.</p>
            </div>

            <!-- Contact Links -->
            <div class="space-y-4">
              <h3 class="text-white font-semibold mb-3">Envíame un mensaje</h3>
              <a href="https://t.me/sokyrecargas" class="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition group">
                <div class="bg-blue-500 p-2 rounded-lg group-hover:bg-blue-600 transition">
                  <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-medium">Telegram</div>
                  <div class="text-sm text-gray-400">@sokyrecargas</div>
                </div>
              </a>
              
              <a href="mailto:SokyRecargas@gmail.com" class="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition group">
                <div class="bg-red-500 p-2 rounded-lg group-hover:bg-red-600 transition">
                  <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div>
                  <div class="font-medium">Correo</div>
                  <div class="text-sm text-gray-400">SokyRecargas@gmail.com</div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold mb-4 text-lg">Enlaces Rápidos</h3>
          <div class="space-y-3">
            <div v-for="link in quickLinks" :key="link.name" class="flex items-center space-x-2">
              <div class="w-1 h-1 bg-gray-600 rounded-full"></div>
              <router-link :to="link.path" class="text-gray-400 hover:text-white transition text-sm">
                {{ link.name }}
              </router-link>
            </div>
          </div>
        </div>

        <!-- Newsletter -->
        <div>
          <h3 class="text-white font-semibold mb-4 text-lg">Suscríbete</h3>
          <p class="text-gray-400 text-sm mb-4">
            Manténgase actualizado con anuncios y ofertas exclusivas, no dude en registrarse con su correo electrónico.
          </p>
          
          <div class="flex space-x-2">
            <input 
              type="email" 
              placeholder="Correo electrónico"
              class="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
            <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition text-sm font-medium">
              Enviar
            </button>
          </div>
        </div>
      </div>

      <!-- Social Links & Legal -->
      <div class="border-t border-gray-800 pt-8">
        <div class="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <!-- Social Media -->
          <div class="flex items-center space-x-6">
            <span class="text-gray-400 font-medium">Redes Sociales:</span>
            <div class="flex space-x-4">
              <a v-for="social in socialMedia" :key="social.name" 
                 :href="social.url" 
                 class="text-gray-400 hover:text-white transition"
                 :title="social.name">
                <component :is="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>

          <!-- Legal Links -->
          <div class="flex items-center space-x-6 text-sm">
            <router-link to="/terms" class="text-gray-400 hover:text-white transition">
              Términos y condiciones
            </router-link>
            <router-link to="/privacy" class="text-gray-400 hover:text-white transition">
              Política de privacidad
            </router-link>
            <span class="text-gray-400">© 2024 SOKY RECARGAS</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Social Media Icons as components
const TelegramIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.14.141-.259.259-.374.261l.213-3.053 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
    </svg>
  `
}

const YoutubeIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
    </svg>
  `
}

const FacebookIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
    </svg>
  `
}

const InstagramIcon = {
  template: `
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.069-1.644-.069-4.849 0-3.204.013-3.583.069-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  `
}

const quickLinks = ref([
  { name: 'Error @salvindesa', path: '/support' },
  { name: 'Vite App', path: '/about' },
  { name: 'Password Minimals', path: '/security' },
  { name: 'Soky Recarga', path: '/' },
  { name: 'Home – Figma', path: '/design' }
])

const socialMedia = ref([
  { name: 'Canal YouTube', url: '#', icon: YoutubeIcon },
  { name: 'Facebook', url: '#', icon: FacebookIcon },
  { name: 'Instagram', url: '#', icon: InstagramIcon },
  { name: 'Telegram', url: 'https://t.me/sokyrecargas', icon: TelegramIcon }
])
</script>

<style scoped>
/* Custom styles for better appearance */
</style>