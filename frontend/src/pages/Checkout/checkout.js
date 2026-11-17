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
