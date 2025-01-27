import { Button } from '@/components/atoms/button'
import { Input } from '@/components/atoms/input'
import { Label } from '@/components/atoms/label'
import { api } from '@/config/axios.config'
import { useQuery } from '@tanstack/react-query'

export default function Account() {
    const { data: me } = useQuery({
        queryKey: ['me'],
        queryFn: () => api.get('/me'),
    })

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <Label className='text-lg font-semibold'>Dados pessoais</Label>
                <div className='flex flex-col gap-2'>
                    <Input placeholder='Nome' value={me?.data.name} />
                    <div className='flex gap-2'>
                        <Input placeholder='Email' value={me?.data.email} />
                        <Input placeholder='Telefone' value={me?.data.phone} />
                        <Input placeholder='CPF' value={me?.data.document} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <Label className='text-lg font-semibold'>Trocar senha</Label>
                <div className='flex flex-col gap-2'>
                    <Input
                        placeholder='Senha atual'
                        type='password'
                        value={'123456789'}
                    />
                    <div className='flex gap-2'>
                        <Input placeholder='Nova senha' type='password' />
                        <Input
                            placeholder='Confirmar nova senha'
                            type='password'
                        />
                    </div>
                    <div className='flex justify-end'>
                        <Button>Salvar senha</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
