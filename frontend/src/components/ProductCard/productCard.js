import { api, mediaUrl } from '../../api/client'
import { notifyCartUpdated } from '../../pages/Cart/cart.js'

export const PURCHASE_KINDS = ['card', 'cash']

export function addProductToCart(sku) {
  return api.post('/api/cart/items/', { sku, qty: 1 }).then((response) => {
    notifyCartUpdated()
    return response
  })
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

function textField(value) {
  if (typeof value !== 'string') return ''
  const trimmed = value.trim()
  return trimmed
}

function priceField(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return formatProductPrice(value)
  }
  return textField(value)
}

export function productSizes(product) {
  const raw = product?.sizes
  if (Array.isArray(raw)) {
    return raw.flatMap((item) => {
      if (typeof item === 'string' && item.trim()) {
        return [{ id: item.trim(), label: item.trim(), selected: false }]
      }
      if (item && typeof item.label === 'string' && item.label.trim()) {
        return [{
          id: String(item.id || item.label).trim(),
          label: item.label.trim(),
          selected: Boolean(item.selected),
        }]
      }
      return []
    })
  }

  const single = textField(product?.size)
  if (!single) return []
  return [{ id: single, label: single, selected: true }]
}

export function productColors(product) {
  const raw = product?.colors ?? product?.color
  if (Array.isArray(raw)) {
    return raw.flatMap((item) => {
      if (typeof item === 'string' && item.trim()) {
        return [{ id: item.trim(), label: item.trim(), hint: '', swatch: '' }]
      }
      if (item && typeof item === 'object') {
        const label = textField(item.label || item.name)
        if (!label) return []
        return [{
          id: String(item.id || label).trim(),
          label,
          hint: textField(item.hint),
          swatch: textField(item.swatch || item.hex),
        }]
      }
      return []
    })
  }

  if (raw && typeof raw === 'object') {
    const label = textField(raw.label || raw.name)
    if (!label) return []
    return [{
      id: String(raw.id || label).trim(),
      label,
      hint: textField(raw.hint),
      swatch: textField(raw.swatch || raw.hex),
    }]
  }

  const single = textField(raw)
  if (!single) return []
  return [{ id: single, label: single, hint: '', swatch: '' }]
}

export function productExtras(product) {
  const source = product && typeof product === 'object' ? product : {}
  return {
    discount: textField(source.discount ?? source.discount_label),
    stock: textField(source.stock_status ?? source.stock),
    spec: textField(source.specification ?? source.spec),
    oldPrice: priceField(source.old_price ?? source.compare_at_price),
    sizes: productSizes(source),
    colors: productColors(source),
  }
}
