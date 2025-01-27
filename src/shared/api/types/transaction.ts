import { User } from './user'

export type TransactionStatus = 'pending' | 'error' | 'done' | 'review'
export type TransactionType = 'credit' | 'debit' | 'refund'

export interface Transaction {
    id: string
    description: string
    amount: number
    userId?: string
    status: TransactionStatus
    type: TransactionType
    createdAt: Date
    updatedAt: Date
    user?: User
}
