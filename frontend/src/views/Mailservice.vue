<template>
    <div class="min-h-screen text-white px-4 py-10">
        <div class="mx-auto max-w-6xl">
            <header class="mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                    <h1 class="text-2xl sm:text-3xl font-semibold">
                        Email
                    </h1>
                    <p class="text-xs sm:text-sm text-white/70 mt-1">
                        Sende Nachrichten an ausgewählte Teilnehmer. Rechts findest du deine letzten Emails
                        als Vorlagen.
                    </p>
                </div>

                <div class="text-xs sm:text-sm text-white/70">
                    Empfänger
                    <span class="font-semibold text-white">
                        {{ recipients.length }} ausgewählt
                    </span>
                </div>
            </header>

            <section class="mb-4 space-y-1.5">
                <div class="flex items-center justify-between">
                    <p class="text-[11px] text-white/60">
                        An
                    </p>
                    <button v-if="recipients.length > 0" type="button"
                        class="text-[11px] text-white/50 hover:text-white/80 underline underline-offset-2"
                        @click="recipients = []">
                        Alle entfernen
                    </button>
                </div>

                <div
                    class="min-h-[44px] rounded-md bg-slate-900/70 border border-white/15 px-2 py-1.5 flex flex-wrap gap-1.5">
                    <template v-if="recipients.length">
                        <div v-for="r in recipients" :key="r.id"
                            class="group inline-flex items-center gap-2 rounded-full bg-slate-800 px-2 py-1 text-[11px] sm:text-xs">
                            <span
                                class="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500 text-[10px] font-semibold text-white uppercase">
                                {{ r.firstName.charAt(0) }}{{ r.lastName.charAt(0) }}
                            </span>
                            <div class="flex flex-col leading-tight">
                                <span class="font-medium">
                                    {{ r.firstName }} {{ r.lastName }}
                                </span>
                                <span class="text-[10px] text-white/60">
                                    {{ r.email }}
                                </span>
                            </div>
                            <button type="button"
                                class="ml-1 text-white/40 hover:text-red-400 opacity-0 group-hover:opacity-100 transition text-xs"
                                @click="removeRecipient(r.id)" title="Empfänger entfernen">
                                ×
                            </button>
                        </div>
                    </template>

                    <p v-else class="text-[11px] text-white/40">
                        Kein Empfänger ausgewählt. Bitte in der Teilnehmerliste markieren und über den Mail-Button
                        öffnen.
                    </p>
                </div>
            </section>

            <div class="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                <!-- Linke Seite: Editor -->
                <section class="space-y-4">
                    <!-- Betreff -->
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-white/80">
                            Betreff
                        </label>
                        <div class="flex flex-wrap items-center gap-2">
                            <input v-model="form.subject" type="text"
                                class="flex-1 min-w-[200px] rounded-md bg-slate-900/70 border border-white/20 px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-sky-500">
                            <div class="flex flex-wrap gap-1.5">
                                <button v-for="chip in subjectPresets" :key="chip" type="button"
                                    class="px-2 py-1 rounded-full bg-slate-800 text-[11px] hover:bg-sky-500 hover:text-white transition"
                                    @click="form.subject = chip">
                                    {{ chip }}
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Typ / Platzhalter-Hinweis -->
                    <div class="flex flex-wrap items-center justify-between gap-3">
                        <div class="flex flex-wrap gap-3 text-xs">
                            <label class="inline-flex items-center gap-1.5">
                                <input type="radio" value="payment" v-model="form.type" class="accent-sky-500">
                                Zahlungsaufforderung
                            </label>
                            <label class="inline-flex items-center gap-1.5">
                                <input type="radio" value="info" v-model="form.type" class="accent-sky-500">
                                Allgemeine Information
                            </label>
                            <label class="inline-flex items-center gap-1.5">
                                <input type="radio" value="custom" v-model="form.type" class="accent-sky-500">
                                Frei formuliert
                            </label>
                        </div>

                        <div class="flex flex-wrap gap-1.5 text-[11px] text-white/60">
                            <span>Verfügbare Platzhalter:</span>
                            <span class="px-2 py-0.5 rounded-full bg-slate-800 text-white/80">
                                [Vorname]
                            </span>
                            <span class="px-2 py-0.5 rounded-full bg-slate-800 text-white/80">
                                [Nachname]
                            </span>
                            <span class="px-2 py-0.5 rounded-full bg-slate-800 text-white/80">
                                [Betrag]
                            </span>
                            <span class="px-2 py-0.5 rounded-full bg-slate-800 text-white/80">
                                [Frist]
                            </span>
                        </div>
                    </div>

                    <!-- Textfeld -->
                    <div class="space-y-1.5">
                        <label class="text-xs font-semibold text-white/80">
                            Nachricht
                        </label>
                        <div class="relative">
                            <textarea v-model="form.body" rows="12" maxlength="4000"
                                class="w-full rounded-xl bg-slate-50 text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 border border-slate-200 resize-none"></textarea>
                            <span class="absolute bottom-1 right-2 text-[10px]"
                                :class="form.body.length > 3800 ? 'text-red-500' : 'text-slate-500'">
                                {{ form.body.length }}/4000
                            </span>
                        </div>
                    </div>

                    <!-- Footer / Senden -->
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
                        <label class="inline-flex items-center gap-2 text-xs text-white/80">
                            <input type="checkbox" v-model="form.markAsPaymentReminder" class="accent-sky-500">
                            Als Zahlungsaufforderung markieren
                        </label>

                        <button type="button"
                            class="inline-flex items-center justify-center gap-3 rounded-xl bg-sky-500 px-6 py-2 text-sm font-semibold text-white hover:bg-sky-400 disabled:opacity-60 disabled:cursor-not-allowed"
                            :disabled="!canSend" @click="sendEmail">
                            <span>Senden</span>
                            <span aria-hidden="true">→</span>
                        </button>
                    </div>

                    <!-- Debug-Ausgabe (optional) -->
                    <!-- <pre class="text-[10px] text-white/60">{{ JSON.stringify(form, null, 2) }}</pre> -->
                </section>

                <!-- Rechte Seite: Letzte Emails -->
                <section class="border-l border-white/10 pl-0 lg:pl-6">
                    <div class="flex flex-col h-full">
                        <div class="mb-3 flex items-center justify-between gap-3">
                            <h2 class="text-sm font-semibold text-white/80">
                                Letzte Emails
                            </h2>
                        </div>

                        <!-- Suche -->
                        <div class="mb-3">
                            <input v-model="search" type="text" placeholder="Suche nach Betreff oder Text..."
                                class="w-full rounded-md bg-slate-900/70 border border-white/20 px-3 py-1.5 text-xs outline-none focus:ring-2 focus:ring-sky-500">
                        </div>

                        <div class="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[480px]">
                            <button v-for="tpl in filteredTemplates" :key="tpl.id" type="button"
                                class="w-full text-left rounded-md px-3 py-2 text-xs sm:text-[13px] hover:bg-slate-900/80 border border-transparent hover:border-sky-500/60 transition"
                                :class="tpl.id === selectedTemplateId ? 'bg-slate-900/90 border-sky-500/80' : ''"
                                @click="loadTemplate(tpl)">
                                <p class="font-semibold underline underline-offset-2">
                                    {{ tpl.subject }}
                                    <span class="font-normal text-[11px] text-white/60">
                                        · {{ tpl.date }}
                                    </span>
                                </p>
                                <p class="mt-1 text-white/75 leading-snug line-clamp-3">
                                    {{ tpl.preview }}
                                </p>
                            </button>

                            <p v-if="filteredTemplates.length === 0" class="text-[11px] text-white/50">
                                Keine passenden Emails gefunden.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import { useRoute } from "vue-router"
