import '../src/styles/global.scss'
import { Header } from '../src/components/Header'
import { Footer } from '../src/components/Footer'
import { AuthProvider } from '../src/contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  )
}

export default MyApp
