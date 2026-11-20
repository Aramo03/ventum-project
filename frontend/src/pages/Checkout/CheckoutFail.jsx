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

export default function CheckoutFail() {
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
    variant: 'fail',
  })

  return (
    <main className="checkout-page">
      <section className="vt-panel" aria-labelledby="checkout-fail-title">
        <div className="vt-type">
          <p className="vt-eyebrow">{t('checkout.eyebrowFail')}</p>
          <h1 id="checkout-fail-title">{t('pageTitles.checkoutFail')}</h1>
        </div>

        <p className={paid ? 'vt-status vt-status--ok' : 'vt-status'} role="status">
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
            <Link className="vt-button" to="/cart">{t('checkout.backToCart')}</Link>
            <Link className="vt-button vt-button--ghost" to="/">
              {t('pages.goHome')}
            </Link>
          </div>
      </section>
    </main>
  )
}
