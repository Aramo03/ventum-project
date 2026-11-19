import { api, mediaUrl } from '../../api/client'

export function addProductToCart(sku) {
  return api.post('/api/cart/items/', { sku, qty: 1 })
}

export function productImageSrc(image) {
  return mediaUrl(image)
}

export function formatProductPrice(price) {
  const value = Number(price)
  if (!Number.isFinite(value)) return ''
  const [whole, fraction] = value.toFixed(2).split('.')
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  return `${grouped}.${fraction}`
}
