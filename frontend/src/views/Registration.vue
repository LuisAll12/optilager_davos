<template>
  <div class="min-h-screen text-white px-4 py-10">
    <div class="mx-auto max-w-6xl space-y-8">
      <!-- Intro -->
      <section class="space-y-3">
        <p class="text-xs sm:text-sm text-white/70 max-w-3xl">
          Bitte fülle dieses Formular vollständig aus. Die Angaben werden
          vertraulich behandelt. Nach erfolgreichem Ausfüllen erhältst du
          innerhalb von zwei bis drei Wochen eine Bestätigungsmail mit
          Zahlungsaufforderung. Die Platzzahl ist beschränkt.
        </p>
        <p class="text-xs sm:text-sm text-white/70">
          Bei Fragen:
          <a
            href="mailto:optilagerdavos@gmail.com"
            class="text-sky-400 hover:underline"
          >
            optilagerdavos@gmail.com
          </a>
        </p>
      </section>

      <!-- Card -->
      <section
        class="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur px-4 py-6 sm:px-8 sm:py-8 shadow-xl"
      >
        <!-- Header mit Step und Kindern -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6"
        >
          <h1 class="text-xl sm:text-2xl font-semibold">Anmeldung</h1>

          <div class="flex flex-col items-start sm:items-end gap-1">
            <p class="text-xs text-white/60">Seite {{ step }} / 2</p>

            <p
              v-if="children.length"
              class="text-[11px] text-white/50 flex flex-col gap-1"
            >
              <span>Bereits erfasste Kinder:</span>
              <template v-for="(child, index) in children" :key="index">
                <button
                  type="button"
                  class="group flex items-center gap-1 underline-offset-2 hover:underline"
                  @click="startEditChild(index)"
                >
                  <span>{{ child.firstName }} {{ child.lastName }}</span>
                  <PencilSquareIcon
                    class="w-3 h-3 opacity-0 group-hover:opacity-100 transition text-white/70"
                  />
                </button>
              </template>
            </p>
          </div>
        </div>

        <!-- STEP 1: Kinder -->
        <form v-if="step === 1" class="space-y-6" @submit.prevent="goNext">
          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Links: Kind -->
            <div class="space-y-4">
              <h2 class="text-sm font-semibold tracking-wide">
                Segler/in
                <span
                  v-if="editingIndex !== null"
                  class="ml-2 text-[11px] text-sky-400"
                >
                  (Bearbeitung)
                </span>
              </h2>

              <div class="space-y-1.5">
                <label class="text-xs font-medium"> Vorname* </label>
                <input
                  v-model="sailor.firstName"
                  class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-medium"> Nachname* </label>
                <input
                  v-model="sailor.lastName"
                  class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-medium"> Geburtsdatum* </label>
                <input
                  type="date"
                  v-model="sailor.birthdate"
                  class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div class="space-y-1.5">
                <p class="text-xs font-medium">Geschlecht*</p>
                <div class="flex flex-wrap gap-3 text-xs">
                  <label class="inline-flex items-center gap-1.5">
                    <input
                      type="radio"
                      value="m"
                      v-model="sailor.gender"
                      class="accent-sky-500"
                    />
                    Männlich
                  </label>
                  <label class="inline-flex items-center gap-1.5">
                    <input
                      type="radio"
                      value="w"
                      v-model="sailor.gender"
                      class="accent-sky-500"
                    />
                    Weiblich
                  </label>
                  <label class="inline-flex items-center gap-1.5">
                    <input
                      type="radio"
                      value="d"
                      v-model="sailor.gender"
                      class="accent-sky-500"
                    />
                    Divers
                  </label>
                </div>
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-medium"> Segelclub* </label>
                <input
                  v-model="sailor.club"
                  class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-medium">
                  AHV Nummer der/des Segler/in
                </label>
                <input
                  v-model="sailor.ahv"
                  class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <!-- Rechts: Lagererfahrung / Essen / Kommentar -->
            <div class="space-y-4">
              <div class="space-y-1.5">
                <p class="text-xs font-medium">
                  Warst du schon einmal im Lager*
                </p>
                <div class="flex gap-4 text-xs">
                  <label class="inline-flex items-center gap-1.5">
                    <input
                      type="radio"
                      value="yes"
                      v-model="sailor.wasInCamp"
                      class="accent-sky-500"
                    />
                    Ja
                  </label>
                  <label class="inline-flex items-center gap-1.5">
                    <input
                      type="radio"
                      value="no"
                      v-model="sailor.wasInCamp"
                      class="accent-sky-500"
                    />
                    Nein
                  </label>
                </div>
              </div>

              <div class="space-y-1.5">
                <p class="text-xs font-medium">Essverhalten*</p>
                <div class="flex flex-col gap-1.5 text-xs">
                  <label class="inline-flex items-center gap-1.5">
                    <input
                      type="radio"
                      value="normal"
                      v-model="sailor.diet"
                      class="accent-sky-500"
                    />
                    Normalkost
                  </label>
                  <label class="inline-flex items-center gap-1.5">
                    <input
                      type="radio"
                      value="vegetarisch"
                      v-model="sailor.diet"
                      class="accent-sky-500"
                    />
                    Vegetarisch
                  </label>
                  <label class="inline-flex items-center gap-1.5">
                    <input
                      type="radio"
                      value="vegan"
                      v-model="sailor.diet"
                      class="accent-sky-500"
                    />
                    Vegan
                  </label>
                </div>
              </div>

              <div class="relative">
                <textarea
                  v-model="sailor.comment"
                  rows="6"
                  maxlength="400"
                  class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  placeholder="Zum Beispiel Allergien, Unverträglichkeiten, Medikamente, spezielle Hinweise."
                ></textarea>

                <span
                  class="absolute bottom-1 right-2 text-[10px]"
                  :class="
                    sailor.comment.length > 400
                      ? 'text-red-500'
                      : 'text-slate-500'
                  " 
                >
                  {{ sailor.comment.length }}/400
                </span>
              </div>
            </div>
          </div>

          <!-- Footer Step 1 -->
          <div
            class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <button
              type="button"
              class="text-[11px] text-white/70 hover:text-white underline-offset-2 hover:underline"
              @click="addAnother"
            >
              {{
                editingIndex === null
                  ? "Weitere Anmeldung"
                  : "Änderung speichern und weiteres Kind"
              }}
            </button>

            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-sky-400 transition"
            >
              Weiter
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>

        <!-- STEP 2: Eltern / Vertretung -->
        <form v-else class="space-y-6" @submit.prevent="submitForm">
          <div class="grid gap-8 lg:grid-cols-2">
            <!-- Links -->
            <div class="space-y-4">
              <h2 class="text-sm font-semibold tracking-wide">
                Elternteil oder gesetzliche Vertretung
              </h2>

              <div class="space-y-1.5">
                <label class="text-xs font-medium"> Vorname* </label>
                <input
                  v-model="parent.firstName"
                  required
                  class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-medium"> Nachname* </label>
                <input
                  v-model="parent.lastName"
                  required
                  class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div class="space-y-1.5">
                <label class="text-xs font-medium"> Adresse* </label>
                <input
                  v-model="parent.address"
                  required
                  class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="space-y-1.5">
                  <label class="text-xs font-medium"> PLZ* </label>
                  <input
                    v-model="parent.zip"
                    required
                    class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div class="sm:col-span-2 space-y-1.5">
                  <label class="text-xs font-medium"> Ort* </label>
                  <input
                    v-model="parent.city"
                    required
                    class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            <!-- Rechts -->
            <div class="space-y-4">
              <div class="space-y-1.5">
                <label class="text-xs font-medium">
                  Kontakt oder Notfallnummer während des Lagers*
                </label>
                <input
                  v-model="parent.emergencyPhone"
                  required
                  class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div class="space-y-1.5">
                <p class="text-xs font-medium">Teilnahme bestätigen*</p>
                <label class="inline-flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    v-model="sailor.acceptChildTerms"
                    required
                    class="accent-sky-500"
                  />
                  Ich bestätige, dass mein Kind am Lager teilnehmen darf.
                </label>
              </div>

              <div class="space-y-1.5">
                <p class="text-xs font-medium">Zustimmung der AGBs*</p>
                <p class="text-[11px] text-white/60">
                  Hiermit bestätige ich, die AGBs gelesen zu haben und zu
                  akzeptieren.
                </p>
                <label class="inline-flex items-center gap-2 text-xs">
                  <input
                    type="checkbox"
                    v-model="parent.acceptTerms"
                    required
                    class="accent-sky-500"
                  />
                  AGBs gelesen und akzeptiert
                </label>
              </div>
            </div>
          </div>

          <!-- Footer Step 2 -->
          <div
            class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            <button
              type="button"
              class="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-xs sm:text-sm text-white hover:bg-white/5 transition"
              @click="goBack"
            >
              ← Zurück
            </button>

            <button
              type="submit"
              class="inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-sky-400 transition"
            >
              Abschliessen
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { PencilSquareIcon } from "@heroicons/vue/24/outline";

