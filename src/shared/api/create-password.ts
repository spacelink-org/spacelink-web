import { api } from '@/config/axios.config'
import { z } from 'zod'

export const passwordSchema = z.object({
    password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres'),
})

export type PasswordPayload = z.infer<typeof passwordSchema>

export const createPassword = async (data: PasswordPayload) => {
    const response = await api.post('/auth/create-password', data)
    return response.data
}
