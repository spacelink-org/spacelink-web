export type TransferKeyType = 'pix' | 'bank_account'

export interface TransferKey {
    id: string
    key: string
    userId?: string
    type: TransferKeyType
    createdAt: Date
    updatedAt: Date
}
