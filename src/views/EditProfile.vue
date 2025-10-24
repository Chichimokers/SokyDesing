<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <!-- Edit Profile Header Section -->
    <div class="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <!-- Back Button -->
        <button 
          @click="$router.go(-1)"
          class="mb-6 flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Volver al Perfil
        </button>

        <!-- Edit Profile Card -->
        <div class="profile-card bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/10 shadow-2xl">
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
            <h1 class="text-3xl font-bold text-white mb-2">Editar Perfil</h1>
            <p class="text-gray-300">Actualiza tu información personal</p>
          </div>

          <!-- Avatar Section -->
          <div class="flex flex-col items-center mb-8">
            <div class="relative group">
              <div class="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-1 shadow-2xl">
                <div class="w-full h-full rounded-full bg-gray-600 flex items-center justify-center overflow-hidden">
                  <svg v-if="!form.avatar" class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                  <img v-else :src="form.avatar" alt="Avatar" class="w-full h-full object-cover" />
                </div>
              </div>
              <button 
                type="button"
                @click="triggerFileUpload"
                class="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </button>
              <input 
                ref="fileInput"
                type="file" 
                @change="handleAvatarChange"
                accept="image/*" 
                class="hidden"
              />
            </div>
            <p class="text-gray-400 text-sm mt-3">Haz clic en la cámara para cambiar tu foto</p>
          </div>

          <!-- Edit Profile Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Personal Information Section -->
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Información Personal
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Full Name -->
                <div>
                  <label for="name" class="block text-sm font-semibold text-gray-300 mb-2">
                    Nombre Completo
                  </label>
                  <div class="relative">
                    <input
                      id="name"
                      v-model="form.name"
                      type="text"
                      class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="Tu nombre completo"
                      required
                    />
                    <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                  </div>
                  <p v-if="errors.name" class="text-red-400 text-sm mt-2">{{ errors.name }}</p>
                </div>

                <!-- Username -->
                <div>
                  <label for="username" class="block text-sm font-semibold text-gray-300 mb-2">
                    Nombre de Usuario
                  </label>
                  <div class="relative">
                    <input
                      id="username"
                      v-model="form.username"
                      type="text"
                      class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="@username"
                    />
                    <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Contact Information Section -->
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Información de Contacto
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Email -->
                <div>
                  <label for="email" class="block text-sm font-semibold text-gray-300 mb-2">
                    Correo Electrónico
                  </label>
                  <div class="relative">
                    <input
                      id="email"
                      v-model="form.email"
                      type="email"
                      class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="tu@email.com"
                      required
                    />
                    <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <p v-if="errors.email" class="text-red-400 text-sm mt-2">{{ errors.email }}</p>
                </div>

                <!-- Phone -->
                <div>
                  <label for="phone" class="block text-sm font-semibold text-gray-300 mb-2">
                    Teléfono
                  </label>
                  <div class="relative">
                    <input
                      id="phone"
                      v-model="form.phone"
                      type="tel"
                      class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="+53 5812 6024"
                      required
                    />
                    <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <p v-if="errors.phone" class="text-red-400 text-sm mt-2">{{ errors.phone }}</p>
                </div>
              </div>
            </div>

            <!-- Location Information Section -->
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Ubicación
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Country -->
                <div>
                  <label for="country" class="block text-sm font-semibold text-gray-300 mb-2">
                    País
                  </label>
                  <select
                    id="country"
                    v-model="form.country"
                    class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  >
                    <option value="" disabled class="bg-gray-800">Selecciona tu país</option>
                    <option value="Cuba" class="bg-gray-800">Cuba</option>
                    <option value="Estados Unidos" class="bg-gray-800">Estados Unidos</option>
                    <option value="España" class="bg-gray-800">España</option>
                    <option value="México" class="bg-gray-800">México</option>
                    <option value="Argentina" class="bg-gray-800">Argentina</option>
                    <option value="Otro" class="bg-gray-800">Otro</option>
                  </select>
                </div>

                <!-- City -->
                <div>
                  <label for="city" class="block text-sm font-semibold text-gray-300 mb-2">
                    Ciudad
                  </label>
                  <div class="relative">
                    <input
                      id="city"
                      v-model="form.city"
                      type="text"
                      class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                      placeholder="Tu ciudad"
                    />
                    <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Preferences Section -->
            <div class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h3 class="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                Preferencias
              </h3>
              
              <div class="space-y-4">
                <!-- Language -->
                <div>
                  <label for="language" class="block text-sm font-semibold text-gray-300 mb-2">
                    Idioma Preferido
                  </label>
                  <select
                    id="language"
                    v-model="form.language"
                    class="w-full px-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                  >
                    <option value="es" class="bg-gray-800">Español</option>
                    <option value="en" class="bg-gray-800">English</option>
                  </select>
                </div>

                <!-- Notifications -->
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-white font-semibold">Notificaciones por Email</h4>
                    <p class="text-gray-400 text-sm">Recibe actualizaciones sobre tus recargas</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="form.emailNotifications" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <!-- SMS Notifications -->
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="text-white font-semibold">Notificaciones por SMS</h4>
                    <p class="text-gray-400 text-sm">Recibe confirmaciones por mensaje de texto</p>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input v-model="form.smsNotifications" type="checkbox" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Submit Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                :disabled="isLoading || !isFormValid"
                class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg v-if="isLoading" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isLoading ? 'Guardando...' : 'Guardar Cambios' }}
              </button>
              
              <button
                type="button"
                @click="$router.push('/profile')"
                class="border border-gray-500 text-gray-300 hover:bg-gray-500 hover:text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()

