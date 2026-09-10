import React from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'
import { Button } from '../ui/Button.jsx'
import styles from './Navbar.module.css'

const TICKER_ITEMS = [
  'Bugatti Tourbillon · 1,800 HP V16 Hybrid',
  'Kalmar 9X9 · 930 HP AWD Retro Hypercar',
  'Ferrari HC25 · Special Projects 720 CV Twin-Turbo V8',
  'McLaren 12C Spider · 625 PS Carbon MonoCell',
  'BMW M4 GT4 · S58 M TwinPower Turbo 550 HP',
  'Peugeot 908 HDi FAP · LMP1 Le Mans Champion 1,200 Nm',
  '3D V16 Firing Cycle Telemetry Active',
]

/* Duplicate for seamless infinite scroll */
const TICKER_ALL = [...TICKER_ITEMS, ...TICKER_ITEMS]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <nav className={styles.navbar} aria-label="Site navigation">
      {/* Brand logo */}
      <a href="#hero" className={styles.brandLogo} aria-label="Gudu Home">
        <span className={styles.brandText}>GUDU</span>
        <span className={styles.brandDot} aria-hidden="true" />
      </a>

      {/* Scrolling ticker */}
      <div className={styles.tickerWrapper} aria-hidden="true">
        <div className={styles.tickerTrack}>
          {TICKER_ALL.map((item, i) => (
            <React.Fragment key={i}>
              <span className={styles.tickerItem}>{item}</span>
              <span className={styles.tickerDot} />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right-side controls */}
      <div className={styles.controls}>
        <Button
          variant="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          id="theme-toggle-btn"
          className={styles.themeBtn}
        >
          {isDark ? (
            /* Sun icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            /* Moon icon */
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </Button>
      </div>
    </nav>
  )
}
