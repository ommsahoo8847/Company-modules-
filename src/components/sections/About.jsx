import React, { useState } from 'react'
import { Button } from '../ui/Button.jsx'
import { Badge } from '../ui/Badge.jsx'
import { DisciplineModal } from '../ui/DisciplineModal.jsx'
import { playBottleCapPop } from '../../utils/audio.js'
import styles from './About.module.css'

const DISCIPLINES = [
  'Aerodynamics & CFD', 'Carbon Composite Monocoques', 'Hybrid Powertrains',
  'V16 & V12 Combustion', 'Sequential & DCT Gearboxes', 'Active Aero Telemetry',
  'Motorsport Homologation', 'Horological Instrumentation', 'Bespoke Coachbuilding',
  'Kinematic Suspension', 'Traction Control Systems', 'Weight Optimization',
]

export default function About() {
  const [activeDiscipline, setActiveDiscipline] = useState(null)

  const handleDisciplineClick = (name) => {
    playBottleCapPop()
    setActiveDiscipline(name)
  }

  const handleClose = () => {
    setActiveDiscipline(null)
  }

  return (
    <>
      <section id="about" className={`${styles.section} section`} aria-label="About section">
        {/* Background ambient glow */}
        <div className={styles.ambientGlow} aria-hidden="true" />

        <div className={`container ${styles.inner}`}>

          {/* Left — identity block */}
          <div className={styles.identityCol}>
            <div className="section-label">Engineering Ethos</div>

            <h2 className={styles.headline}>
              Obsessive engineering.<br />
              <span className={styles.headlineAccent}>Uncompromised velocity.</span>
            </h2>

            <p className={styles.bio}>
              Automotive engineering at the extreme is an art form driven by physics, metallurgy,
              and computational aerodynamics. From Bugatti's monumental naturally aspirated V16 hybrid
              orchestrated with horological mechanical precision, to Kalmar's 930 HP pushrod retro hypercar,
              and Ferrari's bespoke one-off aerodynamic sculptures crafted in Maranello.
            </p>
            <p className={styles.bio}>
              This archive curates and analyzes peak benchmarks across hypercars, customer GT4 racing
              programs, carbon-monocell spiders, and endurance legends like Peugeot Sport's diesel Le Mans titan.
              Every metric is verified against authentic manufacturer factory specifications and race telemetry.
            </p>

            <div className={styles.ctaRow}>
              <Button as="a" href="#work" variant="primary" id="about-explore-btn">
                Explore Vehicle Dossiers
              </Button>
              <Button
                as="a"
                href="#contact"
                variant="ghost"
                id="contact-archive-btn"
              >
                Inquire / Request Data
              </Button>
            </div>
          </div>

          {/* Right — skills / tools */}
          <div className={styles.skillsCol}>
            <div className={styles.skillsCard}>
              {/* Availability badge */}
              <div className={styles.availRow}>
                <Badge variant="live">Live Telemetry Archive</Badge>
                <span className={styles.availNote}>Verified Manufacturer Specs</span>
              </div>

              <div className={styles.skillsDivider} />

              <p className={styles.skillsLabel}>Engineering Disciplines</p>
              <p className={styles.tapHint}>Tap any discipline for a detailed technical dossier</p>
              <div className={styles.toolsGrid}>
                {DISCIPLINES.map(item => (
                  <button
                    key={item}
                    className={styles.toolBadge}
                    onClick={() => handleDisciplineClick(item)}
                    aria-label={`Open detailed knowledge for ${item}`}
                    title={`Tap to explore ${item}`}
                    type="button"
                  >
                    {item}
                    <span className={styles.badgeArrow} aria-hidden="true">›</span>
                  </button>
                ))}
              </div>

              <div className={styles.skillsDivider} />

              {/* Stats row */}
              <div className={styles.statsRow}>
                {[
                  { value: '1,800 HP', label: 'Max Output' },
                  { value: '445 km/h', label: 'Top Velocity' },
                  { value: '1,200 Nm', label: 'Le Mans Peak' },
                  { value: '6',        label: 'Marques' },
                ].map(stat => (
                  <div key={stat.label} className={styles.stat}>
                    <span className={styles.statValue}>{stat.value}</span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Discipline Knowledge Modal */}
      {activeDiscipline && (
        <DisciplineModal
          discipline={activeDiscipline}
          onClose={handleClose}
        />
      )}
    </>
  )
}
