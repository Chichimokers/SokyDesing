<template>
  <div>
    <div class="sticky top-0 z-10 w-full">
      <Navbar/>
    </div>
    <router-view/>
    <Footer v-if="showFooter"/>
    
  </div>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
</script>