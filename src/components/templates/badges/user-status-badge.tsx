import { Status } from '@/shared/api/types/user'

export function UserStatusBadge({ status }: { status: Status }) {
    const statusColor = {
        confirm_pending: 'text-yellow-500 bg-yellow-500/10',
        payment_pending: 'text-yellow-500 bg-yellow-500/10',
        active: 'text-green-500 bg-green-500/10',
        blocked: 'text-red-500 bg-red-500/10',
        suspended: 'text-red-500 bg-red-500/10',
    }

    const statusText = {
        confirm_pending: 'Confirmação pendente',
        payment_pending: 'Pagamento pendente',
        active: 'Ativo',
        blocked: 'Bloqueado',
        suspended: 'Suspenso',
    }

    return (
        <div className='flex items-center gap-2'>
            <div
                className={`${statusColor[status]} px-2 py-1 rounded-sm text-xs font-semibold items-center justify-center flex font-mono uppercase`}
            >
                {statusText[status]}
            </div>
        </div>
    )
}
