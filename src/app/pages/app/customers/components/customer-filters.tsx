import { Search, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import { z } from 'zod'

import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/atoms/select'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customersFiltersSchema = z.object({
    customerId: z.string().optional(),
    customerName: z.string().optional(),
    status: z.string().optional(),
})

type CustomerFiltersSchema = z.infer<typeof customersFiltersSchema>

export function CustomerTableFilters() {
    const [searchParams, setSearchParams] = useSearchParams()

    const customerId = searchParams.get('customerId')
    const customerName = searchParams.get('customerName')
    const status = searchParams.get('status')

    const { register, handleSubmit, reset, control } =
        useForm<CustomerFiltersSchema>({
            defaultValues: {
                customerId: customerId ?? '',
                customerName: customerName ?? '',
                status: status ?? 'all',
            },
        })

    function handleFilter(data: CustomerFiltersSchema) {
        const customerId = data.customerId?.toString()
        const customerName = data.customerName?.toString()
        const status = data.status?.toString()

        setSearchParams((prev) => {
            if (customerId) {
                prev.set('customerId', customerId)
            } else {
                prev.delete('customerId')
            }

            if (customerName) {
                prev.set('customerName', customerName)
            } else {
                prev.delete('customerName')
            }

            if (status) {
                prev.set('status', status)
            } else {
                prev.delete('status')
            }

            prev.set('page', '1')

            return prev
        })
    }
    function handleClearFilters() {
        setSearchParams((prev) => {
            prev.delete('customerId')
            prev.delete('customerName')
            prev.delete('status')
            prev.set('page', '1')

            return prev
        })

        reset({
            customerId: '',
            customerName: '',
            status: 'all',
        })
    }

    const hasAnyFilter = !!customerId || !!customerName || !!status

    return (
        <form
            onSubmit={handleSubmit(handleFilter)}
            className='flex items-center gap-2'
        >
            <span className='text-sm font-semibold'>Filtros:</span>
            <Input
                placeholder='ID do cliente'
                className='h-8 w-auto'
                {...register('customerId')}
            />
            <Input
                placeholder='Nome do cliente'
                className='h-8 w-[320px]'
                {...register('customerName')}
            />
            <Controller
                control={control}
                name='status'
                render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                        <Select
                            name={name}
                            onValueChange={onChange}
                            value={value}
                            disabled={disabled}
                        >
                            <SelectTrigger className='h-8 w-[180px]'>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='all'>
                                    Todos status
                                </SelectItem>
                                <SelectItem value='pending'>
                                    Pendente
                                </SelectItem>
                                <SelectItem value='canceled'>
                                    Cancelado
                                </SelectItem>
                                <SelectItem value='processing'>
                                    Em preparo
                                </SelectItem>
                                <SelectItem value='delivering'>
                                    Em entrega
                                </SelectItem>
                                <SelectItem value='delivered'>
                                    Entregue
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    )
                }}
            />

            <Button type='submit' variant='secondary' size='sm'>
                <Search className='mr-2 h-4 w-4' />
                Filtrar resultados
            </Button>

            <Button
                type='button'
                variant='outline'
                size='sm'
                disabled={!hasAnyFilter}
                onClick={handleClearFilters}
            >
                <X className='mr-2 h-4 w-4' />
                Remover filtros
            </Button>
        </form>
    )
}
