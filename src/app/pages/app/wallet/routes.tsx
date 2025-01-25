import { Route } from 'react-router'

import { Routes } from 'react-router'
import { WalletPage } from '.'

export const WalletRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<WalletPage />} />
        </Routes>
    )
}
