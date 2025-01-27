import { TransactionStatus } from '@/shared/api/types/transaction'

export function TransactionStatusBadge({
    status,
}: {
    status: TransactionStatus
}) {
    const statusColor = {
        pending: 'text-yellow-500 bg-yellow-500/10',
        error: 'text-red-500 bg-red-500/10',
        done: 'text-green-500 bg-green-500/10',
        review: 'text-blue-500 bg-blue-500/10',
    }

    const statusText = {
        pending: 'Pendente',
        error: 'Erro',
        done: 'Concluído',
        review: 'Em análise',
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
