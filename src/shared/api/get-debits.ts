import { api } from '@/config/axios.config'
import { Transaction } from './get-transactions'

export const getDebits = async () => {
    const response = await api.get<Transaction[]>('/wallet/debits')
    return response.data
}
