import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/router.js'
import {i18n} from './i18n.ts'

createApp(App).use(i18n).use(router).mount('#app')