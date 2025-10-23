<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
    <Navbar />

    <div class="pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8 text-center">
          <h1 class="text-3xl md:text-4xl font-bold text-white">Compra Líneas Cubacel y Turista</h1>
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

  <!-- Responsive layout -->
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
                <div class="flex flex-wrap items-center gap-2">
                  <h2 class="text-2xl font-bold text-white">SIM Cubacel Tur Plus</h2>
                  <span class="px-2.5 py-1 rounded-lg bg-blue-500/15 text-blue-300 border border-blue-500/30 text-sm">$35 USD</span>
                </div>
                <p class="text-gray-300 mt-1">Incluye 10GB, 100 minutos, 100 SMS + WhatsApp y Facebook ilimitados por 30 días</p>
                <button type="button" @click="openInfo('tur')" class="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center gap-1 mt-1">
                  Más info
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6m0 0v6m0-6L10 16"/></svg>
                </button>
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
                  <select v-model="turForm.nationality" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" required>
                    <option disabled value="">Selecciona tu nacionalidad</option>
                    <option v-for="n in nationalities" :key="n" :value="n">{{ n }}</option>
                  </select>

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

              <button type="button" @click="handleTurPlusClick" class="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">Solicitar Tur Plus — $35</button>
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
                <div class="flex flex-wrap items-center gap-2">
                  <h2 class="text-2xl font-bold text-white">SIM Cubacel Permanente</h2>
                  <span class="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-sm">$45 USD</span>
                </div>
                <p class="text-gray-300 mt-1">Incluye 250 CUP de saldo inicial</p>
                <button type="button" @click="openInfo('perm')" class="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center gap-1 mt-1">
                  Más info
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6m0 0v6m0-6L10 16"/></svg>
                </button>
              </div>
            </div>

            <form ref="permFormEl" @submit.prevent="submitPermanent" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Nacionalidad</label>
                  <select v-model="permForm.nationality" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" required>
                    <option disabled value="">Selecciona tu nacionalidad</option>
                    <option v-for="n in nationalities" :key="n" :value="n">{{ n }}</option>
                  </select>
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

              <button type="button" @click="handlePermanentClick" class="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">Solicitar Permanente — $45</button>
            </form>
          </div>

          <!-- Módem ETECSA Card -->
          <div id="modem" class="bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-2xl">
            <div class="flex items-start gap-4 mb-4">
              <div class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M5 11h14M7 15h10M9 19h6"/>
                </svg>
              </div>
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h2 class="text-2xl font-bold text-white">Módem ETECSA</h2>
                  <span class="px-2.5 py-1 rounded-lg bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-sm">$99.99 USD</span>
                </div>
                <div class="mt-2 p-3 rounded-xl text-gray-300">
                  <span class="font-medium text-white">Incluye:</span>
                  <span class="ml-1">Módem Huawei B311-221 + SIM de Datos + 100GB</span>
                </div>
                <button type="button" @click="openInfo('modem')" class="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center gap-1 mt-1">
                  Más info
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6m0 0v6m0-6L10 16"/></svg>
                </button>
              </div>
            </div>

            <div class="mb-4">
              <!-- Imagen representativa del módem -->
              <div class="w-full aspect-video bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400">
               <img src="@/assets/images/offer_phph1je9vurekis8bYDwm3_1759729559.jpg"></img>
              </div>
            </div>

            <!-- Modem Form -->
            <form ref="modemFormEl" @submit.prevent="handleModemClick" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Nacionalidad</label>
                  <select v-model="modemForm.nationality" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" required>
                    <option disabled value="">Selecciona tu nacionalidad</option>
                    <option v-for="n in nationalities" :key="n" :value="n">{{ n }}</option>
                  </select>

                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Carnet o Pasaporte</label>
                  <input v-model="modemForm.idCard" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" placeholder="Número de identificación" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Nombre</label>
                  <input v-model="modemForm.firstName" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" placeholder="Nombre" required />
                </div>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Primer Apellido</label>
                  <input v-model="modemForm.lastName1" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" placeholder="Primer apellido" required />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-300 mb-2">Segundo Apellido (Opcional)</label>
                  <input v-model="modemForm.lastName2" type="text" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" placeholder="Segundo apellido" />
                </div>
              </div>
                 <select v-model="modemForm.pickupOffice" class="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20" required>
                  <option disabled value="">Selecciona una oficina</option>
                  <option value="ETECSA Centro Habana">ETECSA Centro Habana</option>
                  <option value="ETECSA Vedado">ETECSA Vedado</option>
                  <option value="ETECSA Playa">ETECSA Playa</option>
                  <option value="ETECSA Santiago de Cuba">ETECSA Santiago de Cuba</option>
                </select>
          
            

              <button type="button" @click="handleModemClick" class="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">Comprar Módem — $99.99</button>
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

    <!-- Generic Product Confirmation for Modem -->
    <ProductPurchaseConfirmation
      :isOpen="showModemConfirm"
      :productName="modemDetails.productName"
      :price="modemDetails.price"
      :orderId="modemDetails.orderId"
      @close="showModemConfirm = false"
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

    <!-- Info Modals -->
    <InfoModal :isOpen="showInfo.tur" title="Cubacel Tur" :body="infoBodies.tur" @close="closeInfo" />
    <InfoModal :isOpen="showInfo.perm" title="Cubacel Permanente" :body="infoBodies.perm" @close="closeInfo" />
    <InfoModal :isOpen="showInfo.modem" title="Módem ETECSA" :body="infoBodies.modem" @close="closeInfo" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRecharge } from '@/composables/useRecharge'
