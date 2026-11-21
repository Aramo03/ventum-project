import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { submitWholesaleInquiry } from './wholesale.js'
import './wholesale.css'

const EMPTY_FORM = {
  name: '',
  phone: '',
  email: '',
  text: '',
}

export default function Wholesale({ brand = 'textile' }) {
  const { t } = useTranslation()
  const { hash } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(null)

  useEffect(() => {
    if (hash !== '#wholesale') return

    requestAnimationFrame(() => {
      document.getElementById('wholesale')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  }, [hash])

  function updateField(field) {
    return (event) => {
      setForm((current) => ({ ...current, [field]: event.target.value }))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFeedback(null)

    const payload = Object.fromEntries(
      Object.entries(form).map(([field, value]) => [field, value.trim()]),
    )

    if (Object.values(payload).some((value) => !value)) {
      setFeedback({ type: 'error', message: t('wholesaleBlock.required') })
      return
    }

    setIsSubmitting(true)
    try {
      await submitWholesaleInquiry(payload)
      setForm(EMPTY_FORM)
      setFeedback({ type: 'success', message: t('wholesaleBlock.success') })
    } catch {
      setFeedback({ type: 'error', message: t('wholesaleBlock.error') })
    } finally {
      setIsSubmitting(false)
    }
  }

  function toggleForm() {
    setIsOpen((open) => !open)
    setFeedback(null)
  }

  return (
    <section
      className="wholesale-block shop-block"
      data-brand={brand}
      id="wholesale"
      aria-labelledby="wholesale-title"
    >
      <div className="wholesale-block__offer">
        <p className="wholesale-block__eyebrow">{t('wholesaleBlock.eyebrow')}</p>
        <h2 id="wholesale-title">{t('wholesaleBlock.title')}</h2>
        <p className="wholesale-block__description">
          {t('wholesaleBlock.description')}
        </p>
      </div>

      <div className="wholesale-block__action-wrap">
        <button
          aria-controls="wholesale-form"
          aria-expanded={isOpen}
          className="vt-button wholesale-block__action"
          disabled={isSubmitting}
          onClick={toggleForm}
          type="button"
        >
          {isOpen ? t('wholesaleBlock.close') : t('wholesaleBlock.action')}
        </button>
      </div>

      {isOpen && (
        <form
          className="wholesale-block__form"
          id="wholesale-form"
          onSubmit={handleSubmit}
        >
          <h3>{t('wholesaleBlock.formTitle')}</h3>
          <div className="wholesale-block__fields">
            <label className="wholesale-block__field">
              <span>{t('wholesaleBlock.name')}</span>
              <input
                autoComplete="name"
                name="name"
                onChange={updateField('name')}
                required
                type="text"
                value={form.name}
              />
            </label>
            <label className="wholesale-block__field">
              <span>{t('wholesaleBlock.phone')}</span>
              <input
                autoComplete="tel"
                name="phone"
                onChange={updateField('phone')}
                required
                type="tel"
                value={form.phone}
              />
            </label>
            <label className="wholesale-block__field">
              <span>{t('wholesaleBlock.email')}</span>
              <input
                autoComplete="email"
                name="email"
                onChange={updateField('email')}
                required
                type="email"
                value={form.email}
              />
            </label>
            <label className="wholesale-block__field wholesale-block__field--wide">
              <span>{t('wholesaleBlock.message')}</span>
              <textarea
                name="text"
                onChange={updateField('text')}
                required
                rows="3"
                value={form.text}
              />
            </label>
          </div>

          <button
            className="vt-button wholesale-block__submit"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting
              ? t('wholesaleBlock.submitting')
              : t('wholesaleBlock.submit')}
          </button>

          {feedback && (
            <p
              className={`wholesale-block__feedback wholesale-block__feedback--${feedback.type}`}
              role={feedback.type === 'error' ? 'alert' : 'status'}
            >
              {feedback.message}
            </p>
          )}
        </form>
      )}
    </section>
  )
}
