import { Button } from '@/components/atoms/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/atoms/card'
import { Dialog, DialogHeader } from '@/components/atoms/dialog'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { CurrencyCard } from '@/components/templates/cards/currency-card'
import { floatToCurrency } from '@/utils/float-to-currency'
import { DialogContent, DialogTitle } from '@/components/atoms/dialog'
import { DollarSign } from 'lucide-react'
import { useState } from 'react'
import { api } from '@/config/axios.config'
import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '@/shared/api/get-transactions'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/atoms/select'
import { getTransferKeys } from '@/shared/api/get-transfer-keys'
import { InputMask } from '@/components/organisms/input-mask'
import { CurrencyInput } from '@/components/organisms/currency-input'

export default function Withdraw() {
    const { data: me } = useQuery({
        queryKey: ['me'],
        queryFn: () => api.get('/me'),
    })

    const { data: transactions } = useQuery({
        queryKey: ['transactions'],
        queryFn: () => getTransactions(),
    })

    const { data: keys } = useQuery({
        queryKey: ['transfersKeys'],
        queryFn: () => getTransferKeys(),
    })

    const diffFromLastMonth =
        transactions?.reduce((acc, transaction) => {
            return acc + transaction.amount
        }, 0) ?? 0

    const [success, setSuccess] = useState(false)
    const [cpf, setCpf] = useState('')
    const [amount, setAmount] = useState('')

    return (
        <div className='flex flex-col gap-4'>
            <CurrencyCard
                title='Saldo'
                amount={me?.data.wallet}
                diffFromLastMonth={diffFromLastMonth}
                icon={<DollarSign />}
                loading={false}
            />
            <div className='grid grid-cols-2 gap-4'>
                <Card>
                    <CardHeader>
                        <CardTitle>Retirar saldo</CardTitle>
                        <CardDescription>
                            Retire seu saldo para sua conta bancária
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-sm font-medium'>
                                    Valor a retirar
                                </Label>
                                <CurrencyInput
                                    value={amount}
                                    onChange={setAmount}
                                    placeholder='R$ 0,00'
                                />
                                <Label className='text-[10px] text-muted-foreground font-mono'>
                                    Valor disponível para retirada:{' '}
                                    <span className='font-bold'>
                                        {floatToCurrency(me?.data.wallet)}
                                    </span>
                                </Label>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <Label className='text-sm font-medium'>
                                    Dados da conta
                                </Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder='Selecione uma conta' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {keys?.map((key) => (
                                            <SelectItem
                                                key={key.id}
                                                value={key.id}
                                            >
                                                {key.key}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input placeholder='Nome do titular' />
                                <InputMask
                                    placeholder='CPF do titular'
                                    mask='###.###.###-##'
                                    value={cpf}
                                    onChange={(value) => setCpf(value)}
                                />
                            </div>
                            <Button>Retirar</Button>
                        </div>
                    </CardContent>
                </Card>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Nota fiscal</CardTitle>
                            <CardDescription>
                                Gere uma nota fiscal para o valor desejado e
                                faça o upload da nota fiscal para a retirada do
                                saldo
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className='flex flex-col gap-2'>
                                <div className='flex flex-col gap-2'>
                                    <Input
                                        placeholder='Upload da nota fiscal'
                                        type='file'
                                    />
                                    <Button variant='secondary'>Enviar</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Dialog open={success} onOpenChange={setSuccess}>
                <DialogContent>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <DialogHeader>
                                <DialogTitle>Nota fiscal enviada</DialogTitle>
                            </DialogHeader>
                        </div>
                        <Label className='text-muted-foreground font-normal leading-relaxed'>
                            A retirada do saldo será realizada em breve. Nossa
                            equipe irá analisar a nota fiscal enviada e, após a
                            validação, o valor será transferido para a conta
                            informada em até 2 dias úteis. Você receberá uma
                            notificação por email quando a transferência for
                            concluída.
                        </Label>
                        <div className='flex w-full gap-2'>
                            <Button className='w-full'>
                                Fazer outra retirada
                            </Button>
                            <Button variant='secondary' className='w-full'>
                                Verificar status da retirada
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
