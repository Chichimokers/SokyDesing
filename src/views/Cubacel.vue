<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <Navbar />

    <div class="pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8 text-center">
          <h1 class="text-3xl md:text-4xl font-bold text-white">Compra Celulares o Líneas Cubacel y Turista</h1>
          <p class="text-gray-400 mt-2">Elige el plan que mejor se adapte a ti</p>
        </div>

        <!-- Pills to jump to sections -->
        <div class="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <a href="#tur-plus" class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition">Tarjeta SIM Cubacel Turista</a>
          <a href="#permanente" class="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition">Tarjeta SIM Cubacel Regular</a>
        </div>

        <!-- Important notes -->
        <div class="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl text-yellow-300">
            <p class="font-semibold">Nota Importante</p>
            <p class="text-yellow-200/90 mt-1">Retire su pedido en 30 días o este expirará sin reembolso.</p>
          </div>
          <div class="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-blue-300">
            <p class="font-semibold">Requisito</p>
            <p class="text-blue-200/90 mt-1">Exclusivo para beneficiarios mayores de 18 años.</p>
          </div>
        </div>

        <!-- Two-column responsive layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <!-- Tur Plus Card -->
          <div id="tur-plus" class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-white">SIM Cubacel Tur Plus</h2>
                <p class="text-gray-300 mt-1">Incluye 10GB, 100 minutos, 100 SMS + WhatsApp y Facebook ilimitados por 30 días</p>
                <a href="https://suenacuba.com/tourist_sim_card_cuba_buy" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center gap-1 mt-1">
                  Más info
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6m0 0v6m0-6L10 16"/></svg>
                </a>
              </div>
            </div>

            <!-- Fixed pickup office -->
            <div class="mb-6 p-3 bg-white/5 border border-white/10 rounded-xl text-gray-300">
              <span class="font-medium text-white">Lugar de recogida:</span>
              <span class="ml-1">ETESCA OFICINAS COMERCIALES. Abierto 8am–7pm</span>
            </div>

            <!-- Form -->
            <form ref="turFormEl" @submit.prevent="submitTurPlus" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Nacionalidad</label>
                  <input v-model="turForm.nationality" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Ej: Española" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Carnet o Pasaporte</label>
                  <input v-model="turForm.idCard" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Número de identificación" required />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Nombre</label>
                  <input v-model="turForm.firstName" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Nombre" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Primer Apellido</label>
                  <input v-model="turForm.lastName1" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Primer apellido" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Segundo Apellido (Opcional)</label>
                  <input v-model="turForm.lastName2" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Segundo apellido" />
                </div>
              </div>

              <!-- Optional extensions -->
              <div>
                <label class="block text-sm font-semibold text-white mb-2">Extensiones opcionales (máx. 3 meses)</label>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" v-model="turForm.addons" value="Data 10 GB – 23.62" class="form-checkbox text-blue-500 rounded" />
                    <span class="text-gray-200">Data 10 GB – 23.62 USD</span>
                  </label>
                  <label class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" v-model="turForm.addons" value="Data 20 GB – 35.43" class="form-checkbox text-blue-500 rounded" />
                    <span class="text-gray-200">Data 20 GB – 35.43 USD</span>
                  </label>
                  <label class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" v-model="turForm.addons" value="Data 50 GB – 70.85" class="form-checkbox text-blue-500 rounded" />
                    <span class="text-gray-200">Data 50 GB – 70.85 USD</span>
                  </label>
                  <label class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" v-model="turForm.addons" value="Voice 20 Minutes – 12.50" class="form-checkbox text-blue-500 rounded" />
                    <span class="text-gray-200">Voice Recharge 20 Minutes – 12.50 USD</span>
                  </label>
                  <label class="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 cursor-pointer">
                    <input type="checkbox" v-model="turForm.addons" value="Voice 30 Minutes – 18.40" class="form-checkbox text-blue-500 rounded" />
                    <span class="text-gray-2 00">Voice Recharge 30 Minutes – 18.40 USD</span>
                  </label>
                </div>
                <p v-if="turForm.addons.length > 0" class="text-xs text-gray-400 mt-2">Seleccionadas: {{ turForm.addons.join(', ') }}</p>
              </div>

              <button type="button" @click="handleTurPlusClick" class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">Solicitar Tur Plus</button>
            </form>
          </div>

          <!-- Permanente Card -->
          <div id="permanente" class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h2 class="text-2xl font-bold text-white">SIM Cubacel Permanente</h2>
                <a href="https://suenacuba.com/phone?card=cubacel" target="_blank" class="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center gap-1 mt-1">
                  Más info
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6m0 0v6m0-6L10 16"/></svg>
                </a>
              </div>
            </div>

            <form ref="permFormEl" @submit.prevent="submitPermanent" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Nacionalidad</label>
                  <input v-model="permForm.nationality" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Ej: Cubana" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Carnet o Pasaporte</label>
                  <input v-model="permForm.idCard" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Número de identificación" required />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Nombre</label>
                  <input v-model="permForm.firstName" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Nombre" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Primer Apellido</label>
                  <input v-model="permForm.lastName1" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Primer apellido" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Segundo Apellido (Opcional)</label>
                  <input v-model="permForm.lastName2" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" placeholder="Segundo apellido" />
                </div>
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-300 mb-2">Oficina de recogida</label>
                <select v-model="permForm.pickupOffice" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" required>
                  <option disabled value="">Selecciona una oficina</option>
                  <option value="ETECSA Centro Habana">ETECSA Centro Habana</option>
                  <option value="ETECSA Vedado">ETECSA Vedado</option>
                  <option value="ETECSA Playa">ETECSA Playa</option>
                  <option value="ETECSA Santiago de Cuba">ETECSA Santiago de Cuba</option>
                </select>
              </div>

              <button type="button" @click="handlePermanentClick" class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">Solicitar Permanente</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <SimPurchaseConfirmation
      :isOpen="showConfirm"
      :details="confirmDetails"
      @close="showConfirm = false"
    />

    <!-- Info sections -->
    <div class="px-4 sm:px-6 lg:px-8 pb-20">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <h3 class="text-xl font-bold text-white mb-2">¿Cómo funciona?</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 rounded-xl bg-black/40 border border-white/10">
              <div class="text-blue-400 font-semibold">1) Entre el número telefónico</div>
              <p class="text-gray-300 text-sm mt-1">Seleccione su destino de la lista de países. Luego, entre el número telefónico al cual desea recargar.</p>
            </div>
            <div class="p-4 rounded-xl bg-black/40 border border-white/10">
              <div class="text-blue-400 font-semibold">2) Seleccione el monto</div>
              <p class="text-gray-300 text-sm mt-1">Verifique los montos disponibles y seleccione el monto que desea enviar.</p>
            </div>
            <div class="p-4 rounded-xl bg-black/40 border border-white/10">
              <div class="text-blue-400 font-semibold">3) Confirme su pago</div>
              <p class="text-gray-300 text-sm mt-1">Realice su pago en línea de forma segura y rápida.</p>
            </div>
          </div>
        </div>
        <div class="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
          <h3 class="text-xl font-bold text-white mb-2">Servicios</h3>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li>• Línea Cubacel Tur</li>
            <li>• Directorio Telefónico</li>
            <li>• Programa de Referidos</li>
          </ul>
          <h3 class="text-xl font-bold text-white mt-6 mb-2">Políticas</h3>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li>• Política de Privacidad</li>
            <li>• Términos y Condiciones</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRecharge } from '@/composables/useRecharge'
