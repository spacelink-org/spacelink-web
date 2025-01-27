import { api } from '@/config/axios.config'
import { SignInPayload } from '@/shared/hooks/use-auth'

export const signIn = async (payload: SignInPayload) => {
    const response = await api.post('/sign-in', payload)
    return response
}
