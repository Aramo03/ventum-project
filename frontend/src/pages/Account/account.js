import { api, setAuthToken } from '../../api/client.js'

export async function fetchCurrentUser() {
  const response = await api.get('/api/auth/me/')
  return response.data
}

export async function loginWithEmail(email, password) {
  const response = await api.post('/api/auth/token/', { email, password })
  return sessionFromAccess(response.data?.access)
}

export function logout() {
  setAuthToken(null)
}

async function sessionFromAccess(accessToken) {
  if (!accessToken) {
    throw new Error('The auth endpoint did not return an access token.')
  }

  setAuthToken(accessToken)

  try {
    return await fetchCurrentUser()
  } catch (error) {
    setAuthToken(null)
    throw error
  }
}

export async function registerWithEmail(payload) {
  const response = await api.post('/api/auth/register/', payload)
  return sessionFromAccess(response.data?.access)
}

export async function loginWithGoogle(credential) {
  const response = await api.post('/api/auth/google/', { credential })
  return sessionFromAccess(response.data?.access)
}

export function safeReturnPath(from) {
  if (typeof from !== 'string') return ''
  if (!from.startsWith('/') || from.startsWith('//')) return ''
  return from
}
