import { api } from '@/config/axios.config'
import { z } from 'zod'

export const createUserSchema = z.object({
    name: z
        .string()
        .min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
    email: z.string().email({ message: 'Email inválido' }),
    phone: z
        .string()
        .min(11, { message: 'Telefone deve ter pelo menos 11 caracteres' }),
    document: z.string().min(11, {
        message: 'Documento deve ter pelo menos 11 caracteres',
    }),
    password: z.string().optional(),
})

export type CreateUserPayload = z.infer<typeof createUserSchema>

export const createUser = async (payload: CreateUserPayload) => {
    const response = await api.post('/customers/create', payload)
    return response.data
}
