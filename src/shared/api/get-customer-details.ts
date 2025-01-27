import { api } from '@/config/axios.config'
import { User } from './types/user'

interface GetUserByIdProps {
    customerId: string
}

export const getUserById = async ({ customerId }: GetUserByIdProps) => {
    const response = await api.get<User>(`/customers/${customerId}`)
    return response.data
}
