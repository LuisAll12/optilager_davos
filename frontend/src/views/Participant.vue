<template>
  <div class="min-h-screen text-white px-4 py-10">
    <div class="mx-auto max-w-6xl">
      <!-- Titel -->
      <header class="mb-6">
        <h1 class="text-2xl sm:text-3xl font-semibold">
          Teilnehmerliste
        </h1>
      </header>

      <!-- Layout: Liste links, Actions rechts (ab lg) -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Liste -->
        <section class="flex-1">
          <!-- Desktop Header -->
          <div class="hidden sm:flex text-[11px] text-white/60 mb-3 px-4">
            <div class="flex-1">
              Vorname Nachname, Geburtsdatum
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
            <div class="w-20 text-center">
              Zimmer
            </div>
            <div class="w-7"></div>
          </div>

          <div class="space-y-3">
            <div
              v-for="reg in registrations"
              :key="reg.id"
            >
              <div class="bg-white rounded-[999px] px-4 py-3 shadow-sm">
                <!-- Mobile: Name + Status + Pfeil -->
                <div class="sm:hidden flex items-center justify-between gap-3">
                  <div>
                    <p class="font-semibold text-sm text-slate-900">
                      {{ reg.child.firstName }} {{ reg.child.lastName }}
                    </p>
                    <p class="text-[11px] text-slate-500">
                      Geburtsdatum: {{ reg.child.birthDate }}
                    </p>
                  </div>
                  <div class="flex items-center gap-2">
                    <span
                      class="inline-flex items-center rounded-full px-3 py-1 text-[11px]"
                      :class="statusBadgeClass(reg.status)"
                    >
                      {{ reg.status }}
                    </span>
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

                <!-- Desktop Row -->
                <div class="hidden sm:flex items-center gap-4">
                  <!-- Name / Geburtsdatum -->
                  <div class="flex-1 text-sm">
                    <p class="font-semibold text-slate-900">
                      {{ reg.child.firstName }} {{ reg.child.lastName }}, {{ reg.child.birthDate }}
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

                  <!-- Zimmer -->
                  <div class="w-20 text-xs flex justify-center">
                    <span
                      class="inline-flex items-center rounded-full px-3 py-1"
                      :class="roomBadgeClass(reg.room)"
                    >
                      {{ reg.room || "Ausstehend" }}
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

              <!-- Detailbereich -->
              <transition name="fade">
                <div
                  v-if="openId === reg.id"
                  class="mt-2 rounded-2xl bg-slate-900/90 text-white/90 px-4 py-4 sm:px-6 sm:py-5 text-xs sm:text-sm"
                >
                  <div class="grid gap-4 md:grid-cols-4">
                    <!-- Block Kind links -->
                    <div class="space-y-1">
                      <h3 class="text-[11px] uppercase tracking-wide text-white/60">
                        Kind
                      </h3>
                      <p><span class="font-medium">Geschlecht</span> {{ reg.child.gender }}</p>
                      <p><span class="font-medium">Segelclub</span> {{ reg.child.club }}</p>
                      <p><span class="font-medium">Segelnummer</span> {{ reg.child.sailNumber }}</p>
                      <p><span class="font-medium">Jahrgang</span> {{ reg.child.year }}</p>
                      <p><span class="font-medium">AHV-Nummer</span> {{ reg.child.ahv }}</p>
                    </div>

                    <!-- Block Lagerinfos -->
                    <div class="space-y-1">
                      <h3 class="text-[11px] uppercase tracking-wide text-white/60">
                        Lager
                      </h3>
                      <p><span class="font-medium">Lager bereits besucht</span> {{ reg.child.wasInCamp ? "Ja" : "Nein" }}</p>
                      <p><span class="font-medium">Essverhalten</span> {{ reg.child.diet }}</p>
                      <p><span class="font-medium">Status</span> {{ reg.status }}</p>
                      <p><span class="font-medium">provisorische Gruppe</span> {{ reg.group }}</p>
                      <p><span class="font-medium">Zimmer</span> {{ reg.room || "Ausstehend" }}</p>
                    </div>

                    <!-- Block Kommentar -->
                    <div class="space-y-1 md:col-span-1">
                      <h3 class="text-[11px] uppercase tracking-wide text-white/60">
                        Kommentar
                      </h3>
                      <p class="leading-relaxed">
                        {{ reg.comment || "Kein Kommentar hinterlegt." }}
                      </p>
                    </div>

                    <!-- Block Eltern -->
                    <div class="space-y-1">
                      <h3 class="text-[11px] uppercase tracking-wide text-white/60">
                        Eltern / Kontakt
                      </h3>
                      <p><span class="font-medium">Vorname</span> {{ reg.parent.firstName }}</p>
                      <p><span class="font-medium">Nachname</span> {{ reg.parent.lastName }}</p>
                      <p><span class="font-medium">Adresse</span> {{ reg.parent.address }}</p>
                      <p>
                        <span class="font-medium">PLZ / Ort</span>
                        {{ reg.parent.zip }} {{ reg.parent.city }}
                      </p>
                      <p><span class="font-medium">Kontakt / Notfall</span> {{ reg.parent.phone }}</p>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </section>

        <!-- Actions rechts -->
        <aside class="lg:w-40 flex lg:flex-col gap-3 lg:pt-8">
          <!-- auf kleineren Screens oben horizontal anzeigen -->
          <button
            type="button"
            class="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-sky-400 transition"
            @click="exportCsv"
          >
            <ArrowDownTrayIcon class="w-4 h-4" />
            <span>Export als CSV</span>
          </button>

          <button
            type="button"
            class="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-slate-700 transition"
            @click="openFilter"
          >
            <FunnelIcon class="w-4 h-4" />
            <span>Filter</span>
          </button>

          <button
            type="button"
            class="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-slate-700 transition"
            @click="sendEmail"
          >
            <EnvelopeIcon class="w-4 h-4" />
            <span>Email</span>
          </button>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import {
  ChevronDownIcon,
  ArrowDownTrayIcon,
  FunnelIcon,
  EnvelopeIcon
} from "@heroicons/vue/24/outline"

