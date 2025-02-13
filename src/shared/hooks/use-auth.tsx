import { create } from 'zustand'
import { toast } from 'sonner'
import Cookies from 'js-cookie'
import { signIn } from '../api/sign-in'

export type SignInPayload = {
    email: string
    password: string
}

export interface AuthStore {
    token?: string
    setToken: (token: string) => Promise<void>
    signIn: (signInPayload: SignInPayload) => Promise<void>
    isAuthenticated?: boolean
    setIsAuthenticated: (isAuthenticated: boolean) => Promise<void>
    getIsAuthenticated: () => boolean
    signOut: () => void
    isLoggingIn?: boolean
    setIsLoggingIn: (isLoggingIn: boolean) => Promise<void>
}

export const useAuth = create<AuthStore>((set) => ({
    signIn: async ({ email, password }) => {
        try {
            signIn({
                email,
                password,
            }).then((data) => {
                set({ isLoggingIn: false })
                toast.success('!')
                Cookies.set('auth_token', data, {
                    expires: 7,
                    secure: true,
                    sameSite: 'strict',
                })
                set({ token: data })
            })
        } catch {
            set({ isLoggingIn: false })
            toast.error('Error on authentication hook!')
        }
    },
    setToken: async (token) => {
        Cookies.set('auth_token', token, {
            expires: 7,
            secure: true,
            sameSite: 'strict',
        })
        set({ token })
    },
    setIsLoggingIn: async (isLoggingIn) => {
        set({ isLoggingIn })
    },
    setIsAuthenticated: async (isAuthenticated) => {
        set({ isAuthenticated })
    },
    getIsAuthenticated: () => {
        const token = Cookies.get('auth_token')
        if (!token) {
            console.log('Error on get user')
            return false
        }
        return true
    },
    signOut: () => {
        Cookies.remove('auth_token')
        set({ token: undefined })
    },
}))
