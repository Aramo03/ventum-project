import { lazy, Suspense, useEffect, useLayoutEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Header from './components/Header/Header.jsx'
import { activeLanguageCode } from './components/Header/header.js'
import Footer from './components/Footer/Footer.jsx'
import Gateway from './pages/Gateway/Gateway.jsx'
import { useShop } from './design/useShop.js'
import './design/shell.css'
import './design/motion.css'

const Textile = lazy(() => import('./pages/Textile/Textile.jsx'))
const Baby = lazy(() => import('./pages/Baby/Baby.jsx'))
const Cart = lazy(() => import('./pages/Cart/Cart.jsx'))
const ProductDetails = lazy(() =>
  import('./pages/ProductDetails/ProductDetails.jsx'),
)
const Account = lazy(() => import('./pages/Account/Account.jsx'))
const CheckoutSuccess = lazy(() =>
  import('./pages/Checkout/CheckoutSuccess.jsx'),
)
const CheckoutFail = lazy(() => import('./pages/Checkout/CheckoutFail.jsx'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound.jsx'))
const Design = lazy(() => import('./design/Design.jsx'))

function repairedPath(pathname) {
  const match = String(pathname || '').match(/https?:\/+/)
  if (!match || match.index === 0) return ''

  try {
    const url = new URL(pathname.slice(match.index).replace(/^(https?):\/+/, '$1://'))
    if (url.hostname !== window.location.hostname) return ''
    const next = `${url.pathname}${url.search}${url.hash}`
    return next && next !== pathname ? next : ''
  } catch {
    return ''
  }
}

function pageTitleKey(pathname) {
  if (pathname === '/') return 'pageTitles.gateway'
  if (pathname === '/textile') return 'pageTitles.textile'
  if (pathname === '/baby') return 'pageTitles.baby'
  if (pathname === '/account') return 'pageTitles.account'
  if (pathname === '/cart') return 'pageTitles.cart'
  if (pathname.startsWith('/product/')) return 'pageTitles.product'
  if (pathname === '/checkout/success') {
    return 'pageTitles.checkoutSuccess'
  }
  if (pathname === '/checkout/fail') {
    return 'pageTitles.checkoutFail'
  }
  if (pathname === '/404') return 'pageTitles.notFound'

  return 'pageTitles.notFound'
}

export default function App() {
  const { t, i18n } = useTranslation()
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])
  const { pathname } = useLocation()
  const shop = useShop()
  const gluedPath = repairedPath(pathname)

  useEffect(() => {
    if (pathname === '/design') {
      document.title = 'Ventum · Design system'
      return
    }

    document.title = t(pageTitleKey(pathname))
  }, [pathname, t, i18n.language])

  useEffect(() => {
    const chosen = activeLanguageCode(i18n.resolvedLanguage || i18n.language)
    let stored = ''
    try {
      stored = localStorage.getItem('i18nextLng') || ''
    } catch {
      stored = ''
    }
    document.documentElement.lang = chosen || stored.split('-')[0] || 'en'
  }, [i18n.language, i18n.resolvedLanguage])

  const page = gluedPath ? (
    <Navigate to={gluedPath} replace />
  ) : (
    <Suspense
      fallback={
        <main className="page" role="status">
          {t('common.loading')}
        </main>
      }
    >
      <Routes>
        <Route path="/" element={<Gateway />} />
        <Route path="/textile" element={<Textile />} />
        <Route path="/baby" element={<Baby />} />
        <Route path="/account" element={<Account />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:sku" element={<ProductDetails />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/fail" element={<CheckoutFail />} />
        <Route path="/design" element={<Design />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )

  return (
    <div className="ds-shell" {...(shop ? { 'data-shop': shop } : {})}>
      <Header />
      {page}
      <Footer />
    </div>
  )
}
