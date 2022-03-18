import '../src/styles/global.scss'
import { Header } from '../src/components/Header'
import { Footer } from '../src/components/Footer'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

export default MyApp
