
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  addProductToCart,
  formatProductPrice,
  productExtras,
  productImageSrc,
} from './productCard'

import {
  getCart,
  updateCartItem,
  deleteCartItem,
  CART_UPDATED_EVENT,
} from '../../pages/Cart/cart.js'

import '../../design/controls.css'
import './productCard.css'

export default function ProductCard({ product, brand }) {
  const { t } = useTranslation()

  const pendingRef = useRef(false)
  const toastTimer = useRef(null)

  const [pending, setPending] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [cartReady, setCartReady] = useState(true)
  const [note, setNote] = useState(null)

  const extras = productExtras(product)
  const sizeKey = extras.sizes.map((item) => item.id).join('|')

  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    const sizes = productExtras(product).sizes
    const preset = sizes.find((item) => item.selected)

    setSelectedSize(preset?.id || sizes[0]?.id || '')
  }, [product, sizeKey])

  const imageSrc = productImageSrc(product?.image)
  const salePrice = formatProductPrice(product?.price)

  const shop =
    brand === 'baby' || brand === 'textile'
      ? brand
      : undefined

  const locked = !product?.sku

  const detailsPath = product?.sku
    ? `/product/${encodeURIComponent(product.sku)}`
    : ''

  // Load current quantity from cart
  useEffect(() => {
    let active = true

    async function syncCart() {
      try {
        const data = await getCart()

        if (!active) return

        const items = Array.isArray(data?.items)
          ? data.items
          : []

        const item = items.find(
          (item) => String(item.sku) === String(product?.sku)
        )

        setQuantity(Number(item?.qty ?? 0))
      } catch {
        if (active) {
          setQuantity(0)
        }
      } finally {
        if (active) {
          setCartReady(true)
        }
      }
    }

    syncCart()

    window.addEventListener(CART_UPDATED_EVENT, syncCart)

    return () => {
      active = false
      window.removeEventListener(CART_UPDATED_EVENT, syncCart)
    }
  }, [product?.sku])

  // Clear notification timer
  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current)
      }
    }
  }, [])

  function showNote(type, key) {
    setNote({ type, key })

    if (toastTimer.current) {
      clearTimeout(toastTimer.current)
    }

    toastTimer.current = setTimeout(() => {
      setNote(null)
    }, 3000)
  }

  // Add product to cart
  async function handleAddToCart() {
    if (
      pendingRef.current ||
      locked ||
      !cartReady
    ) return

    pendingRef.current = true
    setPending('add')

    try {
      await addProductToCart(product.sku)

      setQuantity(1)
      showNote('ok', 'productCard.added')
    } catch (error) {
      const key =
        error.response?.status === 401
          ? 'productCard.signIn'
          : 'productCard.failed'

      showNote('error', key)
    } finally {
      pendingRef.current = false
      setPending(null)
    }
  }

  // Change cart quantity or remove product
  async function handleQuantityChange(nextQuantity) {
    if (
      pendingRef.current ||
      locked ||
      nextQuantity < 0 ||
      nextQuantity === quantity
    ) return

    pendingRef.current = true
    setPending('quantity')

    try {
      if (nextQuantity === 0) {
        await deleteCartItem(product.sku)
        setQuantity(0)
      } else {
        await updateCartItem(product.sku, nextQuantity)
        setQuantity(nextQuantity)
      }
    } catch {
      showNote('error', 'productCard.failed')
    } finally {
      pendingRef.current = false
      setPending(null)
    }
  }

  return (
    <article className="product-card" data-brand={shop}>

      {note && (
        <div
          className={`product-cart-toast product-cart-toast--${note.type}`}
          role={note.type === 'ok' ? 'status' : 'alert'}
        >
          <span className="product-cart-toast__icon">
            {note.type === 'ok' ? '✓' : '!'}
          </span>

          <span>{t(note.key)}</span>
        </div>
      )}

      <div className="product-card__media">
        {detailsPath ? (
          <Link
            className="product-card__media-link"
            to={detailsPath}
          >
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={product?.name || ''}
                className="product-card__image"
              />
            ) : (
              <div
                className="product-card__placeholder"
                aria-hidden="true"
              />
            )}
          </Link>
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt={product?.name || ''}
            className="product-card__image"
          />
        ) : (
          <div
            className="product-card__placeholder"
            aria-hidden="true"
          />
        )}

        {extras.discount && (
          <span className="ds-badge ds-badge--discount product-card__discount">
            {extras.discount}
          </span>
        )}

        {extras.stock && (
          <span className="ds-badge ds-badge--stock product-card__stock">
            {extras.stock}
          </span>
        )}
      </div>

      <div className="product-card__body">

        <h2 className="product-card__name">
          {detailsPath ? (
            <Link
              className="product-card__name-link"
              to={detailsPath}
            >
              {product?.name}
            </Link>
          ) : (
            product?.name
          )}
        </h2>

        {extras.spec && (
          <p className="product-card__spec">
            {extras.spec}
          </p>
        )}

        {extras.sizes.length > 0 && (
          <div
            className="product-card__sizes"
            role="group"
            aria-label={t('productCard.sizes')}
          >
            {extras.sizes.map((size) => (
              <button
                key={size.id}
                type="button"
                className={
                  selectedSize === size.id
                    ? 'ds-size is-selected'
                    : 'ds-size'
                }
                aria-pressed={selectedSize === size.id}
                onClick={() => setSelectedSize(size.id)}
              >
                {size.label}
              </button>
            ))}
          </div>
        )}

        <p className="product-card__prices">
          {extras.oldPrice && (
            <span className="product-card__old">
              {extras.oldPrice}
            </span>
          )}

          {salePrice && (
            <span className="product-card__price">
              {salePrice} {t('productCard.currency')}
            </span>
          )}
        </p>

        <div
          className="product-card__marks"
          aria-label={`${t('productCard.visa')} ${t('productCard.mastercard')}`}
        >
          <span className="ds-pay ds-pay--visa">
            {t('productCard.visa')}
          </span>

          <span className="ds-pay ds-pay--mastercard">
            <span
              className="ds-pay__circles"
              aria-hidden="true"
            >
              <span />
              <span />
            </span>

            {t('productCard.mastercard')}
          </span>
        </div>

        <div className="product-card__actions">

          {quantity === 0 ? (
            <button
              type="button"
              className="product-card__add-button"
              disabled={locked || pending !== null}
              onClick={handleAddToCart}
            >
              {pending === 'add' ? (
                <>
                  <span className="ds-btn__spinner" aria-hidden="true" />
                  Ավելացվում է...
                </>
              ) : (
                <>
                  <span aria-hidden="true">＋</span>
                  Ավելացնել զամբյուղ
                </>
              )}
            </button>
          ) : (
            <div
              className="product-card__quantity"
              aria-label="Ապրանքի քանակ"
            >
              <button
                type="button"
                aria-label="Նվազեցնել քանակը"
                disabled={pending !== null}
                onClick={() => handleQuantityChange(quantity - 1)}
              >
                −
              </button>

              <span aria-live="polite">
                {quantity}
              </span>

              <button
                type="button"
                aria-label="Ավելացնել քանակը"
                disabled={pending !== null}
                onClick={() => handleQuantityChange(quantity + 1)}
              >
                +
              </button>
            </div>
          )}

        </div>

      </div>
    </article>
  )
}
