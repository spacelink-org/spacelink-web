import { Button } from '@/components/atoms/button'
import { Label } from '@/components/atoms/label'
import { BellIcon, CreditCardIcon, UserIcon } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router'
import { cn } from '../types/cn'
import { useIsMobile } from '../hooks/use-mobile'

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
                <div className='md:col-span-3 col-span-2'>
                    <div className='flex flex-col gap-2'>
                        <Button
                            variant='ghost'
                            size={useIsMobile() ? 'icon' : 'default'}
                            className={cn(
                                'w-full font-normal',
                                !useIsMobile() && 'justify-start',
                                isAccount &&
                                    'bg-secondary text-secondary-foreground'
                            )}
                            onClick={() => navigate('/app/profile')}
                        >
                            <UserIcon className='w-4 h-4' />
                            {useIsMobile() ? '' : 'Conta'}
                        </Button>
                        <Button
                            variant='ghost'
                            size={useIsMobile() ? 'icon' : 'default'}
                            className={cn(
                                'w-full font-normal',
                                !useIsMobile() && 'justify-start',
                                isBilling &&
                                    'bg-secondary text-secondary-foreground'
                            )}
                            onClick={() => navigate('/app/profile/billing')}
                        >
                            <CreditCardIcon className='w-4 h-4' />
                            {useIsMobile() ? '' : 'Pagamento'}
                        </Button>
                        <Button
                            variant='ghost'
                            size={useIsMobile() ? 'icon' : 'default'}
                            className={cn(
                                'w-full font-normal',
                                !useIsMobile() && 'justify-start',
                                isNotifications &&
                                    'bg-secondary text-secondary-foreground'
                            )}
                            onClick={() =>
                                navigate('/app/profile/notifications')
                            }
                        >
                            <BellIcon className='w-4 h-4' />
                            {useIsMobile() ? '' : 'Notificações'}
                        </Button>
                    </div>
                </div>
                <div className='col-span-10 md:col-span-9'>{children}</div>
            </div>
        </div>
    )
}
