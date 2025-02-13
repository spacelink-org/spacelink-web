import { Route } from 'react-router'

import { Routes } from 'react-router'

import Account from './account'
import Billing from './billing'
import Notifications from './notifications'
import ProfileLayout from '@/shared/layouts/profile.layout'

export const ProfileRoutes = () => {
    return (
        <ProfileLayout>
            <Routes>
                <Route path='/' element={<Account />} />
                <Route path='/billing' element={<Billing />} />
                <Route path='/notifications' element={<Notifications />} />
            </Routes>
        </ProfileLayout>
    )
}
