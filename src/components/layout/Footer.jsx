import React from 'react'
import styles from './Footer.module.css'

// Real profile URLs
const SOCIAL_LINKS = [
  { id: 'footer-github',   href: 'https://github.com/ommsahoo8847',                          label: 'GitHub'   },
  { id: 'footer-x',        href: 'https://x.com/_Omm_Sahoo_',                               label: 'X'        },
  { id: 'footer-linkedin', href: 'https://www.linkedin.com/in/omm-prakash-sahoo-7650bb379/', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.inner}>
        {/* Brand */}
        <span className={styles.brand}>GUDU</span>

        {/* Social links */}
        <nav aria-label="Social links" className={styles.social}>
          {SOCIAL_LINKS.map(link => (
            <a
              key={link.id}
              id={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} profile`}
              className={styles.socialLink}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <p className={styles.copy}>
          © {new Date().getFullYear()} — Crafted with precision
        </p>
      </div>
    </footer>
  )
}
