import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { mediaUrl } from '../../api/client'
import {
  checkout as startCheckout,
  deleteCartItem,
  getCart,
  submitPaymentForm,
  updateCartItem,
} from './cart.js'
import './cart.css'

const TOKEN_KEY = 'ventum_access_token'

export default function Cart() {
  const { t } = useTranslation()
  const location = useLocation()

  const [cart, setCart] = useState({
    items: [],
    count: 0,
    total: '0.00',
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingSku, setUpdatingSku] = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const isAuthenticated = Boolean(localStorage.getItem(TOKEN_KEY))
  const paymentReturn = new URLSearchParams(location.search).get('success') === '1'

  const loadCart = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      setCart({ items: [], count: 0, total: '0.00' })
      setLoading(false)
      return
    }

    try {
      setError('')
      const data = await getCart()
      setCart({
        items: data?.items || [],
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

  const checkout = async () => {
    try {
      setCheckoutLoading(true)
      setError('')

      const data = await startCheckout()
      const { payment_url: paymentUrl, fields } = data || {}
      const resolved = new URL(paymentUrl, window.location.origin)

      if (!['http:', 'https:'].includes(resolved.protocol)) {
        throw new Error('Invalid payment URL')
      }

      submitPaymentForm(resolved.href, fields)
    } catch {
      setError(t('cartPage.checkoutError'))
      setCheckoutLoading(false)
    }
  }

  return (
    <main className="cart-page">
      <header className="vt-type">
        <p className="vt-eyebrow">{t('brand')}</p>
        <h1>{t('pageTitles.cart')}</h1>
      </header>

      {paymentReturn && (
        <p className="vt-status" role="status">
          {t('cartPage.paymentReturn')}
        </p>
      )}

      {!isAuthenticated && (
        <section className="vt-status">
          <h2>{t('cartPage.signInTitle')}</h2>
          <p>{t('cartPage.signInMessage')}</p>
          <Link className="vt-button" to="/account">
            {t('accountLink')}
          </Link>
        </section>
      )}

      {isAuthenticated && loading && (
        <p className="vt-status" role="status">
          {t('cartPage.loading')}
        </p>
      )}

      {error && (
        <p className="vt-status vt-status--error" role="alert">
          {error}
        </p>
      )}

      {isAuthenticated && !loading && cart.items.length === 0 && (
        <section className="vt-status">
          <h2>{t('cartPage.emptyTitle')}</h2>
          <p>{t('cartPage.emptyMessage')}</p>
        </section>
      )}

      {isAuthenticated && !loading && cart.items.length > 0 && (
        <>
          <div className="cart-items">
            {cart.items.map((item) => {
              const sku = item.sku
              const quantity = item.qty ?? item.quantity ?? 1
              const product = item.product || {}
              const name = item.name || product.name || item.title || product.title || sku
              const price = item.price ?? product.price
              const image = item.image || item.image_url || product.image || product.image_url
              const imageSrc = mediaUrl(image)

              return (
                <article className="cart-item" key={sku}>
                  <div className="cart-item__image">
                    {imageSrc ? (
                      <img src={imageSrc} alt={name} />
                    ) : (
                      <span className="cart-item__placeholder">{t('cartPage.noImage')}</span>
                    )}
                  </div>

                  <div className="cart-item__info">
                    <h2>{name}</h2>
                    <p>{sku}</p>
                    {price !== undefined && (
                      <p>
                        {price} {t('checkout.currency')}
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

          <div className="cart-summary">
            <div>
              <span>{t('cartPage.total')}</span>
              {' '}
              <strong>
                {cart.total} {t('checkout.currency')}
              </strong>
            </div>
            <button
              type="button"
              className="vt-button"
              disabled={checkoutLoading || cart.items.length === 0}
              onClick={checkout}
            >
              {checkoutLoading ? t('cartPage.processing') : t('cartPage.checkout')}
            </button>
          </div>
        </>
      )}
    </main>
  )
}
