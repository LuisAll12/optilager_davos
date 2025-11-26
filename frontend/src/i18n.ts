// src/i18n.ts
import { createI18n } from "vue-i18n"

// JSON Files importieren
import de from "./locales/de.json"
import en from "./locales/en.json"
// import fr from "./locales/fr.json"

type MessageSchema = typeof de

function detectLocale() {
  const stored = localStorage.getItem("locale")
  if (stored) return stored

  const browser = navigator.language.toLowerCase()
  if (browser.startsWith("de")) return "de"
//   if (browser.startsWith("fr")) return "fr"
  return "en"
}

// export const i18n = createI18n<[MessageSchema], "de" | "en" | "fr">({
export const i18n = createI18n<[MessageSchema], "de" | "en" >({
  locale: detectLocale(),
  fallbackLocale: "de",
  messages: {
    de,
    en
    // fr
  }
})
