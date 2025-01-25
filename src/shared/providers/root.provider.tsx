import { queryClient } from '@/config/query-client.config'
import { QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { BrowserRouter } from 'react-router'
import { Toaster } from 'sonner'

export function RootProvider({ children }: { children: React.ReactNode }) {
    return (
        <Suspense>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>{children}</BrowserRouter>
                <Toaster richColors />
            </QueryClientProvider>
        </Suspense>
    )
}
