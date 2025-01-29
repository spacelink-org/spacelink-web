import { CurrencyCard } from '@/components/templates/cards/currency-card'
import { ReceiptChart } from '@/components/templates/charts/receipt-chart'
import { getGreetingByHour } from '@/utils/get-greeting-by-hour'
import { identifyPronounFromName } from '@/utils/identify-pronoun-from-name'
import { DollarSign } from 'lucide-react'
import { Label } from '@/components/atoms/label'
import { getTransactions } from '@/shared/api/get-transactions'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/config/axios.config'

export const Dashboard = () => {
    const { data: allTransactions, isLoading: allTransactionsLoading } =
        useQuery({
            queryKey: ['transactions'],
            queryFn: () => getTransactions(),
        })

    const { data: me, isLoading: meLoading } = useQuery({
        queryKey: ['me'],
        queryFn: () => api.get('/me'),
    })

    const allTransactionsAmount =
        allTransactions?.reduce(
            (acc, transaction) => acc + transaction.amount,
            0
        ) ?? 0

    const allCreditsAmount =
        allTransactions
            ?.filter((transaction) => transaction.type === 'credit')
            ?.reduce((acc, transaction) => acc + transaction.amount, 0) ?? 0

    const allDebitsAmount =
        allTransactions
            ?.filter((transaction) => transaction.type === 'debit')
            ?.reduce((acc, transaction) => acc + transaction.amount, 0) ?? 0

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <Label className='text-2xl font-semibold'>
                    {getGreetingByHour(new Date().getHours())}, {me?.data.name}!
                    😄
                </Label>
                <Label className='text-xs font-normal font-mono'>
                    Seja {identifyPronounFromName(me?.data.name)} ao seu painel
                </Label>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                <CurrencyCard
                    title='Transações'
                    amount={allTransactionsAmount}
                    diffFromLastMonth={0}
                    icon={<DollarSign />}
                    loading={allTransactionsLoading}
                />
                <CurrencyCard
                    title='Créditos'
                    amount={allCreditsAmount}
                    diffFromLastMonth={0}
                    icon={<DollarSign />}
                    loading={allTransactionsLoading}
                />
                <CurrencyCard
                    title='Débitos'
                    amount={allDebitsAmount}
                    diffFromLastMonth={0}
                    icon={<DollarSign />}
                    loading={allTransactionsLoading}
                />
                <CurrencyCard
                    title='Saldo'
                    amount={me?.data.wallet ?? 0}
                    diffFromLastMonth={0}
                    icon={<DollarSign />}
                    loading={meLoading}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <ReceiptChart />
            </div>
        </div>
    )
}
