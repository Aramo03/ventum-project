
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
  city: 'Երևան',
  address: '',
  apartmentPhone: '',
  postalCode: '',
}

const INITIAL_CARD = {
  number: '',
  expiry: '',
  cvc: '',
  name: '',
}

const STORE = {
  name: 'Ventum',
  address: 'Աբովյան, Երևան',
  ready: 'Պատրաստ է 24 ժամում',
  phone: '+374 10 55 44 33',
  phoneHref: 'tel:+37410554433',
}

const DELIVERY_FEE = 3000

function TruckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 7h11v8H3V7zm12 2h2.4L20 12.2V15h-5V9zM6.5 19a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm9.2 0a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6z"
      />
    </svg>
  )
}

function StoreIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 9.5 5.2 5h13.6L20 9.5c0 1.4-1.1 2.5-2.5 2.5-.6 0-1.2-.2-1.6-.6-.4.4-1 .6-1.6.6s-1.2-.2-1.6-.6c-.4.4-1 .6-1.6.6s-1.2-.2-1.6-.6c-.4.4-1 .6-1.6.6A2.5 2.5 0 0 1 4 9.5zM6 13h12v6H6v-6zm2 2v2h3v-2H8z"
      />
    </svg>
  )
}

function CashIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 7h18v10H3V7zm2 2v6h14V9H5zm7 4.2A2.2 2.2 0 1 1 12 8.8a2.2 2.2 0 0 1 0 4.4z"
      />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 6h18v12H3V6zm2 3v2h14V9H5zm0 4v3h6v-3H5z"
      />
    </svg>
  )
}

function cardProblem(card) {
  const number = card.number.replace(/\s/g, '')
  if (!/^\d{16}$/.test(number)) {
    return 'Մուտքագրեք քարտի 16 նիշանոց համարը։'
  }

  const match = /^(\d{2})\/(\d{2})$/.exec(card.expiry)
  if (!match) {
    return 'Մուտքագրեք վավերականության ժամկետը՝ ԱԱ/ՏՏ։'
  }

  const month = Number(match[1])
  const year = 2000 + Number(match[2])
  const now = new Date()
  const expired =
    month < 1 ||
    month > 12 ||
    year < now.getFullYear() ||
    (year === now.getFullYear() && month < now.getMonth() + 1)

  if (expired) {
    return 'Քարտի ժամկետն անցել է։'
  }

  if (!/^\d{3}$/.test(card.cvc)) {
    return 'Մուտքագրեք CVV կոդի 3 նիշը։'
  }

  if (card.name.trim().length < 2) {
    return 'Մուտքագրեք քարտապանի անունը։'
  }

  return ''
}

