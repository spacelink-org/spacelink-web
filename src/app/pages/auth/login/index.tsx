import { cn } from '@/shared/types/cn'
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
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '@/shared/hooks/use-auth'
import { LoginPayload, LoginSchema } from '@/shared/types/dto/login-dto'
import { Separator } from '@/components/atoms/separator'

export const LoginPage = () => {
    const { signIn } = useAuth()

    const { register, handleSubmit } = useForm<LoginPayload>({
        resolver: zodResolver(LoginSchema),
    })

    const handleSignIn = async (data: LoginPayload) => {
        await signIn({
            ...data,
            redirectLink: '',
        })
    }

    return (
        <div className={cn('flex flex-col gap-6')}>
            <Card className='p-4 border-none'>
                <CardHeader className='flex items-center justify-center'>
                    <CardTitle className='text-2xl'>
                        Bem vindo de volta 👋
                    </CardTitle>
                    <CardDescription className='text-sm text-center font-light'>
                        Insira seu e-mail abaixo para acessar sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(handleSignIn)}>
                        <div className='flex flex-col gap-6'>
                            <div className='grid gap-2'>
                                <Label htmlFor='email'>E-mail</Label>
                                <Input
                                    id='email'
                                    type='email'
                                    placeholder='m@exemplo.com'
                                    required
                                    {...register('email')}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <div className='flex items-center'>
                                    <Label htmlFor='password'>Senha</Label>
                                    <a
                                        href='/auth/login/forgot'
                                        className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                                    >
                                        Esqueceu sua senha?
                                    </a>
                                </div>
                                <Input
                                    id='password'
                                    type='password'
                                    required
                                    {...register('password')}
                                />
                            </div>
                            <Button type='submit' className='w-full'>
                                Entrar
                            </Button>
                            <Separator />
                            <Button variant='outline' className='w-full'>
                                Entrar com o Google
                            </Button>
                        </div>
                        <div className='mt-4 text-center text-sm'>
                            Não tem uma conta?{' '}
                            <a
                                href='/auth/register'
                                className='underline underline-offset-4'
                            >
                                Cadastre-se
                            </a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
