import { CurrencyCard } from '@/components/templates/cards/currency-card'
import { ReceiptChart } from '@/components/templates/charts/receipt-chart'
import { Separator } from '@/components/atoms/separator'
import { getGreetingByHour } from '@/utils/get-greeting-by-hour'
import { identifyPronounFromName } from '@/utils/identify-pronoun-from-name'
import { DollarSign, SquareArrowLeftIcon, Users } from 'lucide-react'
import { Label } from '@/components/atoms/label'

export const Dashboard = () => {
    const payments = {
        title: 'Payments',
        amount: 1000,
        diffFromLastMonth: 0,
        icon: <DollarSign />,
        loading: false,
    }
    const incomes = {
        title: 'Incomes',
        amount: 1500,
        diffFromLastMonth: 0,
        icon: <DollarSign />,
        loading: false,
    }
    const clients = {
        title: 'Clients',
        amount: 300,
        diffFromLastMonth: 0,
        icon: <Users />,
        loading: false,
    }
    const transfers = {
        title: 'Transfers',
        amount: 200,
        diffFromLastMonth: 0,
        icon: <SquareArrowLeftIcon />,
        loading: false,
    }

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <Label className='text-2xl font-semibold'>
                    {getGreetingByHour(new Date().getHours())}, Cristian! 😄
                </Label>
                <Label className='text-xs font-normal font-mono'>
                    Seja {identifyPronounFromName('Cristian')} ao seu painel
                </Label>
            </div>
            <Separator />
            <div className='grid grid-cols-4 gap-4'>
                <CurrencyCard {...payments} />
                <CurrencyCard {...incomes} />
                <CurrencyCard {...clients} />
                <CurrencyCard {...transfers} />
            </div>
            <div className='flex flex-col gap-4'>
                <ReceiptChart />
            </div>
        </div>
    )
}
