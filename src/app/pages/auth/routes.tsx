import { Route, Routes } from 'react-router'

import { LoginPage } from './login'
import ForgotPage from './forgot'
import RegisterPage from './register'
import ConfirmEmail from './register/components/confirm-email'
import SuccessPage from './register/components/success-page'

export const LoginRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/forgot' element={<ForgotPage />} />
        </Routes>
    )
}

export const RegisterRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<RegisterPage />} />
            <Route path='confirm-email' element={<ConfirmEmail />} />
            <Route path='success' element={<SuccessPage />} />
        </Routes>
    )
}
