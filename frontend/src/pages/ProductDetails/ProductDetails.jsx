import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { api, AUTH_CHANGED_EVENT, mediaUrl } from '../../api/client'
import { CART_UPDATED_EVENT, getCart } from '../Cart/cart'
import {
  addProductToCart,
  productExtras,
} from '../../components/ProductCard/productCard'
import zoomIcon from '../../assets/product-details/zoom.svg'
import copyIcon from '../../assets/product-details/copy.svg'
import rulerIcon from '../../assets/product-details/ruler.svg'
import checkIcon from '../../assets/product-details/check.svg'
import heartIcon from '../../assets/product-details/heart.svg'
import heartFilledIcon from '../../assets/product-details/heart-filled.svg'
import shareIcon from '../../assets/product-details/share.svg'
import mailIcon from '../../assets/product-details/mail.svg'
import linkIcon from '../../assets/product-details/link.svg'
import checkLightIcon from '../../assets/product-details/check-light.svg'
import pinIcon from '../../assets/product-details/pin.svg'
import truckIcon from '../../assets/product-details/truck.svg'
import packageIcon from '../../assets/product-details/package.svg'
import leafIcon from '../../assets/product-details/leaf.svg'
import washIcon from '../../assets/product-details/wash.svg'
import messageIcon from '../../assets/product-details/message.svg'
import makerLogo from '../../assets/product-details/maker-logo.png'
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
  const shareRef = useRef(null)
  const copiedTimer = useRef(null)

  const [product, setProduct] = useState(null)
  const [imageIndex, setImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)
  const [pending, setPending] = useState(false)
  const [cartStatus, setCartStatus] = useState('idle')
  const [inCart, setInCart] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const [selectedSize, setSelectedSize] = useState('100')
  const [wished, setWished] = useState(false)
  const [copied, setCopied] = useState('')
  const [shareOpen, setShareOpen] = useState(false)
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
      setInCart(false)
      setJustAdded(false)
      setWished(false)
      setCopied('')
      setShareOpen(false)
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

  useEffect(() => {
    if (!shareOpen) return undefined

    function onPointerDown(event) {
      if (!shareRef.current?.contains(event.target)) setShareOpen(false)
    }

    function onKeyDown(event) {
      if (event.key === 'Escape') setShareOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [shareOpen])

  useEffect(() => () => clearTimeout(copiedTimer.current), [])

  useEffect(() => {
    let ignore = false
    const request = { id: 0 }

    async function syncCart() {
      const id = ++request.id
      try {
        const cart = await getCart()
        if (ignore || id !== request.id) return
        const found = Array.isArray(cart.items) && cart.items.some((item) => item.sku === sku)
        setInCart(found)
        if (!found) setJustAdded(false)
      } catch (error) {
        if (ignore || id !== request.id) return
        if (error.response?.status === 401) {
          setInCart(false)
          setJustAdded(false)
        }
      }
    }

    if (sku) syncCart()
    window.addEventListener(CART_UPDATED_EVENT, syncCart)
    window.addEventListener(AUTH_CHANGED_EVENT, syncCart)
    return () => {
      ignore = true
      window.removeEventListener(CART_UPDATED_EVENT, syncCart)
      window.removeEventListener(AUTH_CHANGED_EVENT, syncCart)
    }
  }, [sku])

  async function purchase() {
    if (pendingRef.current || inCart || !product?.sku) return
    pendingRef.current = true
    setPending(true)
    setCartStatus('idle')
    try {
      await addProductToCart(product.sku)
      setInCart(true)
      setJustAdded(true)
      setCartStatus('added')
    } catch (error) {
      setCartStatus(error.response?.status === 401 ? 'signIn' : 'failed')
    } finally {
      pendingRef.current = false
      setPending(false)
    }
  }

  function markCopied(kind) {
    setCopied(kind)
    clearTimeout(copiedTimer.current)
    copiedTimer.current = setTimeout(() => setCopied(''), 2400)
  }

  async function copyText(value, kind) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value)
        markCopied(kind)
        return
      }
    } catch {
      // Fall through to the older copy path when the clipboard API is blocked.
    }

    const area = document.createElement('textarea')
    area.value = value
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.left = '-9999px'
    document.body.append(area)
    area.select()
    const ok = document.execCommand('copy')
    area.remove()
    if (ok) markCopied(kind)
    else setCopied('')
  }

  function copySku() {
    copyText(product?.sku || '', 'sku')
  }

  function copyLink() {
    copyText(window.location.href, 'link')
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
  const pageUrl = window.location.href
  const mailHref = `mailto:?subject=${encodeURIComponent(product.name || '')}&body=${encodeURIComponent(pageUrl)}`
  const messageHref = `sms:?&body=${encodeURIComponent(`${product.name || ''} ${pageUrl}`)}`
  const toastDetail = [product.name, t('productDetails.colorShort'), selected?.label]
    .filter(Boolean)
    .join(' · ')

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
                <div className="product-details__sku-wrap">
                  <button type="button" className="product-details__sku" onClick={copySku}>
                    <span>
                      {t('productDetails.sku')}: {product.sku}
                    </span>
                    <Icon src={copyIcon} width={14} height={14} />
                    <span className="product-details__sr">{t('productDetails.copySku')}</span>
                  </button>
                  {copied === 'sku' ? (
                    <span className="product-details__copied" role="status">{t('productDetails.copied')}</span>
                  ) : null}
                </div>
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
                className={[
                  'product-details__cart',
                  pending ? 'is-loading' : '',
                  inCart || pending ? 'is-added' : '',
                ].filter(Boolean).join(' ')}
                onClick={purchase}
                disabled={pending || inCart}
                aria-busy={pending || undefined}
              >
                <span className="product-details__bag" aria-hidden="true" />
                <span>
                  {pending
                    ? t('productDetails.adding')
                    : inCart
                      ? t('productDetails.inCart')
                      : t('productDetails.addToCart')}
                </span>
                {price && !inCart ? (
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
                  <Icon src={wished ? heartFilledIcon : heartIcon} width={16} height={16} />
                  {wished ? t('productDetails.wishlisted') : t('productDetails.wishlist')}
                </button>
                <div className="product-details__share" ref={shareRef}>
                  <button
                    type="button"
                    aria-expanded={shareOpen}
                    aria-controls="product-share-panel"
                    onClick={() => setShareOpen((value) => !value)}
                  >
                    <Icon src={shareIcon} width={16} height={16} />
                    {t('productDetails.share')}
                  </button>
                  {shareOpen ? (
                    <div
                      id="product-share-panel"
                      className="product-details__share-panel"
                      role="dialog"
                      aria-label={t('productDetails.share')}
                    >
                      <p>{t('productDetails.share')}</p>
                      <div className="product-details__share-channels">
                        <a href={mailHref}>
                          <span>
                            <Icon src={mailIcon} width={18} height={18} />
                          </span>
                          {t('productDetails.shareEmail')}
                        </a>
                        <a href={messageHref}>
                          <span>
                            <Icon src={messageIcon} width={18} height={18} />
                          </span>
                          {t('productDetails.shareMessage')}
                        </a>
                        <button type="button" onClick={copyLink}>
                          <span>
                            <Icon src={linkIcon} width={18} height={18} />
                          </span>
                          {t('productDetails.shareCopy')}
                        </button>
                      </div>
                      {copied === 'link' ? (
                        <span className="product-details__copied" role="status">{t('productDetails.copied')}</span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
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

      {justAdded ? (
        <div className="product-details__toast" role="status">
          <span className="product-details__toast-icon">
            <Icon src={checkLightIcon} width={16} height={16} />
          </span>
          <div>
            <strong>{t('productDetails.addedToast')}</strong>
            <p>{toastDetail}</p>
          </div>
          <Link to="/cart">{t('productDetails.openCart')}</Link>
        </div>
      ) : null}

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
