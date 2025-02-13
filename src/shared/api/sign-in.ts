import { api } from '@/config/axios.config'

export const signIn = async (payload: { email: string; password: string }) => {
    const response = await api.post('/sign-in', payload)
    return response
}
