import { Button } from '@/components/atoms/button'
import { Label } from '@/components/atoms/label'

export default function SuccessPage() {
    return (
        <div className='flex flex-col gap-4 items-center justify-center w-full'>
            <Label className='text-2xl'>
                Cadastro realizado com sucesso! 🎉
            </Label>
            <Label className='text-sm text-center font-light text-muted-foreground'>
                Agora você pode fazer login no seu novo sistema de gerenciamento
                de clientes.
            </Label>
            <img
                src='/src/assets/images/noise.png'
                alt='Success'
                className='w-full max-h-[300px] object-cover rounded-lg'
            />
            <div className='flex flex-col gap-2 w-full'>
                <Button className='w-full'>Ir para o login</Button>
                <Button
                    variant='link'
                    className='w-full text-muted-foreground font-light'
                >
                    Mais informações
                </Button>
            </div>
        </div>
    )
}
