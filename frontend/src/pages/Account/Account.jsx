import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { fetchCurrentUser, loginWithEmail, logout } from './account.js'
import './account.css'

export default function Account() {
  const { t } = useTranslation()
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkingSession, setCheckingSession] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [formError, setFormError] = useState('')

  useEffect(() => {
    let active = true

    fetchCurrentUser()
      .then((currentUser) => {
        if (active) setUser(currentUser)
      })
      .catch((error) => {
        if (!active) return
        if (error.response?.status === 401) {
          logout()
        } else {
          setLoadError(true)
        }
      })
      .finally(() => {
        if (active) setCheckingSession(false)
      })

    return () => {
      active = false
    }
  }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError('')
    setIsSubmitting(true)

    try {
      const currentUser = await loginWithEmail(email.trim(), password)
      setUser(currentUser)
      setPassword('')
    } catch (error) {
      setFormError(
        error.response?.status === 401
          ? t('account.invalidCredentials')
          : t('account.loginError'),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleLogout() {
    logout()
    setUser(null)
    setFormError('')
  }

  if (checkingSession) {
    return (
      <main className="account-page">
        <p className="account-status" role="status">
          {t('account.loading')}
        </p>
      </main>
    )
  }

  if (loadError) {
    return (
      <main className="account-page">
        <section className="account-card" aria-labelledby="account-title">
          <h1 id="account-title">{t('account.title')}</h1>
          <p className="account-message account-message--error" role="alert">
            {t('account.profileError')}
          </p>
          <button
            className="account-button account-button--secondary"
            onClick={() => window.location.reload()}
            type="button"
          >
            {t('account.retry')}
          </button>
        </section>
      </main>
    )
  }

  return (
    <main className="account-page">
      <section className="account-card" aria-labelledby="account-title">
        <h1 id="account-title">{t('account.title')}</h1>

        {user ? (
          <div className="account-profile">
            <p className="account-profile__intro">{t('account.signedInAs')}</p>
            <dl className="account-profile__details">
              <div>
                <dt>{t('account.email')}</dt>
                <dd>{user.email}</dd>
              </div>
              {(user.first_name || user.last_name) && (
                <div>
                  <dt>{t('account.name')}</dt>
                  <dd>{[user.first_name, user.last_name].filter(Boolean).join(' ')}</dd>
                </div>
              )}
            </dl>
            <button
              className="account-button"
              onClick={handleLogout}
              type="button"
            >
              {t('account.logout')}
            </button>
          </div>
        ) : (
          <form className="account-form" onSubmit={handleSubmit}>
            <p className="account-form__intro">{t('account.loginPrompt')}</p>
            <label className="account-field">
              <span>{t('account.email')}</span>
              <input
                autoComplete="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </label>
            <label className="account-field">
              <span>{t('account.password')}</span>
              <input
                autoComplete="current-password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                required
                type="password"
                value={password}
              />
            </label>
            {formError && (
              <p className="account-message account-message--error" role="alert">
                {formError}
              </p>
            )}
            <button
              className="account-button"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? t('account.signingIn') : t('account.login')}
            </button>
          </form>
        )}
      </section>
    </main>
  )
}
