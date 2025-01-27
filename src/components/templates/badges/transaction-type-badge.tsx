import { TransactionType } from '@/shared/api/types/transaction'
import { ArrowUpRight, ArrowDownLeft, ArrowUpDown } from 'lucide-react'

export function TransactionTypeBadge({ type }: { type: TransactionType }) {
    const typeColor = {
        credit: 'text-green-500 bg-green-500/10',
        debit: 'text-red-500 bg-red-500/10',
        refund: 'text-blue-500 bg-blue-500/10',
    }

    const typeText = {
        credit: 'Crédito',
        debit: 'Débito',
        refund: 'Reembolso',
    }

    const typeIcon = {
        credit: <ArrowUpRight size={16} strokeWidth={1.5} />,
        debit: <ArrowDownLeft size={16} strokeWidth={1.5} />,
        refund: <ArrowUpDown size={16} strokeWidth={1.5} />,
    }

    return (
        <div className='flex items-center gap-2'>
            <div
                className={`${typeColor[type]} px-2 py-1 gap-1 rounded-sm text-xs font-semibold items-center justify-center flex font-mono uppercase`}
            >
                {typeIcon[type]}
                {typeText[type]}
            </div>
        </div>
    )
}
