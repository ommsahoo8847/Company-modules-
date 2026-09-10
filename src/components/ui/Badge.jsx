import React from 'react'
import styles from './Badge.module.css'

/**
 * Badge — technical tag / live-status variant
 * @param {'tech' | 'live'} variant
 */
export function Badge({ variant = 'tech', children, className = '' }) {
  return (
    <span className={[styles.badge, styles[variant], className].filter(Boolean).join(' ')}>
      {variant === 'live' && (
        <span className={styles.dot} aria-hidden="true" />
      )}
      {children}
    </span>
  )
}
