import '../src/styles/global.scss'
import { Header } from '../src/components/Header'
import { Footer } from '../src/components/Footer'
import { AuthProvider } from '../src/contexts/AuthContext'
import { SearchProvider } from '../src/contexts/SearchContext'
import { DropDownProvider } from '../src/contexts/DropDownContext'
import { ManageProductProvider } from '../src/contexts/ManageProductContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SearchProvider>
        <DropDownProvider>
          <ManageProductProvider>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </ManageProductProvider>
        </DropDownProvider>
      </SearchProvider>
    </AuthProvider>
  )
}

export default MyApp
