import { TransactionStatusBadge } from '@/components/templates/badges/transaction-status-badge'
import { TransactionTypeBadge } from '@/components/templates/badges/transaction-type-badge'
import { CurrencyCard } from '@/components/templates/cards/currency-card'
import { DataTable } from '@/components/templates/table/data-table'
import { getCredits } from '@/shared/api/get-credits'
import { getDebits } from '@/shared/api/get-debits'
import { getTransactions } from '@/shared/api/get-transactions'
import { Transaction } from '@/shared/api/types/transaction'
import { floatToCurrency } from '@/utils/float-to-currency'
import { isoToBrDate } from '@/utils/iso-to-br-date'
import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import { DollarSign } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export function WalletPage() {
    const { data: result } = useQuery({
        queryKey: ['transactions'],
        queryFn: () => getTransactions(),
    })

    const { data: credits } = useQuery({
        queryKey: ['credits'],
        queryFn: () => getCredits(),
    })

    const { data: debits } = useQuery({
        queryKey: ['debits'],
        queryFn: () => getDebits(),
    })

    const sumDoneTransactions =
        result?.reduce((acc, transaction) => {
            if (transaction.status === 'done') {
                return acc + transaction.amount
            }
            return acc
        }, 0) ?? 0

    const sumPendingTransactions =
        result?.reduce((acc, transaction) => {
            if (transaction.status === 'pending') {
                return acc + transaction.amount
            }
            return acc
        }, 0) ?? 0

    const calculatePercentageDifference = (
        currentData: Transaction[] | undefined,
        _type: 'debits' | 'credits'
    ) => {
        if (!currentData) return 0

        const today = new Date()
        const currentMonth = today.getMonth()
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1

        const currentMonthTotal = currentData
            .filter(
                (t) =>
                    t.createdAt &&
                    new Date(t.createdAt).getMonth() === currentMonth
            )
            .reduce((acc, t) => acc + t.amount, 0)

        const lastMonthTotal = currentData
            .filter(
                (t) =>
                    t.createdAt &&
                    new Date(t.createdAt).getMonth() === lastMonth
            )
            .reduce((acc, t) => acc + t.amount, 0)

        if (lastMonthTotal === 0) return 0

        if (_type === 'debits') {
            return ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
        } else if (_type === 'credits') {
            return ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
        }

        return ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
    }

    const debitsDiff = calculatePercentageDifference(debits, 'debits')
    const creditsDiff = calculatePercentageDifference(credits, 'credits')

    const columns: ColumnDef<Transaction>[] = [
        {
            header: 'Data',
            accessorKey: 'createdAt',
            cell: ({ row }) => {
                const transaction = row.original
                return (
                    <span>{isoToBrDate(transaction.createdAt.toString())}</span>
                )
            },
        },
        {
            header: 'Descrição',
            accessorKey: 'description',
        },
        {
            header: 'Valor',
            accessorKey: 'amount',
            cell: ({ row }) => {
                const transaction = row.original
                return <span>{floatToCurrency(transaction.amount)}</span>
            },
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: ({ row }) => {
                const transaction = row.original
                return <TransactionStatusBadge status={transaction.status} />
            },
        },
        {
            header: 'Tipo',
            accessorKey: 'type',
            cell: ({ row }) => {
                const transaction = row.original
                return <TransactionTypeBadge type={transaction.type} />
            },
        },
    ]

    return (
        <div className='flex flex-col w-full h-full gap-4'>
            <Helmet title='Carteira' />
            <div className='flex items-center w-full gap-4'>
                <CurrencyCard
                    title='Saldo em conta'
                    amount={sumDoneTransactions || 0}
                    diffFromLastMonth={debitsDiff}
                    icon={<DollarSign />}
                    loading={false}
                />
                <CurrencyCard
                    title='Saldo pendente'
                    amount={sumPendingTransactions || 0}
                    diffFromLastMonth={creditsDiff}
                    icon={<DollarSign />}
                    loading={false}
                />
            </div>
            <DataTable columns={columns} data={result || []} />
        </div>
    )
}
