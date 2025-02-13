import * as React from 'react'
import { useState } from 'react'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/organisms/sidebar'
import {
    ChevronDown,
    Globe,
    TerminalSquareIcon,
    UsersIcon,
    WalletIcon,
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router'
import { api } from '@/config/axios.config'
import { useQuery } from '@tanstack/react-query'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/atoms/collapsible'
import { cn } from '@/shared/types/cn'
import { NavUser } from './nav-user'
import { Label } from '@/components/atoms/label'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: me, isLoading: meLoading } = useQuery({
        queryKey: ['me'],
        queryFn: () => api.get('/users/get-me'),
    })

    const navigate = useNavigate()
    const pathname = useLocation().pathname

    const [open, setOpen] = useState(false)

    const data = {
        navMain: [
            {
                title: 'Main menu',
                url: '#',
                items: [
                    {
                        title: 'Dashboard',
                        url: '/app/dashboard',
                        icon: <TerminalSquareIcon className='size-4' />,
                        isActive: pathname === '/app/dashboard',
                    },
                    {
                        title: 'Usuários',
                        url: '/app/customers',
                        isActive: pathname === '/app/customers',
                        icon: <UsersIcon className='size-4' />,
                    },
                    {
                        title: 'Carteira',
                        url: '/app/wallet',
                        isActive: pathname.includes('/app/wallet'),
                        icon: <WalletIcon className='size-4' />,
                        items: [
                            {
                                title: 'Transações',
                                url: '/app/wallet',
                                isActive: pathname === '/app/wallet',
                            },
                            {
                                title: 'Saque',
                                url: '/app/wallet/withdraw',
                                isActive: pathname === '/app/wallet/withdraw',
                            },
                        ],
                    },
                ],
            },
        ],
    }

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center justify-start gap-2'>
                        <div className='flex h-12 w-12 rounded-md text-primary bg-primary/10 border border-primary/50 items-center justify-center'>
                            <Globe strokeWidth={1} size={24} />
                        </div>
                        <div className='flex flex-col'>
                            <Label className='text-sm font-semibold'>
                                Members Club
                            </Label>
                            <Label className='text-[10px] font-normal font-mono'>
                                Spacelink Brasil
                            </Label>
                        </div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel className='font-mono uppercase text-[10px]'>
                            {item.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <>
                                        {!item.items ? (
                                            <SidebarMenuItem key={item.title}>
                                                <SidebarMenuButton
                                                    size='lg'
                                                    asChild
                                                    isActive={item.isActive}
                                                    className='cursor-pointer'
                                                    onClick={() => {
                                                        navigate(item.url)
                                                    }}
                                                >
                                                    <div className='flex items-center gap-2'>
                                                        {item.icon}
                                                        <span className='select-none'>
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ) : (
                                            <Collapsible
                                                key={item.title}
                                                className='w-full'
                                            >
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton
                                                        size='lg'
                                                        asChild
                                                        isActive={item.isActive}
                                                        className='cursor-pointer w-full'
                                                        onClick={() => {
                                                            setOpen(!open)
                                                        }}
                                                    >
                                                        <div className='flex items-center justify-between w-full'>
                                                            <div className='flex items-center gap-2 w-full'>
                                                                {item.icon}
                                                                <span className='select-none'>
                                                                    {item.title}
                                                                </span>
                                                            </div>
                                                            <ChevronDown
                                                                className='ml-auto transition-transform'
                                                                data-state={
                                                                    open
                                                                        ? 'open'
                                                                        : 'closed'
                                                                }
                                                                style={{
                                                                    transform:
                                                                        open
                                                                            ? 'rotate(180deg)'
                                                                            : 'rotate(0deg)',
                                                                }}
                                                            />
                                                        </div>
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                                <CollapsibleContent className='flex flex-col w-full mt-2 gap-1'>
                                                    {item.items.map((item) => (
                                                        <Link
                                                            key={item.title}
                                                            to={item.url}
                                                            className={cn(
                                                                'px-2 py-1 hover:bg-primary/10 transition-all ease-in rounded-sm text-sm w-full',
                                                                item.isActive
                                                                    ? 'bg-primary/10 text-primary'
                                                                    : ''
                                                            )}
                                                        >
                                                            {item.title}
                                                        </Link>
                                                    ))}
                                                </CollapsibleContent>
                                            </Collapsible>
                                        )}
                                    </>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
                <NavUser
                    avatar={me?.data.avatar}
                    name={me?.data.name}
                    email={me?.data.email}
                    isLoading={meLoading}
                />
            </SidebarFooter>
        </Sidebar>
    )
}
