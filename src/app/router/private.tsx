import { Navigate, Route, Routes } from 'react-router'
import AppLayout from '../../shared/layouts/app.layout'
import { Dashboard } from '../pages/app/dashboard/dashboard'
import { CustomersRoutes } from '../pages/app/customers/routes'
import { WalletRoutes } from '../pages/app/wallet/routes'
import { ProfileRoutes } from '../pages/app/profile/routes'

// eslint-disable-next-line react-refresh/only-export-components
const DashboardRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Dashboard />} />
        </Routes>
    )
}

export const privateRoutes = [
    {
        path: '/app',
        element: <AppLayout />,
        exact: true,
        children: [
            { path: 'dashboard/*', element: <DashboardRoutes /> },
            { path: 'customers/*', element: <CustomersRoutes /> },
            { path: 'wallet/*', element: <WalletRoutes /> },
            { path: 'profile/*', element: <ProfileRoutes /> },
            { path: '*', element: <Navigate to='/app/dashboard' /> },
        ],
    },
    { path: '*', element: <Navigate to='/app/dashboard' /> },
]
