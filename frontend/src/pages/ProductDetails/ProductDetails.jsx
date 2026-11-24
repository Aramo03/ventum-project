import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { api, mediaUrl } from '../../api/client'
import {
  addProductToCart,
  formatProductPrice,
  productExtras,
} from '../../components/ProductCard/productCard'
import '../../design/controls.css'

import './productDetails.css'

function storePath(store) {
  return store === 'baby' ? '/baby' : '/textile'
}

function galleryImages(product) {
  const rows = Array.isArray(product?.images) ? [...product.images] : []
  rows.sort((left, right) => (left?.order ?? 0) - (right?.order ?? 0))
  const withUrl = rows.filter((image) => image?.url)
  if (withUrl.length) return withUrl
  if (product?.image) return [{ url: product.image, alt: product.name || '', order: 0 }]
  return []
}

function PurchaseButton({ kind, pending, label, disabled, onClick }) {
  const loading = pending === kind

  return (
    <button
      type="button"
      className={[
        'ds-btn',
        kind === 'cash' ? 'ds-btn--cash' : 'ds-btn--card',
        loading ? 'is-loading' : '',
      ].filter(Boolean).join(' ')}
      disabled={disabled || undefined}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {loading ? <span className="ds-btn__spinner" aria-hidden="true" /> : null}
      <span>{label}</span>
    </button>
  )
}

