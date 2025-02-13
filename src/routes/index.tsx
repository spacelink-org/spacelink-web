import { useRoutes } from 'react-router'
import { privateRoutes } from './private'
import { publicRoutes } from './public'
import { useAuth } from '@/shared/hooks/use-auth'

export function AppRouter() {
    const { getIsAuthenticated } = useAuth()

    const routes = getIsAuthenticated() ? privateRoutes : publicRoutes
    const element = useRoutes([...routes])

    return <>{element}</>
}