interface Recipient {
    id: number
    firstName: string
    lastName: string
    email: string
}

interface EmailTemplate {
    id: number
    subject: string
    body: string
    date: string    // Anzeige, z.B. "Mo, 23.03.2026"
    preview: string // kurzer Teasertext
}

// Mock: ausgewählte Empfänger (z.B. aus der Teilnehmerliste übernommen)
// const recipients = ref<Recipient[]>([
//   { id: 1, firstName: "Max", lastName: "Mustermann", email: "max@example.com" },
//   { id: 2, firstName: "Ben", lastName: "Mustermann", email: "ben@example.com" },
//   { id: 3, firstName: "Lena", lastName: "Muster", email: "lena@example.com" }
// ])



const route = useRoute()

const recipients = ref<Recipient[]>([])

const fromState = route.state?.recipients as Recipient[] | undefined

if (fromState && Array.isArray(fromState) && fromState.length > 0) {
    recipients.value = fromState
} else {
    // Fallback-Mock, wenn jemand /mailservice direkt öffnet
    recipients.value = [
        { id: 1, firstName: "Max", lastName: "Mustermann", email: "max@example.com" },
        { id: 2, firstName: "Ben", lastName: "Mustermann", email: "ben@example.com" }
    ]
}

const subjectPresets = [
    "Letzte Zahlungsaufforderung",
    "Informationen zum Lagerstart",
    "Wichtige Infos für Eltern",
    "Erinnerung an fehlende Unterlagen"
]

