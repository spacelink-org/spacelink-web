import { useRoutes } from 'react-router'
import { privateRoutes } from './private'
import { publicRoutes } from './public'
import { useAuth } from '@/shared/hooks/use-auth'
import { useEffect } from 'react'

export function AppRouter() {
    const { getIsAuthenticated, isAuthenticated } = useAuth()

    useEffect(() => {
        getIsAuthenticated()
    }, [getIsAuthenticated])

    const routes = isAuthenticated ? privateRoutes : publicRoutes
    const element = useRoutes([...routes])

    return <>{element}</>
}
