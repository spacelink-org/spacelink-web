import { api } from '@/config/axios.config'
import { Transaction } from './get-transactions'

export const getCredits = async () => {
    const response = await api.get<Transaction[]>('/wallet/credits')
    return response.data
}
