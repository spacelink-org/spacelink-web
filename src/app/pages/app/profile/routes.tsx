import { Route } from 'react-router'

import { Routes } from 'react-router'
import { ProfilePage } from '.'

export const ProfileRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<ProfilePage />} />
        </Routes>
    )
}