// Form state
const form = ref({
  avatar: null as string | null,
  name: '',
  username: '',
  email: '',
  phone: '',
  country: '',
  city: '',
  language: 'es',
  emailNotifications: true,
  smsNotifications: true
})

// UI state
const isLoading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// Validation errors
const errors = ref({
  name: '',
  email: '',
  phone: ''
})

// Load current user data (in real app, this would come from an API)
onMounted(() => {
  // Simulate loading current user data
  form.value = {
    avatar: null,
    name: 'Ernesto',
    username: 'ernesto_dev',
    email: 'developer1575@gmail.com',
    phone: '+5358126024',
    country: 'Cuba',
    city: 'La Habana',
    language: 'es',
    emailNotifications: true,
    smsNotifications: false
  }
})

// Form validation
const isFormValid = computed(() => {
  return form.value.name.length > 0 &&
         form.value.email.length > 0 &&
         form.value.phone.length > 0 &&
         Object.values(errors.value).every(error => !error)
})

// Validate form
const validateForm = () => {
  errors.value = {
    name: '',
    email: '',
    phone: ''
  }

  if (form.value.name.trim().length === 0) {
    errors.value.name = 'El nombre es requerido'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Email inválido'
  }

  if (form.value.phone.trim().length < 10) {
    errors.value.phone = 'Teléfono inválido'
  }

  return Object.values(errors.value).every(error => !error)
}

// Handle avatar upload
const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleAvatarChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.avatar = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) return

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would make the actual API call
    console.log('Updating profile:', form.value)

    // Success - redirect to profile with success message
    router.push({ 
      path: '/profile',
      query: { success: 'profile-updated' }
    })
  } catch (error) {
    console.error('Error updating profile:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.profile-card {
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Glass morphism effects */
@supports (backdrop-filter: blur(20px)) {
  .profile-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
  }
}

/* Responsive improvements */
@media (max-width: 768px) {
  .profile-card {
    padding: 1.5rem;
  }
}

/* Form focus animations */
input:focus,
select:focus {
  transform: translateY(-1px);
}

/* Button hover effects */
button:not(:disabled):hover {
  transform: translateY(-2px);
}

/* Toggle switch styles */
.peer:checked + .peer-checked\:bg-blue-600 {
  background-color: rgb(37 99 235);
}
</style>