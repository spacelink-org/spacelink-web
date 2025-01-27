import { api } from '@/config/axios.config'
import { z } from 'zod'

export const CreateTransferKeySchema = z.object({
    key: z.string(),
})

export type CreateTransferPayload = z.infer<typeof CreateTransferKeySchema>

export const createTransferKey = async (payload: CreateTransferPayload) => {
    const response = await api.post('/transfers/keys/create', payload)
    return response.data
}
