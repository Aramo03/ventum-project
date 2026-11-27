
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import '../../components/ProductCard/productCard.css'
import { api, mediaUrl } from '../../api/client'

import {
  addProductToCart,
  formatProductPrice,
  productExtras,
} from '../../components/ProductCard/productCard'

import {
  getCart,
  updateCartItem,
  CART_UPDATED_EVENT,
} from '../Cart/cart.js'

import '../../design/controls.css'
import './productDetails.css'

function storePath(store) {
  return store === 'baby' ? '/baby' : '/textile'
}

function galleryImages(product) {
  const rows = Array.isArray(product?.images)
    ? [...product.images]
    : []

  rows.sort(
    (left, right) => (left?.order ?? 0) - (right?.order ?? 0)
  )

  const withUrl = rows.filter((image) => image?.url)

  if (withUrl.length) return withUrl

  if (product?.image) {
    return [{
      url: product.image,
      alt: product.name || '',
      order: 0,
    }]
  }

  return []
}

export default function ProductDetails() {
  const { sku } = useParams()
  const { t } = useTranslation()

  const pendingRef = useRef(false)
  const toastTimer = useRef(null)

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState('')

  const [loading, setLoading] = useState(true)
  const [missing, setMissing] = useState(false)
  const [loadFailed, setLoadFailed] = useState(false)

  const [pending, setPending] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [cartReady, setCartReady] = useState(false)

  const [cartStatus, setCartStatus] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')

  // Load product
  useEffect(() => {
    let cancelled = false

    async function loadProduct() {
      setLoading(true)
      setMissing(false)
      setLoadFailed(false)
      setProduct(null)
      setSelectedImage('')
      setCartStatus(null)
      setQuantity(0)
      setCartReady(false)

      try {
        const response = await api.get(
          `/api/catalog/products/${encodeURIComponent(sku)}/`
        )

        if (cancelled) return

        const data = response.data

        setProduct(data)

        const images = galleryImages(data)

        setSelectedImage(images[0]?.url || '')
      } catch (error) {
        if (cancelled) return

        if (error.response?.status === 404) {
          setMissing(true)
        } else {
          setLoadFailed(true)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    if (sku) {
      loadProduct()
    }

    return () => {
      cancelled = true
    }
  }, [sku])

  // Synchronize quantity with cart
  useEffect(() => {
    if (!product?.sku) return

    let active = true

    async function syncCart() {
      try {
        const data = await getCart()

        if (!active) return

        const items = Array.isArray(data?.items)
          ? data.items
          : []

        const item = items.find(
          (item) =>
            String(item.sku) === String(product.sku)
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

    window.addEventListener(
      CART_UPDATED_EVENT,
      syncCart
    )

    return () => {
      active = false

      window.removeEventListener(
        CART_UPDATED_EVENT,
        syncCart
      )
    }
  }, [product?.sku])

  // Selected size
  const extras = productExtras(product)
  const sizeKey = extras.sizes.map((item) => item.id).join('|')

  useEffect(() => {
    const preset = extras.sizes.find(
      (item) => item.selected
    )

    setSelectedSize(
      preset?.id || extras.sizes[0]?.id || ''
    )
  }, [product, sizeKey])

  // Clear notification timer
  useEffect(() => {
    return () => {
      if (toastTimer.current) {
        clearTimeout(toastTimer.current)
      }
    }
  }, [])

  function showToast(type, message) {
    setCartStatus({ type, message })

    if (toastTimer.current) {
      clearTimeout(toastTimer.current)
    }

    toastTimer.current = setTimeout(() => {
      setCartStatus(null)
    }, 3000)
  }

  // Add product to cart
  async function handleAddToCart() {
    if (
      pendingRef.current ||
      !product?.sku ||
      !cartReady
    ) return

    pendingRef.current = true
    setPending('add')

    try {
      await addProductToCart(product.sku)

      setQuantity((current) => Math.max(current, 1))

      showToast(
        'ok',
        t('productCard.added')
      )
    } catch (error) {
      if (error.response?.status === 401) {
        showToast(
          'error',
          t('productCard.signIn')
        )
      } else {
        showToast(
          'error',
          t('productCard.failed')
        )
      }
    } finally {
      pendingRef.current = false
      setPending(null)
    }
  }

  // Change product quantity
  async function handleQuantityChange(nextQuantity) {
    if (
      pendingRef.current ||
      !product?.sku ||
      nextQuantity < 1 ||
      nextQuantity === quantity
    ) return

    pendingRef.current = true
    setPending('quantity')

    try {
      await updateCartItem(
        product.sku,
        nextQuantity
      )

      setQuantity(nextQuantity)
    } catch {
      showToast(
        'error',
        t('productCard.failed')
      )
    } finally {
      pendingRef.current = false
      setPending(null)
    }
  }

  const brand =
    product?.store === 'baby' ||
    product?.store === 'textile'
      ? product.store
      : undefined

  const backTo = storePath(product?.store)

  const returnPath =
    `/product/${encodeURIComponent(sku || '')}`

  if (loading) {
    return (
      <main className="product-details page">
        <p className="vt-status" role="status">
          {t('productDetails.loading')}
        </p>
      </main>
    )
  }

  if (missing) {
    return (
      <main className="product-details page">
        <div className="product-details__message">
          <h1>{t('productDetails.notFound')}</h1>
          <p>{t('productDetails.notFoundText')}</p>

          <Link to="/" className="vt-button">
            {t('productDetails.home')}
          </Link>
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

  const active =
    images.find(
      (image) => image.url === selectedImage
    ) || images[0]

  const salePrice = formatProductPrice(product.price)

  const storeName =
    product.store === 'baby'
      ? t('productDetails.storeBaby')
      : t('productDetails.storeTextile')

  return (
    <main
      className="product-details page"
      data-brand={brand}
    >

      {/* CART NOTIFICATION */}
      {cartStatus && (
        <div
          className={`product-cart-toast product-cart-toast--${cartStatus.type}`}
          role={cartStatus.type === 'ok' ? 'status' : 'alert'}
        >
          <span className="product-cart-toast__icon">
            {cartStatus.type === 'ok' ? '✓' : '!'}
          </span>

          <span>{cartStatus.message}</span>

          {cartStatus.type === 'error' &&
            cartStatus.message === t('productCard.signIn') && (
              <Link
                to="/account"
                state={{ from: returnPath }}
              >
                {t('accountLink')}
              </Link>
            )}
        </div>
      )}

      <p className="product-details__back">
        <Link to={backTo}>
          {product.store === 'baby'
            ? t('productDetails.backBaby')
            : t('productDetails.backTextile')}
        </Link>
      </p>

      <nav
        className="product-details__crumbs"
        aria-label={t('productDetails.breadcrumbs')}
      >
        <Link to={backTo}>
          {t('productDetails.home')}
        </Link>

        {product.category?.name ? (
          <>
            <span aria-hidden="true">/</span>
            <Link to={backTo}>
              {product.category.name}
            </Link>
          </>
        ) : null}

        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="product-details__layout">

        {/* PRODUCT GALLERY */}
        <section
          className="product-details__gallery"
          aria-label={t('productDetails.gallery')}
        >
          <div className="product-details__main-image">
            {active?.url ? (
              <img
                src={mediaUrl(active.url)}
                alt={active.alt || product.name || ''}
              />
            ) : (
              <div className="product-details__placeholder">
                {storeName}
              </div>
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
                  aria-label={t(
                    'productDetails.showImage',
                    { index: index + 1 }
                  )}
                  aria-pressed={selectedImage === image.url}
                >
                  <img
                    src={mediaUrl(image.url)}
                    alt={image.alt || product.name || ''}
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* PRODUCT INFORMATION */}
        <section className="product-details__purchase">

          {product.category?.name && (
            <p className="product-details__category">
              {product.category.name}
            </p>
          )}

          <h1>{product.name}</h1>

          <p className="product-details__sku">
            {t('productDetails.sku')}: {product.sku}
          </p>

          {product.description && (
            <p className="product-details__summary">
              {product.description}
            </p>
          )}

          <p className="product-details__prices">
            {extras.oldPrice && (
              <span className="product-details__old">
                {extras.oldPrice}
              </span>
            )}

            {salePrice && (
              <span className="product-details__price">
                {salePrice} {t('productCard.currency')}
              </span>
            )}
          </p>

          {extras.discount && (
            <span className="ds-badge ds-badge--discount">
              {extras.discount}
            </span>
          )}

          {extras.stock && (
            <span className="ds-badge ds-badge--stock">
              {extras.stock}
            </span>
          )}

          {/* PRODUCT SIZES */}
          {extras.sizes.length > 0 && (
            <div
              className="product-details__sizes"
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

          {/* ADD TO CART / QUANTITY */}
          <div className="product-details__actions">

            {quantity === 0 ? (
              <button
                type="button"
                className="product-card__add-button"
                disabled={pending !== null || !cartReady}
                onClick={handleAddToCart}
              >
                {pending === 'add' ? (
                  <>
                    <span
                      className="ds-btn__spinner"
                      aria-hidden="true"
                    />
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
                  disabled={
                    pending !== null ||
                    quantity <= 1
                  }
                  onClick={() =>
                    handleQuantityChange(quantity - 1)
                  }
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
                  onClick={() =>
                    handleQuantityChange(quantity + 1)
                  }
                >
                  +
                </button>
              </div>
            )}

          </div>

        </section>
      </div>

      {/* PRODUCT DESCRIPTION */}
      {product.description && (
        <section
          className="product-details__about"
          aria-labelledby="product-about-title"
        >
          <h2 id="product-about-title">
            {t('productDetails.about')}
          </h2>

          <div className="product-details__description">
            {product.description}
          </div>
        </section>
      )}

    </main>
  )
}
