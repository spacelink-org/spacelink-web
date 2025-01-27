import { api } from '@/config/axios.config'
import { Transaction } from './types/transaction'

export const getCredits = async () => {
    const response = await api.get<Transaction[]>('/wallet/credits')
    return response.data
}
