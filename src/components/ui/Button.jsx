import React from 'react'
import styles from './Button.module.css'

/**
 * Button — Obsidian Kinetic design system
 * @param {'primary' | 'ghost' | 'icon'} variant
 */
export function Button({
  variant = 'primary',
  children,
  className = '',
  as: Tag = 'button',
  href,
  id,
  onClick,
  type = 'button',
  disabled = false,
  'aria-label': ariaLabel,
  ...rest
}) {
  const tag = href ? 'a' : Tag
  return React.createElement(
    tag,
    {
      id,
      href,
      onClick,
      type: tag === 'button' ? type : undefined,
      disabled: tag === 'button' ? disabled : undefined,
      'aria-label': ariaLabel,
      className: [styles.btn, styles[variant], className].filter(Boolean).join(' '),
      ...rest,
    },
    children
  )
}
