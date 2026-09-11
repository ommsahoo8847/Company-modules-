import React, { useState } from 'react'
import { Button } from '../ui/Button.jsx'
import styles from './Contact.module.css'

// Real profile URLs
const SOCIAL = [
  { id: 'contact-github',   href: 'https://github.com/ommsahoo8847',                          label: 'GitHub'   },
  { id: 'contact-x',        href: 'https://x.com/_Omm_Sahoo_',                               label: 'X'        },
  { id: 'contact-linkedin', href: 'https://www.linkedin.com/in/omm-prakash-sahoo-7650bb379/', label: 'LinkedIn' },
]

// Serverless endpoint with direct FormSubmit delivery fallback
const API_URL = '/api/contact'
const FALLBACK_URL = 'https://formsubmit.co/ajax/ommsahoo8847@gmail.com'

function validate({ name, email, message }) {
  const errs = {}
  if (!name.trim() || name.trim().length < 2)
    errs.name = 'Please enter your name (at least 2 characters).'
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    errs.email = 'Please enter a valid email address.'
  if (!message.trim() || message.trim().length < 10)
    errs.message = 'Please enter a message (at least 10 characters).'
  return errs
}

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitted,   setSubmitted]   = useState(false)
  const [sending,     setSending]     = useState(false)
  const [error,       setError]       = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setFormState(prev => ({ ...prev, [name]: value }))
    // Clear the field error as the user types
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    // Client-side validation
    const errs = validate(formState)
    if (Object.keys(errs).length) {
      setFieldErrors(errs)
      return
    }

    // Prevent duplicate submissions
    if (sending) return
    setSending(true)
    setError(null)
    setFieldErrors({})

    const timestamp = new Date().toLocaleString('en-IN', {
      dateStyle: 'full',
      timeStyle: 'short',
      timeZone:  'Asia/Kolkata',
    })

    const payload = {
      name:      formState.name.trim(),
      email:     formState.email.trim(),
      message:   formState.message.trim(),
      timestamp,
      pageUrl:   window.location.href,
    }

    try {
      let isSuccess = false

      // 1. Try /api/contact (Vercel serverless / Edge)
      try {
        const res = await fetch(API_URL, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify(payload),
        })
        if (res.ok) {
          const data = await res.json().catch(() => ({}))
          if (data.ok || data.success) {
            isSuccess = true
          }
        }
      } catch {
        // Proceed to fallback
      }

      // 2. Direct fallback to FormSubmit (ensures delivery even without serverless backend or local dev)
      if (!isSuccess) {
        const res = await fetch(FALLBACK_URL, {
          method:  'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept':       'application/json',
          },
          body: JSON.stringify({
            name:        payload.name,
            email:       payload.email,
            message:     payload.message,
            _subject:    `📩 New Message from ${payload.name} — Apex Automotive`,
            _replyto:    payload.email,
            _template:   'table',
            _captcha:    'false',
            SubmittedAt: timestamp,
            pageUrl:     payload.pageUrl,
          }),
        })
        const data = await res.json().catch(() => ({}))
        if (res.ok && (data.success === 'true' || data.success === true || (data.message && data.message.includes('Activation')))) {
          isSuccess = true
        } else {
          throw new Error(data.message || 'Submission failed')
        }
      }

      if (isSuccess) {
        setSubmitted(true)
        setFormState({ name: '', email: '', message: '' })
      } else {
        setError('Unable to send message. Please email ommsahoo8847@gmail.com directly.')
      }
    } catch {
      setError('Network error. Please check your connection or email ommsahoo8847@gmail.com directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className={`${styles.section} section`} aria-label="Contact section">
      {/* Background ambient glow */}
      <div className={styles.ambientGlow} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>

        {/* Left — copy */}
        <div className={styles.copyCol}>
          <div className="section-label">Contact</div>

          <h2 className={styles.headline}>
            Inquire &<br />
            <span className={styles.headlineAccent}>Collaborate.</span>
          </h2>

          <p className={styles.body}>
            Interested in real-time 3D vehicle visualization, telemetry data integrations,
            or bespoke automotive creative engineering? Reach out to collaborate or request
            specific vehicle dossiers.
          </p>

          {/* Social links */}
          <nav aria-label="Social media links" className={styles.social}>
            {SOCIAL.map(s => (
              <a
                key={s.id}
                id={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${s.label} profile`}
                className={styles.socialLink}
              >
                {s.label}
                <span className={styles.socialArrow} aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Right — form */}
        <div className={styles.formCol}>
          {submitted ? (
            <div className={styles.successCard} role="alert">
              <span className={styles.successIcon} aria-hidden="true">✓</span>
              <p className={styles.successTitle}>Message sent!</p>
              <p className={styles.successBody}>
                Your message has been delivered to <strong>ommsahoo8847@gmail.com</strong>. I'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form
              className={styles.form}
              onSubmit={handleSubmit}
              aria-label="Contact form"
              noValidate
            >
              <div className={styles.field}>
                <label htmlFor="contact-name" className={styles.label}>Name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  className={styles.input}
                  aria-describedby={fieldErrors.name ? 'err-name' : undefined}
                  aria-invalid={!!fieldErrors.name}
                />
                {fieldErrors.name && (
                  <p id="err-name" role="alert" style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-email" className={styles.label}>Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="your@email.com"
                  className={styles.input}
                  aria-describedby={fieldErrors.email ? 'err-email' : undefined}
                  aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email && (
                  <p id="err-email" role="alert" style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="contact-message" className={styles.label}>Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell me about your project..."
                  className={`${styles.input} ${styles.textarea}`}
                  aria-describedby={fieldErrors.message ? 'err-message' : undefined}
                  aria-invalid={!!fieldErrors.message}
                />
                {fieldErrors.message && (
                  <p id="err-message" role="alert" style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '4px' }}>
                    {fieldErrors.message}
                  </p>
                )}
              </div>

              {error && (
                <p role="alert" style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  {error}
                </p>
              )}
              <Button
                type="submit"
                variant="primary"
                id="contact-submit-btn"
                disabled={sending}
                style={{ width: '100%', justifyContent: 'center', opacity: sending ? 0.7 : 1 }}
              >
                {sending ? 'Sending…' : 'Send Message'}
              </Button>
            </form>

          )}
        </div>
      </div>
    </section>
  )
}
