import { api } from '@/config/axios.config'
import { User } from './types/user'

export const getUsers = async () => {
    const response = await api.get<User[]>('/customers')
    return response.data
}
