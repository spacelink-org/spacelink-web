import { Loader2 } from 'lucide-react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/atoms/card'

import { Skeleton } from '@/components/atoms/skeleton'

export type CurrencyCardType = {
    title: string
    amount: number
    diffFromLastMonth: number
    icon: React.ReactNode
    loading: boolean
}

export const CurrencyCard: React.FC<CurrencyCardType> = ({
    title,
    amount,
    diffFromLastMonth,
    icon,
    loading,
}) => {
    return (
        <Card className='w-full'>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-base font-semibold'>
                    {title}
                </CardTitle>
                {loading ? (
                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                ) : (
                    icon
                )}
            </CardHeader>
            <CardContent className='space-y-1'>
                {amount !== null ? (
                    <>
                        <span className='text-2xl font-bold'>
                            {amount.toLocaleString('pt-BR', {
                                currency: 'BRL',
                                style: 'currency',
                            })}
                        </span>
                        <p className='text-xs text-muted-foreground'>
                            <span
                                className={
                                    diffFromLastMonth > 0
                                        ? 'text-emerald-500'
                                        : 'text-red-500'
                                }
                            >
                                {diffFromLastMonth > 0
                                    ? `+${diffFromLastMonth}`
                                    : diffFromLastMonth}
                                %
                            </span>{' '}
                            em relação ao mês passado
                        </p>
                    </>
                ) : (
                    <Skeleton />
                )}
            </CardContent>
        </Card>
    )
}
