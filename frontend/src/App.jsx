
import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Gateway from './pages/Gateway/Gateway.jsx'

const Textile = lazy(() => import('./pages/Textile/Textile.jsx'))
const Baby = lazy(() => import('./pages/Baby/Baby.jsx'))
const Cart = lazy(() => import('./pages/Cart/Cart.jsx'))
const Account = lazy(() => import('./pages/Account/Account.jsx'))
const CheckoutSuccess = lazy(() => import('./pages/Checkout/CheckoutSuccess.jsx'))
const CheckoutFail = lazy(() => import('./pages/Checkout/CheckoutFail.jsx'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'))

function pageTitleKey(pathname) {
  if (pathname === '/') return 'pageTitles.gateway'
  if (pathname === '/textile') return 'pageTitles.textile'
  if (pathname === '/baby') return 'pageTitles.baby'
  if (pathname === '/account') return 'pageTitles.account'
  if (pathname === '/cart') return 'pageTitles.cart'
  if (pathname === '/checkout/success') return 'pageTitles.checkoutSuccess'
  if (pathname === '/checkout/fail') return 'pageTitles.checkoutFail'
  if (pathname === '/404') return 'pageTitles.notFound'
  return 'pageTitles.notFound'
}

export default function App() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = t(pageTitleKey(pathname))
  }, [pathname, t, i18n.language])

  useEffect(() => {
    const code = (i18n.resolvedLanguage || i18n.language || 'en')
      .split('-')[0]

    document.documentElement.lang = code
  }, [i18n.language, i18n.resolvedLanguage])

  return (
    <>
      <Header />

      <Suspense
        fallback={
          <p className="page" role="status">
            {t('common.loading')}
          </p>
        }
      >
        <Routes>
          <Route path="/" element={<Gateway />} />
          <Route path="/textile" element={<Textile />} />
          <Route path="/baby" element={<Baby />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/checkout/fail" element={<CheckoutFail />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </>
  )
}
