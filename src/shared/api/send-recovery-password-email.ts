import { api } from '@/config/axios.config'
import { z } from 'zod'

export const sendRecoveryPasswordEmailSchema = z.object({
    email: z
        .string()
        .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
})

export type SendRecoveryPasswordEmailPayload = z.infer<
    typeof sendRecoveryPasswordEmailSchema
>

export const sendRecoveryPasswordEmail = async (
    payload: SendRecoveryPasswordEmailPayload
) => {
    const response = await api.post(
        '/recovery/send-recovery-password-email',
        payload
    )
    return response.data
}
