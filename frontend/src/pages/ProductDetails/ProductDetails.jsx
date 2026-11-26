import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { api, mediaUrl } from '../../api/client'
import {
  addProductToCart,
  productExtras,
} from '../../components/ProductCard/productCard'
import zoomIcon from '../../assets/zoom.svg'
import copyIcon from '../../assets/copy.svg'
import rulerIcon from '../../assets/ruler.svg'
import checkIcon from '../../assets/check.svg'
import bagIcon from '../../assets/bag.svg'
import heartIcon from '../../assets/heart.svg'
import shareIcon from '../../assets/share.svg'
import pinIcon from '../../assets/pin.svg'
import truckIcon from '../../assets/truck.svg'
import packageIcon from '../../assets/package.svg'
import leafIcon from '../../assets/leaf.svg'
import washIcon from '../../assets/wash.svg'
import messageIcon from '../../assets/message.svg'
import makerLogo from '../../assets/maker-logo.png'
import {
  FALLBACK_SIZES,
  discountLabel,
  galleryImages,
  moneyLabel,
  storePath,
  STUDIO,
} from './productDetails'

import './productDetails.css'

function Icon({ src, width, height }) {
  return <img className="product-details__icon" src={src} width={width} height={height} alt="" />
}

export default function ProductDetails() {
  const { sku } = useParams()
  const { t } = useTranslation()
  const pendingRef = useRef(false)
  const zoomRef = useRef(null)
  const guideRef = useRef(null)

  const [product, setProduct] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)
  const [pending, setPending] = useState(false)
  const [cartStatus, setCartStatus] = useState('idle')
  const [selectedSize, setSelectedSize] = useState('100')
  const [wished, setWished] = useState(false)
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const [city, setCity] = useState('yerevan')
  const [zoomed, setZoomed] = useState(false)
  const [guideOpen, setGuideOpen] = useState(false)
  const [useStudio, setUseStudio] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadProduct() {
      setLoading(true)
      setMissing(false)
      setLoadFailed(false)
      setProduct(null)
      setImageIndex(0)
      setCartStatus('idle')
      setWished(false)
      setCopied(false)
      setShared(false)
      setUseStudio(false)

      try {
        const response = await api.get(
          `/api/catalog/products/${encodeURIComponent(sku)}/`,
        )
        if (cancelled) return
        setProduct(response.data)
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
    if (!extras.sizes.length) {
      setSelectedSize('100')
      return
    }
    const preset = extras.sizes.find((item) => item.selected)
    setSelectedSize(preset?.id || extras.sizes[0]?.id || '')
  }, [product, sizeKey])

  useEffect(() => {
    const node = zoomRef.current
    if (!node) return
    if (zoomed && !node.open) node.showModal()
    if (!zoomed && node.open) node.close()
  }, [zoomed])

  useEffect(() => {
    const node = guideRef.current
    if (!node) return
    if (guideOpen && !node.open) node.showModal()
    if (!guideOpen && node.open) node.close()
  }, [guideOpen])

  async function purchase() {
    if (pendingRef.current || !product?.sku) return
    pendingRef.current = true
    setPending(true)
    setCartStatus('idle')
    try {
      await addProductToCart(product.sku)
      setCartStatus('added')
    } catch (error) {
      setCartStatus(error.response?.status === 401 ? 'signIn' : 'failed')
    } finally {
      pendingRef.current = false
      setPending(false)
    }
  }

  async function copySku() {
    try {
      await navigator.clipboard.writeText(product?.sku || '')
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  async function shareProduct() {
    const url = window.location.href
    const payload = { title: product?.name || '', url }
    try {
      if (navigator.share) {
        await navigator.share(payload)
        return
      }
      await navigator.clipboard.writeText(url)
      setShared(true)
    } catch (error) {
      if (error?.name === 'AbortError') return
      try {
        await navigator.clipboard.writeText(url)
        setShared(true)
      } catch {
        setShared(false)
      }
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
        <div className="product-details__inner">
          <p className="product-details__loading" role="status">{t('productDetails.loading')}</p>
          <div className="product-details__skeleton" aria-hidden="true" />
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
          <button className="vt-button" type="button" onClick={() => window.location.reload()}>
            {t('productDetails.retry')}
          </button>
        </div>
      </main>
    )
  }

  const catalogImages = galleryImages(product)
  const images = useStudio ? STUDIO : catalogImages
  const activeIndex = Math.min(imageIndex, Math.max(images.length - 1, 0))
  const active = images[activeIndex]
  const photoSrc = active?.url ? mediaUrl(active.url) : ''
  const many = images.length > 1
  const price = moneyLabel(product.price)
  const previous = moneyLabel(product.old_price ?? product.compare_at_price)
  const discount = discountLabel(product, extras)
  const stock = extras.stock || t('productDetails.inStock')
  const sizes = extras.sizes.length
    ? extras.sizes
    : FALLBACK_SIZES.map((item) => ({ ...item, label: t(item.labelKey) }))
  const selected = sizes.find((item) => item.id === selectedSize) || sizes[0]
  const summary = product.description || t('productDetails.summaryFallback')
  const storyTitle = product.store === 'baby'
    ? t('productDetails.storyTitle')
    : t('productDetails.storyTitleTextile')
  const storeName = product.store === 'baby'
    ? t('productDetails.storeBaby')
    : t('productDetails.storeTextile')
  const categoryHref = product.category?.slug
    ? `${backTo}?category=${encodeURIComponent(product.category.slug)}`
    : backTo

  return (
    <main className="product-details page" data-brand={brand}>
      <div className="product-details__inner">
        <nav className="product-details__crumbs" aria-label={t('productDetails.breadcrumbs')}>
          <Link to={backTo}>{t('productDetails.home')}</Link>
          {product.category?.name ? (
            <>
              <span aria-hidden="true">/</span>
              <Link to={categoryHref}>{product.category.name}</Link>
            </>
          ) : null}
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-details__overview">
          <section className="product-details__gallery" aria-label={t('productDetails.gallery')}>
            <div className="product-details__stage">
              {photoSrc ? (
                <img
                  key={photoSrc}
                  className="product-details__photo"
                  src={photoSrc}
                  alt={active?.alt || product.name || ''}
                  onLoad={(event) => {
                    const photo = event.currentTarget
                    if (!useStudio && catalogImages.length < 2 && photo.naturalWidth < 240) {
                      setImageIndex(0)
                      setUseStudio(true)
                    }
                  }}
                />
              ) : (
                <div className="product-details__placeholder">{storeName}</div>
              )}
              <span className="product-details__collection">{t('productDetails.collection')}</span>
              {many ? (
                <span className="product-details__count">
                  {t('productDetails.imageCount', {
                    current: activeIndex + 1,
                    total: images.length,
                  })}
                </span>
              ) : null}
              {photoSrc ? (
                <button
                  type="button"
                  className="product-details__zoom"
                  aria-label={t('productDetails.zoom')}
                  onClick={() => setZoomed(true)}
                >
                  <Icon src={zoomIcon} width={20} height={20} />
                </button>
              ) : null}
            </div>

            {many ? (
              <div className="product-details__thumbs">
                {images.map((image, index) => (
                  <button
                    type="button"
                    key={`${image.thumb}-${index}`}
                    className={
                      index === activeIndex
                        ? 'product-details__thumb is-active'
                        : 'product-details__thumb'
                    }
                    onClick={() => setImageIndex(index)}
                    aria-label={t('productDetails.showImage', { index: index + 1 })}
                    aria-pressed={index === activeIndex}
                  >
                    <img src={mediaUrl(image.thumb)} alt="" />
                  </button>
                ))}
                <p className="product-details__note">
                  <span>{t('productDetails.galleryNote')}</span>
                  <small>{t('productDetails.galleryCaption')}</small>
                </p>
              </div>
            ) : null}
          </section>

          <section className="product-details__purchase">
            <div className="product-details__intro">
              <div className="product-details__meta">
                <p className="product-details__eyebrow">{t('productDetails.collection')}</p>
                <button type="button" className="product-details__sku" onClick={copySku}>
                  <span>
                    {t('productDetails.sku')}: {product.sku}
                  </span>
                  <Icon src={copyIcon} width={14} height={14} />
                  <span className="product-details__sr">
                    {copied ? t('productDetails.copied') : t('productDetails.copySku')}
                  </span>
                </button>
              </div>
              <h1>{product.name}</h1>
              <p className="product-details__summary">{summary}</p>
            </div>

            <div className="product-details__price-row">
              <p className="product-details__prices">
                {price ? (
                  <span className="product-details__price">
                    {price} {t('productDetails.dram')}
                  </span>
                ) : null}
                {previous ? (
                  <span className="product-details__old">
                    {previous} {t('productDetails.dram')}
                  </span>
                ) : null}
                {discount ? <span className="product-details__discount">{discount}</span> : null}
              </p>
              {stock ? <span className="product-details__stock">{stock}</span> : null}
            </div>

            <hr className="product-details__rule" />

            <div className="product-details__options">
              <div>
                <div className="product-details__option-head">
                  <h2>{t('productDetails.size')}</h2>
                  <button type="button" className="product-details__guide" onClick={() => setGuideOpen(true)}>
                    <Icon src={rulerIcon} width={14} height={14} />
                    {t('productDetails.sizeGuide')}
                  </button>
                </div>
                <div className="product-details__sizes" role="group" aria-label={t('productDetails.size')}>
                  {sizes.map((size) => (
                    <button
                      key={size.id}
                      type="button"
                      className={selectedSize === size.id ? 'is-selected' : undefined}
                      aria-pressed={selectedSize === size.id}
                      onClick={() => setSelectedSize(size.id)}
                    >
                      {size.label}
                      {selectedSize === size.id ? <Icon src={checkIcon} width={14} height={14} /> : null}
                    </button>
                  ))}
                </div>
              </div>

              <div className="product-details__color">
                <h2>{t('productDetails.color')}</h2>
                <button type="button" className="product-details__swatch" aria-pressed="true">
                  <span className="product-details__dot" aria-hidden="true" />
                  {t('productDetails.colorName')}
                  <Icon src={checkIcon} width={14} height={14} />
                </button>
                <p>{t('productDetails.colorNote')}</p>
              </div>
            </div>

            <div className="product-details__buy">
              <button
                type="button"
                className={pending ? 'product-details__cart is-loading' : 'product-details__cart'}
                onClick={purchase}
                disabled={pending}
                aria-busy={pending || undefined}
              >
                <Icon src={bagIcon} width={18} height={18} />
                <span>{pending ? t('productDetails.adding') : t('productDetails.addToCart')}</span>
                {price ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      {price} {t('productDetails.dram')}
                    </span>
                  </>
                ) : null}
              </button>
              <div className="product-details__secondary">
                <button
                  type="button"
                  className={wished ? 'is-on' : undefined}
                  aria-pressed={wished}
                  onClick={() => setWished((value) => !value)}
                >
                  <Icon src={heartIcon} width={16} height={16} />
                  {wished ? t('productDetails.wishlisted') : t('productDetails.wishlist')}
                </button>
                <button type="button" onClick={shareProduct}>
                  <Icon src={shareIcon} width={16} height={16} />
                  {shared ? t('productDetails.shared') : t('productDetails.share')}
                </button>
              </div>
            </div>

            <div className="product-details__delivery">
              <div>
                <Icon src={pinIcon} width={16} height={16} />
                <p>
                  {city === 'yerevan'
                    ? t('productDetails.deliveryCity')
                    : t('productDetails.deliveryRegions')}
                </p>
                <button type="button" onClick={() => setCity((value) => (value === 'yerevan' ? 'regions' : 'yerevan'))}>
                  {t('productDetails.changeCity')}
                </button>
              </div>
              <div>
                <Icon src={truckIcon} width={16} height={16} />
                <p>{t('productDetails.deliveryTime')}</p>
                <strong>{t('productDetails.deliveryFee')}</strong>
              </div>
            </div>

            {product.store === 'baby' ? (
              <p className="product-details__reassure">
                <Icon src={packageIcon} width={14} height={14} />
                <span>{t('productDetails.reassurance')}</span>
              </p>
            ) : null}

            {cartStatus === 'added' && (
              <p className="product-details__status product-details__status--ok" role="status">
                {t('productCard.added')}
              </p>
            )}
            {cartStatus === 'signIn' && (
              <p className="product-details__status product-details__status--error" role="alert">
                {t('productCard.signIn')}{' '}
                <Link to="/account" state={{ from: returnPath }}>{t('accountLink')}</Link>
              </p>
            )}
            {cartStatus === 'failed' && (
              <p className="product-details__status product-details__status--error" role="alert">
                {t('productCard.failed')}
              </p>
            )}
            {copied ? <p className="product-details__sr" role="status">{t('productDetails.copied')}</p> : null}
          </section>
        </div>

        <section className="product-details__about" aria-labelledby="product-about-title">
          <div className="product-details__about-head">
            <h2 id="product-about-title">{t('productDetails.about')}</h2>
            <p>{t('productDetails.philosophy')}</p>
          </div>
          <div className="product-details__about-grid">
            <div className="product-details__story">
              <h3>{storyTitle}</h3>
              {product.description && product.description.length > 180 ? (
                <p>{product.description}</p>
              ) : (
                <>
                  {product.description ? <p>{product.description}</p> : null}
                  <p>{t('productDetails.storyA')}</p>
                  <p>{t('productDetails.storyB')}</p>
                </>
              )}
            </div>
            <article className="product-details__detail">
              <h3>
                <Icon src={leafIcon} width={21} height={21} />
                {t('productDetails.materialsTitle')}
              </h3>
              <p className="product-details__highlight">{t('productDetails.materialsHighlight')}</p>
              <p>{t('productDetails.materialsBody')}</p>
              <p>
                {t('productDetails.materialsMeta', {
                  color: t('productDetails.colorName'),
                  size: selected?.label || '',
                })}
              </p>
              <p>{t('productDetails.materialsEveryday')}</p>
            </article>
            <article className="product-details__detail">
              <h3>
                <Icon src={washIcon} width={21} height={21} />
                {t('productDetails.careTitle')}
              </h3>
              <p className="product-details__highlight">{t('productDetails.careHighlight')}</p>
              <p>{t('productDetails.care1')}</p>
              <p>{t('productDetails.care2')}</p>
              <p>{t('productDetails.care3')}</p>
              <p>{t('productDetails.care4')}</p>
            </article>
          </div>
          <div className="product-details__maker">
            <div>
              <img src={makerLogo} width={68} height={51} alt="" />
              <div>
                <strong>{t('productDetails.makerTitle')}</strong>
                <p>{t('productDetails.makerText')}</p>
              </div>
            </div>
            <a href={`mailto:${t('productDetails.helpEmail')}`}>
              <Icon src={messageIcon} width={20} height={20} />
              <span>
                <strong>{t('productDetails.helpTitle')}</strong>
                <small>{t('productDetails.helpEmail')}</small>
              </span>
            </a>
          </div>
        </section>
      </div>

      <dialog
        ref={zoomRef}
        className="product-details__dialog"
        onClose={() => setZoomed(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setZoomed(false)
        }}
      >
        <button type="button" onClick={() => setZoomed(false)}>{t('productDetails.close')}</button>
        {photoSrc ? <img src={photoSrc} alt={active?.alt || product.name || ''} /> : null}
      </dialog>

      <dialog
        ref={guideRef}
        className="product-details__dialog product-details__dialog--text"
        onClose={() => setGuideOpen(false)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setGuideOpen(false)
        }}
      >
        <h2>{t('productDetails.sizeGuideTitle')}</h2>
        <p>{t('productDetails.sizeGuideText')}</p>
        <button type="button" onClick={() => setGuideOpen(false)}>{t('productDetails.close')}</button>
      </dialog>
    </main>
  )
}
