'use client'

import {
    BadgeCheck,
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
} from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/atoms/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/organisms/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/atoms/avatar'
import { useNavigate } from 'react-router'
import { UserLoading } from '../loading/user-loading'
import { useAuth } from '@/shared/hooks/use-auth'

interface NavUserProps {
    avatar?: string
    name: string
    email: string
    isLoading: boolean
}

export function NavUser({ avatar, name, email, isLoading }: NavUserProps) {
    const { isMobile } = useSidebar()
    const navigate = useNavigate()
    const { signOut } = useAuth()

    const handleSignOut = () => {
        signOut()
    }

    if (isLoading) {
        return <UserLoading />
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='h-14 data-[state=open]:bg-primary/10 data-[state=open]:border-primary/50 data-[state=open]:text-primary data-[state=open]:border hover:bg-primary/10 hover:border-primary/50 hover:text-primary'
                        >
                            <Avatar className='h-10 w-10 rounded-sm'>
                                <AvatarImage src={avatar} alt={name} />
                                <AvatarFallback className='rounded-lg bg-primary/10 border border-primary/50 text-primary font-mono'>
                                    {name
                                        ? name.slice(0, 2).toUpperCase()
                                        : 'CN'}
                                </AvatarFallback>
                            </Avatar>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-semibold'>
                                    {name}
                                </span>
                                <span className='truncate text-xs'>
                                    {email}
                                </span>
                            </div>
                            <ChevronsUpDown className='ml-auto size-4' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                        side={isMobile ? 'bottom' : 'right'}
                        align='end'
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className='p-0 font-normal'>
                            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                <Avatar className='h-8 w-8 rounded-lg'>
                                    <AvatarImage src={avatar} alt={name} />
                                    <AvatarFallback className='rounded-lg'>
                                        {name
                                            ? name.slice(0, 2).toUpperCase()
                                            : 'CN'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-semibold'>
                                        {name}
                                    </span>
                                    <span className='truncate text-xs'>
                                        {email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem
                                onClick={() => navigate('/app/profile')}
                            >
                                <BadgeCheck />
                                Conta
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigate('/app/profile/billing')}
                            >
                                <CreditCard />
                                Opções de pagamento
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigate('/app/profile/notifications')
                                }
                            >
                                <Bell />
                                Notificações
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
