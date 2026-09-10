import React from 'react'
import styles from './Divider.module.css'

/** Divider — 1px horizontal rule per design.md */
export function Divider({ className = '' }) {
  return <hr className={[styles.divider, className].filter(Boolean).join(' ')} aria-hidden="true" />
}
