import { createRouter, createWebHistory } from "vue-router"
import Home from "../views/Home.vue"
import Auth from "../views/Auth.vue"
import Registration from "../views/Registration.vue"
import Info from "../views/Info.vue"
import Blogs from "../views/Blogs.vue"
import Participant from "../views/Participant.vue"
import MailService from "../views/Mailservice.vue"

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
        },
        {
            name: "Registration",
            path: "/registration",
            component: Registration
        },
        {
            name: "Info",
            path: "/info",
            component: Info
        },
        {
            name: "Blogs",
            path: "/blogs",
            component: Blogs
        },
        {
            name: "Participant",
            path: "/participants",
            component: Participant
        },
        {
            name: "mailservice",
            path: "/mailservice",
            component: MailService
        }
    ],
})

export default router