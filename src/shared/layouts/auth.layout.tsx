import { Label } from '@/components/atoms/label'
import { Outlet } from 'react-router'
import LogoIcon from '@/assets/icons/favicon.ico'
import { useIsMobile } from '../hooks/use-mobile'

export default function AuthLayout() {
    if (useIsMobile()) {
        return (
            <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
                <div className='w-full max-w-sm'>
                    <div className='flex items-center justify-center mb-4 gap-4'>
                        <img src={LogoIcon} className='w-10 h-10' />
                        <Label className='text-2xl font-semibold'>
                            Spacelink
                        </Label>
                    </div>
                    <Outlet />
                </div>
            </div>
        )
    } else {
        return (
            <div className='grid min-h-svh lg:grid-cols-2'>
                <div className='flex flex-col gap-4 p-6 md:p-10'>
                    <div className='flex justify-center gap-2 md:justify-start'>
                        <div className='flex items-center justify-center mb-4 gap-4'>
                            <img src={LogoIcon} className='w-9 h-9' />
                            <Label className='text-lg font-medium font-mono'>
                                spacelink.io
                            </Label>
                        </div>
                    </div>
                    <div className='flex flex-1 items-center justify-center'>
                        <div className='w-full max-w-md'>
                            <Outlet />
                        </div>
                    </div>
                </div>
                <div className='relative hidden lg:block p-4'>
                    <div className='flex w-full h-full bg-noise bg-cover rounded-lg'></div>
                </div>
            </div>
        )
    }
}