export default function Cart() {
  const { t, i18n } = useTranslation()
  const location = useLocation()

  const [cart, setCart] = useState(EMPTY_CART)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingSku, setUpdatingSku] = useState(null)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [images, setImages] = useState({})

  const [form, setForm] = useState(INITIAL_FORM)
  const [card, setCard] = useState(INITIAL_CARD)
  const [delivery, setDelivery] = useState('yerevan')
  const [payment, setPayment] = useState('cash')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [orderNotice, setOrderNotice] = useState('')

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

  const handleCardChange = (event) => {
    const { name, value } = event.target

    if (name === 'number') {
      const digits = value.replace(/\D/g, '').slice(0, 16)
      const grouped = digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
      setCard((current) => ({ ...current, number: grouped }))
      return
    }

    if (name === 'expiry') {
      const digits = value.replace(/\D/g, '').slice(0, 4)
      const expiry =
        digits.length > 2
          ? `${digits.slice(0, 2)}/${digits.slice(2)}`
          : digits
      setCard((current) => ({ ...current, expiry }))
      return
    }

    if (name === 'cvc') {
      setCard((current) => ({
        ...current,
        cvc: value.replace(/\D/g, '').slice(0, 3),
      }))
      return
    }

    setCard((current) => ({ ...current, name: value }))
  }

  const handleCheckout = async (event) => {
    event.preventDefault()

    if (!acceptedTerms) return

    const payByCard = delivery === 'yerevan' && payment === 'card'

    if (payByCard) {
      const problem = cardProblem(card)
      if (problem) {
        setError(problem)
        return
      }
    }

    try {
      setCheckoutLoading(true)
      setError('')

      const code = (i18n.language || 'am').split('-')[0]
      const language = code === 'hy' ? 'am' : code
      const data = await startCheckout({
        payment: payByCard ? 'card' : 'cash',
        fulfillment: delivery === 'pickup' ? 'pickup' : 'yerevan',
        ...(language === 'am' || language === 'en' || language === 'ru'
          ? { language }
          : {}),
      })

      if (!payByCard) {
        setOrderNotice(form.phone.trim())
        setCart(EMPTY_CART)
        setCheckoutLoading(false)
        return
      }

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

  const goodsTotal = Number(cart.total)
  const deliveryFee = delivery === 'yerevan' ? DELIVERY_FEE : 0
  const payable = (
    (Number.isFinite(goodsTotal) ? goodsTotal : 0) + deliveryFee
  ).toFixed(2)
  const payByCard = delivery === 'yerevan' && payment === 'card'
  const confirmationPhone = form.phone.trim()

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

      {orderNotice && (
        <section className="vt-status" role="status">
          <h2>Պատվերը հաստատված է</h2>
          <p>
            Կզանգահարենք {orderNotice || STORE.phone} համարին՝
            պատվերը հաստատելու համար։
          </p>
        </section>
      )}

      {isAuthenticated &&
        !loading &&
        cart.items.length === 0 &&
        !orderNotice && (
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
                    <h2>Ինչպես ստանալ պատվերը</h2>
                    <p>
                      Ընտրեք պատվերը ստանալու հարմար տարբերակը։
                    </p>
                  </div>
                </div>

                <div className="checkout-options">
                  <label
                    className={`checkout-option ${
                      delivery === 'yerevan'
                        ? 'checkout-option--active'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="yerevan"
                      checked={delivery === 'yerevan'}
                      onChange={() => setDelivery('yerevan')}
                    />

                    <span className="checkout-option__icon">
                      <TruckIcon />
                    </span>

                    <span>
                      <strong>Առաքում Երևանում</strong>
                      <small>
                        3,000 ֏ · 2-3 աշխատանքային օր
                      </small>
                    </span>
                  </label>

                  <label
                    className={`checkout-option ${
                      delivery === 'pickup'
                        ? 'checkout-option--active'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      value="pickup"
                      checked={delivery === 'pickup'}
                      onChange={() => setDelivery('pickup')}
                    />

                    <span className="checkout-option__icon">
                      <StoreIcon />
                    </span>

                    <span>
                      <strong>Վերցնել խանութից</strong>
                      <small>
                        Աբովյան · Պատրաստ է 24 ժամում
                      </small>
                    </span>
                  </label>
                </div>

                {delivery === 'yerevan' ? (
                  <>
                    <div className="checkout-fields">
                      <label className="checkout-fields__full">
                        Փողոց, շենք, բնակարան
                        <input
                          name="address"
                          value={form.address}
                          onChange={handleChange}
                          placeholder="Աբովյան փողոց, շենք 24"
                          required
                        />
                      </label>

                      <label className="checkout-fields__full">
                        Բնակարանի հեռախոս
                        <input
                          name="apartmentPhone"
                          type="tel"
                          value={form.apartmentPhone}
                          onChange={handleChange}
                          placeholder="Բնակարանի համար (եթե ցանկանում եք)"
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
                    </div>

                    <p className="checkout-callout">
                      Առաքման արժեքը՝ 3,000 ֏ · 2-3 աշխատանքային օր
                    </p>
                  </>
                ) : (
                  <div className="checkout-store">
                    <strong>{STORE.name}</strong>
                    <p>{STORE.address}</p>
                    <p>{STORE.ready}</p>
                    <a href={STORE.phoneHref}>{STORE.phone}</a>
                  </div>
                )}
              </div>

              {delivery === 'yerevan' && (
              <div className="checkout-section">
                <div className="checkout-section__heading">
                  <span className="checkout-section__number">
                    03
                  </span>

                  <div>
                    <h2>Վճարման եղանակ</h2>
                    <p>
                      Ընտրեք ձեզ հարմար վճարման եղանակը։
                    </p>
                  </div>
                </div>

                <div className="checkout-options">
                  <label
                    className={`checkout-option ${
                      payment === 'cash'
                        ? 'checkout-option--active'
                        : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={payment === 'cash'}
                      onChange={() => setPayment('cash')}
                    />

                    <span className="checkout-option__icon">
                      <CashIcon />
                    </span>

                    <span>
                      <strong>Կանխիկ առաքման ժամանակ</strong>
                      <small>
                        Վճարեք առաքիչին կանխիկով
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
                      onChange={() => setPayment('card')}
                    />

                    <span className="checkout-option__icon">
                      <CardIcon />
                    </span>

                    <span>
                      <strong>Բանկային քարտ</strong>
                      <small>
                        Visa կամ Mastercard
                      </small>
                    </span>
                  </label>
                </div>

                {payment === 'cash' ? (
                  <p className="checkout-callout">
                    {`Պատվերը հաստատվում է զանգով այս համարին՝ ${
                      confirmationPhone || STORE.phone
                    }։`}
                  </p>
                ) : (
                  <div className="checkout-fields checkout-card">
                    <label className="checkout-fields__full">
                      Քարտի համար
                      <input
                        name="number"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        value={card.number}
                        onChange={handleCardChange}
                        placeholder="0000 0000 0000 0000"
                        required
                      />
                    </label>

                    <label>
                      Վավերական է մինչև
                      <input
                        name="expiry"
                        inputMode="numeric"
                        autoComplete="cc-exp"
                        value={card.expiry}
                        onChange={handleCardChange}
                        placeholder="ԱԱ/ՏՏ"
                        required
                      />
                    </label>

                    <label>
                      CVV
                      <input
                        name="cvc"
                        inputMode="numeric"
                        autoComplete="cc-csc"
                        value={card.cvc}
                        onChange={handleCardChange}
                        placeholder="000"
                        required
                      />
                    </label>

                    <label className="checkout-fields__full">
                      Քարտապանի անուն
                      <input
                        name="name"
                        autoComplete="cc-name"
                        value={card.name}
                        onChange={handleCardChange}
                        placeholder="ANUN AZGANUN"
                        required
                      />
                    </label>
                  </div>
                )}

                <div className="checkout-payment-logos">
                  <span className="ds-pay ds-pay--visa">
                    VISA
                  </span>

                  <span className="ds-pay ds-pay--mastercard">
                    Mastercard
                  </span>
                </div>
              </div>
              )}
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
                  {delivery === 'yerevan'
                    ? `3000.00 ${t('checkout.currency')}`
                    : 'Անվճար'}
                </strong>
              </div>

              <div className="checkout-summary__total">
                <span>Ընդհանուր</span>
                <strong>
                  {payable} {t('checkout.currency')}
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
                  : payByCard
                    ? 'Անցնել վճարման'
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
