import { Button } from '@/components/atoms/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/atoms/card'
import { Input } from '@/components/atoms/input'
import {
    sendRecoveryPasswordEmail,
    SendRecoveryPasswordEmailPayload,
    sendRecoveryPasswordEmailSchema,
} from '@/shared/api/send-recovery-password-email'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'

export default function ForgotPage() {
    const navigate = useNavigate()
    const [mutateLoading, setMutateLoading] = useState(false)

    const { register, handleSubmit } =
        useForm<SendRecoveryPasswordEmailPayload>({
            resolver: zodResolver(sendRecoveryPasswordEmailSchema),
        })

    const handleSendRecoveryEmail = async (
        data: SendRecoveryPasswordEmailPayload
    ) => {
        setMutateLoading(true)
        await sendRecoveryPasswordEmail({
            ...data,
        })
            .then(() => {
                toast.success('Email enviado com sucesso!')
                navigate('/auth/login')
            })
            .catch((error) => {
                toast.error('Erro ao enviar email. Tente novamente mais tarde.')
                console.log(error)
                navigate('/auth/login')
            })
            .finally(() => {
                setMutateLoading(false)
            })
    }

    return (
        <Card className='p-6 border-none'>
            <CardHeader className='flex items-center justify-center'>
                <CardTitle className='text-2xl'>Esqueceu sua senha?</CardTitle>
                <CardDescription className='text-sm text-center font-light'>
                    Insira seu e-mail abaixo para receber um link para resetar
                    sua senha
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    <Input placeholder='seu@email.com' {...register('email')} />
                    <Button
                        type='button'
                        loading={mutateLoading}
                        disabled={mutateLoading}
                        onClick={handleSubmit(handleSendRecoveryEmail)}
                    >
                        Enviar link
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
