import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import {
  FOOTER_LINKS,
  readFieldErrors,
  submitNewsletter,
  submitWholesale,
} from './footer.js'
import './footer.css'

function FormNote({ message, tone }) {
  if (!message) return null
  return (
    <p className={`site-footer__note site-footer__note--${tone}`} role="status">
      {message}
    </p>
  )
}

function NewsletterForm() {
  const { t } = useTranslation()
  const [note, setNote] = useState(null)
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '' } })

  async function onSubmit(values) {
    setNote(null)
    try {
      await submitNewsletter(values.email.trim())
      reset()
      setNote({ tone: 'ok', message: t('footer.newsletterSuccess') })
    } catch (error) {
      const fields = readFieldErrors(error)
      if (fields.email) setError('email', { message: fields.email })
      setNote({
        tone: 'bad',
        message: fields.form || (fields.email ? '' : t('footer.submitError')),
      })
    }
  }

  return (
    <form className="site-footer__form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>{t('footer.newsletterTitle')}</h2>
      <label>
        <span>{t('footer.newsletterEmail')}</span>
        <input
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', { required: t('footer.required') })}
        />
      </label>
      {errors.email && (
        <p className="site-footer__field-error">{errors.email.message}</p>
      )}
      <button type="submit" disabled={isSubmitting}>
        {t('footer.newsletterSubmit')}
      </button>
      <FormNote message={note?.message} tone={note?.tone} />
    </form>
  )
}

function WholesaleForm() {
  const { t } = useTranslation()
  const [note, setNote] = useState(null)
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: '', phone: '', email: '', text: '' },
  })

  async function onSubmit(values) {
    setNote(null)
    try {
      await submitWholesale({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        text: values.text.trim(),
      })
      reset()
      setNote({ tone: 'ok', message: t('footer.wholesaleSuccess') })
    } catch (error) {
      const fields = readFieldErrors(error)
      for (const key of ['name', 'phone', 'email', 'text']) {
        if (fields[key]) setError(key, { message: fields[key] })
      }
      const hasField = ['name', 'phone', 'email', 'text'].some((key) => fields[key])
      setNote({
        tone: 'bad',
        message: fields.form || (hasField ? '' : t('footer.submitError')),
      })
    }
  }

  return (
    <form className="site-footer__form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2>{t('footer.wholesaleTitle')}</h2>
      <label>
        <span>{t('footer.wholesaleName')}</span>
        <input
          type="text"
          autoComplete="name"
          aria-invalid={errors.name ? 'true' : 'false'}
          {...register('name', { required: t('footer.required') })}
        />
      </label>
      {errors.name && <p className="site-footer__field-error">{errors.name.message}</p>}
      <label>
        <span>{t('footer.wholesalePhone')}</span>
        <input
          type="tel"
          autoComplete="tel"
          aria-invalid={errors.phone ? 'true' : 'false'}
          {...register('phone', { required: t('footer.required') })}
        />
      </label>
      {errors.phone && (
        <p className="site-footer__field-error">{errors.phone.message}</p>
      )}
      <label>
        <span>{t('footer.wholesaleEmail')}</span>
        <input
          type="email"
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          {...register('email', { required: t('footer.required') })}
        />
      </label>
      {errors.email && (
        <p className="site-footer__field-error">{errors.email.message}</p>
      )}
      <label>
        <span>{t('footer.wholesaleText')}</span>
        <textarea
          rows={3}
          aria-invalid={errors.text ? 'true' : 'false'}
          {...register('text', { required: t('footer.required') })}
        />
      </label>
      {errors.text && <p className="site-footer__field-error">{errors.text.message}</p>}
      <button type="submit" disabled={isSubmitting}>
        {t('footer.wholesaleSubmit')}
      </button>
      <FormNote message={note?.message} tone={note?.tone} />
    </form>
  )
}

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <strong>{t('brand')}</strong>
        {FOOTER_LINKS.map((item) => (
          <Link key={item.to} to={item.to}>
            {t(item.key)}
          </Link>
        ))}
        <a href="tel:+37410554433">{t('phone')}</a>
        <span>{t('footer.note')}</span>
      </div>
      <div className="site-footer__forms">
        <NewsletterForm />
        <WholesaleForm />
      </div>
    </footer>
  )
}
