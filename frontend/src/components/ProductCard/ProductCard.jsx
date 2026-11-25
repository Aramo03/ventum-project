import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  addProductToCart,
  formatProductPrice,
  productExtras,
  productImageSrc,
} from './productCard'
import '../../design/controls.css'
import './productCard.css'

function PurchaseButton({ kind, pending, label, disabled, onClick }) {
  const loading = pending === kind

  return (
    <button
      type="button"
      className={[
        'ds-btn',
        kind === 'cash' ? 'ds-btn--cash' : 'ds-btn--card',
        loading ? 'is-loading' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={disabled || undefined}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {loading ? <span className="ds-btn__spinner" aria-hidden="true" /> : null}
      <span>{label}</span>
    </button>
  )
}

export default function ProductCard({ product, brand }) {
  const { t } = useTranslation()
  const pendingRef = useRef(null)
  const [pending, setPending] = useState(null)
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
  const shop = brand === 'baby' || brand === 'textile' ? brand : undefined
  const locked = !product?.sku
  const detailsPath = product?.sku
    ? `/product/${encodeURIComponent(product.sku)}`
    : ''

  async function purchase(kind) {
    if (pendingRef.current || locked) return
    pendingRef.current = kind
    setPending(kind)
    setNote(null)

    try {
      await addProductToCart(product.sku)
      setNote({ type: 'ok', key: 'productCard.added' })
    } catch (error) {
      const key = error.response?.status === 401
        ? 'productCard.signIn'
        : 'productCard.failed'
      setNote({ type: 'error', key })
    } finally {
      pendingRef.current = null
      setPending(null)
    }
  }

  return (
    <article className="product-card" data-brand={shop}>
      <div className="product-card__media">
        {detailsPath ? (
          <Link className="product-card__media-link" to={detailsPath}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt={product?.name || ''}
                className="product-card__image"
              />
            ) : (
              <div className="product-card__placeholder" aria-hidden="true" />
            )}
          </Link>
        ) : imageSrc ? (
          <img
            src={imageSrc}
            alt={product?.name || ''}
            className="product-card__image"
          />
        ) : (
          <div className="product-card__placeholder" aria-hidden="true" />
        )}
        {extras.discount ? (
          <span className="ds-badge ds-badge--discount product-card__discount">
            {extras.discount}
          </span>
        ) : null}
        {extras.stock ? (
          <span className="ds-badge ds-badge--stock product-card__stock">
            {extras.stock}
          </span>
        ) : null}
      </div>

      <div className="product-card__body">
        <h2 className="product-card__name">
          {detailsPath ? (
            <Link className="product-card__name-link" to={detailsPath}>
              {product?.name}
            </Link>
          ) : (
            product?.name
          )}
        </h2>
        {extras.spec ? <p className="product-card__spec">{extras.spec}</p> : null}

        {extras.sizes.length > 0 ? (
          <div className="product-card__sizes" role="group" aria-label={t('productCard.sizes')}>
            {extras.sizes.map((size) => (
              <button
                key={size.id}
                type="button"
                className={selectedSize === size.id ? 'ds-size is-selected' : 'ds-size'}
                aria-pressed={selectedSize === size.id}
                onClick={() => setSelectedSize(size.id)}
              >
                {size.label}
              </button>
            ))}
          </div>
        ) : null}

        <p className="product-card__prices">
          {extras.oldPrice ? (
            <span className="product-card__old">{extras.oldPrice}</span>
          ) : null}
          {salePrice ? (
            <span className="product-card__price">
              {salePrice} {t('productCard.currency')}
            </span>
          ) : null}
        </p>

        <div className="product-card__marks" aria-label={`${t('productCard.visa')} ${t('productCard.mastercard')}`}>
          <span className="ds-pay ds-pay--visa">{t('productCard.visa')}</span>
          <span className="ds-pay ds-pay--mastercard">
            <span className="ds-pay__circles" aria-hidden="true">
              <span />
              <span />
            </span>
            {t('productCard.mastercard')}
          </span>
        </div>

        <div className="product-card__actions">
          <PurchaseButton
            kind="card"
            pending={pending}
            label={t('productCard.card')}
            disabled={locked || (pending !== null && pending !== 'card')}
            onClick={() => purchase('card')}
          />
          <PurchaseButton
            kind="cash"
            pending={pending}
            label={t('productCard.cash')}
            disabled={locked || (pending !== null && pending !== 'cash')}
            onClick={() => purchase('cash')}
          />
        </div>

        {note ? (
          <p
            className={
              note.type === 'ok'
                ? 'vt-status vt-status--ok product-card__note'
                : 'vt-status vt-status--error product-card__note'
            }
            role={note.type === 'ok' ? 'status' : 'alert'}
          >
            {t(note.key)}
          </p>
        ) : null}
      </div>
    </article>
  )
}
