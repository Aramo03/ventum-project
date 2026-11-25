import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { AUTH_CHANGED_EVENT, mediaUrl } from '../../api/client.js'
import {
  checkout as startCheckout,
  deleteCartItem,
  fetchCartItemImage,
  getCart,
  submitPaymentForm,
  updateCartItem,
} from './cart.js'
import '../../design/controls.css'

import './cart.css'

const TOKEN_KEY = 'ventum_access_token'

const EMPTY_CART = {
  items: [],
  count: 0,
  total: '0.00',
}

function storeLabel(store, t) {
  if (store === 'textile') return t('stores.textile')
  if (store === 'baby') return t('stores.baby')
  return store || ''
}

export default function Cart() {
  const { t } = useTranslation()
  const location = useLocation()

  const [cart, setCart] = useState(EMPTY_CART)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingSku, setUpdatingSku] = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [images, setImages] = useState({})

  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    Boolean(localStorage.getItem(TOKEN_KEY)),
  )

  // Returning from Idram does not prove that payment succeeded.
  const paymentReturn =
    new URLSearchParams(location.search).get('success') === '1'

  const loadCart = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      setCart(EMPTY_CART)
      setError('')
      setLoading(false)
      return
    }

    try {
      setError('')

      const data = await getCart()

      setCart({
        items: Array.isArray(data?.items) ? data.items : [],
        count: data?.count ?? 0,
        total: data?.total ?? '0.00',
      })
    } catch {
      setError(t('cartPage.loadError'))
    } finally {
      setLoading(false)
    }
  }, [t])

  useEffect(() => {
    loadCart()
  }, [loadCart])

  useEffect(() => {
    const syncAuthentication = () => {
      setIsAuthenticated(Boolean(localStorage.getItem(TOKEN_KEY)))
      setLoading(true)
      loadCart()
    }

    window.addEventListener(AUTH_CHANGED_EVENT, syncAuthentication)
    window.addEventListener('storage', syncAuthentication)
    return () => {
      window.removeEventListener(AUTH_CHANGED_EVENT, syncAuthentication)
      window.removeEventListener('storage', syncAuthentication)
    }
  }, [loadCart])

  useEffect(() => {
    let active = true
    const skus = cart.items.map((item) => item.sku).filter(Boolean)

    skus.forEach((sku) => {
      fetchCartItemImage(sku)
        .then((image) => {
          if (active) {
            setImages((current) => ({ ...current, [sku]: image || '' }))
          }
        })
        .catch(() => {
          if (active) {
            setImages((current) => ({ ...current, [sku]: '' }))
          }
        })
    })

    return () => {
      active = false
    }
  }, [cart.items])

  const updateQuantity = async (sku, qty) => {
    if (!Number.isInteger(qty) || qty < 0) return

    try {
      setUpdatingSku(sku)
      setError('')

      await updateCartItem(sku, qty)
      await loadCart()
    } catch {
      setError(t('cartPage.updateError'))
    } finally {
      setUpdatingSku(null)
    }
  }

  const removeItem = async (sku) => {
    try {
      setUpdatingSku(sku)
      setError('')

      await deleteCartItem(sku)
      await loadCart()
    } catch {
      setError(t('cartPage.removeError'))
    } finally {
      setUpdatingSku(null)
    }
  }

  const handleCheckout = async () => {
    try {
      setCheckoutLoading(true)
      setError('')

      const data = await startCheckout()

      const paymentUrl = data?.payment_url
      const fields = data?.fields

      if (
        typeof paymentUrl !== 'string' ||
        !paymentUrl.trim()
      ) {
        throw new Error('Missing payment URL')
      }

      const resolvedUrl = new URL(paymentUrl)

      if (
        !['http:', 'https:'].includes(resolvedUrl.protocol)
      ) {
        throw new Error('Invalid payment URL')
      }

      submitPaymentForm(resolvedUrl.href, fields)
    } catch {
      setError(t('cartPage.checkoutError'))
      setCheckoutLoading(false)
    }
  }

  return (
    <main className="cart-page">
      <nav
        className="cart-breadcrumbs"
        aria-label={t('productDetails.breadcrumbs')}
      >
        <Link to="/">{t('nav.home')}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{t('nav.cart')}</span>
        <span aria-hidden="true">/</span>
        <span aria-current="step">{t('cartPage.checkoutStep')}</span>
      </nav>

      <header className="cart-heading">
        <h1>{t('pageTitles.cart')}</h1>
      </header>

      <ol className="cart-progress" aria-label={t('pageTitles.cart')}>
        <li>{t('nav.cart')}</li>
        <li aria-current="step">{t('cartPage.checkoutStep')}</li>
      </ol>

      {paymentReturn && (
        <p className="vt-status" role="status">
          {t('cartPage.paymentReturn')}
        </p>
      )}

      {!isAuthenticated && (
        <section className="vt-status">
          <h2>{t('cartPage.signInTitle')}</h2>

          <p>{t('cartPage.signInMessage')}</p>

          <Link className="vt-button" to="/account" state={{ from: '/cart' }}>
            {t('accountLink')}
          </Link>
        </section>
      )}

      {isAuthenticated && loading && (
        <section
          className="cart-loading"
          role="status"
          aria-label={t('cartPage.loading')}
          aria-busy="true"
        >
          <span className="sr-only">{t('cartPage.loading')}</span>
          <div className="cart-loading__preview">
            <span className="cart-loading__image ds-skeleton" />
            <span className="cart-loading__line ds-skeleton" />
          </div>
          <div className="cart-loading__rows" aria-hidden="true">
            <span className="cart-loading__row ds-skeleton" />
            <span className="cart-loading__row ds-skeleton" />
          </div>
          <div className="cart-loading__summary ds-skeleton" aria-hidden="true" />
        </section>
      )}

      {error && (
        <p className="vt-status vt-status--error" role="alert">
          {error}
        </p>
      )}

      {isAuthenticated &&
        !loading &&
        !error &&
        cart.items.length === 0 && (
          <section className="vt-status">
            <h2>{t('cartPage.emptyTitle')}</h2>
            <p>{t('cartPage.emptyMessage')}</p>
          </section>
        )}

      {isAuthenticated &&
        !loading &&
        cart.items.length > 0 && (
          <div className="cart-layout">
            <div className="cart-preview">
              {cart.items.map((item) => {
                const image = images[item.sku]
                const storeName =
                  storeLabel(item.store, t) || t('cartPage.noImage')
                return (
                  <article
                    className="cart-preview__item"
                    key={`preview-${item.sku}`}
                  >
                    {image ? (
                      <img src={mediaUrl(image)} alt={item.name || item.sku} />
                    ) : (
                      <span
                        className="cart-item__placeholder"
                        role="img"
                        aria-label={t('cartPage.noImage')}
                      />
                    )}
                    <span>{storeName}</span>
                  </article>
                )
              })}
            </div>

            <div className="cart-items">
              {cart.items.map((item) => {
                const sku = item.sku
                const quantity = Number(item.qty ?? 1)
                const name = item.name || sku
                const price = item.price
                const lineTotal = item.line_total

                return (
                  <article className="cart-item" key={sku}>
                    <div className="cart-item__info">
                      <h2>{name}</h2>
                      <p>{t('cartPage.sku')}: {sku}</p>
                      {item.store ? <p>{storeLabel(item.store, t)}</p> : null}
                      {price !== undefined && (
                        <p>
                          {t('cartPage.price')}: {price} {t('checkout.currency')}
                        </p>
                      )}
                      {lineTotal !== undefined && (
                        <p>
                          {t('cartPage.subtotal')}: {lineTotal} {t('checkout.currency')}
                        </p>
                      )}
                    </div>

                    <div className="cart-item__actions">
                      <div className="vt-qty">
                        <button
                          type="button"
                          aria-label={t('cartPage.decreaseQuantity')}
                          disabled={updatingSku === sku || quantity <= 1}
                          onClick={() => updateQuantity(sku, quantity - 1)}
                        >
                          −
                        </button>
                        <span>{quantity}</span>
                        <button
                          type="button"
                          aria-label={t('cartPage.increaseQuantity')}
                          disabled={updatingSku === sku}
                          onClick={() => updateQuantity(sku, quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="vt-button vt-button--ghost"
                        disabled={updatingSku === sku}
                        onClick={() => removeItem(sku)}
                      >
                        {t('cartPage.remove')}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>

            <aside className="cart-summary">
              <h2>{t('cartPage.summary')}</h2>
              <div className="cart-summary__count">
                <span>{t('cartPage.items', { count: cart.count })}</span>
              </div>
              <div className="cart-summary__amount">
                <span>{t('cartPage.subtotal')}</span>
                <strong>
                  {cart.total} {t('checkout.currency')}
                </strong>
              </div>
              <div className="cart-summary__amount cart-summary__amount--grand">
                <span>{t('cartPage.total')}</span>
                <strong>
                  {cart.total} {t('checkout.currency')}
                </strong>
              </div>
              <div
                className="cart-summary__marks"
                aria-label={`${t('productCard.visa')} ${t('productCard.mastercard')}`}
              >
                <span className="ds-pay ds-pay--visa">{t('productCard.visa')}</span>
                <span className="ds-pay ds-pay--mastercard">{t('productCard.mastercard')}</span>
              </div>
              <button
                type="button"
                className="vt-button"
                disabled={checkoutLoading || cart.items.length === 0}
                onClick={handleCheckout}
              >
                {checkoutLoading ? t('cartPage.processing') : t('cartPage.checkout')}
              </button>
            </aside>
          </div>
        )}
    </main>
  )
}