// Mock-Daten für Admin-Teilnehmerliste
const registrations = ref([
  {
    id: 1,
    registerDate: "23.03.2025",
    status: "angemeldet",
    group: "gelb",
    room: null, // Ausstehend
    child: {
      firstName: "Max",
      lastName: "Mustermann",
      birthDate: "01.01.2014",
      gender: "Männlich",
      club: "YCL",
      sailNumber: "1866",
      year: "2014",
      ahv: "7640166732006",
      wasInCamp: true,
      diet: "Normalkost"
    },
    parent: {
      firstName: "Lena",
      lastName: "Bötting",
      address: "Bahnhofstrasse 21",
      zip: "5023",
      city: "Luzern",
      phone: "079 111 22 33"
    },
    comment:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. At vero eos et accusam et justo duo dolores et ea rebum."
  },
  {
    id: 2,
    registerDate: "23.03.2025",
    status: "angefordert",
    group: "grün",
    room: "203",
    child: {
      firstName: "Ben",
      lastName: "Mustermann",
      birthDate: "01.01.2016",
      gender: "Männlich",
      club: "YCL",
      sailNumber: "2054",
      year: "2016",
      ahv: "7640166732007",
      wasInCamp: false,
      diet: "Vegetarisch"
    },
    parent: {
      firstName: "Lena",
      lastName: "Bötting",
      address: "Bahnhofstrasse 21",
      zip: "5023",
      city: "Luzern",
      phone: "079 111 22 33"
    },
    comment: ""
  },
  {
    id: 3,
    registerDate: "23.03.2025",
    status: "bezahlt",
    group: "schwarz",
    room: "102",
    child: {
      firstName: "Ben",
      lastName: "Mustermann",
      birthDate: "01.01.2016",
      gender: "Männlich",
      club: "YCL",
      sailNumber: "2054",
      year: "2016",
      ahv: "7640166732007",
      wasInCamp: true,
      diet: "Normalkost"
    },
    parent: {
      firstName: "Lena",
      lastName: "Bötting",
      address: "Bahnhofstrasse 21",
      zip: "5023",
      city: "Luzern",
      phone: "079 111 22 33"
    },
    comment: ""
  },
  {
    id: 4,
    registerDate: "23.03.2025",
    status: "nicht bezahlt",
    group: "blau",
    room: "212",
    child: {
      firstName: "Ben",
      lastName: "Mustermann",
      birthDate: "01.01.2016",
      gender: "Männlich",
      club: "YCL",
      sailNumber: "2054",
      year: "2016",
      ahv: "7640166732007",
      wasInCamp: false,
      diet: "Vegan"
    },
    parent: {
      firstName: "Lena",
      lastName: "Bötting",
      address: "Bahnhofstrasse 21",
      zip: "5023",
      city: "Luzern",
      phone: "079 111 22 33"
    },
    comment: ""
  },
  {
    id: 5,
    registerDate: "23.03.2025",
    status: "rück. ausstehend",
    group: "rot",
    room: "201",
    child: {
      firstName: "Ben",
      lastName: "Mustermann",
      birthDate: "01.01.2016",
      gender: "Männlich",
      club: "YCL",
      sailNumber: "2054",
      year: "2016",
      ahv: "7640166732007",
      wasInCamp: true,
      diet: "Normalkost"
    },
    parent: {
      firstName: "Lena",
      lastName: "Bötting",
      address: "Bahnhofstrasse 21",
      zip: "5023",
      city: "Luzern",
      phone: "079 111 22 33"
    },
    comment: ""
  },
  {
    id: 6,
    registerDate: "23.03.2025",
    status: "Warteliste",
    group: "rot",
    room: "201",
    child: {
      firstName: "Ben",
      lastName: "Mustermann",
      birthDate: "01.01.2016",
      gender: "Männlich",
      club: "YCL",
      sailNumber: "2054",
      year: "2016",
      ahv: "7640166732007",
      wasInCamp: false,
      diet: "Normalkost"
    },
    parent: {
      firstName: "Lena",
      lastName: "Bötting",
      address: "Bahnhofstrasse 21",
      zip: "5023",
      city: "Luzern",
      phone: "079 111 22 33"
    },
    comment: ""
  }
])

