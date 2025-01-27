import { Button } from '@/components/atoms/button'
import { Label } from '@/components/atoms/label'
import { BellIcon, CreditCardIcon, UserIcon } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { cn } from '../types/cn'

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { pathname } = useLocation()
    const navigate = useNavigate()

    const isAccount = pathname === '/app/profile'
    const isBilling = pathname === '/app/profile/billing'
    const isNotifications = pathname === '/app/profile/notifications'

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col px-4 py-2'>
                <Label className='text-2xl font-semibold'>
                    Perfil do usuário
                </Label>
                <Label className='text-sm text-muted-foreground'>
                    Gerencie suas configurações e preferências.
                </Label>
            </div>
            <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-3'>
                    <div className='flex flex-col gap-2'>
                        <Button
                            variant='ghost'
                            className={cn(
                                'w-full justify-start font-normal',
                                isAccount &&
                                    'bg-secondary text-secondary-foreground'
                            )}
                            onClick={() => navigate('/app/profile')}
                        >
                            <UserIcon className='w-4 h-4' />
                            Conta
                        </Button>
                        <Button
                            variant='ghost'
                            className={cn(
                                'w-full justify-start font-normal',
                                isBilling &&
                                    'bg-secondary text-secondary-foreground'
                            )}
                            onClick={() => navigate('/app/profile/billing')}
                        >
                            <CreditCardIcon className='w-4 h-4' />
                            Opções de pagamento
                        </Button>
                        <Button
                            variant='ghost'
                            className={cn(
                                'w-full justify-start font-normal',
                                isNotifications &&
                                    'bg-secondary text-secondary-foreground'
                            )}
                            onClick={() =>
                                navigate('/app/profile/notifications')
                            }
                        >
                            <BellIcon className='w-4 h-4' />
                            Notificações
                        </Button>
                    </div>
                </div>
                <div className='col-span-8'>{children}</div>
            </div>
        </div>
    )
}
