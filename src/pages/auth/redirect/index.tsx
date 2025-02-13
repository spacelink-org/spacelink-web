import { Label } from '@/components/atoms/label'
import { api } from '@/config/axios.config'
import { useQuery } from '@tanstack/react-query'
import { AlertCircle, Loader2 } from 'lucide-react'
import { Navigate, useSearchParams } from 'react-router'

export default function RedirectPage() {
    const [searchParams] = useSearchParams()
    const token = searchParams.get('token')

    const {
        data: user,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['me'],
        queryFn: () => api.get(`/auth/confirmation/${token}`),
    })

    if (isLoading)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader2 className='animate-spin' />
            </div>
        )

    if (isError)
        return (
            <div className='flex items-center justify-center h-screen'>
                <AlertCircle className='text-red-500' />
                <Label>Erro ao confirmar email</Label>
            </div>
        )

    console.log(user?.data)

    return <Navigate to='/auth/payment' />
}
