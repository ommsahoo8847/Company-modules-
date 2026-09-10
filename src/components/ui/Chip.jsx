import React from 'react'
import styles from './Chip.module.css'

/**
 * Chip — filter / category tag
 * @param {boolean} active  - highlights chip as selected
 */
export function Chip({ children, active = false, onClick, id, className = '' }) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[styles.chip, active ? styles.active : '', className].filter(Boolean).join(' ')}
    >
      {children}
    </button>
  )
}
