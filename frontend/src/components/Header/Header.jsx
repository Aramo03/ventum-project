import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LANGUAGES, NAV_ITEMS, PHONE } from './header.js'
import { api } from '../../api/client'
import './header.css'

const TOKEN_KEY = 'ventum_access_token'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  const [query, setQuery] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cartCount, setCartCount] = useState(null)

  // Load cart count for authenticated users
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY)

    if (!token) {
      setCartCount(null)
      return
    }

    let cancelled = false

    async function loadCartCount() {
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

    return () => {
      cancelled = true
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

  return (
    <header className="site-header">
      <div className="site-header__bar">
        <span>{t('delivery')}</span>
        <a href={`tel:${PHONE.replace(/\s/g, '')}`}>
          {t('phone')}
        </a>
      </div>

      <div className="site-header__tools">
        <Link className="site-header__brand" to="/">
          {t('brand')}
        </Link>

        <div className="site-header__search">
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
              className="site-header__lang"
              aria-pressed={(
                i18n.resolvedLanguage ||
                i18n.language ||
                'en'
              ).startsWith(language.code)}
              onClick={() => i18n.changeLanguage(language.code)}
            >
              {language.label}
            </button>
          ))}
        </div>

        <Link className="site-header__icon" to="/account">
          {t('account')}
        </Link>

        <Link className="site-header__icon" to="/cart">
          {t('cart')}
          {cartCount !== null && ` ${cartCount}`}
        </Link>
      </div>

      <nav className="site-header__nav" aria-label={t('brand')}>
        {NAV_ITEMS.map((item) => (
          <span key={item.key} className="site-header__nav-item">
            {t(item.key)}
          </span>
        ))}

        <button
          type="button"
          className="site-header__wholesale"
          disabled
        >
          {t('wholesale')}
        </button>
      </nav>
    </header>
  )
}