import Navbar from '@/components/Navbar.vue'
import SimPurchaseConfirmation from '@/components/SimPurchaseConfirmation.vue'
import ProductPurchaseConfirmation from '@/components/ProductPurchaseConfirmation.vue'
import InfoModal from '@/components/InfoModal.vue'

const nationalities = [
  'Cubana',
  'Española',
  'Estadounidense',
  'Mexicana',
  'Venezolana',
  'Colombiana',
  'Argentina',
  'Chilena',
  'Peruana',
  'Otra'
]

const turForm = ref({
  nationality: '',
  idCard: '',
  firstName: '',
  lastName1: '',
  lastName2: ''
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
const { addSimPurchase, addModemPurchase } = useRecharge()
const turFormEl = ref<HTMLFormElement | null>(null)
const permFormEl = ref<HTMLFormElement | null>(null)

// Modem purchase state
const showModemConfirm = ref(false)
interface ProductDetails { productName: string; price: number; orderId: string }
const modemDetails = ref<ProductDetails>({ productName: 'Módem ETECSA (Huawei B311-221)', price: 99.99, orderId: '' })

// Modem form state
const modemForm = ref({
  nationality: '',
  idCard: '',
  firstName: '',
  lastName1: '',
  lastName2: '',
  pickupOffice: ''
})
const modemFormEl = ref<HTMLFormElement | null>(null)

const generateCode = () => Math.floor(100000000000 + Math.random() * 900000000000).toString()
const generateOrderId = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const alnum = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let id: string = letters.charAt(Math.floor(Math.random() * letters.length))
  for (let i = 0; i < 11; i++) {
    id += alnum.charAt(Math.floor(Math.random() * alnum.length))
  }
  return id
}

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

const handleModemClick = () => {
  if (modemFormEl.value && !modemFormEl.value.reportValidity()) return
  modemDetails.value.orderId = generateOrderId()
  const fullName = [modemForm.value.firstName, modemForm.value.lastName1, modemForm.value.lastName2].filter(Boolean).join(' ')
  // Registrar en historial
  addModemPurchase({
    fullName,
    idCard: modemForm.value.idCard,
    pickupOffice: modemForm.value.pickupOffice,
    productName: modemDetails.value.productName,
    priceUSDT: modemDetails.value.price,
    orderId: modemDetails.value.orderId
  })
  showModemConfirm.value = true
}

// Info modals
const showInfo = ref({ tur: false, perm: false, modem: false })
const infoBodies = {
  tur: `Esta es una tarjeta SIM física, no una eSIM.

Está disponible para cubanos y turistas.

Máximo 3 líneas Cubacel Tur por beneficiario (según pasaporte o carnet cubano). Un usuario puede comprar tantas líneas como desee, siempre que cada beneficiario no exceda el límite.

Exclusivo para beneficiarios mayores de 18 años.

Puede retirar la tarjeta en los Aeropuertos de La Habana (José Martí), Varadero, Cayo Coco, Camagüey, Holguín y Santiago de Cuba, o en cualquier oficina comercial de Etecsa.

La línea Cubacel Tur de ETECSA está orientada a personas que visitan Cuba por un corto periodo de tiempo. Ahora puede elegir entre dos opciones según sus necesidades:

Cubacel Tur Plus: Una línea móvil temporal válida por 30 días, que incluye 10GB + 100 Min + 100 SMS. Incluye servicios ilimitados de WhatsApp y Facebook durante su vigencia.

A su llegada a Cuba, puede recoger su tarjeta Cubacel Tur en los stands de ETECSA ubicados en los aeropuertos José Martí en La Habana, Camagüey, Holguín, Varadero, Cayo Coco y Santiago de Cuba. También puede optar por cualquier Oficina Comercial de ETECSA a lo largo del país. El servicio en los aeropuertos está disponible las 24 horas del día.

Una vez adquirida su línea turista, puede recargar planes de datos y minutos adicionales en nuestra página web, utilizando el número asignado a su línea (53XXXXXXXX).

Cada recarga adicional extiende la vigencia de la línea según el paquete adquirido:

Paquete Plus: Extiende 30 días por recarga, hasta un máximo de 90 días.
La vigencia total no puede superar los 90 días.`,
  perm: `Incluye 250 CUP de saldo inicial.

Exclusivo para beneficiarios mayores de 18 años.

Servicio de ETECSA para residentes que viven en Cuba por un largo período de tiempo. Ahora con esta tarjeta, los residentes en Cuba pueden tener una línea móvil permanente válida por 360 días (después de cada recarga), el crédito inicial incluido con la tarjeta es de 250 CUP, puede retirar la tarjeta Cubacel en la Oficina Comercial de Etecsa seleccionada. Después de obtener su tarjeta SIM en Cuba, puede recargar el saldo en nuestra página, debe recargar el número asignado a la línea (53XXXXXXXX).`,
  modem: `Incluye: Módem Huawei B311-221 + SIM de Datos + 100GB.

Descubre el MODEM de Etecsa, una opción práctica para conectar a internet en Cuba. Ideal para hogares y oficinas, y una alternativa especialmente valiosa en zonas donde Nauta Hogar no está disponible. Este paquete incluye el Módem Huawei B311-221 y una uSIM de Datos especializada, diseñada para planes especiales de datos, acompañada de 100GB de datos para empezar a navegar.
Exclusivo para beneficiarios mayores de 18 años.

Precio: 99.99 USD

¿Qué incluye?
Módem Huawei B311-221: Conéctate con un dispositivo moderno y versátil, diseñado para facilitar tu acceso a internet.

uSIM de Datos: Una tarjeta SIM especializada para acceso a datos (Solo acepta planes especiales de datos).

100GB de Datos Gratis: Un regalo para que explores más de internet.

Planes de Recarga Disponibles:
10GB
50GB
100GB
Vigencia de la oferta de datos: 3 meses.

Características Destacadas:
Público Objetivo: Personas naturales mayores de 18 años en Cuba.

Conectividad: Cualquier lugar en Cuba con cobertura de la red móvil.

Ciclo de Vida de la Línea Móvil: 330 días desde la activación, y se extiende por 330 días adicionales desde la fecha de la última recarga.

Planes de Navegación Adicionales: Opciones de 10GB, 50GB y 100GB disponibles.

Garantía: 3 meses.
Nota Importante: Retire su pedido en 30 días o este expirará sin reembolso.`
}
const openInfo = (which: 'tur' | 'perm' | 'modem') => { showInfo.value[which] = true }
const closeInfo = () => { showInfo.value = { tur: false, perm: false, modem: false } }
</script>