export default function ProductDetails() {
  const { sku } = useParams()
  const { t } = useTranslation()
  const pendingRef = useRef(null)

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)
  const [pending, setPending] = useState(null)
  const [cartStatus, setCartStatus] = useState('idle')
  const [selectedSize, setSelectedSize] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadProduct() {
      setLoading(true)
      setMissing(false)
      setLoadFailed(false)
      setProduct(null)
      setSelectedImage('')
      setCartStatus('idle')

      try {
        const response = await api.get(
          `/api/catalog/products/${encodeURIComponent(sku)}/`,
        )

        if (cancelled) return

        const data = response.data
        setProduct(data)
        const images = galleryImages(data)
        setSelectedImage(images[0]?.url || '')
      } catch (error) {
        if (cancelled) return
        if (error.response?.status === 404) setMissing(true)
        else setLoadFailed(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (sku) loadProduct()

    return () => {
      cancelled = true
    }
  }, [sku])

  const extras = productExtras(product)
  const sizeKey = extras.sizes.map((item) => item.id).join('|')

  useEffect(() => {
    const preset = extras.sizes.find((item) => item.selected)
    setSelectedSize(preset?.id || extras.sizes[0]?.id || '')
  }, [product, sizeKey])

  async function purchase(kind) {
    if (pendingRef.current || !product?.sku) return
    pendingRef.current = kind
    setPending(kind)
    setCartStatus('idle')

    try {
      await addProductToCart(product.sku)
      setCartStatus('added')
    } catch (error) {
      setCartStatus(error.response?.status === 401 ? 'signIn' : 'failed')
    } finally {
      pendingRef.current = null
      setPending(null)
    }
  }

  const brand = product?.store === 'baby' || product?.store === 'textile'
    ? product.store
    : undefined
  const backTo = storePath(product?.store)
  const returnPath = `/product/${encodeURIComponent(sku || '')}`

  if (loading) {
    return (
      <main className="product-details page">
        <p className="vt-status" role="status">{t('productDetails.loading')}</p>
      </main>
    )
  }

  if (missing) {
    return (
      <main className="product-details page">
        <div className="product-details__message">
          <h1>{t('productDetails.notFound')}</h1>
          <p>{t('productDetails.notFoundText')}</p>
          <Link to="/" className="vt-button">{t('productDetails.home')}</Link>
        </div>
      </main>
    )
  }

  if (loadFailed || !product) {
    return (
      <main className="product-details page">
        <div className="product-details__message">
          <h1>{t('productDetails.loadErrorTitle')}</h1>
          <p>{t('productDetails.loadError')}</p>
          <button
            className="vt-button"
            type="button"
            onClick={() => window.location.reload()}
          >
            {t('productDetails.retry')}
          </button>
        </div>
      </main>
    )
  }

  const images = galleryImages(product)
  const active = images.find((image) => image.url === selectedImage) || images[0]
  const salePrice = formatProductPrice(product.price)
  const storeName = product.store === 'baby'
    ? t('productDetails.storeBaby')
    : t('productDetails.storeTextile')

  return (
    <main className="product-details page" data-brand={brand}>
      <p className="product-details__back">
        <Link to={backTo}>
          {product.store === 'baby'
            ? t('productDetails.backBaby')
            : t('productDetails.backTextile')}
        </Link>
      </p>

      <nav className="product-details__crumbs" aria-label={t('productDetails.breadcrumbs')}>
        <Link to={backTo}>{t('productDetails.home')}</Link>
        {product.category?.name ? (
          <>
            <span aria-hidden="true">/</span>
            <Link to={backTo}>{product.category.name}</Link>
          </>
        ) : null}
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-details__layout">
        <section className="product-details__gallery" aria-label={t('productDetails.gallery')}>
          <div className="product-details__main-image">
            {active?.url ? (
              <img src={mediaUrl(active.url)} alt={active.alt || product.name || ''} />
            ) : (
              <div className="product-details__placeholder">{storeName}</div>
            )}
          </div>

          {images.length > 1 && (
            <div className="product-details__thumbnails">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image.url}-${index}`}
                  className={
                    selectedImage === image.url
                      ? 'product-details__thumbnail is-active'
                      : 'product-details__thumbnail'
                  }
                  onClick={() => setSelectedImage(image.url)}
                  aria-label={t('productDetails.showImage', { index: index + 1 })}
                  aria-pressed={selectedImage === image.url}
                >
                  <img src={mediaUrl(image.url)} alt={image.alt || product.name || ''} />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="product-details__purchase">
          {product.category?.name ? (
            <p className="product-details__category">{product.category.name}</p>
          ) : null}
          <h1>{product.name}</h1>
          <p className="product-details__sku">
            {t('productDetails.sku')}: {product.sku}
          </p>
          {product.description ? (
            <p className="product-details__summary">{product.description}</p>
          ) : null}

          <p className="product-details__prices">
            {extras.oldPrice ? (
              <span className="product-details__old">{extras.oldPrice}</span>
            ) : null}
            {salePrice ? (
              <span className="product-details__price">
                {salePrice} {t('productCard.currency')}
              </span>
            ) : null}
          </p>

          {extras.discount ? (
            <span className="ds-badge ds-badge--discount">{extras.discount}</span>
          ) : null}
          {extras.stock ? (
            <span className="ds-badge ds-badge--stock">{extras.stock}</span>
          ) : null}

          {extras.sizes.length > 0 ? (
            <div className="product-details__sizes" role="group" aria-label={t('productCard.sizes')}>
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

          <div className="product-details__actions">
            <PurchaseButton
              kind="card"
              pending={pending}
              label={t('productCard.card')}
              disabled={pending !== null && pending !== 'card'}
              onClick={() => purchase('card')}
            />
            <PurchaseButton
              kind="cash"
              pending={pending}
              label={t('productCard.cash')}
              disabled={pending !== null && pending !== 'cash'}
              onClick={() => purchase('cash')}
            />
          </div>

          {cartStatus === 'added' && (
            <p className="vt-status vt-status--ok" role="status">{t('productCard.added')}</p>
          )}
          {cartStatus === 'signIn' && (
            <p className="vt-status vt-status--error" role="alert">
              {t('productCard.signIn')}{' '}
              <Link to="/account" state={{ from: returnPath }}>{t('accountLink')}</Link>
            </p>
          )}
          {cartStatus === 'failed' && (
            <p className="vt-status vt-status--error" role="alert">{t('productCard.failed')}</p>
          )}
        </section>
      </div>

      {product.description ? (
        <section className="product-details__about" aria-labelledby="product-about-title">
          <h2 id="product-about-title">{t('productDetails.about')}</h2>
          <div className="product-details__description">{product.description}</div>
        </section>
      ) : null}
    </main>
  )
}
