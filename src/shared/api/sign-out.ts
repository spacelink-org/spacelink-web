import { api } from '@/config/axios.config'

export const signOut = async () => {
    await api.post('/sign-out')
}