const step = ref(1);
const children = ref([]); // Liste aller Kinder
const editingIndex = ref<number | null>(null); // Index des Kindes, das bearbeitet wird, oder null

const sailor = reactive({
  firstName: "",
  lastName: "",
  birthdate: "",
  gender: "",
  club: "",
  ahv: "",
  wasInCamp: "",
  diet: "",
  comment: "",
  acceptChildTerms: false, // <--- NEU
});

const parent = reactive({
  firstName: "",
  lastName: "",
  address: "",
  zip: "",
  city: "",
  emergencyPhone: "",
  confirmation: "",
  acceptTerms: false,
});

function resetSailor() {
  sailor.firstName = "";
  sailor.lastName = "";
  sailor.birthdate = "";
  sailor.gender = "";
  sailor.club = "";
  sailor.ahv = "";
  sailor.wasInCamp = "";
  sailor.diet = "";
  sailor.comment = "";
  sailor.acceptChildTerms = false;
}

function sailorFormEmpty() {
  return (
    !sailor.firstName &&
    !sailor.lastName &&
    !sailor.birthdate &&
    !sailor.gender &&
    !sailor.club &&
    !sailor.ahv &&
    !sailor.wasInCamp &&
    !sailor.diet &&
    !sailor.comment
  );
}

function validateSailor() {
  return (
    sailor.firstName &&
    sailor.lastName &&
    sailor.birthdate &&
    sailor.gender &&
    sailor.club &&
    sailor.wasInCamp &&
    sailor.diet &&
    sailor.acceptChildTerms // <--- NEU
  );
}

