import { ref } from 'vue'

// Estado global para términos y condiciones
const hasAcceptedTerms = ref(false)
const showTermsPopup = ref(false)

export const useTermsAndConditions = () => {
  
  // Verificar si el usuario ha aceptado los términos
  const checkTermsAcceptance = () => {
    const accepted = localStorage.getItem('soky-terms-accepted')
    hasAcceptedTerms.value = accepted === 'true'
    return hasAcceptedTerms.value
  }

  // Mostrar popup de términos
  const showTerms = () => {
    showTermsPopup.value = true
  }

  // Cerrar popup de términos
  const hideTerms = () => {
    showTermsPopup.value = false
  }

  // Aceptar términos y condiciones
  const acceptTerms = () => {
    hasAcceptedTerms.value = true
    localStorage.setItem('soky-terms-accepted', 'true')
    localStorage.setItem('soky-terms-accepted-date', new Date().toISOString())
    showTermsPopup.value = false
  }

  // Verificar si necesita mostrar términos obligatoriamente
  const requireTermsAcceptance = () => {
    if (!checkTermsAcceptance()) {
      showTerms()
      return true
    }
    return false
  }

  // Reset terms (para testing o cambio de términos)
  const resetTermsAcceptance = () => {
    hasAcceptedTerms.value = false
    localStorage.removeItem('soky-terms-accepted')
    localStorage.removeItem('soky-terms-accepted-date')
  }

  // Obtener fecha de aceptación
  const getAcceptanceDate = () => {
    const date = localStorage.getItem('soky-terms-accepted-date')
    return date ? new Date(date) : null
  }

  return {
    hasAcceptedTerms,
    showTermsPopup,
    checkTermsAcceptance,
    showTerms,
    hideTerms,
    acceptTerms,
    requireTermsAcceptance,
    resetTermsAcceptance,
    getAcceptanceDate
  }
}