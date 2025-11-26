<template>
  <header class="sticky top-0 z-50 backdrop-blur bg-slate-900/70 border-b border-white/10">
    <nav class="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
      <!-- Branding -->
      <RouterLink to="/">
        <div class="flex items-center gap-3">
          <img class="h-6 w-5" src="../assets/imgs/sail.png" alt="">
          <span class="text-sm tracking-widest font-semibold">
            OPTILAGER DAVOS
          </span>
        </div>
      </RouterLink>
      <!-- Desktop Navigation -->
      <ul class="hidden md:flex items-center gap-6 text-sm">
        <li><RouterLink to="/" class="hover:opacity-80">{{ t("nav.home") }}</RouterLink></li>
        <li><RouterLink to="/info" class="hover:opacity-80">{{ t("nav.info") }}</RouterLink></li>
        <li><RouterLink to="/blogs" class="hover:opacity-80">{{ t("nav.blog") }}</RouterLink></li>
        <li><RouterLink to="/registration" class="hover:opacity-80">{{ t("nav.signup") }}</RouterLink></li>
        <li><a href="#media" class="hover:opacity-80">{{ t("nav.media") }}</a></li>
      </ul>

      <div class="flex items-center gap-2">
        <!-- Language Switcher -->
        <div class="flex items-center gap-1 text-xs">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="setLocale(lang.code)"
            class="px-2 py-1 rounded-md border border-white/10"
            :class="locale === lang.code ? 'bg-white text-slate-900 font-semibold' : 'text-white/70 hover:text-white'"
          >
            {{ lang.label }}
          </button>
        </div>

        <!-- Login Desktop -->
        <RouterLink
          to="/auth"
          class="hidden md:inline-block text-xs px-3 py-1.5 rounded-md bg-white text-slate-900 font-semibold hover:opacity-90"
        >
          Login
        </RouterLink>

        <!-- Mobile Toggle Button -->
        <button
          class="md:hidden inline-flex items-center justify-center rounded-md p-2 ring-1 ring-white/20"
          @click="isOpen = !isOpen"
          aria-label="Navigation öffnen"
        >
          <span v-if="!isOpen">☰</span>
          <span v-else>✕</span>
        </button>
      </div>
    </nav>

    <!-- Mobile Menü -->
    <transition name="fade">
      <div
        v-if="isOpen"
        class="md:hidden border-t border-white/10 bg-slate-900/90 backdrop-blur px-4 pb-4"
      >
        <ul class="flex flex-col gap-3 pt-3 text-sm">
          <li><a href="#home" class="block hover:opacity-80" @click="close">{{ t("nav.home") }}</a></li>
          <li><a href="#info" class="block hover:opacity-80" @click="close">{{ t("nav.info") }}</a></li>
          <li><a href="#blog" class="block hover:opacity-80" @click="close">{{ t("nav.blog") }}</a></li>
          <li><a href="#anmeldung" class="block hover:opacity-80" @click="close">{{ t("nav.signup") }}</a></li>
          <li><a href="#media" class="block hover:opacity-80" @click="close">{{ t("nav.media") }}</a></li>
        </ul>

        <RouterLink
          to="/auth"
          class="mt-4 inline-flex text-xs px-3 py-1.5 rounded-md bg-white text-slate-900 font-semibold hover:opacity-90"
          @click="close"
        >
          Login
        </RouterLink>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { RouterLink, RouterView } from "vue-router"

const isOpen = ref(false)

const { t, locale } = useI18n()

const languages = [
  { code: "de", label: "DE" },
  { code: "fr", label: "FR" },
  { code: "en", label: "EN" }
]

function setLocale(lang) {
  locale.value = lang
  localStorage.setItem("locale", lang)
}

function close() {
  isOpen.value = false
}
</script>
