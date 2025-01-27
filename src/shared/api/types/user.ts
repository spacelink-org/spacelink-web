export type Role = 'customer' | 'admin' | 'member'
export type Status =
    | 'confirm_pending'
    | 'payment_pending'
    | 'active'
    | 'blocked'
    | 'suspended'

export interface User {
    id: string
    name: string
    email: string
    document: string
    phone: string | null
    role: Role
    status: Status
    wallet: number
    memberId: string | null
    createdAt: string
    updatedAt: string
}
