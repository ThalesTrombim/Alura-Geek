import '../src/styles/global.scss'
import { Header } from '../src/components/Header'
import { Footer } from '../src/components/Footer'
import { AuthProvider } from '../src/contexts/AuthContext'
import { SearchProvider } from '../src/contexts/SearchContext'
import { DropDownProvider } from '../src/contexts/DropDownContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SearchProvider>
        <DropDownProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </DropDownProvider>
      </SearchProvider>
    </AuthProvider>
  )
}

export default MyApp
