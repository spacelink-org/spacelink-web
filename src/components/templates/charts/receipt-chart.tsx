import { Loader2, XCircle } from 'lucide-react'
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis,
} from 'recharts'
import { violet } from 'tailwindcss/colors'

import { Button } from '@/components/atoms/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/atoms/card'

interface ReceiptDataPerMonth {
    date: string
    receipt: number
}

export interface ReceiptChartProps {
    data: ReceiptDataPerMonth[]
}

function CustomTooltip({
    active,
    payload,
    label,
}: TooltipProps<number, number>) {
    if (active && payload && payload.length) {
        return (
            <div className='flex gap-1 rounded-l border bg-card p-2 text-sm text-card-foreground shadow-sm'>
                <span className='font-semibold'>{label}</span>
                <span>-</span>
                <span>
                    {payload[0].value?.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    })}
                </span>
            </div>
        )
    }

    return null
}

export function ReceiptChart() {
    const monthReceiptsLoading: [] = []
    const dailyReceiptInPeriod: [] = []
    const monthReceipts: [] = []

    return (
        <Card className='col-span-6'>
            <CardHeader className='flex flex-row items-center justify-between pb-8'>
                <div className='space-y-1'>
                    <CardTitle className='flex items-center gap-2 text-base font-medium'>
                        Receita no período
                        {monthReceiptsLoading && (
                            <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                        )}
                    </CardTitle>
                    <CardDescription>Receita diária no período</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                {dailyReceiptInPeriod ? (
                    <>
                        {monthReceipts.length && monthReceipts.length > 0 ? (
                            <ResponsiveContainer width='100%' height={240}>
                                <LineChart
                                    data={dailyReceiptInPeriod}
                                    style={{ fontSize: 12 }}
                                >
                                    <XAxis
                                        dataKey='date'
                                        stroke='#888888'
                                        tickLine={false}
                                        axisLine={false}
                                        dy={16}
                                    />

                                    <YAxis
                                        stroke='#888888'
                                        tickLine={false}
                                        axisLine={false}
                                        width={80}
                                        tickFormatter={(value: number) =>
                                            value.toLocaleString('pt-BR', {
                                                style: 'currency',
                                                currency: 'BRL',
                                            })
                                        }
                                    />

                                    <CartesianGrid
                                        className='!stroke-muted'
                                        vertical={false}
                                    />

                                    <Line
                                        type='linear'
                                        strokeWidth={2}
                                        dataKey='receipt'
                                        stroke={violet['500']}
                                    />

                                    <Tooltip
                                        cursor={false}
                                        content={<CustomTooltip />}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className='flex h-[240px] w-full flex-col items-center justify-center gap-0.5'>
                                <span className='text-sm text-muted-foreground'>
                                    Nenhum resultado encontrado para o período.
                                </span>
                                <Button
                                    variant='link'
                                    size='sm'
                                    className='text-violet-500 dark:text-violet-400'
                                >
                                    Exibir resultados dos últimos 7 dias
                                </Button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className='flex h-[240px] w-full flex-col items-center justify-center gap-0.5'>
                        <span className='flex items-center gap-2 text-sm text-red-500 dark:text-red-400'>
                            <XCircle className='h-4 w-4' />
                            Erro ao obter dados do período.
                        </span>
                        <Button
                            variant='link'
                            size='sm'
                            className='text-violet-500 dark:text-violet-400'
                        >
                            Recarregar gráfico
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
