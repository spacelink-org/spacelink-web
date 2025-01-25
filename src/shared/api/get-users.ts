import { api } from '@/config/axios.config'

export type User = {
    name: string
    role: 'administrator' | 'customer' | 'member'
    id: string
    email: string
    document: string
    password: string
    phone: string | null
    memberId: string | null
    createdAt: Date
    updatedAt: Date
}

export const getUsers = async () => {
    const response = await api.get('/users')
    return response.data
}
