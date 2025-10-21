import { ref, computed } from 'vue'

export interface RechargeOffer {
  id: string
  title?: string
  data: string
  minutes: string
  sms: string
  price: number
  priceUSDT: number
  popular?: boolean
}

export interface PhoneNumber {
  id: string
  number: string
  isValid: boolean
}

export interface RechargeTransaction {
  id: string
  phoneNumber: string
  offer: RechargeOffer
  status: 'processing' | 'completed' | 'error'
  timestamp: Date
  email?: string
}

// Module-scoped state so the composable behaves like a singleton across the app
const phoneNumbers = ref<PhoneNumber[]>([])
const selectedOffer = ref<RechargeOffer | null>(null)
const currentTransaction = ref<RechargeTransaction | null>(null)
const email = ref('')
// Simple in-memory history of completed/failed transactions (would be persisted in real app)
const transactionHistory = ref<RechargeTransaction[]>([
  {
    id: 'tx_001',
    phoneNumber: '+5352637415',
    offer: {
      id: '2',
      data: '14GB',
      minutes: '115MIN',
      sms: '120SMS',
      price: 30.50,
      priceUSDT: 30.50
    },
    status: 'completed',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 días atrás
    email: 'usuario@ejemplo.com'
  },
  {
    id: 'tx_002',
    phoneNumber: '+5358491726',
    offer: {
      id: '1',
      data: '9GB',
      minutes: '75MIN',
      sms: '80SMS',
      price: 20.50,
      priceUSDT: 20.50
    },
    status: 'completed',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 días atrás
    email: 'usuario@ejemplo.com'
  },
  {
    id: 'tx_003',
    phoneNumber: '+5359847263',
    offer: {
      id: '3',
      data: '20GB',
      minutes: '165MIN',
      sms: '160SMS',
      price: 40.50,
      priceUSDT: 40.50
    },
    status: 'error',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 días atrás
    email: 'usuario@ejemplo.com'
  }
])

// Ofertas disponibles con precios en USDT
const availableOffers = ref<RechargeOffer[]>([
    {
      id: '1',
      data: '9GB',
      minutes: '75MIN',
      sms: '80SMS',
      price: 20.50,
      priceUSDT: 20.50
    },
    {
      id: '2',
      data: '14GB',
      minutes: '115MIN',
      sms: '120SMS',
      price: 30.50,
      priceUSDT: 30.50,
      popular: true
    },
    {
      id: '3',
      data: '20GB',
      minutes: '165MIN',
      sms: '160SMS',
      price: 40.50,
      priceUSDT: 40.50
    },
    {
      id: '4',
      data: '2MB',
      minutes: '0MIN',
      sms: '0SMS',
      price: 21.50,
      priceUSDT: 27.9 // Precio diferente en USDT como en el ejemplo
    }
  ])

  // Validar número de teléfono cubano
  const validateCubanPhone = (phone: string): boolean => {
    const cubanPhoneRegex = /^(\+53|53)?[5-9]\d{7}$/
    return cubanPhoneRegex.test(phone.replace(/\s/g, ''))
  }

  // Añadir número de teléfono
  const addPhoneNumber = (number: string) => {
    if (phoneNumbers.value.length >= 5) return false
    
    const formattedNumber = number.replace(/\s/g, '')
    const isValid = validateCubanPhone(formattedNumber)
    
    const phoneNumber: PhoneNumber = {
      id: Date.now().toString(),
      number: formattedNumber,
      isValid
    }
    
    phoneNumbers.value.push(phoneNumber)
    return true
  }

  // Eliminar número de teléfono
  const removePhoneNumber = (id: string) => {
    phoneNumbers.value = phoneNumbers.value.filter(phone => phone.id !== id)
  }

  // Seleccionar oferta
  const selectOffer = (offer: RechargeOffer) => {
    selectedOffer.value = offer
  }

  // Procesar recarga
  const processRecharge = (phoneNumber: string, userEmail: string = ''): Promise<RechargeTransaction> => {
    if (!selectedOffer.value) return Promise.reject(new Error('No hay oferta seleccionada'))

    const transaction: RechargeTransaction = {
      id: Date.now().toString(),
      phoneNumber,
      offer: selectedOffer.value,
      status: 'processing',
      timestamp: new Date(),
      email: userEmail
    }

    currentTransaction.value = transaction

    // Simular proceso de recarga (2-5 segundos)
    const processingTime = Math.random() * 3000 + 2000

    return new Promise((resolve) => {
      setTimeout(() => {
        if (currentTransaction.value && currentTransaction.value.id === transaction.id) {
          // 90% de éxito, 10% de error
          const success = Math.random() > 0.1
          currentTransaction.value.status = success ? 'completed' : 'error'

          // Push final transaction to history
          const finalized: RechargeTransaction = {
            id: currentTransaction.value.id,
            phoneNumber: currentTransaction.value.phoneNumber,
            offer: currentTransaction.value.offer,
            status: currentTransaction.value.status,
            timestamp: new Date(),
            email: currentTransaction.value.email
          }
          pushToHistory(finalized)

          resolve(finalized)
        } else {
          // If transaction was cleared, resolve with the created transaction marked as error
          const fallback = { ...transaction, status: 'error' as const }
          pushToHistory(fallback)
          resolve(fallback)
        }
      }, processingTime)
    })
  }

  // Append a transaction to the history (called when a transaction completes or fails)
  const pushToHistory = (tx: RechargeTransaction) => {
    // Keep most recent first
    transactionHistory.value.unshift(tx)
    // Optional: limit history size to latest 100
    if (transactionHistory.value.length > 100) {
      transactionHistory.value.pop()
    }
  }

  // Retrieve latest N transactions
  const getHistory = (count = 10) => {
    return transactionHistory.value.slice(0, count)
  }

  // Obtener precio mínimo para las cards
  const minPrice = computed(() => {
    return Math.min(...availableOffers.value.map(offer => offer.priceUSDT))
  })

  // Resetear transacción
  const resetTransaction = () => {
    currentTransaction.value = null
  }

  // Validar si se puede procesar
  const canProcess = computed(() => {
    return phoneNumbers.value.some(phone => phone.isValid) && selectedOffer.value !== null
  })

export function useRecharge() {
  return {
    phoneNumbers,
    selectedOffer,
    currentTransaction,
    transactionHistory,
    email,
    availableOffers,
    minPrice,
    canProcess,
    addPhoneNumber,
    removePhoneNumber,
    selectOffer,
    processRecharge,
    pushToHistory,
    getHistory,
    validateCubanPhone,
    resetTransaction
  }
}