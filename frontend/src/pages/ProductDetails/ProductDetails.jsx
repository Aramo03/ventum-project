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
      {kind === 'card' && !loading ? (
        <span className="product-details__bag" aria-hidden="true" />
      ) : null}
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
  const [selectedColor, setSelectedColor] = useState('')
  const [attempt, setAttempt] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)
  const [wished, setWished] = useState(false)
  const [skuCopied, setSkuCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadProduct() {
      setLoading(true)
      setMissing(false)
      setLoadFailed(false)
      setProduct(null)
      setSelectedImage('')
      setCartStatus('idle')
      setZoomed(false)
      setGuideOpen(false)
      setWished(false)
      setSkuCopied(false)

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
  }, [sku, attempt])

  const extras = productExtras(product)
  const sizeKey = extras.sizes.map((item) => item.id).join('|')

  useEffect(() => {
    const preset = extras.sizes.find((item) => item.selected)
    setSelectedSize(preset?.id || extras.sizes[0]?.id || '100')
  }, [product, sizeKey])

  const colorKey = extras.colors.map((item) => item.id).join('|')

  useEffect(() => {
    const preset = extras.colors[0]
    setSelectedColor(preset?.id || 'sage')
  }, [product, colorKey])

  useEffect(() => {
    if (!zoomed && !guideOpen) return undefined

    function onKey(event) {
      if (event.key === 'Escape') {
        setZoomed(false)
        setGuideOpen(false)
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomed, guideOpen])

  async function copySku() {
    try {
      await navigator.clipboard.writeText(product?.sku || '')
      setSkuCopied(true)
    } catch {
      setSkuCopied(false)
    }
  }

  async function shareProduct() {
    const payload = { title: product?.name || '', url: window.location.href }
    if (navigator.share) {
      try {
        await navigator.share(payload)
      } catch {
        /* The visitor closed the share sheet. */
      }
      return
    }
    try {
      await navigator.clipboard.writeText(payload.url)
    } catch {
      /* Sharing is unavailable in this browser. */
    }
  }

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
      <main className="product-details page" aria-busy="true">
        <p className="product-details__sr" role="status">{t('productDetails.loading')}</p>
        <div className="product-details__layout">
          <div className="ds-skeleton product-details__skeleton" aria-hidden="true">
            <i className="ds-skeleton__photo" />
          </div>
          <div className="ds-skeleton product-details__skeleton" aria-hidden="true">
            <i className="ds-skeleton__spec" />
            <i className="ds-skeleton__name" />
            <i className="ds-skeleton__price" />
            <span className="ds-skeleton__buttons">
              <i />
              <i />
            </span>
          </div>
        </div>
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
            className="ds-btn ds-btn--card"
            type="button"
            onClick={() => setAttempt((value) => value + 1)}
          >
            {t('productDetails.retry')}
          </button>
        </div>
      </main>
    )
  }

  const images = galleryImages(product)
  const active = images.find((image) => image.url === selectedImage) || images[0]
  const activeIndex = Math.max(0, images.findIndex((image) => image.url === active?.url))
  const salePrice = formatProductPrice(product.price)
  const storeName = product.store === 'baby'
    ? t('productDetails.storeBaby')
    : t('productDetails.storeTextile')

  const priceLabel = salePrice ? `${salePrice} ${t('productDetails.dram')}` : ''
  const sizes = extras.sizes.length > 0 ? extras.sizes : [
    { id: '70', label: t('productDetails.size70') },
    { id: '100', label: t('productDetails.size100') },
    { id: '128', label: t('productDetails.size128') },
  ]
  const colors = extras.colors.length > 0 ? extras.colors : [{
    id: 'sage',
    label: t('productDetails.colorName'),
    hint: t('productDetails.colorHint'),
    swatch: '',
  }]
  const activeColor = colors.find((item) => item.id === selectedColor) || colors[0]
  const chosenSize = sizes.find((item) => item.id === selectedSize) || sizes[0]
  const detailLine = [product.name, activeColor?.label, chosenSize?.label].filter(Boolean).join(' · ')
  const stockLabel = extras.stock || t('productDetails.inStock')

  return (
    <main className="product-details page" data-brand={brand}>
      <nav className="product-details__crumbs" aria-label={t('productDetails.breadcrumbs')}>
        <Link to={backTo}>{t('productDetails.home')}</Link>
        {product.category?.name ? (
          <>
            <span aria-hidden="true">/</span>
            <Link to={backTo}>{product.category.name}</Link>
          </>
        ) : null}
        <span aria-hidden="true">/</span>
        <span className="product-details__crumb-current">{product.name}</span>
      </nav>

      <div className="product-details__layout">
        <section className="product-details__gallery" aria-label={t('productDetails.gallery')}>
          <div className="product-details__main-image">
            {active?.url ? (
              <img
                key={active.url}
                src={mediaUrl(active.url)}
                alt={active.alt || product.name || ''}
              />
            ) : (
              <div className="product-details__placeholder">{storeName}</div>
            )}
            <span className="product-details__promo">{t('productDetails.promo')}</span>
            {images.length > 1 ? (
              <p className="product-details__count">
                {activeIndex + 1} / {images.length}
              </p>
            ) : null}
            {active?.url ? (
              <button
                type="button"
                className="product-details__zoom"
                aria-label={t('productDetails.zoom')}
                onClick={() => setZoomed(true)}
              />
            ) : null}
          </div>

          <div className="product-details__gallery-foot">
            {images.length > 1 ? (
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
            ) : null}
            <p className="product-details__gallery-note">
              <strong>{t('productDetails.galleryNote')}</strong>
              <span>{t('productDetails.galleryNoteText')}</span>
            </p>
          </div>
        </section>

        <section className="product-details__purchase">
          <div className="product-details__intro">
            {product.category?.name ? (
              <p className="product-details__category">{product.category.name}</p>
            ) : <span />}
            <p className="product-details__sku">
              <span>SKU: {product.sku}</span>
              <button
                type="button"
                className="product-details__copy"
                aria-label={skuCopied ? t('productDetails.copied') : t('productDetails.copySku')}
                onClick={copySku}
              />
            </p>
          </div>
          <h1>{product.name}</h1>
          {product.description ? (
            <p className="product-details__summary">{product.description}</p>
          ) : null}

          <div className="product-details__price-row">
            <p className="product-details__prices">
              {salePrice ? (
                <span className="product-details__price">{priceLabel}</span>
              ) : null}
              {extras.oldPrice ? (
                <span className="product-details__old">
                  {extras.oldPrice} {t('productDetails.dram')}
                </span>
              ) : null}
              {extras.discount ? (
                <span className="product-details__discount">{extras.discount}</span>
              ) : null}
            </p>
            <span className="ds-badge ds-badge--stock">{stockLabel}</span>
          </div>

          <div className="product-details__sizes">
            <div className="product-details__field-head">
              <p className="product-details__field-label">{t('productDetails.sizes')}</p>
              <button type="button" className="product-details__guide" onClick={() => setGuideOpen(true)}>
                {t('productDetails.sizeGuide')}
              </button>
            </div>
            <div role="group" aria-label={t('productDetails.sizes')}>
              {sizes.map((size) => (
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
          </div>

          <div className="product-details__colors">
            <p className="product-details__field-label">{t('productDetails.color')}</p>
            <div role="group" aria-label={t('productDetails.color')}>
              {colors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  className={selectedColor === color.id ? 'product-details__swatch is-selected' : 'product-details__swatch'}
                  aria-pressed={selectedColor === color.id}
                  onClick={() => setSelectedColor(color.id)}
                >
                  <i style={color.swatch ? { background: color.swatch } : undefined} />
                  {color.label}
                </button>
              ))}
              {activeColor?.hint ? <span>{activeColor.hint}</span> : null}
            </div>
          </div>

          <div className="product-details__actions">
            <PurchaseButton
              kind="card"
              pending={pending}
              label={priceLabel ? `${t('productDetails.addToCart')} · ${priceLabel}` : t('productDetails.addToCart')}
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

          <div className="product-details__tools">
            <button
              type="button"
              className={wished ? 'product-details__tool is-selected' : 'product-details__tool'}
              aria-pressed={wished}
              onClick={() => setWished((value) => !value)}
            >
              {t('productDetails.wishlist')}
            </button>
            <button type="button" className="product-details__tool" onClick={shareProduct}>
              {t('productDetails.share')}
            </button>
          </div>

          <div className="product-details__delivery">
            <p>
              <strong>{t('productDetails.deliveryCity')}</strong>
              <span>{t('productDetails.deliveryDetail')}</span>
            </p>
            <b>{t('productDetails.deliveryPrice')}</b>
          </div>

          {product.store === 'baby' ? (
            <p className="product-details__reassurance">{t('productDetails.reassurance')}</p>
          ) : null}

          {cartStatus === 'signIn' && (
            <p className="vt-status vt-status--error product-details__note" role="alert">
              {t('productCard.signIn')}{' '}
              <Link to="/account" state={{ from: returnPath }}>{t('accountLink')}</Link>
            </p>
          )}
          {cartStatus === 'failed' && (
            <p className="vt-status vt-status--error product-details__note" role="alert">{t('productCard.failed')}</p>
          )}
        </section>
      </div>

      <section className="product-details__about" aria-labelledby="product-about-title">
        <div className="product-details__about-head">
          <h2 id="product-about-title">{t('productDetails.about')}</h2>
          <p>{t('productDetails.kicker')}</p>
        </div>
        <div className="product-details__story">
          <div>
            <h3 id="product-philosophy-title">{t('productDetails.philosophyTitle')}</h3>
            {product.description ? (
              <div className="product-details__description">{product.description}</div>
            ) : null}
            <p>{t('productDetails.story')}</p>
            <p>{t('productDetails.storyMore')}</p>
          </div>
          <div className="product-details__facts">
            <article>
              <h3>{t('productDetails.materialTitle')}</h3>
              <ul>
                <li>{t('productDetails.material1')}</li>
                <li>{t('productDetails.material2')}</li>
                <li>{t('productDetails.material3')}</li>
                <li>{t('productDetails.material4')}</li>
              </ul>
            </article>
            <article>
              <h3>{t('productDetails.careTitle')}</h3>
              <p>{t('productDetails.careLead')}</p>
              <ul>
                <li>{t('productDetails.care1')}</li>
                <li>{t('productDetails.care2')}</li>
                <li>{t('productDetails.care3')}</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <div className="product-details__care-row">
        <aside className="product-details__maker" aria-labelledby="product-maker-title">
          <h2 id="product-maker-title">{t('productDetails.makerTitle')}</h2>
          <p>{t('productDetails.maker')}</p>
        </aside>
        <aside className="product-details__support">
          <h2>{t('productDetails.supportTitle')}</h2>
          <a href={`mailto:${t('productDetails.supportEmail')}`}>{t('productDetails.supportEmail')}</a>
        </aside>
      </div>

      <div className="product-details__dock">
        <div className="product-details__dock-side">
          {wished ? <p className="product-details__saved">{t('productDetails.saved')}</p> : null}
          <button
            type="button"
            className={wished ? 'product-details__saved-btn is-selected' : 'product-details__saved-btn'}
            aria-pressed={wished}
            onClick={() => setWished((value) => !value)}
          >
            {wished ? t('productDetails.savedShort') : t('productDetails.wishlist')}
          </button>
          <div className="product-details__sharebox" aria-label={t('productDetails.share')}>
            <a href={`mailto:?subject=${encodeURIComponent(product.name)}&body=${encodeURIComponent(window.location.href)}`}>
              {t('productDetails.shareEmail')}
            </a>
            <button type="button" onClick={shareProduct}>{t('productDetails.shareMessage')}</button>
            <button
              type="button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href)
                  setLinkCopied(true)
                } catch {
                  setLinkCopied(false)
                }
              }}
            >
              {linkCopied ? t('productDetails.copied') : t('productDetails.shareLink')}
            </button>
          </div>
        </div>
        <p className="product-details__added" role="status">
          <span>
            <strong>{t('productDetails.addedTitle')}</strong>
            {detailLine}
          </span>
          <Link to="/cart">{t('productDetails.openCart')}</Link>
        </p>
      </div>

      {zoomed && active?.url ? (
        <div className="product-details__dialog" role="dialog" aria-modal="true" aria-label={t('productDetails.zoom')}>
          <button type="button" className="product-details__dialog-close" onClick={() => setZoomed(false)}>
            {t('productDetails.close')}
          </button>
          <img src={mediaUrl(active.url)} alt={active.alt || product.name || ''} />
        </div>
      ) : null}

      {guideOpen ? (
        <div className="product-details__dialog" role="dialog" aria-modal="true" aria-labelledby="size-guide-title">
          <div className="product-details__sheet">
            <h2 id="size-guide-title">{t('productDetails.sizeGuide')}</h2>
            <p>{t('productDetails.sizeGuideText')}</p>
            <ul>
              {sizes.map((size) => <li key={size.id}>{size.label}</li>)}
            </ul>
            <button type="button" className="ds-btn ds-btn--card" onClick={() => setGuideOpen(false)}>
              {t('productDetails.close')}
            </button>
          </div>
        </div>
      ) : null}

    </main>
  )
}
