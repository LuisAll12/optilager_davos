import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Auth from "../views/Auth.vue"

const router = createRouter({
    history: createWebHistory(), // HTML5 History Mode
    routes: [
        {
            name: "Home",
            path: "/",
            component: Home,
        },
        {
            name: "Auth",
            path: "/auth",
            component: Auth
        }
    ],
})

export default router