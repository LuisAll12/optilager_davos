import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import Home from "../views/Home.vue"
import Auth from "../views/Auth.vue"
import Registration from "../views/Registration.vue"
import Info from "../views/Info.vue"
import Blogs from "../views/Blogs.vue"
import Participant from "../views/Participant.vue"
import MailService from "../views/Mailservice.vue"


const routes: RouteRecordRaw[] = [
    {
        name: "Home",
        path: "/",
        component: Home,
    },
    {
        name: "Auth",
        path: "/auth",
        component: Auth,
        meta: { guestOnly: true }
    },
    {
        name: "Registration",
        path: "/registration",
        component: Registration,
        meta: { requiresAuth: true }
    },
    {
        name: "Info",
        path: "/info",
        component: Info,
        meta: { requiresAuth: true }
    },
    {
        name: "Blogs",
        path: "/blogs",
        component: Blogs,
        meta: { requiresAuth: true }
    },
    {
        name: "Participant",
        path: "/participants",
        component: Participant,
        meta: { requiresAuth: true }
    },
    {
        name: "mailservice",
        path: "/mailservice",
        component: MailService,
        meta: { requiresAuth: true }
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router


import { useAuthStore } from '../stores/auth'


router.beforeEach((to, from, next) => {
    const auth = useAuthStore()

    if (to.meta.requiresAuth && !auth.isAuthenticated) {
        return next({
            name: 'auth',
            query: {
                redirect: to.fullPath
            }
        })
    }

    if (to.meta.guestOnly && auth.isAuthenticated) {
        return next({ name: 'Info' })
    }

    return next()
})