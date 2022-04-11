import '../src/styles/global.scss'
import { Header } from '../src/components/Header'
import { Footer } from '../src/components/Footer'
import { AuthProvider } from '../src/contexts/AuthContext'
import { SearchProvider } from '../src/contexts/SearchContext'
import { DropDownProvider } from '../src/contexts/DropDownContext'
import { ManageProductProvider } from '../src/contexts/ManageProductContext'
import { ModalProvider } from '../src/contexts/ModalContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SearchProvider>
        <DropDownProvider>
          <ModalProvider>
            <ManageProductProvider>
              <Header />
              <Component {...pageProps} />
              <Footer />
            </ManageProductProvider>
          </ModalProvider>
        </DropDownProvider>
      </SearchProvider>
    </AuthProvider>
  )
}

export default MyApp
