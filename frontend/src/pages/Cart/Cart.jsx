
import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { mediaUrl } from '../../api/client.js'
import {
  checkout as startCheckout,
  deleteCartItem,
  fetchCartItemImage,
  getCart,
  submitPaymentForm,
  updateCartItem,
} from './cart.js'

import '../../design/controls.css'
import './cart.css'

const TOKEN_KEY = 'ventum_access_token'

const EMPTY_CART = {
  items: [],
  count: 0,
  total: '0.00',
}

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  apartment: '',
  postalCode: '',
}

export default function Cart() {
  const { t } = useTranslation()
  const location = useLocation()

  const [cart, setCart] = useState(EMPTY_CART)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingSku, setUpdatingSku] = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [images, setImages] = useState({})

  const [form, setForm] = useState(INITIAL_FORM)
  const [delivery, setDelivery] = useState('standard')
  const [payment, setPayment] = useState('online')
  const [acceptedTerms, setAcceptedTerms] = useState(false)

  const isAuthenticated = Boolean(
    localStorage.getItem(TOKEN_KEY)
  )

  const paymentReturn =
    new URLSearchParams(location.search).get('success') === '1'

  const loadCart = useCallback(async () => {
    if (!localStorage.getItem(TOKEN_KEY)) {
      setCart(EMPTY_CART)
      setLoading(false)
      return
    }

    try {
      setError('')

      const data = await getCart()

      setCart({
        items: Array.isArray(data?.items) ? data.items : [],
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

  useEffect(() => {
    let active = true

    const skus = cart.items
      .map((item) => item.sku)
      .filter(Boolean)

    skus.forEach((sku) => {
      fetchCartItemImage(sku)
        .then((image) => {
          if (active) {
            setImages((current) => ({
              ...current,
              [sku]: image || '',
            }))
          }
        })
        .catch(() => {
          if (active) {
            setImages((current) => ({
              ...current,
              [sku]: '',
            }))
          }
        })
    })

    return () => {
      active = false
    }
  }, [cart.items])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const updateQuantity = async (sku, qty) => {
    if (!Number.isInteger(qty) || qty < 1) return

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

  const handleCheckout = async (event) => {
    event.preventDefault()

    if (!acceptedTerms) return

    try {
      setCheckoutLoading(true)
      setError('')

      const data = await startCheckout()

      const paymentUrl = data?.payment_url
      const fields = data?.fields

      if (
        typeof paymentUrl !== 'string' ||
        !paymentUrl.trim()
      ) {
        throw new Error('Missing payment URL')
      }

      const resolvedUrl = new URL(paymentUrl)

      if (
        !['http:', 'https:'].includes(resolvedUrl.protocol)
      ) {
        throw new Error('Invalid payment URL')
      }

      submitPaymentForm(resolvedUrl.href, fields)
    } catch {
      setError(t('cartPage.checkoutError'))
      setCheckoutLoading(false)
    }
  }

  const firstItem = cart.items[0]
  const firstImage = firstItem
    ? images[firstItem.sku]
    : ''

  return (
    <main className="cart-page">
      <header className="cart-page__header">
        <div className="cart-page__breadcrumbs">
          <Link to="/">Գլխավոր</Link>
          <span>/</span>
          <Link to="/cart">Զամբյուղ</Link>
          <span>/</span>
          <span>Ձևակերպում</span>
        </div>

        <h1>Ավարտել պատվերի ձևակերպումը</h1>

        <p>
          Լրացրեք տվյալները՝ ձեր պատվերն ավարտելու համար։
        </p>

        <div className="checkout-steps">
          <span className="checkout-steps__item">
            <span>✓</span>
            Զամբյուղ
          </span>

          <span className="checkout-steps__line" />

          <span className="checkout-steps__item checkout-steps__item--active">
            <span>2</span>
            Ձևակերպում
          </span>

          <span className="checkout-steps__line" />

          <span className="checkout-steps__item">
            <span>3</span>
            Ավարտում
          </span>
        </div>
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

          <Link
            className="vt-button"
            to="/account"
            state={{ from: '/cart' }}
          >
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
        <p
          className="vt-status vt-status--error"
          role="alert"
        >
          {error}
        </p>
      )}

      {isAuthenticated &&
        !loading &&
        cart.items.length === 0 && (
          <section className="vt-status cart-empty">
            <h2>{t('cartPage.emptyTitle')}</h2>
            <p>{t('cartPage.emptyMessage')}</p>

            <Link className="vt-button" to="/shop">
              Շարունակել գնումները
            </Link>
          </section>
        )}

      {isAuthenticated &&
        !loading &&
        cart.items.length > 0 && (
          <form
            className="checkout-layout"
            onSubmit={handleCheckout}
          >
            {/* LEFT: PRODUCT */}
            <aside className="checkout-product">
              <div className="checkout-product__top">
                <span>Ապրանքի նկարագրություն</span>

                <button
                  type="button"
                  className="checkout-favorite"
                  aria-label="Ավելացնել ընտրյալներում"
                >
                  ♡
                </button>
              </div>

              {firstItem && (
                <div className="checkout-product__content">
                  <div className="checkout-product__image">
                    {firstImage ? (
                      <img
                        src={mediaUrl(firstImage)}
                        alt={firstItem.name || firstItem.sku}
                      />
                    ) : (
                      <span>
                        {firstItem.name || firstItem.sku}
                      </span>
                    )}
                  </div>

                  <h2>
                    {firstItem.name || firstItem.sku}
                  </h2>

                  <p className="checkout-product__description">
                    {firstItem.store || 'Ventum Baby'}
                  </p>

                  <div className="checkout-product__tags">
                    <span>100% որակ</span>
                    <span>Ապահով գնում</span>
                  </div>

                  <div className="checkout-product__price">
                    <strong>
                      {firstItem.price ?? cart.total}{' '}
                      {t('checkout.currency')}
                    </strong>
                  </div>
                </div>
              )}

              <div className="checkout-product__list">
                {cart.items.map((item) => {
                  const sku = item.sku
                  const quantity = Number(item.qty ?? 1)

                  return (
                    <div
                      className="checkout-product__row"
                      key={sku}
                    >
                      <div>
                        <strong>
                          {item.name || sku}
                        </strong>

                        <span>
                          {item.price}{' '}
                          {t('checkout.currency')}
                        </span>
                      </div>

                      <div className="checkout-quantity">
                        <button
                          type="button"
                          aria-label={t('cartPage.decreaseQuantity')}
                          disabled={
                            updatingSku === sku ||
                            quantity <= 1
                          }
                          onClick={() =>
                            updateQuantity(sku, quantity - 1)
                          }
                        >
                          −
                        </button>

                        <span>{quantity}</span>

                        <button
                          type="button"
                          aria-label={t('cartPage.increaseQuantity')}
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
                        className="checkout-remove"
                        disabled={updatingSku === sku}
                        onClick={() => removeItem(sku)}
                      >
                        Հեռացնել
                      </button>
                    </div>
                  )
                })}
              </div>
            </aside>

            {/* CENTER: CHECKOUT FORM */}
            <section className="checkout-form">
              {/* Personal information */}
              <div className="checkout-section">
                <div className="checkout-section__heading">
                  <span className="checkout-section__number">
                    01
                  </span>

                  <div>
                    <h2>Կոնտակտային տվյալներ</h2>
                    <p>
                      Լրացրեք ձեր անձնական տվյալները։
                    </p>
                  </div>
                </div>

                <div className="checkout-fields">
                  <label>
                    Անուն
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Անուն"
                      required
                    />
                  </label>

                  <label>
                    Ազգանուն
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Ազգանուն"
                      required
                    />
                  </label>

                  <label>
                    Հեռախոսահամար
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+374 00 000 000"
                      required
                    />
                  </label>

                  <label>
                    Էլ․ հասցե
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      required
                    />
                  </label>
                </div>
              </div>

              {/* Delivery */}
              <div className="checkout-section">
                <div className="checkout-section__heading">
                  <span className="checkout-section__number">
                    02
                  </span>

                  <div>
                    <h2>Առաքման հասցե</h2>
                    <p>
                      Ընտրեք առաքման եղանակը և լրացրեք հասցեն։
                    </p>
                  </div>
                </div>

                <div className="checkout-options">
                  <label
                    className={`checkout-option ${
                      delivery === 'standard'
                        ? 'checkout-option--active'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="standard"
                      checked={delivery === 'standard'}
                      onChange={(event) =>
                        setDelivery(event.target.value)
                      }
                    />

                    <span className="checkout-option__icon">
                      ♧
                    </span>

                    <span>
                      <strong>Ստանդարտ առաքում</strong>
                      <small>
                        3–5 աշխատանքային օր
                      </small>
                    </span>
                  </label>

                  <label
                    className={`checkout-option ${
                      delivery === 'express'
                        ? 'checkout-option--active'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="express"
                      checked={delivery === 'express'}
                      onChange={(event) =>
                        setDelivery(event.target.value)
                      }
                    />

                    <span className="checkout-option__icon">
                      ♧
                    </span>

                    <span>
                      <strong>Արագ առաքում</strong>
                      <small>
                        Առաքում՝ 24 ժամում
                      </small>
                    </span>
                  </label>
                </div>

                <div className="checkout-fields">
                  <label className="checkout-fields__full">
                    Փողոց, շենք, բնակարան
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Փողոցի անուն, շենք և այլն"
                      required
                    />
                  </label>

                  <label>
                    Քաղաք
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Երևան"
                      required
                    />
                  </label>

                  <label>
                    Փոստային ինդեքս
                    <input
                      name="postalCode"
                      value={form.postalCode}
                      onChange={handleChange}
                      placeholder="0001"
                    />
                  </label>

                  <label className="checkout-fields__full">
                    Բնակարանի լրացուցիչ տվյալներ
                    <input
                      name="apartment"
                      value={form.apartment}
                      onChange={handleChange}
                      placeholder="Մուտք, հարկ, բնակարան"
                    />
                  </label>
                </div>
              </div>

              {/* Payment */}
              <div className="checkout-section">
                <div className="checkout-section__heading">
                  <span className="checkout-section__number">
                    03
                  </span>

                  <div>
                    <h2>Վճարման եղանակ</h2>
                    <p>
                      Ընտրեք ձեզ հարմար վճարման տարբերակը։
                    </p>
                  </div>
                </div>

                <div className="checkout-options">
                  <label
                    className={`checkout-option ${
                      payment === 'online'
                        ? 'checkout-option--active'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={payment === 'online'}
                      onChange={(event) =>
                        setPayment(event.target.value)
                      }
                    />

                    <span className="checkout-option__icon">
                      ▣
                    </span>

                    <span>
                      <strong>Առցանց վճարում</strong>
                      <small>
                        Վճարում քարտով
                      </small>
                    </span>
                  </label>

                  <label
                    className={`checkout-option ${
                      payment === 'card'
                        ? 'checkout-option--active'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={payment === 'card'}
                      onChange={(event) =>
                        setPayment(event.target.value)
                      }
                    />

                    <span className="checkout-option__icon">
                      ▣
                    </span>

                    <span>
                      <strong>Բանկային քարտ</strong>
                      <small>
                        Visa կամ Mastercard
                      </small>
                    </span>
                  </label>
                </div>

                <div className="checkout-payment-logos">
                  <span className="ds-pay ds-pay--visa">
                    VISA
                  </span>

                  <span className="ds-pay ds-pay--mastercard">
                    Mastercard
                  </span>
                </div>
              </div>
            </section>

            {/* RIGHT: SUMMARY */}
            <aside className="checkout-summary">
              <div className="checkout-summary__heading">
                <h2>Ձեր պատվերը</h2>
                <span>{cart.count} ապրանք</span>
              </div>

              <div className="checkout-summary__items">
                {cart.items.map((item) => (
                  <div
                    className="checkout-summary__item"
                    key={item.sku}
                  >
                    <div className="checkout-summary__image">
                      {images[item.sku] ? (
                        <img
                          src={mediaUrl(images[item.sku])}
                          alt={item.name || item.sku}
                        />
                      ) : (
                        <span>♡</span>
                      )}
                    </div>

                    <div>
                      <strong>
                        {item.name || item.sku}
                      </strong>

                      <small>
                        Քանակ՝ {item.qty ?? 1}
                      </small>
                    </div>

                    <span>
                      {item.line_total ?? item.price}{' '}
                      {t('checkout.currency')}
                    </span>
                  </div>
                ))}
              </div>

              <div className="checkout-summary__line">
                <span>Ապրանքների արժեքը</span>
                <strong>
                  {cart.total} {t('checkout.currency')}
                </strong>
              </div>

              <div className="checkout-summary__line">
                <span>Առաքում</span>
                <strong>
                  {delivery === 'standard'
                    ? 'Անվճար'
                    : 'Հաշվարկվում է'}
                </strong>
              </div>

              <div className="checkout-summary__total">
                <span>Ընդհանուր</span>
                <strong>
                  {cart.total} {t('checkout.currency')}
                </strong>
              </div>

              <label className="checkout-consent">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(event) =>
                    setAcceptedTerms(event.target.checked)
                  }
                  required
                />

                <span>
                  Համաձայն եմ պատվերի պայմաններին և
                  գաղտնիության քաղաքականությանը։
                </span>
              </label>

              <button
                type="submit"
                className="checkout-submit"
                disabled={
                  checkoutLoading ||
                  cart.items.length === 0
                }
              >
                {checkoutLoading
                  ? t('cartPage.processing')
                  : 'Հաստատել պատվերը'}

                <span>→</span>
              </button>

              <p className="checkout-summary__secure">
                🔒 Անվտանգ վճարում և պաշտպանված տվյալներ
              </p>
            </aside>
          </form>
        )}
    </main>
  )
}
