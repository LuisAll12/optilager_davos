import { defineStore } from 'pinia'

const STORAGE_KEY = 'auth_session'

interface PersistedSession {
    token: string
    email: string | null
}

interface AuthState {
    token: string | null
    email: string | null
}

function loadInitialState(): AuthState {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (!raw) {
            return { token: null, email: null }
        }

        const parsed = JSON.parse(raw) as Partial<PersistedSession>

        return {
            token: parsed.token ?? null,
            email: parsed.email ?? null
        }
    } catch {
        return { token: null, email: null }
    }
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => loadInitialState(),

    getters: {
        isAuthenticated: (state): boolean => !!state.token,

        // Kann direkt in fetch-Helper verwendet werden
        authHeader: (state): Record<string, string> =>
            state.token ? { Authorization: `Bearer ${state.token}` } : {}
    },

    actions: {
        setSession(token: string, email: string) {
            this.token = token
            this.email = email

            const payload: PersistedSession = {
                token,
                email
            }

            localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
        },

        logout() {
            this.token = null
            this.email = null
            localStorage.removeItem(STORAGE_KEY)
        },

        // Falls du irgendwo manuell refreshen willst
        restoreFromLocalStorage() {
            const next = loadInitialState()
            this.token = next.token
            this.email = next.email
        }
    }
})
