import { api } from '@/config/axios.config'

export type Transaction = {
    type: 'credit' | 'debit' | 'refund'
    status: 'error' | 'pending' | 'done' | 'review'
    id: string
    createdAt: Date | null
    updatedAt: Date | null
    description: string
    amount: number
    userId: string | null
}

export const getTransactions = async () => {
    const response = await api.get<Transaction[]>('/transactions/get-all')
    return response.data
}
