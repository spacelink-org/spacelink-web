import { Button } from '@/components/atoms/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/atoms/card'
import { Input } from '@/components/atoms/input'

export default function RegisterForm() {
    return (
        <Card className='p-6 border-none'>
            <CardHeader className='flex items-center justify-center'>
                <CardTitle className='text-2xl'>Cadastre-se 💾</CardTitle>
                <CardDescription className='text-sm text-center font-light'>
                    Insira seus dados abaixo para criar uma conta
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    <Input placeholder='Email' />
                    <div className='flex gap-2'>
                        <Input placeholder='Nome' />
                        <Input placeholder='Sobrenome' />
                    </div>
                    <Input placeholder='Telefone' />
                    <Input placeholder='CPF' />
                    <Input type='password' placeholder='Senha' />
                    <Input type='password' placeholder='Confirmar senha' />
                    <Button>Cadastrar</Button>
                </div>
            </CardContent>
        </Card>
    )
}
