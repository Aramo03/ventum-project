
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  LANGUAGES,
  NAV_ITEMS,
  BABY_NAV_ITEMS,
} from './header.js'
import { api } from '../../api/client'
import { LANGUAGES, NAV_ITEMS, PHONE } from './header.js'
import { api, AUTH_CHANGED_EVENT } from '../../api/client'
import { CART_UPDATED_EVENT } from '../../pages/Cart/cart.js'
import './header.css'

const TOKEN_KEY = 'ventum_access_token'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  const isBaby = pathname.startsWith('/baby')
  const currentNavItems = isBaby ? BABY_NAV_ITEMS : NAV_ITEMS

  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cartCount, setCartCount] = useState(null)

  // Load cart count
  useEffect(() => {
    let cancelled = false

    async function loadCartCount() {
      if (!localStorage.getItem(TOKEN_KEY)) {
        if (!cancelled) setCartCount(null)
        return
      }

      try {
        const response = await api.get('/api/cart/')

        if (!cancelled) {
          setCartCount(response.data?.count ?? 0)
        }
      } catch {
        if (!cancelled) {
          setCartCount(null)
        }
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

  // Product search
  useEffect(() => {
    const search = query.trim()

    if (!search) {
      setProducts([])
      setLoading(false)
      setError('')
      return
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

  const activeLanguage =
    i18n.resolvedLanguage || i18n.language || 'en'

  return (
    <header
      className={`site-header ${
        isBaby ? 'site-header--baby' : 'site-header--textile'
      }`}
    >
      {/* Top bar */}
      <div className="site-header__top">
        <div className="site-header__top-inner">

          <div className="site-header__switch">
            <Link
              to="/"
              className={`site-header__switch-item ${
                !isBaby ? 'is-active' : ''
              }`}
            >
              Ventum Textile
              <span className="site-header__switch-dot" />
            </Link>

            <Link
              to="/baby"
              className={`site-header__switch-item ${
                isBaby ? 'is-active' : ''
              }`}
      <div className="site-header__tools">
        <Link className="site-header__brand" to="/">
          {t('brand')}
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

              {!loading && !error && products.length === 0 && (
                <p>{t('searchEmpty')}</p>
              )}

              {!loading && !error && products.map((product) => (
                <div
                  className="site-header__search-product"
                  key={product.sku}
                >
                  <strong>{product.name}</strong>
                  <span>SKU: {product.sku}</span>
                  <span>{product.price} AMD</span>
                  <span>
                    {product.store?.name || product.store_name || ''}
                  </span>
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
              aria-pressed={(
                i18n.resolvedLanguage ||
                i18n.language ||
                'en'
              ).startsWith(language.code)}
              onClick={() => i18n.changeLanguage(language.code)}
            >
              Ventum Baby
              <span className="site-header__switch-dot" />
            </Link>
          </div>

          <p className="site-header__tagline">
            {isBaby
              ? 'Purest organic touch · Crafted with love for little ones'
              : 'Crafted for serene living · Direct from our atelier'}
          </p>

        </div>
      </div>

      {/* Main header */}
      <div className="site-header__main">
        <div className="site-header__main-inner">

          <Link to={isBaby ? '/baby' : '/'} className="site-header__brand">
            <strong>VENTUM</strong>
            <span>{isBaby ? 'BABY' : 'textile'}</span>
          </Link>

          {/* Search */}
          <div className="site-header__search">
            <span className="site-header__search-icon">
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <circle cx="10.8" cy="10.8" r="6.8" />
                <path d="m16 16 4 4" />
              </svg>
            </span>

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t('searchPlaceholder')}
              aria-label={t('searchPlaceholder')}
            />

            {query.trim() !== '' && (
              <div className="site-header__search-results">
                {loading && <p>{t('searchLoading')}</p>}
        <Link className="site-header__icon" to="/account">
          {t('accountLink')}
        </Link>

                {!loading && error && <p>{error}</p>}

                {!loading && !error && products.length === 0 && (
                  <p>{t('searchEmpty')}</p>
                )}

                {!loading && !error && products.map((product) => (
                  <div
                    className="site-header__search-product"
                    key={product.sku}
                  >
                    <strong>{product.name}</strong>
                    <span>SKU: {product.sku}</span>
                    <span>{product.price} AMD</span>
                    <span>
                      {product.store?.name || product.store_name || ''}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Languages */}
          <div className="site-header__languages">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                type="button"
                className="site-header__lang"
                aria-pressed={activeLanguage.startsWith(language.code)}
                onClick={() => i18n.changeLanguage(language.code)}
              >
                {language.label}
              </button>
            ))}
          </div>

          {/* Account and cart */}
          <div className="site-header__actions">
            <Link
              to="/account"
              className="site-header__account"
              aria-label={t('account')}
              title={t('account')}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="3.5" />
                <path d="M5 21c0-4 2.8-6.5 7-6.5s7 2.5 7 6.5" />
              </svg>
            </Link>

            <Link
              to="/cart"
              className="site-header__cart"
              aria-label={`${t('cart')} ${cartCount ?? ''}`}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="5" y="5" width="14" height="16" rx="2" />
                <path d="M9 5V3h6v2" />
              </svg>

              <span>{cartCount ?? 0}</span>
            </Link>
          </div>

        </div>
      </div>

      {/* Navigation */}
      <nav className="site-header__nav" aria-label={t('brand')}>
        <div className="site-header__nav-inner">
         {currentNavItems.map((item) => (
  <span key={item.key} className="site-header__nav-item">
    {isBaby ? item.label : (t(item.key) === item.key ? item.label : t(item.key))}
  </span>
))}
          {!isBaby && (
          <Link to="/wholesale" className="site-header__wholesale">
            Wholesale
          </Link>
          )}
        </div>
        {NAV_ITEMS.map((item) => (
          <span key={item.key} className="site-header__nav-item">
            {t(item.key)}
          </span>
        ))}

        <button
          type="button"
          className="vt-button vt-button--ghost site-header__wholesale"
          disabled
        >
          {t('wholesale')}
        </button>
      </nav>
    </header>
  )
}
