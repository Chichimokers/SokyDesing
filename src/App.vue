<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Footer from './components/Footer.vue'

const route = useRoute()
const showFooter = computed(() => {
  const name = (route.name ?? '').toString()
  return name !== 'Login' && name !== 'Register'
})
</script>

<template>
  <div class="dark min-h-screen flex flex-col">
    <div class="flex-1">
      <router-view />
    </div>
    <Footer v-if="showFooter" />
  </div>

</template>

<style scoped></style>