function addOrUpdateCurrentSailor() {
  if (!validateSailor()) {
    alert("Bitte alle Pflichtfelder des Kindes ausfüllen.");
    return false;
  }

  if (editingIndex.value !== null) {
    children.value[editingIndex.value] = { ...sailor };
  } else {
    children.value.push({ ...sailor });
  }

  resetSailor();
  editingIndex.value = null;
  return true;
}

// Klick auf "Weitere Anmeldung"
function addAnother() {
  if (!validateSailor()) {
    alert("Bitte alle Pflichtfelder des Kindes ausfüllen.");
    return;
  }

  if (editingIndex.value !== null) {
    children.value[editingIndex.value] = { ...sailor };
    editingIndex.value = null;
  } else {
    children.value.push({ ...sailor });
  }

  resetSailor();
}

// Klick auf "Weiter"
function goNext() {
  // Fall 1: Formular leer -> nur weiter, wenn bereits Kinder vorhanden
  if (sailorFormEmpty()) {
    if (children.value.length === 0) {
      alert("Bitte mindestens ein Kind erfassen.");
      return;
    }
    step.value = 2;
    return;
  }

  // Fall 2: Formular hat Inhalt -> Kind validieren und speichern (neu oder Update)
  const ok = addOrUpdateCurrentSailor();
  if (!ok) return;

  step.value = 2;
}

function goBack() {
  step.value = 1;
}

// Kind zum Bearbeiten auswählen
function startEditChild(index: number) {
  const child = children.value[index];
  sailor.firstName = child.firstName;
  sailor.lastName = child.lastName;
  sailor.birthdate = child.birthdate;
  sailor.gender = child.gender;
  sailor.club = child.club;
  sailor.ahv = child.ahv;
  sailor.wasInCamp = child.wasInCamp;
  sailor.diet = child.diet;
  sailor.comment = child.comment;

  editingIndex.value = index;
  step.value = 1;
}

function submitForm() {
  if (!parent.acceptTerms || !parent.confirmation) {
    alert("Bitte Elternbestätigung und AGBs akzeptieren.");
    return;
  }

  const payload = {
    children: children.value,
    parent: { ...parent },
  };

  console.log("Gesamte Anmeldung:", JSON.stringify(payload, null, 2));
  alert("Anmeldung erfolgreich übermittelt. Siehe Console Log für JSON.");
}
</script>
