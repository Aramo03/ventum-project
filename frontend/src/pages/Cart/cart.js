import { api } from '../../api/client'

export const CART_UPDATED_EVENT = 'cart-updated'

export function notifyCartUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event(CART_UPDATED_EVENT))
  }
}

export async function getCart() {
  const response = await api.get('/api/cart/')
  return response.data
}

export async function updateCartItem(sku, qty) {
  const response = await api.patch(
    `/api/cart/items/${encodeURIComponent(sku)}/`,
    { qty }
  )

  notifyCartUpdated()

  return response.data
}

export async function deleteCartItem(sku) {
  const response = await api.delete(
    `/api/cart/items/${encodeURIComponent(sku)}/`
  )

  notifyCartUpdated()

  return response.data
}

export async function checkout() {
  const response = await api.post('/api/checkout/')
  return response.data
}

export function submitPaymentForm(paymentUrl, fields) {
  if (
    typeof paymentUrl !== 'string' ||
    !paymentUrl.trim() ||
    !fields ||
    typeof fields !== 'object' ||
    Array.isArray(fields)
  ) {
    throw new Error('Invalid payment response.')
  }

  const form = document.createElement('form')

  form.method = 'POST'
  form.action = paymentUrl
  form.style.display = 'none'

  Object.entries(fields).forEach(([name, value]) => {
    if (value === null || value === undefined) return

    if (typeof value === 'object') {
      throw new Error('Invalid payment field.')
    }

    const input = document.createElement('input')

    input.type = 'hidden'
    input.name = name
    input.value = String(value)

    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
}