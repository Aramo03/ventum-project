import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import {
  fetchCurrentUser,
  loginWithEmail,
  loginWithGoogle,
  logout,
  registerWithEmail,
  safeReturnPath,
} from './account.js'
import './account.css'

const googleClientId = String(import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim()

const CODE_KEYS = {
  email_taken: 'account.emailTaken',
  password_mismatch: 'account.passwordMismatch',
  invalid_password: 'account.invalidPassword',
  google_unavailable: 'account.googleUnavailable',
  google_invalid: 'account.googleInvalid',
  google_email_unverified: 'account.googleEmailUnverified',
}

function GoogleMark() {
  return (
    <svg className="account-google-mark" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" />
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" />
    </svg>
  )
}

function messageFor(error, t, fallbackKey) {
  const code = error.response?.data?.code
  const messages = error.response?.data?.messages
  if (
    code === 'invalid_password'
    && Array.isArray(messages)
    && messages.some((item) => typeof item === 'string' && item.trim())
  ) {
    return messages.filter((item) => typeof item === 'string' && item.trim()).join(' ')
  }
  if (code && CODE_KEYS[code]) return t(CODE_KEYS[code])
  if (error.response?.status === 401) return t('account.invalidCredentials')
  return t(fallbackKey)
}

function AccountScreen() {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [checkingSession, setCheckingSession] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [formError, setFormError] = useState('')
  const slotRef = useRef(null)
  const [slotWidth, setSlotWidth] = useState(0)

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

  useEffect(() => {
    if (!googleClientId) return undefined
    const node = slotRef.current
    if (!node) return undefined
    const update = () => setSlotWidth(Math.round(node.getBoundingClientRect().width))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [checkingSession, loadError, user])

  function finish(currentUser) {
    setUser(currentUser)
    setPassword('')
    setPasswordConfirm('')
    const next = safeReturnPath(location.state?.from)
    if (next) navigate(next)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError('')
    setIsSubmitting(true)

    try {
      const currentUser = mode === 'register'
        ? await registerWithEmail({
          email: email.trim(),
          password,
          password_confirm: passwordConfirm,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        })
        : await loginWithEmail(email.trim(), password)
      finish(currentUser)
    } catch (error) {
      setFormError(
        messageFor(
          error,
          t,
          mode === 'register' ? 'account.registerError' : 'account.loginError',
        ),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleGoogle(credential) {
    setFormError('')
    setIsSubmitting(true)
    try {
      finish(await loginWithGoogle(credential))
    } catch (error) {
      setFormError(messageFor(error, t, 'account.googleInvalid'))
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
          <div className="account-guest">
            <div className="account-google">
              <p className="account-google-line">{t('account.googleSignIn')}</p>
              <div
                className={isSubmitting ? 'account-google-slot is-busy' : 'account-google-slot'}
                ref={slotRef}
              >
                <button
                  type="button"
                  className="account-google-button"
                  disabled={isSubmitting}
                  aria-hidden={googleClientId ? true : undefined}
                  tabIndex={googleClientId ? -1 : 0}
                  onClick={() => {
                    if (!googleClientId) setFormError(t('account.googleUnavailable'))
                  }}
                >
                  <GoogleMark />
                  Google
                </button>
                {googleClientId && slotWidth > 0 && (
                  <div className="account-google-hit">
                    <div
                      className="account-google-scale"
                      style={{
                        width: Math.min(400, Math.max(200, slotWidth)),
                        transform: `scaleX(${slotWidth / Math.min(400, Math.max(200, slotWidth))}) scaleY(${44 / 40})`,
                      }}
                    >
                      <GoogleLogin
                        onSuccess={(response) => {
                          if (response?.credential) handleGoogle(response.credential)
                          else setFormError(t('account.googleInvalid'))
                        }}
                        onError={() => setFormError(t('account.googleInvalid'))}
                        useOneTap={false}
                        text="continue_with"
                        shape="rectangular"
                        width={String(Math.min(400, Math.max(200, slotWidth)))}
                      />
                    </div>
                  </div>
                )}
              </div>
              <p className="account-or">{t('account.or')}</p>
            </div>

            <div className="account-modes" role="tablist" aria-label={t('account.title')}>
              <button
                type="button"
                className={mode === 'login' ? 'vt-button' : 'vt-button vt-button--ghost'}
                aria-selected={mode === 'login'}
                onClick={() => {
                  setMode('login')
                  setFormError('')
                }}
              >
                {t('account.login')}
              </button>
              <button
                type="button"
                className={mode === 'register' ? 'vt-button' : 'vt-button vt-button--ghost'}
                aria-selected={mode === 'register'}
                onClick={() => {
                  setMode('register')
                  setFormError('')
                }}
              >
                {t('account.createAccount')}
              </button>
            </div>

            <form className="account-form" onSubmit={handleSubmit}>
              <p className="vt-lead">
                {mode === 'register' ? t('account.registerPrompt') : t('account.loginPrompt')}
              </p>
              {mode === 'register' && (
                <>
                  <label className="vt-field">
                    <span>{t('account.firstName')}</span>
                    <input
                      autoComplete="given-name"
                      name="given-name"
                      onChange={(event) => setFirstName(event.target.value)}
                      type="text"
                      value={firstName}
                    />
                  </label>
                  <label className="vt-field">
                    <span>{t('account.lastName')}</span>
                    <input
                      autoComplete="family-name"
                      name="family-name"
                      onChange={(event) => setLastName(event.target.value)}
                      type="text"
                      value={lastName}
                    />
                  </label>
                </>
              )}
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
                  autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  value={password}
                />
              </label>
              {mode === 'register' && (
                <label className="vt-field">
                  <span>{t('account.passwordConfirm')}</span>
                  <input
                    autoComplete="new-password"
                    name="password-confirm"
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                    required
                    type="password"
                    value={passwordConfirm}
                  />
                </label>
              )}
              {formError && (
                <p className="vt-status vt-status--error" role="alert">
                  {formError}
                </p>
              )}
              <button className="vt-button" disabled={isSubmitting} type="submit">
                {isSubmitting
                  ? t(mode === 'register' ? 'account.creatingAccount' : 'account.signingIn')
                  : t(mode === 'register' ? 'account.createAccount' : 'account.login')}
              </button>
            </form>
          </div>
        )}
      </section>
    </main>
  )
}

export default function Account() {
  if (!googleClientId) return <AccountScreen />
  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AccountScreen />
    </GoogleOAuthProvider>
  )
}
