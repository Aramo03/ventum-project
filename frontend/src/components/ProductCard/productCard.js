import { api } from '../../api/client'

export function addProductToCart(sku) {
  return api.post('/api/cart/items/', { sku, qty: 1 })
}
