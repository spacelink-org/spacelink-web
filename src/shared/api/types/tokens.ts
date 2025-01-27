export type TokenType =
    | 'auth'
    | 'register'
    | 'recovery'
    | 'validate'
    | 'reset_password'
    | 'other'

export interface Token {
    id: string
    code: string
    userId?: string
    tokenType: TokenType
    createdAt: Date
    updatedAt: Date
}
