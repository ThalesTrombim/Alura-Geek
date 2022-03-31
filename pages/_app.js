import '../src/styles/global.scss'
import { Header } from '../src/components/Header'
import { Footer } from '../src/components/Footer'
import { AuthProvider } from '../src/contexts/AuthContext'
import { SearchProvider } from '../src/contexts/SearchContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SearchProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SearchProvider>
    </AuthProvider>
  )
}

export default MyApp
