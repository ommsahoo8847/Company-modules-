import React from 'react'
import styles from './Footer.module.css'

const SOCIAL_LINKS = [
  { id: 'footer-github',   href: 'https://github.com',   label: 'GitHub' },
  { id: 'footer-twitter',  href: 'https://twitter.com',  label: 'Twitter' },
  { id: 'footer-linkedin', href: 'https://linkedin.com', label: 'LinkedIn' },
  { id: 'footer-behance',  href: 'https://behance.net',  label: 'Behance' },
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
