import React, { useEffect, useState } from 'react'
import { Badge } from './Badge.jsx'
import { Button } from './Button.jsx'
import { playBottleCapPop, playClosePop } from '../../utils/audio.js'
import styles from './SpecModal.module.css'

export function SpecModal({ car, onClose }) {
  const [photoLightboxOpen, setPhotoLightboxOpen] = useState(false)

  const handleCloseModal = () => {
    playClosePop()
    if (onClose) onClose()
  }

  const handleOpenPhoto = () => {
    playBottleCapPop()
    setPhotoLightboxOpen(true)
  }

  const handleClosePhoto = () => {
    playClosePop()
    setPhotoLightboxOpen(false)
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        if (photoLightboxOpen) {
          handleClosePhoto()
        } else {
          handleCloseModal()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [photoLightboxOpen, onClose])

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
    <>
      <div
        className={styles.backdrop}
        onClick={handleCloseModal}
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
            onClick={handleCloseModal}
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

          {/* Hero Media Preview (Clickable to open high-res photo lightbox) */}
          <div
            className={styles.mediaWrap}
            onClick={handleOpenPhoto}
            role="button"
            tabIndex={0}
            aria-label="Enlarge high-resolution photo"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleOpenPhoto()
              }
            }}
          >
            <img src={image} alt={`${title} by ${company}`} className={styles.image} />
            <div className={styles.zoomHintBadge}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="11" y1="8" x2="11" y2="14"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
              </svg>
              <span>Tap photo to expand</span>
            </div>
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
          <Button variant="ghost" onClick={handleCloseModal}>
            Close Dossier
          </Button>
          <Button
            variant="primary"
            onClick={handleOpenPhoto}
            aria-label="View high-resolution photo"
          >
            🔍 View High-Res Photo
          </Button>
        </div>
      </div>
    </div>

    {/* Fullscreen Photo Lightbox Modal */}
    {photoLightboxOpen && (
      <div
        className={styles.photoLightboxBackdrop}
        onClick={handleClosePhoto}
        role="dialog"
        aria-modal="true"
        aria-label={`Photo viewer for ${title}`}
      >
        <div
          className={styles.photoLightboxContent}
          onClick={e => e.stopPropagation()}
        >
          {/* Close Photo Lightbox Button */}
          <button
            className={styles.photoCloseBtn}
            onClick={handleClosePhoto}
            aria-label="Close photo preview"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Full Resolution Photo */}
          <div className={styles.photoFrame} onClick={handleClosePhoto}>
            <img
              src={image}
              alt={`${title} full high-resolution vehicle photo`}
              className={styles.fullPhoto}
            />
          </div>

          {/* Lightbox Info Bar */}
          <div className={styles.photoInfoBar}>
            <div className={styles.photoMeta}>
              <span className={styles.photoCompany}>{company}</span>
              <span className={styles.photoTitle}>{title} ({year})</span>
            </div>
            <div className={styles.photoActions}>
              <span className={styles.photoHint}>Tap anywhere or ESC to close</span>
              <a
                href={image}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.photoExternalLink}
                title="Open original file in new tab"
              >
                Raw File ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  )
}