const openId = ref<number | null>(registrations.value[0]?.id ?? null)

function toggle(id: number) {
  openId.value = openId.value === id ? null : id
}

function statusBadgeClass(status: string) {
  switch (status.toLowerCase()) {
    case "bezahlt":
      return "bg-green-100 text-green-700"
    case "nicht bezahlt":
      return "bg-red-100 text-red-700"
    case "angefordert":
      return "bg-yellow-100 text-yellow-800"
    case "warteliste":
      return "bg-slate-200 text-slate-800"
    case "rück. ausstehend":
      return "bg-orange-100 text-orange-800"
    case "angemeldet":
      return "bg-slate-100 text-slate-700"
    default:
      return "bg-slate-200 text-slate-700"
  }
}

function groupBadgeClass(group: string) {
  switch (group.toLowerCase()) {
    case "gelb":
      return "bg-yellow-100 text-yellow-800"
    case "grün":
      return "bg-green-100 text-green-800"
    case "rot":
      return "bg-red-100 text-red-800"
    case "blau":
      return "bg-sky-100 text-sky-800"
    case "schwarz":
      return "bg-slate-900 text-slate-50"
    default:
      return "bg-slate-200 text-slate-700"
  }
}

function roomBadgeClass(room: string | null) {
  if (!room) return "bg-red-100 text-red-700"
  return "bg-green-100 text-green-700"
}

// Dummy-Actions
function exportCsv() {
  console.log("Export als CSV angeklickt", registrations.value)
}
function openFilter() {
  console.log("Filter öffnen (noch nicht implementiert)")
}
function sendEmail() {
  console.log("Email-Funktion (noch nicht implementiert)")
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
