import { api, setAuthToken } from '../../api/client.js'

export async function fetchCurrentUser() {
  const response = await api.get('/api/auth/me/')
  return response.data
}

export async function loginWithEmail(email, password) {
  const response = await api.post('/api/auth/token/', { email, password })
  const accessToken = response.data?.access

  if (!accessToken) {
    throw new Error('The token endpoint did not return an access token.')
  }

  setAuthToken(accessToken)

  try {
    return await fetchCurrentUser()
  } catch (error) {
    setAuthToken(null)
    throw error
  }
}

export function logout() {
  setAuthToken(null)
}
