import { create } from 'zustand'
import { toast } from 'sonner'
import { signIn } from '../api/sign-in'
import { api } from '@/config/axios.config'

export type SignInPayload = {
    email: string
    password: string
}

export interface AuthStore {
    signIn: (signInPayload: SignInPayload) => Promise<void>
    isAuthenticated?: boolean
    setIsAuthenticated: (isAuthenticated: boolean) => Promise<void>
    getIsAuthenticated: () => Promise<void>
    signOut: () => void
    isLoggingIn?: boolean
    setIsLoggingIn: (isLoggingIn: boolean) => Promise<void>
}

export const useAuth = create<AuthStore>((set) => ({
    signIn: async ({ email, password }) => {
        try {
            set({ isLoggingIn: true })
            signIn({
                email,
                password,
            })
                .then((data) => {
                    if (data.status === 200) {
                        set({ isLoggingIn: false })
                        toast.success('Login realizado com sucesso!')
                        set({ isAuthenticated: true })
                    } else {
                        set({ isLoggingIn: false })
                        toast.error(
                            'Email ou senha inválidos, tente novamente!'
                        )
                    }
                })
                .catch(() => {
                    set({ isLoggingIn: false })
                    toast.error('Error on authentication hook!')
                })
        } catch {
            set({ isLoggingIn: false })
            toast.error('Error on authentication hook!')
        }
    },
    setIsLoggingIn: async (isLoggingIn) => {
        set({ isLoggingIn })
    },
    setIsAuthenticated: async (isAuthenticated) => {
        set({ isAuthenticated })
    },
    getIsAuthenticated: async () => {
        api.get('/current-user').then(({ data }) => {
            if (data.status === 200) {
                set({ isAuthenticated: true })
            }
        })
    },
    signOut: () => {
        api.post('/sign-out')
            .then(({ data }) => {
                if (data.status === 200) {
                    set({ isAuthenticated: false })
                }
            })
            .finally(() => {
                window.location.reload()
            })
    },
}))
