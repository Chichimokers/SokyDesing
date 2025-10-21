<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div 
      class="absolute inset-0 bg-black/70 backdrop-blur-sm"
      @click="$emit('close')"
    ></div>

    <!-- Modal -->
    <div class="relative bg-gradient-to-br from-gray-900 to-gray-800 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
      
      <!-- Header -->
      <div class="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 flex-shrink-0">
        <div>
          <h3 class="text-xl sm:text-2xl font-bold text-white">Términos y Condiciones</h3>
          <p class="text-gray-400 text-sm">Soky Recargas - Última actualización: Octubre 2024</p>
        </div>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6">
        <div class="prose prose-invert max-w-none space-y-6">
          
          <!-- 1. Aceptación de Términos -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">1</span>
              Aceptación de Términos
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <p>Al acceder y utilizar los servicios de Soky Recargas, usted acepta estar legalmente obligado por estos Términos y Condiciones.</p>
              <p>Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestros servicios.</p>
            </div>
          </section>

          <!-- 2. Descripción del Servicio -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">2</span>
              Descripción del Servicio
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <p>Soky Recargas es una plataforma digital que ofrece:</p>
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Recargas telefónicas a Cuba</li>
                <li>Servicios de suscripción (Nauta Plus, Nauta Hogar Plus)</li>
                <li>Transferencias de saldo entre usuarios</li>
                <li>Depósitos mediante criptomonedas</li>
                <li>Programa de socios retail</li>
              </ul>
            </div>
          </section>

          <!-- 3. Registro y Cuenta de Usuario -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">3</span>
              Registro y Cuenta de Usuario
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <p>Para utilizar nuestros servicios, debe:</p>
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Proporcionar información precisa y actualizada</li>
                <li>Mantener la seguridad de su cuenta y contraseña</li>
                <li>Ser mayor de 18 años o tener autorización parental</li>
                <li>Notificar inmediatamente cualquier uso no autorizado</li>
              </ul>
            </div>
          </section>

          <!-- 4. Servicios de Pago y Recargas -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">4</span>
              Servicios de Pago y Recargas
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <h5 class="font-medium text-white">Recargas Telefónicas:</h5>
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Las recargas se procesan en tiempo real, sujeto a la disponibilidad del operador</li>
                <li>Los precios están sujetos a cambios sin previo aviso</li>
                <li>No se garantiza la entrega si el número de teléfono es incorrecto</li>
              </ul>
              
              <h5 class="font-medium text-white mt-4">Depósitos de Criptomonedas:</h5>
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Se cobra un fee del 2.5% + $0.50 USD por transacción</li>
                <li>Los depósitos requieren confirmaciones de red (10-30 minutos)</li>
                <li>Monto mínimo: $10 USD, máximo: $1,000 USD por transacción</li>
              </ul>
            </div>
          </section>

          <!-- 5. Suscripciones -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">5</span>
              Suscripciones
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Las suscripciones se renuevan automáticamente cada mes</li>
                <li>Puede cancelar su suscripción en cualquier momento</li>
                <li>No se ofrecen reembolsos por períodos parciales</li>
                <li>Los precios pueden cambiar con 30 días de anticipación</li>
              </ul>
            </div>
          </section>

          <!-- 6. Programa Retail -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">6</span>
              Programa de Socios Retail
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Requiere depósito mínimo de $100 USDT para activación</li>
                <li>Precio mensual: $19.99 USDT</li>
                <li>Acceso a precios preferenciales y soporte prioritario</li>
                <li>Beneficios sujetos a términos específicos del programa</li>
              </ul>
            </div>
          </section>

          <!-- 7. Política de Reembolsos -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">7</span>
              Política de Reembolsos
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <p>Los reembolsos se procesarán únicamente en los siguientes casos:</p>
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Error técnico comprobado en nuestros sistemas</li>
                <li>Recarga no entregada por fallo del operador (verificado)</li>
                <li>Cobro duplicado por error del sistema</li>
              </ul>
              <p class="mt-2">Tiempo de procesamiento: 3-5 días hábiles.</p>
            </div>
          </section>

          <!-- 8. Limitaciones de Responsabilidad -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">8</span>
              Limitaciones de Responsabilidad
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <p>Soky Recargas no será responsable por:</p>
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Fallos o interrupciones de los operadores de telecomunicaciones</li>
                <li>Fluctuaciones en el valor de las criptomonedas</li>
                <li>Demoras en la red blockchain</li>
                <li>Pérdida de acceso a cuentas por credenciales incorrectas</li>
              </ul>
            </div>
          </section>

          <!-- 9. Privacidad y Protección de Datos -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">9</span>
              Privacidad y Protección de Datos
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Recopilamos únicamente datos necesarios para proporcionar el servicio</li>
                <li>No compartimos información personal con terceros sin consentimiento</li>
                <li>Implementamos medidas de seguridad para proteger sus datos</li>
                <li>Puede solicitar la eliminación de sus datos en cualquier momento</li>
              </ul>
            </div>
          </section>

          <!-- 10. Prohibiciones de Uso -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">10</span>
              Prohibiciones de Uso
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <p>Está prohibido utilizar nuestros servicios para:</p>
              <ul class="list-disc list-inside space-y-1 ml-4">
                <li>Actividades fraudulentas o ilegales</li>
                <li>Lavado de dinero o financiamiento del terrorismo</li>
                <li>Crear múltiples cuentas para evadir límites</li>
                <li>Interferir con el funcionamiento de la plataforma</li>
                <li>Distribuir malware o contenido dañino</li>
              </ul>
            </div>
          </section>

          <!-- 11. Modificaciones -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">11</span>
              Modificaciones de Términos
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios importantes se notificarán con 30 días de anticipación.</p>
              <p>El uso continuado de nuestros servicios después de las modificaciones constituye aceptación de los nuevos términos.</p>
            </div>
          </section>

          <!-- 12. Contacto y Soporte -->
          <section>
            <h4 class="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <span class="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">12</span>
              Contacto y Soporte
            </h4>
            <div class="text-gray-300 text-sm space-y-2">
              <p>Para consultas, reclamos o soporte técnico:</p>
              <ul class="list-none space-y-1 ml-4">
                <li>📧 Email: soporte@sokyrecargas.com</li>
                <li>💬 Chat en vivo: Disponible 24/7 en la plataforma</li>
                <li>📱 Telegram: @SokyRecargasSupport</li>
                <li>🕒 Tiempo de respuesta: Máximo 24 horas</li>
              </ul>
            </div>
          </section>

        </div>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between p-4 sm:p-6 border-t border-white/10 flex-shrink-0 bg-gray-800/50">
        <div class="text-xs text-gray-400">
          © 2024 Soky Recargas. Todos los derechos reservados.
        </div>
        <div class="flex gap-2">
          <button 
            @click="$emit('accept')"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm"
          >
            Aceptar
          </button>
          <button 
            @click="$emit('close')"
            class="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm"
          >
            Cerrar
          </button>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
}

interface Emits {
  close: []
  accept: []
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
/* Scroll styling */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Smooth scrolling */
.overflow-y-auto {
  scroll-behavior: smooth;
}
</style>