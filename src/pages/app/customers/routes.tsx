import { Route, Routes } from 'react-router'
import CustomersPage from '.'

export const CustomersRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<CustomersPage />} />
        </Routes>
    )
}
