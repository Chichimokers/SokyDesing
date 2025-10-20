// src/composables/Login.ts
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted } from 'vue'


export function useLogin() {
  const router = useRouter();
  const email = ref('');
  const password = ref('');
  const showPassword = ref(false);
  const errorMessage = ref('');

  const login = () => {
    // Validación básica
    if (!email.value || !password.value) {
      errorMessage.value = 'Por favor, completa todos los campos.';
      return;
    }

    // Validación de credenciales
    if (email.value === 'developer1575@gmail.com' && password.value === '123') {
      errorMessage.value = '';
      router.push('/'); // Redirige a la página de inicio después del login
    } else {
      errorMessage.value = 'Credenciales incorrectas.';
    }
  };

  return {
    email,
    password,
    showPassword,
    errorMessage,
    login,
  };
}
