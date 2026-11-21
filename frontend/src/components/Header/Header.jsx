import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { api, AUTH_CHANGED_EVENT } from '../../api/client'
import { CART_UPDATED_EVENT } from '../../pages/Cart/cart.js'
import { BABY_NAV_ITEMS, LANGUAGES, NAV_ITEMS, PHONE } from './header.js'
import './header.css'

const TOKEN_KEY = 'ventum_access_token'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const isBaby = pathname.startsWith('/baby')
  const isTextile = pathname.startsWith('/textile')
  const currentNavItems = isBaby ? BABY_NAV_ITEMS : NAV_ITEMS

  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cartCount, setCartCount] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadCartCount() {
      if (!localStorage.getItem(TOKEN_KEY)) {
        if (!cancelled) setCartCount(null)
        return
      }

      try {
        const response = await api.get('/api/cart/')
        if (!cancelled) setCartCount(response.data?.count ?? 0)
      } catch {
        if (!cancelled) setCartCount(null)
      }
    }

    loadCartCount()
    window.addEventListener(CART_UPDATED_EVENT, loadCartCount)
    window.addEventListener(AUTH_CHANGED_EVENT, loadCartCount)

    return () => {
      cancelled = true
      window.removeEventListener(CART_UPDATED_EVENT, loadCartCount)
      window.removeEventListener(AUTH_CHANGED_EVENT, loadCartCount)
    }
  }, [pathname])

  useEffect(() => {
    const search = query.trim()

    if (!search) {
      setProducts([])
      setLoading(false)
      setError('')
      return undefined
    }

    let cancelled = false

    const timer = setTimeout(async () => {
      try {
        setLoading(true)
        setError('')

        const response = await api.get('/api/catalog/products/', {
          params: { q: search },
        })

        if (cancelled) return

        const data = response.data
        setProducts(Array.isArray(data) ? data : data.results || [])
      } catch {
        if (!cancelled) {
          setProducts([])
          setError(t('searchError'))
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query, t])

  const activeLanguage = i18n.resolvedLanguage || i18n.language || 'en'
  const accountLabel = t('accountLink')

  function navLabel(item) {
    const translated = t(item.key)
    return translated === item.key ? item.label : translated
  }

  return (
    <header className={`site-header ${isBaby ? 'site-header--baby' : 'site-header--textile'}`}>
      <div className="site-header__top">
        <div className="site-header__top-inner">
          <div className="site-header__switch">
            <Link
              to="/textile"
              className={`site-header__switch-item ${isTextile ? 'is-active' : ''}`}
            >
              {t('stores.textile')}
              <span className="site-header__switch-dot" />
            </Link>
            <Link
              to="/baby"
              className={`site-header__switch-item ${isBaby ? 'is-active' : ''}`}
            >
              {t('stores.baby')}
              <span className="site-header__switch-dot" />
            </Link>
          </div>
          <p className="site-header__tagline">
            {isBaby ? t('header.babyTagline') : t('header.textileTagline')}
          </p>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{t('phone')}</a>
        </div>
      </div>

      <div className="site-header__main">
        <div className="site-header__main-inner">
          <Link to="/" className="site-header__brand">
            <strong>{t('brand')}</strong>
            <span>{isBaby ? t('stores.baby') : t('stores.textile')}</span>
          </Link>

          <div className="site-header__search">
            <input
              className="vt-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('searchPlaceholder')}
              aria-label={t('searchPlaceholder')}
            />

            {query.trim() !== '' && (
              <div className="site-header__search-results">
                {loading && <p>{t('searchLoading')}</p>}
                {!loading && error && <p>{error}</p>}
                {!loading && !error && products.length === 0 && <p>{t('searchEmpty')}</p>}
                {!loading && !error && products.map((product) => (
                  <div className="site-header__search-product" key={product.sku}>
                    <strong>{product.name}</strong>
                    <span>SKU: {product.sku}</span>
                    <span>{product.price} AMD</span>
                    <span>{product.store?.name || product.store_name || ''}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="site-header__languages">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                type="button"
                className="vt-chip site-header__lang"
                aria-pressed={activeLanguage.startsWith(language.code)}
                onClick={() => i18n.changeLanguage(language.code)}
              >
                {language.label}
              </button>
            ))}
          </div>

          <div className="site-header__actions">
            <Link className="site-header__account" to="/account" aria-label={accountLabel}>
              {accountLabel}
            </Link>
            <Link
              className="site-header__cart"
              to="/cart"
              aria-label={cartCount === null ? t('cart') : `${t('cart')} ${cartCount}`}
            >
              {t('cart')}
              {cartCount !== null && <span>{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      <nav className="site-header__nav" aria-label={t('brand')}>
        <div className="site-header__nav-inner">
          {currentNavItems.map((item) => (
            <span key={item.key} className="site-header__nav-item">
              {navLabel(item)}
            </span>
          ))}
          {!isBaby && (
            <button type="button" className="vt-button vt-button--ghost site-header__wholesale" disabled>
              {t('wholesale')}
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
