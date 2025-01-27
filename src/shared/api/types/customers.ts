export type CustomerStatus =
    | 'pending_validation'
    | 'pending_payment'
    | 'active'
    | 'blocked'
    | 'desactivated'

export interface Customer {
    id: string
    userId?: string
    customerStatus: CustomerStatus
    createdAt: Date
    updatedAt: Date
}
