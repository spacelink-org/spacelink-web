import { Skeleton } from '@/components/atoms/skeleton'

export function DataTableLoading() {
    return (
        <div className='flex flex-col gap-2 w-full'>
            <Skeleton className='h-5 w-full rounded-[6px]' />
            <Skeleton className='h-5 w-full rounded-[6px]' />
            <Skeleton className='h-5 w-full rounded-[6px]' />
            <Skeleton className='h-5 w-full rounded-[6px]' />
            <Skeleton className='h-5 w-full rounded-[6px]' />
            <Skeleton className='h-5 w-full rounded-[6px]' />
            <Skeleton className='h-5 w-4/5 rounded-[6px]' />
        </div>
    )
}
