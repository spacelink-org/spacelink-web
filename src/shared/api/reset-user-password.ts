import { api } from '@/config/axios.config'
import { z } from 'zod'

export const resetUserPasswordSchema = z.object({
    token: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
})

export type ResetUserPasswordPayload = z.infer<typeof resetUserPasswordSchema>

export const resetUserPassword = async (payload: ResetUserPasswordPayload) => {
    const response = await api.post('/recovery/reset-user-password', payload)
    return response.data
}
