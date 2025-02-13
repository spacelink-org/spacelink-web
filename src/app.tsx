import { ThemeProvider } from '@/shared/providers/theme.provider'
import { AppRouter } from './routes'
import { RootProvider } from '@/shared/providers/root.provider'
import { Helmet, HelmetProvider } from 'react-helmet-async'

export default function App() {
    return (
        <RootProvider>
            <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
                <HelmetProvider>
                    <Helmet titleTemplate='%s | Spacelink' />
                    <AppRouter />
                </HelmetProvider>
            </ThemeProvider>
        </RootProvider>
    )
}
