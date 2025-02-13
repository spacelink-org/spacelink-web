import { Route } from 'react-router'

import { Routes } from 'react-router'
import { WalletPage } from './transactions'
import Withdraw from './withdraw'

export const WalletRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<WalletPage />} />
            <Route path='/withdraw' element={<Withdraw />} />
        </Routes>
    )
}
