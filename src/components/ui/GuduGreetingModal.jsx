import React, { useEffect, useRef } from 'react'
import guduPhoto from '../../assets/gudu-photo.jpg'
import { playClosePop } from '../../utils/audio.js'
import styles from './GuduGreetingModal.module.css'

export function GuduGreetingModal({ isOpen, onClose }) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        playClosePop()
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    if (modalRef.current) {
      modalRef.current.focus()
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleClose = () => {
    playClosePop()
    onClose()
  }

  return (
    <div
      className={styles.backdrop}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="gudu-modal-title"
    >
      <div
        ref={modalRef}
        className={styles.card}
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Close Button */}
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close greeting"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Ambient Glow */}
        <div className={styles.glow} aria-hidden="true" />

        {/* Header Badge */}
        <div className={styles.badgeRow}>
          <span className={styles.badge}>
            <span className={styles.pulseDot} aria-hidden="true" />
            GUDU · Personal Note
          </span>
        </div>

        {/* Photo Container */}
        <div className={styles.photoFrame}>
          <img
            src={guduPhoto}
            alt="Omm Prakash Sahoo (Gudu)"
            className={styles.photo}
            loading="eager"
          />
          <div className={styles.photoOverlay} aria-hidden="true" />
        </div>

        {/* Greeting Content */}
        <div className={styles.content}>
          <h3 id="gudu-modal-title" className={styles.title}>
            Thank you for visiting my website!
            <span className={styles.waveHand} aria-hidden="true"> 👋</span>
          </h3>

          <p className={styles.description}>
            Hey there! I'm <strong>Omm Prakash Sahoo (GUDU)</strong>. Thank you so much for taking the time to explore my automotive engineering, vehicle dossiers, and telemetry showcase.
          </p>

          <p className={styles.subtext}>
            Whether you're here for bespoke automotive design, telemetry visualizations, or to collaborate on creative engineering projects — I'd love to connect!
          </p>

          {/* Social Links */}
          <div className={styles.socialRow}>
            <a
              href="https://github.com/ommsahoo8847"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              GitHub ↗
            </a>
            <a
              href="https://x.com/_Omm_Sahoo_"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              X (Twitter) ↗
            </a>
            <a
              href="https://www.linkedin.com/in/omm-prakash-sahoo-7650bb379/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              LinkedIn ↗
            </a>
          </div>

          {/* Action Button */}
          <button
            type="button"
            className={styles.actionBtn}
            onClick={handleClose}
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  )
}
