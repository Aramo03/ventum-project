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

  return (
    <main className="account-page">
      <section className="vt-panel" aria-labelledby="account-title">
        <div className="vt-type">
          <p className="vt-eyebrow">{t('brand')}</p>
          <h1 id="account-title">{t('account.title')}</h1>
        </div>

        {checkingSession && (
          <p className="vt-status" role="status">
            {t('account.loading')}
          </p>
        )}

        {!checkingSession && loadError && (
          <>
            <p className="vt-status vt-status--error" role="alert">
              {t('account.profileError')}
            </p>
            <button
              className="vt-button vt-button--ghost"
              onClick={() => window.location.reload()}
              type="button"
            >
              {t('account.retry')}
            </button>
          </>
        )}

        {!checkingSession && !loadError && user && (
          <div className="account-profile">
            <p className="vt-status vt-status--ok">{t('account.signedInAs')}</p>
            <dl>
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
            <button className="vt-button" onClick={handleLogout} type="button">
              {t('account.logout')}
            </button>
          </div>
        )}

        {!checkingSession && !loadError && !user && (
          <form className="account-form" onSubmit={handleSubmit}>
            <p className="vt-lead">{t('account.loginPrompt')}</p>
            <label className="vt-field">
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
            <label className="vt-field">
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
              <p className="vt-status vt-status--error" role="alert">
                {formError}
              </p>
            )}
            <button className="vt-button" disabled={isSubmitting} type="submit">
              {isSubmitting ? t('account.signingIn') : t('account.login')}
            </button>
          </form>
        )}
      </section>
    </main>
  )
}
