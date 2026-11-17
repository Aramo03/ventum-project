
import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { api } from '../../api/client'
import './cart.css'

const TOKEN_KEY = 'ventum_access_token'

export default function Cart() {
  const location = useLocation()

  const [cart, setCart] = useState({ items: [], count: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingSku, setUpdatingSku] = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)

  const isAuthenticated = Boolean(
    localStorage.getItem(TOKEN_KEY)
  )

  const paymentReturn =
    new URLSearchParams(location.search).get('success') === '1'

  const loadCart = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      setCart({ items: [], count: 0 })
      setLoading(false)
      return
    }

    try {
      setError('')
      const response = await api.get('/api/cart/')

      setCart({
        items: response.data?.items || [],
        count: response.data?.count ?? 0,
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

  // Update product quantity
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

  // Remove product from cart
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

  // Checkout and redirect to payment provider
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
        <h1>Shopping cart</h1>
        <p>Please sign in to view your cart.</p>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="cart-page">
        <p>Loading cart...</p>
      </main>
    )
  }

  return (
    <main className="cart-page">
      <h1>Shopping cart</h1>

      {paymentReturn && (
        <p className="cart-message">
          Payment return received. Payment has not been confirmed yet.
        </p>
      )}

      {error && (
        <p className="cart-error" role="alert">
          {error}
        </p>
      )}

      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.items.map((item) => {
              const sku = item.sku
              const quantity = item.qty ?? item.quantity ?? 1
              const name = item.name || item.product?.name || sku
              const price = item.price ?? item.product?.price

              return (
                <article className="cart-item" key={sku}>
                  <div className="cart-item__info">
                    <h2>{name}</h2>
                    <p>SKU: {sku}</p>

                    {price !== undefined && (
                      <p>{price} AMD</p>
                    )}
                  </div>

                  <div className="cart-item__actions">
                    <button
                      type="button"
                      disabled={updatingSku === sku || quantity <= 0}
                      onClick={() => updateQuantity(sku, quantity - 1)}
                    >
                      −
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      disabled={updatingSku === sku}
                      onClick={() => updateQuantity(sku, quantity + 1)}
                    >
                      +
                    </button>

                    <button
                      type="button"
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

          <button
            type="button"
            className="cart-checkout"
            disabled={checkoutLoading}
            onClick={checkout}
          >
            {checkoutLoading ? 'Processing...' : 'Checkout'}
          </button>
        </>
      )}
    </main>
  )
}
