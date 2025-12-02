import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.ts'
import {i18n} from './i18n.ts'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/auth'


const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

const authStore = useAuthStore()
authStore.restoreFromLocalStorage()

app.mount('#app')