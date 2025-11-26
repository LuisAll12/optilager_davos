<script setup>
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-900 to-blue-950 text-white">  <!-- sollte nun blau sein -->
    <NavBar />
    <main class="mx-auto max-w-6xl px-4 py-8">
      <router-view />
    </main>
  </div>
</template>
