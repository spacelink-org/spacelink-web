import { Button } from '@/components/atoms/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/atoms/card'
import { Input } from '@/components/atoms/input'
import { createPassword, PasswordPayload } from '@/shared/api/create-password'
import { passwordSchema } from '@/shared/api/create-password'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export default function FirstAccess() {
    const { handleSubmit, register } = useForm<PasswordPayload>({
        resolver: zodResolver(passwordSchema),
    })

    const { mutate: newPassword } = useMutation({
        mutationFn: (data: PasswordPayload) => createPassword(data),
    })

    const onSubmit = (data: PasswordPayload) => {
        newPassword({
            password: data.password,
        })
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Criar senha</CardTitle>
                <CardDescription>Crie uma senha para sua conta</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    <Input
                        type='password'
                        placeholder='Senha'
                        {...register('password')}
                    />
                    <Input type='password' placeholder='Confirmar senha' />
                    <Button loading={false} onClick={handleSubmit(onSubmit)}>
                        Criar senha
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
