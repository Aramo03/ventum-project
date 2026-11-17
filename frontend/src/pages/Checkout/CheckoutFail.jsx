import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { billFromSearch, fetchOrderByBill, isPaidStatus } from './checkout.js'
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

  let statusText = t('checkout.failNeutral')
  if (bill && loading) {
    statusText = t('common.loading')
  } else if (bill && loadError) {
    statusText = t('checkout.lookupFailed')
  } else if (paid) {
    statusText = t('checkout.paid')
  } else if (bill && order) {
    statusText = t('checkout.notPaidYet')
  }

  return (
    <main className="page checkout-result checkout-result--fail">
      <h1>{t('pageTitles.checkoutFail')}</h1>
      <p className="checkout-result__status">{statusText}</p>
      {bill ? (
        <p className="checkout-result__meta">
          {t('checkout.billLabel')}: {bill}
        </p>
      ) : null}
      <p className="checkout-result__home">
        <Link to="/cart">{t('checkout.backToCart')}</Link>
      </p>
    </main>
  )
}
