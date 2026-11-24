export const footerConfig = {
  contact: {
    phone: '+374 10 55 44 33',
    email: 'info@ventum.am',
  },
}

export function isValidEmail(value) {
  if (typeof value !== 'string') return false
  const trimmed = value.trim()
  if (!trimmed) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
}
