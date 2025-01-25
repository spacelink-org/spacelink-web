import { api } from '@/config/axios.config'

interface GetUserByIdProps {
    customerId: string
}

export type User = {
    id: string
    name: string
    email: string
    document: string
    phone: string
    memberId: string
}

export const getUserById = async ({ customerId }: GetUserByIdProps) => {
    const response = await api.get<User>(`/users/details/${customerId}`)
    return response.data
}
