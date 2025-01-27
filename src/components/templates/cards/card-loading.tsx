import { Skeleton } from '@/components/atoms/skeleton'

export function CardLoading() {
    return (
        <div className='flex flex-col space-y-3'>
            <Skeleton className='h-[100px] w-full rounded-xl' />
            <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-4/5' />
            </div>
        </div>
    )
}
