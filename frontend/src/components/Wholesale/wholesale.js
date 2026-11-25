import { api } from '../../api/client.js'

export const WHOLESALE_ENDPOINT = '/api/leads/wholesale/'

export function submitWholesaleInquiry(payload) {
  return api.post(WHOLESALE_ENDPOINT, payload)
}
