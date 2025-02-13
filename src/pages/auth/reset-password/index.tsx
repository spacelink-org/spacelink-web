import { Button } from '@/components/atoms/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/atoms/card'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import {
    resetUserPassword,
    ResetUserPasswordPayload,
    resetUserPasswordSchema,
} from '@/shared/api/reset-user-password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

export default function ResetPasswordPage() {
    const { token } = useParams()
    const navigate = useNavigate()

    const [mutateLoading, setMutateLoading] = useState(false)

    const { register, handleSubmit, setValue } =
        useForm<ResetUserPasswordPayload>({
            resolver: zodResolver(resetUserPasswordSchema),
        })

    useEffect(() => {
        setValue('token', token || '')
    }, [setValue, token])

    const handleResetUserPassword = async (data: ResetUserPasswordPayload) => {
        setMutateLoading(true)
        await resetUserPassword({
            ...data,
        })
            .then(() => {
                toast.success('Senha redefinida com sucesso!')
                navigate('/auth/login')
            })
            .catch((error) => {
                toast.error(
                    'Erro ao redefinir a senha. Tente novamente mais tarde.'
                )
                console.log(error)
            })
            .finally(() => {
                setMutateLoading(false)
            })
    }

    if (!token) {
        return (
            <Label>
                Link inválido ou expirado! Reenvie o email ou entre em contato
                com o nosso suporte.
            </Label>
        )
    }

    return (
        <Card className='p-6 border-none'>
            <CardHeader className='flex items-center justify-center'>
                <CardTitle className='text-2xl'>Crie sua nova senha</CardTitle>
                <CardDescription className='text-sm text-center font-light'>
                    Insira e confirme sua nova senha abaixo.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    <Input
                        type='password'
                        placeholder='Senha'
                        {...register('password')}
                    />
                    <Input
                        type='password'
                        placeholder='Confirmar senha'
                        {...register('confirmPassword')}
                    />
                    <Button
                        loading={mutateLoading}
                        disabled={mutateLoading}
                        onClick={handleSubmit(handleResetUserPassword)}
                    >
                        Redefinir senha
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
