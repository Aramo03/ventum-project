import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  LANGUAGES,
  NAV_ITEMS,
  BABY_NAV_ITEMS,
} from './header.js'

import { api, AUTH_CHANGED_EVENT } from '../../api/client'
import { CART_UPDATED_EVENT } from '../../pages/Cart/cart.js'

import './header.css'

const TOKEN_KEY = 'ventum_access_token'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  const isBaby = pathname.startsWith('/baby')
  const isStorePage = pathname.startsWith('/textile') || isBaby
  const currentNavItems = isBaby ? BABY_NAV_ITEMS : NAV_ITEMS
  const wholesaleTarget = isBaby ? '/baby#wholesale' : '/textile#wholesale'

  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cartCount, setCartCount] = useState(null)

  const activeLanguage =
    i18n.resolvedLanguage || i18n.language || 'en'

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

  // Wave 2 product search
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

        setProducts(
          Array.isArray(data) ? data : data.results || []
        )
      } catch {
        if (!cancelled) {
          setProducts([])
          setError(t('searchError'))
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }, 300)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [query, t])

  function navLabel(item) {
    const translated = t(item.key)
    return translated === item.key ? item.label : translated
  }

  return (
    <header
      className={`site-header ${
        isBaby ? 'site-header--baby' : 'site-header--textile'
      }`}
    >
      {/* TOP BAR */}
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

      {/* MAIN HEADER */}
      <div className="site-header__main">
        <div className="site-header__main-inner">
          {/* LOGO */}
          <Link
            to={isBaby ? '/baby' : '/'}
            className="site-header__brand"
          >
            <strong>VENTUM</strong>
            <span>{isBaby ? 'BABY' : 'textile'}</span>
          </Link>

          {/* SEARCH */}
          <div className="site-header__search">
            <span className="site-header__search-icon">
              <svg
                viewBox="0 0 24 24"
                width="17"
                height="17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
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
                {loading && (
                  <p>{t('searchLoading')}</p>
                )}

                {!loading && error && (
                  <p>{error}</p>
                )}

                {!loading && !error && products.length === 0 && (
                  <p>{t('searchEmpty')}</p>
                )}

                {!loading && !error && products.map((product) => (
                  <Link
                    to={`/product/${encodeURIComponent(product.sku)}`}
                    className="site-header__search-product"
                    key={product.sku}
                    onClick={() => {
                      setQuery('')
                      setProducts([])
                    }}
                  >
                    <strong>{product.name}</strong>
                    <span>SKU: {product.sku}</span>
                    <span>{product.price} AMD</span>
                    <span>
                      {product.store?.name ||
                        product.store_name ||
                        product.store ||
                        ''}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* LANGUAGES */}
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

          {/* ACCOUNT AND CART */}
          <div className="site-header__actions">
            <Link
              to="/account"
              className="site-header__account"
              aria-label={t('accountLink')}
              title={t('accountLink')}
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
              title={t('cart')}
            >
              <svg
                viewBox="0 0 24 24"
                width="21"
                height="21"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5.5 8h13l1 12h-15l1-12Z" />
                <path d="M9 9V6a3 3 0 0 1 6 0v3" />
              </svg>

              {cartCount !== null && (
                <span className="site-header__cart-count">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav
        className="site-header__nav"
        aria-label="Main navigation"
      >
        <div className="site-header__nav-inner">
          {currentNavItems.map((item) => (
            <span
              key={item.key}
              className="site-header__nav-item"
            >
              {navLabel(item)}
            </span>
          ))}

          {isStorePage && (
            <Link
              to={wholesaleTarget}
              className="site-header__wholesale"
            >
              {t('wholesale')}
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}
