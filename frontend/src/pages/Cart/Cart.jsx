
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../../api/client'
import './cart.css'

const TOKEN_KEY = 'ventum_access_token'

export default function Cart() {
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

  const paymentReturn =
    new URLSearchParams(location.search).get('success') === '1'

  const loadCart = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      setCart({ items: [], count: 0, total: '0.00' })
      setLoading(false)
      return
    }

    try {
      setError('')
      const response = await api.get('/api/cart/')
      setCart({
        items: response.data?.items || [],
        count: response.data?.count ?? 0,
        total: response.data?.total ?? '0.00',
      })
    } catch {
      setError('Could not load your cart. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCart()
  }, [loadCart])

  const updateQuantity = async (sku, qty) => {
    if (!Number.isInteger(qty) || qty < 0) return

    try {
      setUpdatingSku(sku)
      setError('')

      await api.patch(
        `/api/cart/items/${encodeURIComponent(sku)}/`,
        { qty }
      )

      await loadCart()
    } catch {
      setError('Could not update product quantity.')
    } finally {
      setUpdatingSku(null)
    }
  }

  const removeItem = async (sku) => {
    try {
      setUpdatingSku(sku)
      setError('')

      await api.delete(
        `/api/cart/items/${encodeURIComponent(sku)}/`
      )

      await loadCart()
    } catch {
      setError('Could not remove product from cart.')
    } finally {
      setUpdatingSku(null)
    }
  }

  const checkout = async () => {
    try {
      setCheckoutLoading(true)
      setError('')

      const response = await api.post('/api/checkout/')
      const { payment_url, fields } = response.data || {}

      if (
        !payment_url ||
        !fields ||
        typeof fields !== 'object' ||
        Array.isArray(fields)
      ) {
        throw new Error('Invalid checkout response')
      }

      const paymentUrl = new URL(payment_url, window.location.origin)

      if (!['http:', 'https:'].includes(paymentUrl.protocol)) {
        throw new Error('Invalid payment URL')
      }

      const form = document.createElement('form')
      form.method = 'POST'
      form.action = paymentUrl.href
      form.style.display = 'none'

      Object.entries(fields).forEach(([name, value]) => {
        if (value === null || value === undefined) return

        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = name
        input.value = String(value)
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
    } catch {
      setError('Checkout failed. Please try again.')
      setCheckoutLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <h1 className="cart-title">Shopping cart</h1>
          <div className="cart-empty">
            <h2>Please sign in</h2>
            <p>You need to sign in to view your shopping cart.</p>
          </div>
        </div>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="cart-page">
        <div className="cart-container">
          <p className="cart-message">Loading cart...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Shopping cart</h1>

        {paymentReturn && (
          <p className="cart-message" role="status">
            Payment return received. Payment has not been confirmed yet.
          </p>
        )}

        {error && (
          <p className="cart-error" role="alert">
            {error}
          </p>
        )}

        {cart.items.length === 0 ? (
          <div className="cart-empty">
            <h2>Your cart is empty</h2>
            <p>Add products to your cart to see them here.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.items.map((item) => {
                const sku = item.sku
                const quantity = item.qty ?? item.quantity ?? 1
                const product = item.product || {}
                const name =
                  item.name ||
                  product.name ||
                  item.title ||
                  product.title ||
                  sku
                const price = item.price ?? product.price
                const image =
                  item.image ||
                  item.image_url ||
                  product.image ||
                  product.image_url

                return (
                  <article className="cart-item" key={sku}>
                    <div className="cart-item__image">
                      {image ? (
                        <img src={image} alt={name} />
                      ) : (
                        <span className="cart-item__placeholder">
                          No image
                        </span>
                      )}
                    </div>

                    <div className="cart-item__info">
                      <h2>{name}</h2>
                      <p className="cart-item__sku">SKU: {sku}</p>

                      {price !== undefined && (
                        <p className="cart-item__price">
                          {price} AMD
                        </p>
                      )}
                    </div>

                    <div className="cart-item__actions">
                      <div className="cart-quantity">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          disabled={updatingSku === sku || quantity <= 1}
                          onClick={() =>
                            updateQuantity(sku, quantity - 1)
                          }
                        >
                          −
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          aria-label="Increase quantity"
                          disabled={updatingSku === sku}
                          onClick={() =>
                            updateQuantity(sku, quantity + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="cart-remove"
                        disabled={updatingSku === sku}
                        onClick={() => removeItem(sku)}
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="cart-summary">
              <div className="cart-summary__total">
                <span>Total</span>
                <strong>{cart.total} AMD</strong>
              </div>

              <button
                type="button"
                className="cart-checkout"
                disabled={checkoutLoading || cart.items.length === 0}
                onClick={checkout}
              >
                {checkoutLoading ? 'Processing...' : 'Checkout'}
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  )
}
