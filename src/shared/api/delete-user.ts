import { api } from '@/config/axios.config'

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/users/${id}`)
    return response.data
}
