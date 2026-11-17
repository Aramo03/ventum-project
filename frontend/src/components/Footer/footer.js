import { api } from '../../api/client.js'

export const FOOTER_LINKS = [
  { to: '/textile', key: 'stores.textile' },
  { to: '/baby', key: 'stores.baby' },
]

function fieldMessage(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(' ')
  if (typeof value === 'string') return value
  return ''
}

export function readFieldErrors(error) {
  const data = error?.response?.data
  if (!data || typeof data !== 'object') return {}
  const fields = {}
  for (const [key, value] of Object.entries(data)) {
    const message = fieldMessage(value)
    if (!message) continue
    if (key === 'non_field_errors' || key === 'detail') {
      fields.form = message
    } else {
      fields[key] = message
    }
  }
  return fields
}

export function submitNewsletter(email) {
  return api.post('/api/leads/newsletter/', { email })
}

export function submitWholesale(payload) {
  return api.post('/api/leads/wholesale/', payload)
}