import Navbar from '@/components/Navbar.vue'
import SimPurchaseConfirmation from '@/components/SimPurchaseConfirmation.vue'

const turForm = ref({
  nationality: '',
  idCard: '',
  firstName: '',
  lastName1: '',
  lastName2: '',
  addons: [] as string[]
})

const permForm = ref({
  nationality: '',
  idCard: '',
  firstName: '',
  lastName1: '',
  lastName2: '',
  pickupOffice: ''
})

const showConfirm = ref(false)
const confirmDetails = ref({ fullName: '', idCard: '', pickupOffice: '', code: '' })
const { addSimPurchase } = useRecharge()
const turFormEl = ref<HTMLFormElement | null>(null)
const permFormEl = ref<HTMLFormElement | null>(null)

const generateCode = () => Math.floor(100000000000 + Math.random() * 900000000000).toString()

const submitTurPlus = () => {
  const fullName = [turForm.value.firstName, turForm.value.lastName1, turForm.value.lastName2].filter(Boolean).join(' ')
  confirmDetails.value = {
    fullName,
    idCard: turForm.value.idCard,
    pickupOffice: 'ETESCA OFICINAS COMERCIALES. Abierto 8am–7pm',
    code: generateCode()
  }
  // Registrar en historial
  addSimPurchase({ type: 'tur_plus', fullName, idCard: turForm.value.idCard, pickupOffice: confirmDetails.value.pickupOffice })
  showConfirm.value = true
}

const handleTurPlusClick = () => {
  if (turFormEl.value && !turFormEl.value.reportValidity()) return
  submitTurPlus()
}

const submitPermanent = () => {
  if (!permForm.value.pickupOffice) return
  const fullName = [permForm.value.firstName, permForm.value.lastName1, permForm.value.lastName2].filter(Boolean).join(' ')
  confirmDetails.value = {
    fullName,
    idCard: permForm.value.idCard,
    pickupOffice: permForm.value.pickupOffice,
    code: generateCode()
  }
  // Registrar en historial
  addSimPurchase({ type: 'permanente', fullName, idCard: permForm.value.idCard, pickupOffice: permForm.value.pickupOffice })
  showConfirm.value = true
}

const handlePermanentClick = () => {
  if (permFormEl.value && !permFormEl.value.reportValidity()) return
  submitPermanent()
}
</script>
