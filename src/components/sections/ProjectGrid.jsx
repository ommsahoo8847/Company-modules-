import React, { useState, useMemo } from 'react'
import { Chip } from '../ui/Chip.jsx'
import { ProjectCard } from '../ui/ProjectCard.jsx'
import { SpecModal } from '../ui/SpecModal.jsx'
import { projects, categories } from '../../data/projects.js'
import styles from './ProjectGrid.module.css'

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedCar, setSelectedCar] = useState(null)

  const filtered = useMemo(() =>
    activeCategory === 'all'
      ? projects
      : projects.filter(p => p.category === activeCategory),
    [activeCategory]
  )

  return (
    <section id="work" className={`${styles.section} section`} aria-label="Automotive specifications showcase">
      <div className="container">
        {/* Section header */}
        <header className={styles.header}>
          <div className="section-label">Performance Dossier</div>
          <h2 className={styles.headline}>
            Apex Machines &<br />
            <span className={styles.headlineAccent}>Technical Specs</span>
          </h2>
          <p className={styles.subtext}>
            Explore authentic technical specifications, factory telemetry, and engineering innovations
            from Bugatti, Ferrari Special Projects, BMW M Motorsport, and Peugeot Sport.
          </p>
        </header>

        {/* Filter chips */}
        <nav aria-label="Filter machines by category" className={styles.filters}>
          {categories.map(cat => (
            <Chip
              key={cat.id}
              id={`filter-${cat.id}`}
              active={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </Chip>
          ))}
        </nav>

        {/* Project grid */}
        <div className={styles.grid} role="list">
          {filtered.map(car => (
            <div key={car.slug} role="listitem">
              <ProjectCard project={car} onSelect={setSelectedCar} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={styles.empty}>No vehicles found in this category.</p>
        )}
      </div>

      {/* Interactive Specifications Modal */}
      {selectedCar && (
        <SpecModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}
    </section>
  )
}
