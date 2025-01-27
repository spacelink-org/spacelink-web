import { Skeleton } from '@/components/atoms/skeleton'

export function UserLoading() {
    return (
        <div className='flex items-start space-x-2'>
            <div>
                <Skeleton className='h-10 w-10 rounded-sm' />
            </div>
            <div className='space-y-2 w-full'>
                <Skeleton className='h-[7px] w-full' />
                <Skeleton className='h-[7px] w-full' />
                <Skeleton className='h-[7px] w-4/5' />
            </div>
        </div>
    )
}
