<template>
  <Modal :isOpen="!!transaction" @close="$emit('close')">
    <template v-if="transaction">
      <div class="bg-transparent rounded-2xl p-6 sm:p-8 border border-transparent text-white">
        <div class="text-center mb-6">
          <div class="mx-auto w-16 h-16 rounded-full flex items-center justify-center"
               :class="statusIcon.bg">
            <svg class="w-8 h-8" :class="statusIcon.icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="statusIcon.path" />
            </svg>
          </div>
          <h2 class="text-2xl font-bold mt-3" :class="titleClass">{{ titleText }}</h2>
          <p class="text-gray-400" v-if="transaction.status === 'processing'">
            Tu recarga se enviará hoy a las {{ formatTime(transaction.timestamp) }} al número {{ formatPhone(transaction.phoneNumber) }}
          </p>
        </div>

        <div class="bg-[#0f1213] rounded-xl p-4 border border-transparent">
          <div class="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm items-center">
            <div class="text-gray-400">Tipo</div>
            <div class="font-medium text-white text-right">{{ kindText }}</div>

            <div class="text-gray-400">Número</div>
            <div class="text-right">
              <div v-if="transaction.status === 'processing' && editing">
                <input v-model="editNumberValue" type="text"
                       class="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="Ingresa número" />
                <div class="flex gap-2 justify-end mt-2">
                  <button @click="confirmEdit"
                          class="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold">
                    Guardar
                  </button>
                  <button @click="editing = false"
                          class="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold">
                    Cancelar
                  </button>
                </div>
              </div>
              <div v-else class="flex items-center justify-end gap-2">
                <span class="font-semibold">{{ formatPhone(transaction.phoneNumber) }}</span>
                <button v-if="transaction.status === 'processing'"
                        @click="startEdit"
                        class="p-1.5 rounded hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                        title="Editar número">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536M4 13.5V20h6.5l9.586-9.586a2 2 0 000-2.828l-3.672-3.672a2 2 0 00-2.828 0L4 13.5z" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="text-gray-400">Monto</div>
            <div class="font-semibold text-green-400 text-right">${{ transaction.offer.priceUSDT.toFixed(2) }} USDT</div>

            <div class="text-gray-400">Plan</div>
            <div class="font-medium text-white text-right">{{ transaction.offer.data }}</div>

            <div class="text-gray-400">Estado</div>
            <div class="text-right">
              <span :class="statusPill.class" class="px-2.5 py-1 rounded-full text-xs font-semibold">{{ statusPill.text }}</span>
            </div>

            <div class="text-gray-400">Fecha</div>
            <div class="font-medium text-white text-right">{{ formatDate(transaction.timestamp) }} • {{ formatTime(transaction.timestamp) }}</div>
          </div>
        </div>

        <div class="mt-6 flex gap-3" v-if="transaction.status === 'processing'">
          <button @click="$emit('close')" class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold">Cerrar</button>
          <button @click="onCancel" class="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold">Cancelar pedido</button>
        </div>
        <div class="mt-6" v-else>
          <button @click="$emit('close')" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">Cerrar</button>
        </div>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import Modal from './Modal.vue'
import type { RechargeTransaction } from '../composables/useRecharge'

interface Props { transaction: RechargeTransaction | null }
interface Emits {
  close: []
  edit: [id: string, newNumber: string]
  cancel: [id: string]
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const editing = ref(false)
const editNumberValue = ref('')

watch(() => props.transaction, (tx) => {
  if (tx) {
    editing.value = false
    editNumberValue.value = tx.phoneNumber
  }
}, { immediate: true })

const statusIcon = computed(() => {
  if (!props.transaction) return { bg: 'bg-gray-600', icon: 'text-white', path: '' }
  switch (props.transaction.status) {
    case 'completed': return { bg: 'bg-green-600', icon: 'text-white', path: 'M5 13l4 4L19 7' }
    case 'processing': return { bg: 'bg-yellow-500', icon: 'text-black', path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
    case 'error': default: return { bg: 'bg-red-600', icon: 'text-white', path: 'M6 18L18 6M6 6l12 12' }
  }
})

const titleClass = computed(() => {
  if (!props.transaction) return 'text-white'
  switch (props.transaction.status) {
    case 'completed': return 'text-green-400'
    case 'processing': return 'text-yellow-300'
    case 'error': default: return 'text-red-400'
  }
})

const statusPill = computed(() => {
  if (!props.transaction) return { class: 'bg-gray-600 text-white', text: 'Desconocido' }
  switch (props.transaction.status) {
    case 'completed': return { class: 'bg-green-600/20 text-green-400', text: 'Correcta' }
    case 'processing': return { class: 'bg-yellow-500/20 text-yellow-400', text: 'Pendiente' }
    case 'error': default: return { class: 'bg-red-600/20 text-red-400', text: 'Fallida' }
  }
})

const titleText = computed(() => {
  if (!props.transaction) return ''
  return props.transaction.status === 'completed' ? '¡Recarga Completada!' : props.transaction.status === 'processing' ? 'Recarga Pendiente' : 'Recarga Fallida'
})

const kindText = computed(() => {
  if (!props.transaction) return ''
  switch (props.transaction.kind) {
    case 'nauta': return 'Nauta Hogar'
    case 'nauta_plus': return 'Nauta Plus'
    case 'mobile': default: return 'Recarga Móvil'
  }
})

const startEdit = () => { editing.value = true }
const confirmEdit = () => {
  if (props.transaction) emit('edit', props.transaction.id, editNumberValue.value)
}
const onCancel = () => { if (props.transaction) emit('cancel', props.transaction.id) }

const formatPhone = (phone: string) => {
  if (phone.startsWith('+53')) {
    const digits = phone.slice(3)
    if (digits.length === 8) return `+53 ${digits.slice(0, 4)} ${digits.slice(4)}`
  }
  return phone
}
const formatDate = (timestamp: Date) => timestamp.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
const formatTime = (timestamp: Date) => timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', hour12: false })
</script>
