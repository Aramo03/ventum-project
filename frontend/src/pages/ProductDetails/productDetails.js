import photoMain from '../../assets/product-details/photo-main.png'
import photo1 from '../../assets/product-details/photo-1.png'
import photo2 from '../../assets/product-details/photo-2.png'
import photo3 from '../../assets/product-details/photo-3.png'

export const STUDIO = [
  { url: photoMain, thumb: photo1, alt: '' },
  { url: photo2, thumb: photo2, alt: '' },
  { url: photo3, thumb: photo3, alt: '' },
]

export const FALLBACK_SIZES = [
  { id: '70', labelKey: 'productDetails.size70' },
  { id: '100', labelKey: 'productDetails.size100' },
  { id: '128', labelKey: 'productDetails.size128' },
]

export function storePath(store) {
  return store === 'baby' ? '/baby' : '/textile'
}

export function galleryImages(product) {
  const rows = Array.isArray(product?.images) ? [...product.images] : []
  rows.sort((left, right) => (left?.order ?? 0) - (right?.order ?? 0))
  const withUrl = rows.filter((image) => image?.url)
  if (withUrl.length) {
    return withUrl.map((image) => ({
      url: image.url,
      thumb: image.url,
      alt: image.alt || '',
    }))
  }
  if (product?.image) {
    return [{ url: product.image, thumb: product.image, alt: product.name || '' }]
  }
  return STUDIO
}

export function moneyLabel(price) {
  const value = Number(price)
  if (!Number.isFinite(value)) return ''
  return Math.round(value).toLocaleString('en-US')
}

export function discountLabel(product, extras) {
  if (extras?.discount) return extras.discount
  const current = Number(product?.price)
  const previous = Number(product?.old_price ?? product?.compare_at_price)
  if (!Number.isFinite(current) || !Number.isFinite(previous) || previous <= current) {
    return ''
  }
  const percent = Math.round((1 - current / previous) * 100)
  return percent > 0 ? `−${percent}%` : ''
}
