import { AppSidebar } from '@/components/templates/sidebar/sidebar'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/organisms/sidebar'
import { Outlet } from 'react-router'

export default function AppLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 px-4'>
                    <SidebarTrigger className='-ml-1' />
                </header>
                <div className='flex flex-1 flex-col gap-4 p-4'>
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
