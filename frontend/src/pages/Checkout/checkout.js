import { api } from '../../api/client'

export const SUCCESS_PATH = '/checkout/success'
export const FAIL_PATH = '/checkout/fail'

export function billFromSearch(search) {
  const value = new URLSearchParams(search).get('bill')
  if (value == null) return ''
  return String(value).trim()
}

export async function fetchOrderByBill(bill) {
  const response = await api.get(`/api/orders/${encodeURIComponent(bill)}/`)
  return response.data
}

export function isPaidStatus(status) {
  return status === 'paid'
}

export function formatOrderAmount(amount) {
  const value = Number(amount)
  if (!Number.isFinite(value)) return ''
  const [whole, fraction] = value.toFixed(2).split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${grouped}.${fraction}`
}

export function orderLineRows(order) {
  const items = Array.isArray(order?.items) ? order.items : []
  return items.map((item, index) => ({
    key: item.sku ? String(item.sku) : `line-${index}`,
    name: item.name || item.sku || '',
    qty: item.qty,
  }))
}

/**
 * Paid copy is returned only when the order status is exactly `paid`.
 * Query flags like success=1 never unlock that wording.
 */
export function checkoutStatusMessage({
  bill,
  loading,
  loadError,
  order,
  t,
  variant,
}) {
  const paid = order != null && isPaidStatus(order.status)

  if (!bill) {
    return variant === 'fail' ? t('checkout.failNeutral') : t('checkout.neutral')
  }
  if (loading) return t('common.loading')
  if (loadError) return t('checkout.lookupFailed')
  if (paid) return t('checkout.paid')
  if (order) return t('checkout.notPaidYet')
  return variant === 'fail' ? t('checkout.failNeutral') : t('checkout.neutral')
}
