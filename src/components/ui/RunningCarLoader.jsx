import React from 'react'
import styles from './RunningCarLoader.module.css'

export function RunningCarLoader() {
  return (
    <div className={styles.loaderWrap} aria-label="Loading simulation">
      {/* Car & Road Stage */}
      <div className={styles.carStage}>
        {/* Exhaust Flame Spark */}
        <div className={styles.exhaustFlame} />

        {/* Supercar Vector Model */}
        <svg
          className={styles.carSvg}
          viewBox="0 0 150 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Headlight Beam Glow */}
          <polygon
            points="140,24 165,16 165,34 140,28"
            fill="url(#headlightBeam)"
            opacity="0.35"
          />

          <defs>
            <linearGradient id="carBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="40%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>

            <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0369A1" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Supercar Aerodynamic Body Shell */}
          <path
            d="M 12 28 
               L 16 26 
               L 28 25 
               L 42 16 
               L 72 13 
               L 100 15 
               L 122 22 
               L 138 25 
               L 142 28 
               L 142 32 
               L 134 33 
               C 134 33, 131 24, 118 24 
               C 105 24, 102 33, 102 33 
               L 56 33 
               C 56 33, 53 24, 40 24 
               C 27 24, 24 33, 24 33 
               L 12 33 
               Z"
            fill="url(#carBodyGrad)"
            stroke="#06B6D4"
            strokeWidth="1.2"
          />

          {/* Rear GT Wing / Spoiler */}
          <path
            d="M 10 21 L 22 20 L 21 23 L 13 23 Z"
            fill="#06B6D4"
            stroke="#22D3EE"
            strokeWidth="0.8"
          />
          <line x1="16" y1="23" x2="16" y2="26" stroke="#06B6D4" strokeWidth="1.2" />

          {/* Cockpit Windshield & Window Glass */}
          <path
            d="M 45 18 L 70 15 L 94 17 L 114 23 L 68 23 Z"
            fill="url(#glassGrad)"
            stroke="#67E8F9"
            strokeWidth="0.8"
          />

          {/* Aerodynamic Side Blade Accent Line */}
          <path
            d="M 52 28 Q 75 25 98 28"
            stroke="#FDE68A"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Glowing LED Headlight */}
          <polygon points="137,25 142,27 137,28" fill="#FDE68A" />

          {/* Tail Light Strip */}
          <line x1="12" y1="28" x2="14" y2="30" stroke="#EF4444" strokeWidth="1.5" />

          {/* Front Running Wheel */}
          <g className={styles.wheel} transform="translate(118, 33)">
            {/* Tyre */}
            <circle cx="0" cy="0" r="9.5" fill="#0B0F17" stroke="#334155" strokeWidth="2" />
            {/* Rim Lip */}
            <circle cx="0" cy="0" r="7" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
            {/* Spinning Spokes */}
            <g className={styles.spinSpokes}>
              <line x1="-6" y1="0" x2="6" y2="0" stroke="#FFFFFF" strokeWidth="1.2" />
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#FFFFFF" strokeWidth="1.2" />
              <line x1="-4.5" y1="-4.5" x2="4.5" y2="4.5" stroke="#FDE68A" strokeWidth="1" />
              <line x1="-4.5" y1="4.5" x2="4.5" y2="-4.5" stroke="#FDE68A" strokeWidth="1" />
              <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
            </g>
          </g>

          {/* Rear Running Wheel */}
          <g className={styles.wheel} transform="translate(40, 33)">
            {/* Tyre */}
            <circle cx="0" cy="0" r="9.5" fill="#0B0F17" stroke="#334155" strokeWidth="2" />
            {/* Rim Lip */}
            <circle cx="0" cy="0" r="7" fill="#0284C7" stroke="#38BDF8" strokeWidth="1" />
            {/* Spinning Spokes */}
            <g className={styles.spinSpokes}>
              <line x1="-6" y1="0" x2="6" y2="0" stroke="#FFFFFF" strokeWidth="1.2" />
              <line x1="0" y1="-6" x2="0" y2="6" stroke="#FFFFFF" strokeWidth="1.2" />
              <line x1="-4.5" y1="-4.5" x2="4.5" y2="4.5" stroke="#FDE68A" strokeWidth="1" />
              <line x1="-4.5" y1="4.5" x2="4.5" y2="-4.5" stroke="#FDE68A" strokeWidth="1" />
              <circle cx="0" cy="0" r="2.2" fill="#FFFFFF" />
            </g>
          </g>

          {/* Moving Road Surface Line */}
          <line
            x1="0"
            y1="44"
            x2="150"
            y2="44"
            className={styles.roadLine}
            stroke="#06B6D4"
            strokeWidth="1.5"
            strokeDasharray="8 6"
          />
        </svg>
      </div>

      {/* Loading Telemetry Bar */}
      <div className={styles.loadingInfo}>
        <div className={styles.labelRow}>
          <span className={styles.loadingLabel}>DYNO SPEED TEST</span>
          <span className={styles.speedMetric}>345 KM/H</span>
        </div>
        <div className={styles.track}>
          <div className={styles.fillBar} />
        </div>
      </div>
    </div>
  )
}
