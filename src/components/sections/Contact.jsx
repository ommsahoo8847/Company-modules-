import React, { useState } from 'react'
import { Button } from '../ui/Button.jsx'
import styles from './Contact.module.css'

const SOCIAL = [
  { id: 'contact-github',   href: 'https://github.com',   label: 'GitHub'   },
  { id: 'contact-twitter',  href: 'https://twitter.com',  label: 'Twitter'  },
  { id: 'contact-linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
  { id: 'contact-behance',  href: 'https://behance.net',  label: 'Behance'  },
]

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // Formspree-ready: change action to https://formspree.io/f/YOUR_ID
    setSubmitted(true)
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
              <p className={styles.successTitle}>Message received.</p>
              <p className={styles.successBody}>I'll get back to you within 48 hours.</p>
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
                />
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
                />
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
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                id="contact-submit-btn"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
