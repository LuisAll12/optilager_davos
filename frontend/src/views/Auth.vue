<template>
    <div class="min-h-screen text-white flex items-center justify-center px-4 py-10">
        <div class="w-full max-w-6xl grid gap-10 lg:grid-cols-2 items-center">
            <!-- Welcome Bereich -->
            <section class="space-y-6">
                <div class="space-y-3">
                    <h1 class="text-4xl sm:text-5xl font-extrabold">
                        {{ t("auth.welcomeTitle") }}
                    </h1>
                    <p class="max-w-md text-sm sm:text-base text-white/70 leading-relaxed">
                        {{ t("auth.welcomeText") }}
                    </p>
                </div>
            </section>

            <!-- Auth Card -->
            <section class="flex justify-center">
                <div
                    class="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur px-6 py-6 sm:px-8 sm:py-8 shadow-xl">
                    <h2 class="text-xl sm:text-2xl font-semibold mb-6">
                        {{ isLogin ? t("auth.login.title") : t("auth.register.title") }}
                    </h2>

                    <form class="space-y-4" @submit.prevent="onSubmit">
                        <!-- Email -->
                        <div class="space-y-1.5">
                            <label class="text-xs font-medium tracking-wide">
                                {{ t("auth.email") }}
                            </label>
                            <input type="email" v-model="form.email" required :disabled="isLoading"
                                class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-70 disabled:cursor-not-allowed">
                        </div>

                        <!-- Passwort -->
                        <div class="space-y-1.5">
                            <label class="text-xs font-medium tracking-wide">
                                {{ t("auth.password") }}
                            </label>
                            <input type="password" v-model="form.password" required :disabled="isLoading"
                                class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-70 disabled:cursor-not-allowed">
                        </div>

                        <!-- Passwort Wiederholung nur bei Register -->
                        <div v-if="!isLogin" class="space-y-1.5">
                            <label class="text-xs font-medium tracking-wide">
                                {{ t("auth.passwordRepeat") }}
                            </label>
                            <input type="password" v-model="form.passwordConfirm" required :disabled="isLoading"
                                class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 disabled:opacity-70 disabled:cursor-not-allowed">
                        </div>

                        <!-- Messages -->
                        <div class=" pt-2 space-y-1">
                            <p v-if="errorMessage" class="text-xs text-red-400">
                                {{ errorMessage }}
                            </p>
                            <p v-if="successMessage" class="text-xs text-emerald-400">
                                {{ successMessage }}
                            </p>
                        </div>

                        <div class="pt-4 flex flex-col gap-3">
                            <!-- Switch Text -->
                            <p class="text-[11px] sm:text-xs text-white/70">
                                <span v-if="isLogin">
                                    {{ t("auth.noAccount") }}
                                    <button type="button" class="text-sky-400 font-medium hover:underline ml-1"
                                        @click="switchMode" :disabled="isLoading">
                                        {{ t("auth.registerLink") }}
                                    </button>
                                </span>
                                <span v-else>
                                    {{ t("auth.hasAccount") }}
                                    <button type="button" class="text-sky-400 font-medium hover:underline ml-1"
                                        @click="switchMode" :disabled="isLoading">
                                        {{ t("auth.loginLink") }}
                                    </button>
                                </span>
                            </p>

                            <!-- Primary Button -->
                            <button type="submit" :disabled="isLoading"
                                class="inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-sky-400 transition disabled:opacity-60 disabled:cursor-not-allowed">
                                <span v-if="!isLoading">
                                    {{ isLogin ? t("auth.login.button") : t("auth.register.button") }}
                                </span>
                                <span v-else class="flex items-center gap-2">
                                    <span
                                        class="h-3 w-3 rounded-full border border-white/30 border-t-transparent animate-spin"></span>
                                    <span>Bitte warten...</span>
                                </span>
                                <span aria-hidden="true">→</span>
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useI18n } from "vue-i18n"
import { useAuthStore } from "../stores/auth" // Pfad ggf. anpassen
import { useRouter, useRoute } from "vue-router"

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const isLogin = ref(true)
const isLoading = ref(false)
const errorMessage = ref("")
const successMessage = ref("")

const form = reactive({
    email: "",
    password: "",
    passwordConfirm: ""
})

function resetMessages() {
    errorMessage.value = ""
    successMessage.value = ""
}

function switchMode() {
    if (isLoading.value) return
    resetMessages()
    isLogin.value = !isLogin.value
}

async function onSubmit() {
    resetMessages()

    if (isLoading.value) return
    isLoading.value = true

    try {
        if (!isLogin.value && form.password !== form.passwordConfirm) {
            errorMessage.value = "Passwörter stimmen nicht überein."
            isLoading.value = false
            return
        }

        if (isLogin.value) {
            await handleLogin(form.email, form.password)
        } else {
            await handleRegisterAndLogin(form.email, form.password)
        }
    } catch (err) {
        console.error(err)
        errorMessage.value = "Es ist ein unerwarteter Fehler aufgetreten."
    } finally {
        isLoading.value = false
    }
}

async function handleRegisterAndLogin(formEmail, formPassword) {
    const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/accounts/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formEmail,
                password: formPassword,
                role: "user"
            })
        }
    )

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        console.error("Fehler bei der Registrierung:", data)
        errorMessage.value =
            data.message || "Fehler bei der Registrierung. Bitte erneut versuchen."
        return
    }

    successMessage.value =
        "Registrierung erfolgreich. Du wirst nun automatisch angemeldet."

    // Direktes Login danach
    await handleLogin(formEmail, formPassword)
    isLogin.value = true
}

async function handleLogin(formEmail, formPassword) {
    const response = await fetch(
        `${import.meta.env.VITE_APP_BACKEND_URL}/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formEmail,
                password: formPassword
            })
        }
    )

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        console.error("Fehler beim Login:", data)
        errorMessage.value =
            data.message || "Fehler beim Login. Bitte Zugangsdaten prüfen."
        return
    }
    const token = data.accessToken || data.access_token
    if (!token) {
        errorMessage.value =
            "Login-Antwort enthielt kein Token. Bitte Backend prüfen."
        return
    }
    authStore.setSession(token, formEmail)
    const redirect = (route.query.redirect) || '/info'
    await router.push(redirect)

    successMessage.value = "Login erfolgreich."
}
</script>
