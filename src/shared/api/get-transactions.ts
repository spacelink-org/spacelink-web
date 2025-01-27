import { api } from '@/config/axios.config'
import { Transaction } from './types/transaction'

export const getTransactions = async () => {
    const response = await api.get<Transaction[]>('/transactions/get-all')
    return response.data
}
