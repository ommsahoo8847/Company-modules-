import React, { useEffect } from 'react'
import { Badge } from './Badge.jsx'
import { Button } from './Button.jsx'
import styles from './SpecModal.module.css'

export function SpecModal({ car, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!car) return null

  const {
    title,
    company,
    companyFull,
    model,
    year,
    category,
    image,
    description,
    specs,
    highlights,
    tags,
  } = car

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-car-title"
    >
      <div
        className={styles.modal}
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close specifications modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Modal Header */}
        <div className={styles.header}>
          <div className={styles.companyBadgeRow}>
            <span className={styles.companyTag}>{company}</span>
            <span className={styles.companyDivider}>•</span>
            <span className={styles.companyFullName}>{companyFull}</span>
            <Badge variant="tech" className={styles.yearBadge}>{year}</Badge>
          </div>
          <h2 id="modal-car-title" className={styles.title}>{title}</h2>
          <p className={styles.tagline}>{car.tagline}</p>
        </div>

        {/* Hero Media Preview */}
        <div className={styles.mediaWrap}>
          <img src={image} alt={`${title} by ${company}`} className={styles.image} />
          <div className={styles.mediaOverlay}>
            <div className={styles.mediaTags}>
              {tags.map(t => (
                <span key={t} className={styles.tagPill}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          {/* Key Telemetry Stats Grid */}
          <div className={styles.telemetryGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>MAX OUTPUT</span>
              <span className={styles.statValue}>{specs.power}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>PEAK TORQUE</span>
              <span className={styles.statValue}>{specs.torque}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>0-100 KM/H</span>
              <span className={styles.statValue}>{specs.acceleration0100}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>TOP VELOCITY</span>
              <span className={styles.statValue}>{specs.topSpeed}</span>
            </div>
          </div>

          {/* Full Technical Specifications Matrix */}
          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>Technical Specification Dossier</h3>
            <div className={styles.specsTable}>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Manufacturer</span>
                <span className={styles.specVal}>{companyFull}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Engine / Powertrain</span>
                <span className={styles.specVal}>{specs.powertrain}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Transmission</span>
                <span className={styles.specVal}>{specs.transmission}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Drivetrain Configuration</span>
                <span className={styles.specVal}>{specs.drivetrain}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Redline</span>
                <span className={styles.specVal}>{specs.redline}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Chassis & Body Architecture</span>
                <span className={styles.specVal}>{specs.chassis}</span>
              </div>
              <div className={styles.specRow}>
                <span className={styles.specKey}>Curb Weight / Regulation</span>
                <span className={styles.specVal}>{specs.weight}</span>
              </div>
              {specs.battery && (
                <div className={styles.specRow}>
                  <span className={styles.specKey}>Electrical / Energy Storage</span>
                  <span className={styles.specVal}>{specs.battery}</span>
                </div>
              )}
            </div>
          </div>

          {/* Narrative & Engineering Innovations */}
          <div className={styles.sectionBlock}>
            <h3 className={styles.sectionHeading}>Engineering Overview</h3>
            <p className={styles.description}>{description}</p>
          </div>

          {highlights && highlights.length > 0 && (
            <div className={styles.sectionBlock}>
              <h3 className={styles.sectionHeading}>Key Technical Innovations</h3>
              <ul className={styles.highlightsList}>
                {highlights.map((item, idx) => (
                  <li key={idx} className={styles.highlightItem}>
                    <span className={styles.bulletPoint}>›</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className={styles.footer}>
          <Button variant="ghost" onClick={onClose}>
            Close Dossier
          </Button>
          <Button
            as="a"
            href={image}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            Open High-Res Photo (Full Size)
          </Button>
        </div>
      </div>
    </div>
  )
}
