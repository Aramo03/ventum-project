import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  billFromSearch,
  checkoutStatusMessage,
  fetchOrderByBill,
  formatOrderAmount,
  isPaidStatus,
  orderLineRows,
} from './checkout.js'
import './checkout.css'

export default function CheckoutSuccess() {
  const { t } = useTranslation()
  const { search } = useLocation()
  const bill = billFromSearch(search)

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(Boolean(bill))
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    if (!bill) {
      setOrder(null)
      setLoading(false)
      setLoadError(false)
      return undefined
    }

    let active = true
    setLoading(true)
    setLoadError(false)

    fetchOrderByBill(bill)
      .then((data) => {
        if (active) setOrder(data)
      })
      .catch(() => {
        if (active) {
          setOrder(null)
          setLoadError(true)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [bill])

  const paid = order != null && isPaidStatus(order.status)
  const amount = order && !loading && !loadError ? formatOrderAmount(order.amount) : ''
  const lines = order && !loading && !loadError ? orderLineRows(order) : []
  const statusText = checkoutStatusMessage({
    bill,
    loading,
    loadError,
    order,
    t,
    variant: 'success',
  })

  return (
    <main className="checkout-page">
      <div className="checkout-layout">
        <aside className="checkout-aside" aria-hidden="true">
          <div className="checkout-aside__brand">
            <span className="checkout-aside__mark">V</span>
            <span>{t('brand')}</span>
          </div>
          <div className="checkout-aside__art">
            <span className="checkout-aside__shape checkout-aside__shape--one" />
            <span className="checkout-aside__shape checkout-aside__shape--two" />
            <span className="checkout-aside__shape checkout-aside__shape--three" />
          </div>
          <div className="checkout-aside__rule" />
        </aside>

        <section className="checkout-card" aria-labelledby="checkout-success-title">
          <div>
            <span className="checkout-card__eyebrow">{t('checkout.eyebrowSuccess')}</span>
            <h1 id="checkout-success-title">{t('pageTitles.checkoutSuccess')}</h1>
          </div>

          <p
            className={
              paid
                ? 'checkout-card__status checkout-card__status--paid'
                : 'checkout-card__status'
            }
            role="status"
          >
            {statusText}
          </p>

          {bill || amount || lines.length > 0 ? (
            <div className="checkout-card__meta">
              {bill ? (
                <p>
                  {t('checkout.billLabel')}: <strong>{bill}</strong>
                </p>
              ) : null}
              {amount ? (
                <p>
                  {t('checkout.amountLabel')}:{' '}
                  <strong>
                    {amount} {t('checkout.currency')}
                  </strong>
                </p>
              ) : null}
              {lines.length > 0 ? (
                <ul className="checkout-card__lines">
                  {lines.map((line) => (
                    <li key={line.key}>
                      {line.name} × {line.qty}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          <div className="checkout-card__actions">
            <Link to="/">{t('pages.goHome')}</Link>
            <Link className="checkout-card__link--ghost" to="/cart">
              {t('checkout.backToCart')}
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
