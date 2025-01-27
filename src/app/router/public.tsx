import { Navigate } from 'react-router'
import AuthLayout from '../../shared/layouts/auth.layout'
import {
    LoginRoutes,
    PaymentRoutes,
    RedirectRoutes,
    RegisterRoutes,
} from '../pages/auth/routes'

export const publicRoutes = [
    {
        path: '/auth',
        element: <AuthLayout />,
        exact: true,
        children: [
            { path: 'login/*', element: <LoginRoutes /> },
            { path: 'register/*', element: <RegisterRoutes /> },
            { path: 'redirect/*', element: <RedirectRoutes /> },
            { path: 'payment/*', element: <PaymentRoutes /> },
            { path: '*', element: <Navigate to='/auth/login' /> },
        ],
    },
    { path: '*', element: <Navigate to='/auth/login' /> },
]
