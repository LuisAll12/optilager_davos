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
        <div class="w-full max-w-sm rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur px-6 py-6 sm:px-8 sm:py-8 shadow-xl">
          <h2 class="text-xl sm:text-2xl font-semibold mb-6">
            {{ isLogin ? t("auth.login.title") : t("auth.register.title") }}
          </h2>

          <form class="space-y-4" @submit.prevent="onSubmit">
            <div class="space-y-1.5">
              <label class="text-xs font-medium tracking-wide">
                {{ t("auth.email") }}
              </label>
              <input
                type="email"
                v-model="form.email"
                required
                class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              >
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-medium tracking-wide">
                {{ t("auth.password") }}
              </label>
              <input
                type="password"
                v-model="form.password"
                required
                class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              >
            </div>

            <div
              v-if="!isLogin"
              class="space-y-1.5"
            >
              <label class="text-xs font-medium tracking-wide">
                {{ t("auth.passwordRepeat") }}
              </label>
              <input
                type="password"
                v-model="form.passwordConfirm"
                required
                class="w-full rounded-md bg-white text-slate-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500"
              >
            </div>

            <div class="pt-4 flex flex-col gap-3">
              <!-- Switch Text -->
              <p class="text-[11px] sm:text-xs text-white/70">
                <span v-if="isLogin">
                  {{ t("auth.noAccount") }}
                  <button
                    type="button"
                    class="text-sky-400 font-medium hover:underline ml-1"
                    @click="switchMode"
                  >
                    {{ t("auth.registerLink") }}
                  </button>
                </span>
                <span v-else>
                  {{ t("auth.hasAccount") }}
                  <button
                    type="button"
                    class="text-sky-400 font-medium hover:underline ml-1"
                    @click="switchMode"
                  >
                    {{ t("auth.loginLink") }}
                  </button>
                </span>
              </p>

              <!-- Primary Button -->
              <button
                type="submit"
                class="inline-flex items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-xs sm:text-sm font-semibold text-white hover:bg-sky-400 transition"
              >
                <span>
                  {{ isLogin ? t("auth.login.button") : t("auth.register.button") }}
                </span>
                <span aria-hidden="true">
                  →
                </span>
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

const { t } = useI18n()

const isLogin = ref(true)

const form = reactive({
  email: "",
  password: "",
  passwordConfirm: ""
})

function switchMode() {
  isLogin.value = !isLogin.value
}

function onSubmit() {
  if (!isLogin.value && form.password !== form.passwordConfirm) {
    alert("Passwörter stimmen nicht überein")
    return
  }

  if (isLogin.value) {
    console.log("Login", { email: form.email, password: form.password })
  } else {
    console.log("Register", {
      email: form.email,
      password: form.password
    })
  }
}
</script>
