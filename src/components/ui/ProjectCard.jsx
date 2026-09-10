import React from 'react'
import styles from './ProjectCard.module.css'

/**
 * ProjectCard — Obsidian Kinetic automotive telemetry showcase card
 * Displays authentic manufacturer details, quick specs, and triggers detailed modal
 */
export function ProjectCard({ project, onSelect }) {
  const { title, company, tagline, tags, year, image, quickSpecs } = project

  return (
    <article
      className={styles.card}
      aria-label={`Vehicle: ${title} by ${company}`}
      onClick={() => onSelect && onSelect(project)}
      tabIndex={0}
      role="button"
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect && onSelect(project)
        }
      }}
    >
      {/* Media thumbnail */}
      <div className={styles.media}>
        <img
          src={image}
          alt={`${title} — ${tagline}`}
          className={styles.thumb}
          loading="lazy"
        />

        {/* Company watermark badge */}
        <div className={styles.companyBadge}>
          <span>{company}</span>
        </div>

        {/* Hover overlay */}
        <div className={styles.overlay} aria-hidden="true">
          <span className={styles.viewLabel}>View Full Specifications</span>
        </div>
      </div>

      {/* Card Body & Specs */}
      <div className={styles.content}>
        <div className={styles.metaHeader}>
          <div>
            <span className={styles.companySub}>{company}</span>
            <h3 className={styles.title}>{title}</h3>
          </div>
          <span className={styles.year}>{year}</span>
        </div>

        <p className={styles.tagline}>{tagline}</p>

        {/* Quick Specs Strip */}
        {quickSpecs && (
          <div className={styles.quickSpecsGrid}>
            {quickSpecs.map((spec, i) => (
              <div key={i} className={styles.quickSpecItem}>
                <span className={styles.quickSpecLabel}>{spec.label}</span>
                <span className={styles.quickSpecValue}>{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Card Footer tags */}
        <footer className={styles.footer}>
          <div className={styles.tags}>
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <button
            type="button"
            className={styles.inspectBtn}
            onClick={(e) => {
              e.stopPropagation()
              onSelect && onSelect(project)
            }}
          >
            Telemetry & Specs →
          </button>
        </footer>
      </div>

      {/* Ambient glow (behind card on hover) */}
      <div className={styles.glow} aria-hidden="true" />
    </article>
  )
}
