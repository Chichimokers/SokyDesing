<template>
  <nav class="bg-[#1f1f1f]/95 backdrop-blur-md shadow-2xl border-b border-gray-800 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo Mejorado -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3 group">
            <div class="h-16 w-16 p-1 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300 shadow-lg">
              <img 
                src="../assets/images/android-chrome-192x192.png" 
                alt="Soky Recargas"
                class="w-full h-full object-contain rounded-xl"
              >
            </div>
            <div class="flex flex-col">
              <span class="font-special text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                SOKY RECARGAS
              </span>
              <span class="text-xs text-gray-400 font-medium">Recargas a Cuba</span>
            </div>
          </router-link>
        </div>

        <!-- Navigation Links Mejorados -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link 
            to="/" 
            class="nav-link px-5 py-2 rounded-xl transition-all duration-300"
            :class="{ 'nav-link-active': $route.path === '/' }"
          >
            Inicio
          </router-link>
          <router-link 
            to="/recargas" 
            class="nav-link px-5 py-2 rounded-xl transition-all duration-300"
            :class="{ 'nav-link-active': $route.path === '/recargas' }"
          >
            Recargas
          </router-link>
          <router-link 
            to="/profile" 
            class="nav-link px-5 py-2 rounded-xl transition-all duration-300"
            :class="{ 'nav-link-active': $route.path === '/profile' }"
          >
            Perfil
          </router-link>
            <router-link 
            to="/balance" 
            class="nav-link px-5 py-2 rounded-xl transition-all duration-300"
            :class="{ 'nav-link-active': $route.path === '/balance' }"
          >
            Balance
          </router-link>
            <router-link 
            to="/subscription" 
            class="nav-link px-5 py-2 rounded-xl transition-all duration-300"
            :class="{ 'nav-link-active': $route.path === '/subscription' }"
          >
            Suscripción
          </router-link>
        </div>

        <!-- User Section Mejorado -->
        <div class="flex items-center space-x-4">
          <router-link 
            to="/login" 
            class="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Iniciar Sesión
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Fuente especial para el logo */
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rajdhani:wght@600&family=Titillium+Web:wght@600&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Rajdhani:wght@600&display=swap');

.font-special {
  font-family: 'Orbitron', monospace;
  font-weight: 700;
  letter-spacing: 1px;
}

/* Estilos para los links de navegación */
.nav-link {
  color: #9CA3AF;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.nav-link:hover {
  color: #FFFFFF;
  background: rgba(59, 130, 246, 0.1);
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
  width: 30px;
  height: 2px;
  background: linear-gradient(to right, #3B82F6, #8B5CF6);
  border-radius: 2px;
}

/* Efecto hover suave para el logo */
.logo-container:hover .logo-text {
  background: linear-gradient(to right, #60A5FA, #A78BFA);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>