import * as React from 'react'

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
import { Label } from '../../atoms/label'
import { Button } from '../../atoms/button'
import { LogOut, TerminalSquareIcon, UsersIcon, WalletIcon } from 'lucide-react'
import { useAuth } from '@/shared/hooks/use-auth'
import { useLocation, useNavigate } from 'react-router'
import { api } from '@/config/axios.config'
import { useQuery } from '@tanstack/react-query'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { signOut } = useAuth()

    const { data: me } = useQuery({
        queryKey: ['me'],
        queryFn: () => api.get('/users/get-me'),
    })

    const navigate = useNavigate()
    const pathname = useLocation().pathname

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
                        title: 'Customers',
                        url: '/app/customers',
                        isActive: pathname === '/app/customers',
                        icon: <UsersIcon className='size-4' />,
                    },
                    {
                        title: 'Wallet',
                        url: '/app/wallet',
                        isActive: pathname === '/app/wallet',
                        icon: <WalletIcon className='size-4' />,
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
                        <div className='flex h-12 w-12 rounded-md bg-primary items-center justify-center'>
                            <Label className='text-2xl'>🚀</Label>
                        </div>
                        <div className='flex flex-col'>
                            <Label className='text-sm font-semibold'>
                                Spacelink
                            </Label>
                            <Label className='text-[10px] font-normal font-mono'>
                                Members Club
                            </Label>
                        </div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel className='font-mono uppercase text-[10px]'>
                            {item.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
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
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
            <SidebarFooter>
                <div className='flex items-center justify-between hover:bg-secondary/20 p-2 rounded-md transition ease-in'>
                    <div className='flex items-center justify-start gap-2'>
                        <div className='h-10 w-10 rounded-md bg-primary/20 border border-primary/50 flex items-center justify-center'>
                            <Label className='text-md font-mono font-bold text-primary'>
                                {me?.data.name.slice(0, 2).toUpperCase()}
                            </Label>
                        </div>
                        <div className='flex flex-col'>
                            <Label className='text-sm font-semibold'>
                                {me?.data.name}
                            </Label>
                            <Label className='text-[10px] font-normal font-mono'>
                                {me?.data.email}
                            </Label>
                        </div>
                    </div>
                    <Button size='icon' variant='ghost' onClick={signOut}>
                        <LogOut />
                    </Button>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