// Mock der letzten gesendeten Emails als JSON
const templates = ref<EmailTemplate[]>([
    {
        id: 1,
        subject: "Letzte Zahlungsaufforderung",
        date: "Mo, 23.03.2026",
        preview:
            "Dies ist eine letzte Erinnerung an die offene Zahlung für das Optilager Davos. Bitte begleichen Sie den Betrag bis...",
        body:
            "Guten Tag [Vorname] [Nachname]\n\n" +
            "Dies ist eine letzte Erinnerung an die offene Zahlung für das Optilager Davos. " +
            "Bitte begleichen Sie den Betrag von [Betrag] bis spätestens [Frist]. " +
            "Sollte die Zahlung bereits erfolgt sein, betrachten Sie diese Nachricht bitte als gegenstandslos.\n\n" +
            "Freundliche Grüsse\nOptilager Davos"
    },
    {
        id: 2,
        subject: "Informationen zum Lagerstart",
        date: "So, 22.03.2026",
        preview:
            "Wir freuen uns, dass Ihr Kind am Optilager teilnimmt. Hier finden Sie die wichtigsten Infos zu Treffpunkt, Packliste und Notfallnummern...",
        body:
            "Liebe Eltern\n\n" +
            "Wir freuen uns sehr, dass [Vorname] dieses Jahr am Optilager teilnimmt. " +
            "Im Anhang finden Sie die detaillierten Informationen zum Treffpunkt, zur Packliste sowie zu den Notfallnummern.\n\n" +
            "Bei Fragen stehen wir Ihnen gerne zur Verfügung.\n\n" +
            "Herzliche Grüsse\nOptilager Davos"
    },
    {
        id: 3,
        subject: "Erinnerung an medizinische Unterlagen",
        date: "Fr, 20.03.2026",
        preview:
            "Uns fehlen noch medizinische Angaben oder Unterschriften für Ihr Kind. Bitte senden Sie uns das entsprechende Formular bis...",
        body:
            "Guten Tag\n\n" +
            "Für [Vorname] fehlen uns noch medizinische Angaben bzw. das unterschriebene Formular. " +
            "Bitte senden Sie uns die Unterlagen bis spätestens [Frist], damit wir die Teilnahme definitiv bestätigen können.\n\n" +
            "Besten Dank und freundliche Grüsse\nOptilager Davos"
    }
])

const form = reactive({
    subject: "Letzte Zahlungsaufforderung",
    body:
        "Guten Tag [Vorname] [Nachname]\n\n" +
        "Dies ist eine letzte Erinnerung an die offene Zahlung für das Optilager Davos. " +
        "Bitte begleichen Sie den Betrag von [Betrag] bis spätestens [Frist].\n\n" +
        "Freundliche Grüsse\nOptilager Davos",
    type: "payment" as "payment" | "info" | "custom",
    markAsPaymentReminder: true
})

const search = ref("")
const selectedTemplateId = ref<number | null>(1)

const filteredTemplates = computed(() => {
    if (!search.value.trim()) return templates.value
    const term = search.value.toLowerCase()
    return templates.value.filter(tpl => {
        return (
            tpl.subject.toLowerCase().includes(term) ||
            tpl.preview.toLowerCase().includes(term) ||
            tpl.body.toLowerCase().includes(term)
        )
    })
})

const canSend = computed(() => {
    return form.subject.trim().length > 0 && form.body.trim().length > 0 && recipients.value.length > 0
})

function loadTemplate(tpl: EmailTemplate) {
    form.subject = tpl.subject
    form.body = tpl.body
    selectedTemplateId.value = tpl.id
}

function removeRecipient(id: number) {
  recipients.value = recipients.value.filter(r => r.id !== id)
}

function sendEmail() {
    if (!canSend.value) return

    const payload = {
        recipients: recipients.value,
        subject: form.subject,
        body: form.body,
        type: form.type,
        markAsPaymentReminder: form.markAsPaymentReminder
    }

    console.log("Email senden Payload:", JSON.stringify(payload, null, 2))
    alert(`Email vorbereitet für ${recipients.value.length} Empfänger (siehe Console).`)
}
</script>

<style scoped>
/* Für line-clamp auf der rechten Seite (wenn Tailwind plugin fehlt) */
.line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
