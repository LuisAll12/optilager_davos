<template>
  <section class="max-w-6xl mx-auto px-4 pt-10 pb-6">
    <!-- Desktop Header -->
    <div class="hidden sm:flex text-[11px] text-white/50 mb-3 px-4">
      <div class="flex-1">
        <span class="tracking-wide">
          Vorname Nachname, Geburtsdatum
        </span>
      </div>
      <div class="w-32 text-center">
        Anmelde Datum
      </div>
      <div class="w-32 text-center">
        Anmeldestatus
      </div>
      <div class="w-28 text-center">
        prov. Gruppe
      </div>
      <div class="w-7"></div>
    </div>

    <!-- Liste -->
    <div class="space-y-3">
      <div
        v-for="reg in registrations"
        :key="reg.id"
      >
        <div class="bg-white rounded-[999px] px-4 py-3 shadow-sm">
          <!-- Mobile Layout -->
<div class="sm:hidden">
  <div class="flex items-center justify-between gap-3">
    <div>
      <p class="font-semibold text-sm text-slate-900">
        {{ reg.name }}
      </p>
    </div>

    <button
      type="button"
      class="flex items-center justify-center rounded-full w-7 h-7 border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
      @click="toggle(reg.id)"
      :aria-expanded="openId === reg.id"
    >
      <ChevronDownIcon
        class="w-4 h-4 transition-transform"
        :class="openId === reg.id ? 'rotate-180' : ''"
      />
    </button>
  </div>
</div>


          <!-- Desktop Layout -->
          <div class="hidden sm:flex items-center gap-4">
            <!-- Name / Geburtsdatum -->
            <div class="flex-1 text-sm">
              <p class="font-semibold text-slate-900">
                {{ reg.name }}
              </p>
              <p class="text-xs text-slate-500">
                Geburtsdatum: {{ reg.birthDate }}
              </p>
            </div>

            <!-- Datum -->
            <div class="w-32 text-xs text-slate-700 text-center">
              {{ reg.registerDate }}
            </div>

            <!-- Status -->
            <div class="w-32 text-xs flex justify-center">
              <span
                class="inline-flex items-center rounded-full px-3 py-1"
                :class="statusBadgeClass(reg.status)"
              >
                {{ reg.status }}
              </span>
            </div>

            <!-- Gruppe -->
            <div class="w-28 text-xs flex justify-center">
              <span
                class="inline-flex items-center rounded-full px-3 py-1"
                :class="groupBadgeClass(reg.group)"
              >
                {{ reg.group }}
              </span>
            </div>

            <!-- Pfeil -->
            <div class="w-7 flex justify-end">
              <button
                type="button"
                class="flex items-center justify-center rounded-full w-7 h-7 border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                @click="toggle(reg.id)"
                :aria-expanded="openId === reg.id"
              >
                <ChevronDownIcon
                  class="w-4 h-4 transition-transform"
                  :class="openId === reg.id ? 'rotate-180' : ''"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Detail Panel -->
        <transition name="fade">
          <div
            v-if="openId === reg.id"
            class="mt-2 rounded-2xl bg-slate-900/90 text-white/90 px-4 py-4 sm:px-6 sm:py-5 text-xs sm:text-sm"
          >
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-1">
                <h3 class="text-[11px] uppercase tracking-wide text-white/60">
                  Basisdaten
                </h3>
                <p><span class="font-medium">Name</span> {{ reg.name }}</p>
                <p><span class="font-medium">Geburtsdatum</span> {{ reg.birthDate }}</p>
                <p><span class="font-medium">Segelclub</span> {{ reg.club }}</p>
                <p><span class="font-medium">Essverhalten</span> {{ reg.diet }}</p>
              </div>

              <div class="space-y-1">
                <h3 class="text-[11px] uppercase tracking-wide text-white/60">
                  Anmeldung
                </h3>
                <p><span class="font-medium">Anmeldedatum</span> {{ reg.registerDate }}</p>
                <p><span class="font-medium">Status</span> {{ reg.status }}</p>
                <p><span class="font-medium">provisorische Gruppe</span> {{ reg.group }}</p>
                <p><span class="font-medium">War schon im Lager</span> {{ reg.wasInCamp ? "Ja" : "Nein" }}</p>
              </div>
            </div>

            <div v-if="reg.comment" class="mt-4">
              <h3 class="text-[11px] uppercase tracking-wide text-white/60 mb-1">
                Kommentar / Hinweise
              </h3>
              <p class="text-xs sm:text-sm leading-relaxed">
                {{ reg.comment }}
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </section>

  <!-- Infos unten bleiben gleich -->
  <section class="max-w-6xl mx-auto px-4 pb-16 space-y-4">
    <h2 class="text-xl sm:text-2xl font-semibold">
      {{ infoSection.title }}
    </h2>
    <p
      v-for="(paragraph, idx) in infoSection.paragraphs"
      :key="idx"
      class="text-sm sm:text-base text-white/80 leading-relaxed"
    >
      {{ paragraph }}
    </p>
  </section>
</template>

<script setup>
import { ref } from "vue"
import { ChevronDownIcon } from "@heroicons/vue/24/outline"

const registrations = ref([
  {
    id: 1,
    name: "Max Mustermann",
    birthDate: "01.01.2014",
    registerDate: "23.03.2025",
    status: "bezahlt",
    group: "gelb",
    club: "Segelclub Davos",
    diet: "Normalkost",
    wasInCamp: true,
    comment: "Keine Allergien, schwimmt sicher, möchte gerne mit Freund Ben in der gleichen Gruppe sein."
  },
  {
    id: 2,
    name: "Ben Mustermann",
    birthDate: "01.01.2016",
    registerDate: "23.03.2025",
    status: "bezahlt",
    group: "rot",
    club: "Segelclub Davos",
    diet: "Vegetarisch",
    wasInCamp: false,
    comment: "Leichte Pollenallergie, bitte beim Zeltplatz wenn möglich berücksichtigen."
  }
])

const infoSection = ref({
  title: "Infos",
  paragraphs: [
    "Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    "Lorem ipsum dolor sit amet, consectetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.",
    "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis."
  ]
})

const openId = ref(null)

function toggle(id) {
  openId.value = openId.value === id ? null : id
}

function statusBadgeClass(status) {
  if (status === "bezahlt") {
    return "bg-green-100 text-green-700"
  }
  if (status === "offen") {
    return "bg-yellow-100 text-yellow-700"
  }
  return "bg-slate-200 text-slate-700"
}

function groupBadgeClass(group) {
  if (group === "gelb") {
    return "bg-yellow-100 text-yellow-800"
  }
  if (group === "rot") {
    return "bg-red-100 text-red-800"
  }
  if (group === "blau") {
    return "bg-sky-100 text-sky-800"
  }
  return "bg-slate-200 text-slate-700"
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
