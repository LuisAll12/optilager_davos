<template>
  <div class="min-h-screen text-white px-4 py-10">
    <div class="mx-auto max-w-6xl space-y-10">
      <!-- Header -->
      <section class="space-y-4">
        <div class="space-y-2">
          <h1 class="text-2xl sm:text-3xl font-semibold">
            Blogs
          </h1>
          <p class="text-sm sm:text-base text-white/80 max-w-xl">
            {{ blogIntro }}
          </p>
        </div>

        <!-- Filter / Sortierung -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs sm:text-sm">
          <!-- Sortierung -->
          <div class="flex items-center gap-2">
            <span class="text-white/60">
              Sortieren:
            </span>
            <div class="inline-flex rounded-full border border-white/20 overflow-hidden">
              <button
                type="button"
                class="px-3 py-1.5"
                :class="sortOrder === 'newest'
                  ? 'bg-white text-slate-900 font-semibold'
                  : 'text-white/70 hover:bg-white/10'"
                @click="sortOrder = 'newest'"
              >
                Neuste
              </button>
              <button
                type="button"
                class="px-3 py-1.5"
                :class="sortOrder === 'oldest'
                  ? 'bg-white text-slate-900 font-semibold'
                  : 'text-white/70 hover:bg-white/10'"
                @click="sortOrder = 'oldest'"
              >
                Älteste
              </button>
            </div>
          </div>

          <!-- Jahr-Filter -->
          <div class="flex items-center gap-2">
            <span class="text-white/60">
              Jahr:
            </span>
            <select
              v-model="yearFilter"
              class="bg-slate-900/80 border border-white/20 rounded-md px-2 py-1.5 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">
                Alle
              </option>
              <option
                v-for="year in availableYears"
                :key="year"
                :value="year"
              >
                {{ year }}
              </option>
            </select>
          </div>
        </div>
      </section>

      <!-- Blog Liste -->
      <section class="space-y-10">
        <div
          v-for="(post, index) in filteredPosts"
          :key="post.id"
          class="space-y-6"
        >
          <!-- Eintrag -->
          <article class="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
            <!-- Textbereich -->
            <div class="space-y-3">
              <h2 class="text-xl sm:text-2xl font-semibold">
                {{ post.title }}
              </h2>
              <p class="text-xs sm:text-sm text-white/70 font-semibold">
                {{ post.displayDate }} · {{ post.author }}
              </p>
              <p class="text-sm sm:text-base text-white/80 leading-relaxed">
                {{ post.content }}
              </p>
            </div>

            <!-- Bildbereich -->
            <div class="flex justify-center lg:justify-end">
              <div
                class="w-full max-w-sm aspect-video rounded-2xl bg-slate-200/90 flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="post.imageUrl"
                  :src="post.imageUrl"
                  alt=""
                  class="w-full h-full object-cover"
                >
                <div v-else class="flex flex-col items-center justify-center text-slate-500 gap-2">
                  <PhotoIcon class="w-10 h-10" />
                  <span class="text-xs">
                    Bild folgt
                  </span>
                </div>
              </div>
            </div>
          </article>

          <!-- Trenner zwischen Posts -->
          <hr
            v-if="index < filteredPosts.length - 1"
            class="border-t border-white/20"
          >
        </div>

        <!-- Fallback, falls kein Post zum Filter passt -->
        <p
          v-if="filteredPosts.length === 0"
          class="text-sm text-white/70"
        >
          Für die gewählte Kombination aus Sortierung und Jahr sind keine Blogeinträge vorhanden.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { PhotoIcon } from "@heroicons/vue/24/outline"

const blogIntro = ref(
  "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam."
)

// Blogdaten mit technischem Datum für Filter/Sortierung
const blogPosts = ref([
  {
    id: 1,
    title: "Titel",
    // technisches Datum (ISO) für Logik
    dateRaw: "2025-07-14",
    // Anzeigeformat
    displayDate: "14.07.2025",
    author: "Vorname Nachname",
    content:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam.",
    imageUrl: null
  },
  {
    id: 2,
    title: "Trainingstag auf dem See",
    dateRaw: "2024-07-05",
    displayDate: "05.07.2024",
    author: "Optilager Team",
    content:
      "Heute stand Techniktraining bei moderatem Wind auf dem Programm. Die Kids konnten Manöver vertiefen und haben in kleinen Gruppen Regattaformen ausprobiert. Am Nachmittag gab es einen kurzen Theorieblock an Land und Spiele im Team.",
    imageUrl: null
  },
  {
    id: 3,
    title: "Rückblick Lager 2023",
    dateRaw: "2023-08-20",
    displayDate: "20.08.2023",
    author: "Lagerleitung",
    content:
      "Ein weiterer großartiger Lagerjahrgang liegt hinter uns. Über 40 Kinder waren eine Woche auf dem Wasser, haben neue Freundschaften geschlossen und viel über Sicherheit und Segeltechnik gelernt.",
    imageUrl: null
  }
])

type SortOrder = "newest" | "oldest"
const sortOrder = ref<SortOrder>("newest")
const yearFilter = ref<string | number>("all")

// verfügbare Jahre aus den Daten
const availableYears = computed(() => {
  const years = blogPosts.value.map(post => new Date(post.dateRaw).getFullYear())
  return Array.from(new Set(years)).sort((a, b) => b - a)
})

// gefilterte + sortierte Posts
const filteredPosts = computed(() => {
  let posts = [...blogPosts.value]

  if (yearFilter.value !== "all") {
    const yearNumber = Number(yearFilter.value)
    posts = posts.filter(post => new Date(post.dateRaw).getFullYear() === yearNumber)
  }

  posts.sort((a, b) => {
    const da = new Date(a.dateRaw).getTime()
    const db = new Date(b.dateRaw).getTime()
    return sortOrder.value === "newest" ? db - da : da - db
  })

  return posts
})
</script>
