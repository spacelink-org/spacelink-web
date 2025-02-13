import { Button } from '@/components/atoms/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/atoms/card'
import { Checkbox } from '@/components/atoms/checkbox'
import { Label } from '@/components/atoms/label'

import { InputOTP } from '@/components/molecules/input-otp'

export default function ConfirmEmail() {
    return (
        <Card className='p-6 border-none'>
            <CardHeader className='flex items-center justify-center'>
                <CardTitle className='text-2xl'>Confirmar e-mail 📧</CardTitle>
                <CardDescription className='text-sm text-center font-light'>
                    Insira o código de verificação enviado para o seu e-mail
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col gap-2'>
                    <div className='flex justify-center mb-4'>
                        <InputOTP />
                    </div>
                    <div className='flex items-center gap-2'>
                        <Checkbox />
                        <Label className='text-xs'>
                            Concorde com os{' '}
                            <a
                                href='#'
                                className='text-primary hover:underline'
                            >
                                termos de uso
                            </a>{' '}
                            e{' '}
                            <a
                                href='#'
                                className='text-primary hover:underline'
                            >
                                políticas de privacidade
                            </a>
                        </Label>
                    </div>
                    <Button>Confirmar</Button>
                </div>
            </CardContent>
        </Card>
    )
}
