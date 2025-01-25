import { Button } from '@/components/atoms/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/atoms/card'
import { Input } from '@/components/atoms/input'

export default function ForgotPage() {
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
                    <Input placeholder='Email' />
                    <Button>Enviar link</Button>
                </div>
            </CardContent>
        </Card>
    )
}
