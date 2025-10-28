<script setup>
import NavBar from './components/NavBar.vue'
import Home from './components/Home.vue'
</script>

<template>
  <div class="min-h-screen bg-navy-900 text-white">  <!-- sollte nun blau sein -->
    <NavBar />
    <main class="mx-auto max-w-6xl px-4 py-8">
      <Home />
    </main>
  </div>
</template>
