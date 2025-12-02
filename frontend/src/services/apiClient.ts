import { useAuthStore } from '../stores/auth'

const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL || 'http://localhost:3000'

export async function apiFetch(path: string, options: RequestInit = {}) {
    const authStore = useAuthStore()

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> | undefined),
        ...authStore.authHeader
    }

    const resp = await fetch(`${BASE_URL}${path}`, {
        ...options,
        headers
    })

    if (resp.status === 401) {
        authStore.logout()
    }

    return resp
}
