<template>
    <div class="min-h-screen text-white px-4 py-10">
        <div class="mx-auto max-w-6xl">
            <header class="mb-6">
                <h1 class="text-2xl sm:text-3xl font-semibold">
                    Anmeldeliste
                </h1>
            </header>

            <div class="flex flex-col lg:flex-row gap-6">
                <!-- Liste -->
                <section class="flex-1">
                    <!-- Desktop Header -->
                    <!-- <div class="hidden sm:flex text-[11px] text-white/60 mb-3 px-4">
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
          </div> -->

                    <div class="space-y-3">
                        <div v-for="reg in registrations" :key="reg.id">
                            <div class="bg-white rounded-[999px] px-4 py-3 shadow-sm group">
                                <!-- Mobile: Name + Status + Edit + Pfeil -->
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
                                        <button type="button"
                                            class="inline-flex items-center justify-center rounded-full w-7 h-7 border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                                            @click="openEdit(reg)">
                                            <PencilSquareIcon class="w-4 h-4" />
                                        </button>
                                        <button type="button"
                                            class="flex items-center justify-center rounded-full w-7 h-7 border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                                            @click="toggle(reg.id)" :aria-expanded="openId === reg.id">
                                            <ChevronDownIcon class="w-4 h-4 transition-transform"
                                                :class="openId === reg.id ? 'rotate-180' : ''" />
                                        </button>
                                    </div>
                                </div>

                                <!-- Desktop Row -->
                                <div class="hidden sm:flex items-center gap-4">
                                    <!-- Name / Geburtsdatum -->
                                    <div class="flex-1 text-sm">
                                        <p class="font-semibold text-slate-900">
                                            {{ reg.child.firstName }} {{ reg.child.lastName }}, {{ reg.child.birthDate
                                            }}
                                        </p>
                                    </div>

                                    <!-- Datum -->
                                    <div class="w-32 text-xs text-slate-700 text-center">
                                        {{ reg.registerDate }}
                                    </div>

                                    <!-- Status -->
                                    <div class="w-32 text-xs flex justify-center">
                                        <span class="inline-flex items-center rounded-full px-3 py-1"
                                            :class="statusBadgeClass(reg.status)">
                                            {{ reg.status }}
                                        </span>
                                    </div>

                                    <!-- Gruppe -->
                                    <div class="w-28 text-xs flex justify-center">
                                        <span class="inline-flex items-center rounded-full px-3 py-1"
                                            :class="groupBadgeClass(reg.group)">
                                            {{ reg.group }}
                                        </span>
                                    </div>

                                    <!-- Zimmer -->
                                    <div class="w-20 text-xs flex justify-center">
                                        <span class="inline-flex items-center rounded-full px-3 py-1"
                                            :class="roomBadgeClass(reg.room)">
                                            {{ reg.room }}
                                        </span>
                                    </div>

                                    <!-- Edit + Pfeil -->
                                    <div class="flex items-center gap-2">
                                        <button type="button"
                                            class="hidden sm:inline-flex items-center justify-center rounded-full w-7 h-7 border border-slate-300 text-slate-700 bg-white/80 hover:bg-slate-100 transition opacity-0 group-hover:opacity-100"
                                            @click="openEdit(reg)" title="Bearbeiten">
                                            <PencilSquareIcon class="w-4 h-4" />
                                        </button>

                                        <button type="button"
                                            class="flex items-center justify-center rounded-full w-7 h-7 border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
                                            @click="toggle(reg.id)" :aria-expanded="openId === reg.id">
                                            <ChevronDownIcon class="w-4 h-4 transition-transform"
                                                :class="openId === reg.id ? 'rotate-180' : ''" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <!-- Detailbereich -->
                            <transition name="fade">
                                <div v-if="openId === reg.id"
                                    class="mt-2 rounded-2xl bg-slate-900/90 text-white/90 px-4 py-4 sm:px-6 sm:py-5 text-xs sm:text-sm">
                                    <div class="grid gap-4 md:grid-cols-4">
                                        <div class="space-y-1">
                                            <h3 class="text-[11px] uppercase tracking-wide text-white/60">
                                                Kind
                                            </h3>
                                            <p><span class="font-medium">Geschlecht</span> {{ reg.child.gender }}</p>
                                            <p><span class="font-medium">Segelclub</span> {{ reg.child.club }}</p>
                                            <p><span class="font-medium">Segelnummer</span> {{ reg.child.sailNumber }}
                                            </p>
                                            <p><span class="font-medium">Jahrgang</span> {{ reg.child.year }}</p>
                                            <p><span class="font-medium">AHV-Nummer</span> {{ reg.child.ahv }}</p>
                                        </div>

                                        <div class="space-y-1">
                                            <h3 class="text-[11px] uppercase tracking-wide text-white/60">
                                                Lager
                                            </h3>
                                            <p><span class="font-medium">Lager bereits besucht</span> {{
                                                reg.child.wasInCamp ? "Ja" : "Nein" }}</p>
                                            <p><span class="font-medium">Essverhalten</span> {{ reg.child.diet }}</p>
                                            <p><span class="font-medium">Status</span> {{ reg.status }}</p>
                                            <p><span class="font-medium">provisorische Gruppe</span> {{ reg.group }}</p>
                                            <p><span class="font-medium">Zimmer</span> {{ reg.room }}</p>
                                        </div>

                                        <div class="space-y-1 md:col-span-1">
                                            <h3 class="text-[11px] uppercase tracking-wide text-white/60">
                                                Kommentar
                                            </h3>
                                            <p class="leading-relaxed">
                                                {{ reg.comment || "Kein Kommentar hinterlegt." }}
                                            </p>
                                        </div>

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
                                            <p><span class="font-medium">Kontakt / Notfall</span> {{ reg.parent.phone }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </transition>
                        </div>
                    </div>
                </section>

                <!-- Actions rechts -->
                <aside class="lg:w-40 flex lg:flex-col gap-3 lg:pt-8">
                    <button type="button"
                        class="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-sky-400 transition"
                        @click="exportCsv">
                        <ArrowDownTrayIcon class="w-4 h-4" />
                        <span>Export als CSV</span>
                    </button>

                    <button type="button"
                        class="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-slate-700 transition"
                        @click="openFilter">
                        <FunnelIcon class="w-4 h-4" />
                        <span>Filter</span>
                    </button>

                    <button type="button"
                        class="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-slate-700 transition"
                        @click="sendEmail">
                        <EnvelopeIcon class="w-4 h-4" />
                        <span>Email</span>
                    </button>
                </aside>
            </div>
        </div>

        <!-- Edit Dialog -->
        <transition name="fade">
            <div v-if="editOpen && editForm"
                class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
                <div
                    class="w-full max-w-4xl rounded-2xl bg-slate-900 text-white shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
                    <header class="flex items-center justify-between px-5 py-4 border-b border-white/10">
                        <div>
                            <h2 class="text-sm sm:text-base font-semibold">
                                Teilnehmer bearbeiten
                            </h2>
                            <p class="text-[11px] text-white/60">
                                {{ editForm.child.firstName }} {{ editForm.child.lastName }}, {{
                                editForm.child.birthDate }}
                            </p>
                        </div>
                        <button type="button" class="text-white/60 hover:text-white text-xl leading-none"
                            @click="closeEdit">
                            ×
                        </button>
                    </header>

                    <form class="px-5 py-4 space-y-6" @submit.prevent="saveEdit">
                        <!-- Allgemein -->
                        <section class="space-y-3">
                            <h3 class="text-xs font-semibold uppercase tracking-wide text-white/70">
                                Allgemein
                            </h3>
                            <div class="grid gap-3 sm:grid-cols-4">
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Anmelde Datum</label>
                                    <input v-model="editForm.registerDate" type="text"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Anmeldestatus</label>
                                    <select v-model="editForm.status"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                        <option v-for="s in statusOptions" :key="s" :value="s">
                                            {{ s }}
                                        </option>
                                    </select>
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">prov. Gruppe</label>
                                    <select v-model="editForm.group"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                        <option v-for="g in groupOptions" :key="g" :value="g">
                                            {{ g }}
                                        </option>
                                    </select>
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Zimmer</label>
                                    <input v-model="editForm.room" type="text" placeholder="z.B. 201"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                            </div>
                        </section>

                        <!-- Kind -->
                        <section class="space-y-3">
                            <h3 class="text-xs font-semibold uppercase tracking-wide text-white/70">
                                Kind
                            </h3>
                            <div class="grid gap-3 sm:grid-cols-3">
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Vorname</label>
                                    <input v-model="editForm.child.firstName"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Nachname</label>
                                    <input v-model="editForm.child.lastName"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Geburtsdatum</label>
                                    <input v-model="editForm.child.birthDate"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                            </div>

                            <div class="grid gap-3 sm:grid-cols-4">
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Geschlecht</label>
                                    <input v-model="editForm.child.gender"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Segelclub</label>
                                    <input v-model="editForm.child.club"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Segelnummer</label>
                                    <input v-model="editForm.child.sailNumber"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Jahrgang</label>
                                    <input v-model="editForm.child.year"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                            </div>

                            <div class="grid gap-3 sm:grid-cols-3">
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">AHV-Nummer</label>
                                    <input v-model="editForm.child.ahv"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Essverhalten</label>
                                    <input v-model="editForm.child.diet"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="flex items-end gap-2">
                                    <label class="inline-flex items-center gap-2 text-[11px] text-white/70">
                                        <input type="checkbox" v-model="editForm.child.wasInCamp"
                                            class="accent-sky-500">
                                        Lager bereits besucht
                                    </label>
                                </div>
                            </div>
                        </section>

                        <!-- Eltern -->
                        <section class="space-y-3">
                            <h3 class="text-xs font-semibold uppercase tracking-wide text-white/70">
                                Eltern / Kontakt
                            </h3>
                            <div class="grid gap-3 sm:grid-cols-3">
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Vorname</label>
                                    <input v-model="editForm.parent.firstName"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Nachname</label>
                                    <input v-model="editForm.parent.lastName"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Telefon / Notfall</label>
                                    <input v-model="editForm.parent.phone"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                            </div>

                            <div class="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Adresse</label>
                                    <input v-model="editForm.parent.address"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">PLZ</label>
                                    <input v-model="editForm.parent.zip"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                                <div class="space-y-1.5">
                                    <label class="text-[11px] text-white/70">Ort</label>
                                    <input v-model="editForm.parent.city"
                                        class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                                </div>
                            </div>
                        </section>

                        <!-- Kommentar -->
                        <section class="space-y-3">
                            <h3 class="text-xs font-semibold uppercase tracking-wide text-white/70">
                                Kommentar
                            </h3>
                            <textarea v-model="editForm.comment" rows="3"
                                class="w-full rounded-md bg-slate-800 px-2 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500 resize-y"></textarea>
                        </section>

                        <footer class="flex justify-end gap-2 pt-2 pb-4">
                            <button type="button"
                                class="px-4 py-2 text-xs sm:text-sm rounded-md border border-white/30 text-white/80 hover:bg-white/10"
                                @click="closeEdit">
                                Abbrechen
                            </button>
                            <button type="submit"
                                class="px-4 py-2 text-xs sm:text-sm rounded-md bg-sky-500 text-white font-semibold hover:bg-sky-400">
                                Speichern
                            </button>
                        </footer>
                    </form>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import {
    ChevronDownIcon,
    ArrowDownTrayIcon,
    FunnelIcon,
    EnvelopeIcon,
    PencilSquareIcon
} from "@heroicons/vue/24/outline"

interface Child {
    firstName: string
    lastName: string
    birthDate: string
    gender: string
    club: string
    sailNumber: string
    year: string
    ahv: string
    wasInCamp: boolean
    diet: string
}

interface Parent {
    firstName: string
    lastName: string
    address: string
    zip: string
    city: string
    phone: string
}

interface Registration {
    id: number
    registerDate: string
    status: string
    group: string
    room: string
    child: Child
    parent: Parent
    comment: string
}

const registrations = ref<Registration[]>([
    {
        id: 1,
        registerDate: "23.03.2025",
        status: "angemeldet",
        group: "gelb",
        room: "Ausstehend",
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
            "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam."
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



const statusOptions = [
    "angemeldet",
    "angefordert",
    "bezahlt",
    "nicht bezahlt",
    "rück. ausstehend",
    "Warteliste"
]

const groupOptions = ["gelb", "grün", "rot", "blau", "schwarz"]


const editOpen = ref(false)
const editForm = ref<Registration | null>(null)

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

function roomBadgeClass(room: string) {
    if (room === "Ausstehend") return "bg-red-100 text-red-700"
    return "bg-green-100 text-green-700"
}

function openEdit(reg: Registration) {
    editForm.value = JSON.parse(JSON.stringify(reg))
    editOpen.value = true
}

function closeEdit() {
    editOpen.value = false
    editForm.value = null
}

function saveEdit() {
    if (!editForm.value) return
    const index = registrations.value.findIndex(r => r.id === editForm.value!.id)
    if (index !== -1) {
        registrations.value[index] = JSON.parse(JSON.stringify(editForm.value))
    }
    closeEdit()
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
