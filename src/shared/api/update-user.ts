import { api } from '@/config/axios.config'
import { z } from 'zod'

export const UpdateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    document: z.string().optional(),
    phone: z.string().optional(),
})

export type UpdateUserPayload = z.infer<typeof UpdateUserSchema>

export type UpdateUserProps = UpdateUserPayload & {
    id: string
}

export const updateUser = async ({
    id,
    name,
    email,
    document,
    phone,
}: UpdateUserProps) => {
    const response = await api.put(`/users/edit/${id}`, {
        name,
        email,
        document,
        phone,
    })
    return response.data
}
