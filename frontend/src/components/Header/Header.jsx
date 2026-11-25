
import { useEffect, useState } from 'react'
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  LANGUAGES,
  NAV_ITEMS,
  BABY_NAV_ITEMS,
  knownLanguage,
  activeLanguageCode,
  shopPathname,
} from './header.js'

import { api, AUTH_CHANGED_EVENT } from '../../api/client'
import { CART_UPDATED_EVENT } from '../../pages/Cart/cart.js'

import './header.css'

const TOKEN_KEY = 'ventum_access_token'

export default function Header() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const isBaby = pathname.startsWith('/baby')
  const currentNavItems = isBaby ? BABY_NAV_ITEMS : NAV_ITEMS
  const shopPath = shopPathname(pathname)

  const urlQuery = searchParams.get('q') || ''
  const activeCategory = searchParams.get('category') || ''

  const [query, setQuery] = useState(urlQuery)
  const [cartCount, setCartCount] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)

  const activeLanguage = activeLanguageCode(
    i18n.resolvedLanguage || i18n.language,
  )

  /* =========================
     SCROLL EFFECT
  ========================= */

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  /* =========================
     SEARCH QUERY SYNC
  ========================= */

  useEffect(() => {
    setQuery(urlQuery)
  }, [urlQuery])

  /* =========================
     CART COUNT
  ========================= */

  useEffect(() => {
    let cancelled = false

    async function loadCartCount() {
      if (!localStorage.getItem(TOKEN_KEY)) {
        if (!cancelled) {
          setCartCount(null)
        }
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

  /* =========================
     SEARCH
  ========================= */

  function writeShopQuery(value) {
    const next = new URLSearchParams(searchParams)
    const trimmed = value.trim()

    if (trimmed) {
      next.set('q', trimmed)
    } else {
      next.delete('q')
    }

    if (pathname === shopPath) {
      setSearchParams(next, { replace: true })
      return
    }

    navigate(
      {
        pathname: shopPath,
        search: next.toString(),
      },
      { replace: true },
    )
  }

  /* =========================
     NAVIGATION LABELS
  ========================= */

  function navLabel(item) {
    const translated = t(item.key)

    return translated === item.key
      ? item.label
      : translated
  }

  function categoryTo(slug) {
    const next = new URLSearchParams(searchParams)

    next.set('category', slug)

    return {
      pathname: shopPath,
      search: next.toString(),
    }
  }

  /* =========================
     LANGUAGE SELECT
  ========================= */

  function selectLanguage(code) {
    const next = knownLanguage(code)

    if (!next) return

    try {
      localStorage.setItem('i18nextLng', next)
    } catch {
      /* the switcher still changes the current view */
    }

    i18n.changeLanguage(next)
  }

  /* =========================
     RENDER
  ========================= */

  return (
    <header
      className={`site-header ${
        isBaby
          ? 'site-header--baby'
          : 'site-header--textile'
      } ${isScrolled ? 'is-scrolled' : ''}`}
    >
      {/* TOP BAR */}

      <div className="site-header__top">
        <div className="site-header__top-inner">

          <div className="site-header__switch">
            <Link
              to="/textile"
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
              ? t('header.babyTagline')
              : t('header.textileTagline')}
          </p>

        </div>
      </div>

      {/* MAIN HEADER */}

      <div className="site-header__main">
        <div className="site-header__main-inner">

          {/* BRAND */}

          <Link
            to={isBaby ? '/baby' : '/textile'}
            className="site-header__brand"
          >
            <strong>VENTUM</strong>

            <span>
              {isBaby ? 'BABY' : 'textile'}
            </span>
          </Link>

          {/* SEARCH */}

          <form
            className="site-header__search"
            role="search"
            onSubmit={(event) => {
              event.preventDefault()
              writeShopQuery(query)
            }}
          >
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
              onChange={(event) => {
                const value = event.target.value

                setQuery(value)
                writeShopQuery(value)
              }}
              placeholder={t('searchPlaceholder')}
              aria-label={t('searchPlaceholder')}
            />
          </form>

          {/* LANGUAGES */}

          <div className="site-header__languages">
            {LANGUAGES.map((language) => (
              <button
                key={language.code}
                type="button"
                className="site-header__lang"
                aria-pressed={
                  activeLanguage === language.code
                }
                onClick={() => selectLanguage(language.code)}
              >
                {language.label}
              </button>
            ))}
          </div>

          {/* ACCOUNT & CART */}

          <div className="site-header__actions">

            <Link
              to="/account"
              className="site-header__account"
              aria-label={t('accountLink')}
              title={t('accountLink')}
            >
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
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

      {/* CATEGORY NAVIGATION */}

      <nav
        className="site-header__nav"
        aria-label="Main navigation"
      >
        <div className="site-header__nav-inner">

          {currentNavItems.map((item) => (
            <Link
              key={item.key}
              to={categoryTo(item.slug)}
              className={`site-header__nav-item${
                activeCategory === item.slug
                  ? ' is-active'
                  : ''
              }`}
            >
              {navLabel(item)}
            </Link>
          ))}

          <Link
            to={`${shopPath}#wholesale`}
            className="site-header__wholesale"
          >
            {t('wholesale')}
          </Link>

        </div>
      </nav>
    </header>
  )
}
