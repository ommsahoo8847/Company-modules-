import React, { useEffect, useRef } from 'react'
import { DISCIPLINE_DATA } from '../../data/disciplines.js'
import { playBottleCapPop, playClosePop } from '../../utils/audio.js'
import styles from './DisciplineModal.module.css'

export function DisciplineModal({ discipline, onClose }) {
  const data = DISCIPLINE_DATA[discipline]
  const modalRef = useRef(null)

  useEffect(() => {
    if (!discipline) return
    function handleKey(e) {
      if (e.key === 'Escape') {
        playClosePop()
        onClose()
      }
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    // Focus trap
    if (modalRef.current) {
      modalRef.current.focus()
    }
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [discipline, onClose])

  if (!discipline || !data) return null

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
      aria-labelledby="discipline-modal-title"
    >
      <div
        ref={modalRef}
        className={styles.panel}
        onClick={e => e.stopPropagation()}
        tabIndex={-1}
        style={{ '--accent': data.color }}
      >
        {/* Close button */}
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close discipline detail"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Accent glow behind panel */}
        <div className={styles.accentGlow} aria-hidden="true" />

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconRow}>
            <span className={styles.icon} aria-hidden="true">{data.icon}</span>
            <div className={styles.categoryPill}>{data.category}</div>
          </div>
          <h2 id="discipline-modal-title" className={styles.title}>
            {discipline}
          </h2>
          <p className={styles.tagline}>{data.tagline}</p>
        </div>

        {/* Scrollable body */}
        <div className={styles.body}>

          {/* Overview */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionDot} />
              Engineering Overview
            </h3>
            {data.overview.split('\n\n').map((para, i) => (
              <p key={i} className={styles.para}>{para}</p>
            ))}
          </section>

          {/* Metrics grid */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionDot} />
              Key Metrics
            </h3>
            <div className={styles.metricsGrid}>
              {data.metrics.map(m => (
                <div key={m.label} className={styles.metricCard}>
                  <span className={styles.metricValue}>{m.value}</span>
                  <span className={styles.metricLabel}>{m.label}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Key Facts */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionDot} />
              Technical Highlights
            </h3>
            <ul className={styles.factsList}>
              {data.keyFacts.map((fact, i) => (
                <li key={i} className={styles.factItem}>
                  <span className={styles.factBullet}>›</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Related cars */}
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.sectionDot} />
              Featured In
            </h3>
            <div className={styles.carPills}>
              {data.relatedCars.map(car => (
                <a
                  key={car}
                  href="#work"
                  className={styles.carPill}
                  onClick={handleClose}
                  aria-label={`View ${car} specifications`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  {car}
                </a>
              ))}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.footerClose} onClick={handleClose}>
            Close Dossier
          </button>
          <a href="#work" className={styles.footerExplore} onClick={handleClose}>
            Explore Vehicle Specs →
          </a>
        </div>
      </div>
    </div>
  )
}
