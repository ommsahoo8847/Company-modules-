import React, { useEffect, useRef, useState } from 'react'
import { Badge } from '../ui/Badge.jsx'
import { Button } from '../ui/Button.jsx'
import styles from './Hero.module.css'

/* ── 3D V16 Car Engine Canvas Simulation ── */
function useV16EngineCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, cx, cy
    let t = 0
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0
    let rafId

    function resize() {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      cx = W / 2
      cy = H / 2
    }
    resize()
    window.addEventListener('resize', resize)

    function onMouse(e) {
      targetMouseX = (e.clientX / W - 0.5) * 2
      targetMouseY = (e.clientY / H - 0.5) * 2
    }
    document.addEventListener('mousemove', onMouse)

    // Firing order for 16 cylinders (8 per bank)
    const FIRING_ORDER = [0, 11, 7, 10, 6, 13, 4, 15, 3, 14, 2, 9, 5, 8, 1, 12]

    // Floating telemetry particles
    const PARTICLE_COUNT = 45
    const particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 350,
        y: (Math.random() - 0.5) * 250,
        z: (Math.random() - 0.5) * 350,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -Math.random() * 0.8 - 0.2,
        vz: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        color: Math.random() < 0.6 ? 'rgba(6, 182, 212, ' : 'rgba(245, 158, 11, ',
        alpha: Math.random() * 0.7 + 0.3,
      })
    }

    function render() {
      ctx.clearRect(0, 0, W, H)

      // Smooth mouse follow
      mouseX += (targetMouseX - mouseX) * 0.06
      mouseY += (targetMouseY - mouseY) * 0.06

      t += 0.02
      const rpmPhase = t * 6.0 // Engine crankshaft speed

      // Rotation angles: continuous Y rotation + subtle X oscillation + mouse tilt
      const rotY = t * 0.16 + mouseX * 0.35
      const rotX = -0.32 + Math.sin(t * 0.3) * 0.04 + mouseY * 0.25

      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      // Dynamic scale
      const scale = Math.min(W, H) / 950
      const fov = 1100

      // 3D to 2D projection helper
      function project(x, y, z) {
        // Rotate Y
        const x1 = x * cosY - z * sinY
        const z1 = x * sinY + z * cosY
        // Rotate X
        const y2 = y * cosX - z1 * sinX
        const z2 = y * sinX + z1 * cosX

        const pz = z2 + 650
        const s = (fov / Math.max(10, pz)) * scale
        return {
          x: cx + x1 * s,
          y: cy + y2 * s,
          z: z2,
          scale: s,
        }
      }

      // 3D Render Queue for depth sorting
      const renderQueue = []

      // 1. Ambient center volumetric glow
      const glowGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, Math.min(W, H) * 0.38)
      glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.12)')
      glowGrad.addColorStop(0.4, 'rgba(99, 102, 241, 0.06)')
      glowGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = glowGrad
      ctx.fillRect(0, 0, W, H)

      // 2. Build 3D Engine Geometry
      // Engine Dimensions:
      const CYLINDERS_PER_BANK = 8
      const BORE_SPACING = 36
      const TOTAL_LENGTH = (CYLINDERS_PER_BANK - 1) * BORE_SPACING
      const START_Z = -TOTAL_LENGTH / 2
      const BANK_ANGLE = Math.PI / 4 // 45° from vertical (90° V-Angle)
      const BANK_RADIUS = 72

      // ── CRANKCASE LOWER BLOCK ──
      const blockHalfW = 62
      const blockTopY = -10
      const blockBotY = 70
      const blockZ1 = START_Z - 35
      const blockZ2 = START_Z + TOTAL_LENGTH + 35

      // Crankcase longitudinal structural ribs
      renderQueue.push({
        type: 'lines',
        z: 0,
        draw: () => {
          ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)'
          ctx.lineWidth = 1.2
          const ribSteps = 9
          for (let i = 0; i <= ribSteps; i++) {
            const rz = blockZ1 + (i / ribSteps) * (blockZ2 - blockZ1)
            const p1 = project(-blockHalfW, blockTopY, rz)
            const p2 = project(blockHalfW, blockTopY, rz)
            const p3 = project(blockHalfW * 0.7, blockBotY, rz)
            const p4 = project(-blockHalfW * 0.7, blockBotY, rz)

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.lineTo(p3.x, p3.y)
            ctx.lineTo(p4.x, p4.y)
            ctx.closePath()
            ctx.stroke()
          }

          // Main long rails
          const r1a = project(-blockHalfW, blockTopY, blockZ1)
          const r1b = project(-blockHalfW, blockTopY, blockZ2)
          const r2a = project(blockHalfW, blockTopY, blockZ1)
          const r2b = project(blockHalfW, blockTopY, blockZ2)
          const r3a = project(-blockHalfW * 0.7, blockBotY, blockZ1)
          const r3b = project(-blockHalfW * 0.7, blockBotY, blockZ2)
          const r4a = project(blockHalfW * 0.7, blockBotY, blockZ1)
          const r4b = project(blockHalfW * 0.7, blockBotY, blockZ2)

          ctx.beginPath()
          ctx.moveTo(r1a.x, r1a.y); ctx.lineTo(r1b.x, r1b.y)
          ctx.moveTo(r2a.x, r2a.y); ctx.lineTo(r2b.x, r2b.y)
          ctx.moveTo(r3a.x, r3a.y); ctx.lineTo(r3b.x, r3b.y)
          ctx.moveTo(r4a.x, r4a.y); ctx.lineTo(r4b.x, r4b.y)
          ctx.stroke()
        },
      })

      // ── CRANKSHAFT AXIS & FLYWHEEL ──
      const crankY = 42
      const flywheelZ = blockZ1 - 10
      renderQueue.push({
        type: 'flywheel',
        z: project(0, crankY, flywheelZ).z,
        draw: () => {
          const fc = project(0, crankY, flywheelZ)
          const fRadius = 55 * fc.scale
          ctx.beginPath()
          ctx.arc(fc.x, fc.y, fRadius, 0, Math.PI * 2)
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)'
          ctx.lineWidth = 1.8
          ctx.stroke()

          // Flywheel ring teeth
          const teeth = 16
          for (let i = 0; i < teeth; i++) {
            const angle = (i / teeth) * Math.PI * 2 + t * 4
            const tx1 = fc.x + Math.cos(angle) * (fRadius - 4)
            const ty1 = fc.y + Math.sin(angle) * (fRadius - 4)
            const tx2 = fc.x + Math.cos(angle) * (fRadius + 3)
            const ty2 = fc.y + Math.sin(angle) * (fRadius + 3)
            ctx.beginPath()
            ctx.moveTo(tx1, ty1)
            ctx.lineTo(tx2, ty2)
            ctx.stroke()
          }
        },
      })

      // ── FRONT HARMONIC PULLEYS & BELT ──
      const frontZ = blockZ2 + 8
      renderQueue.push({
        type: 'pulleys',
        z: project(0, 0, frontZ).z,
        draw: () => {
          const pMain = project(0, crankY, frontZ)
          const pCamL = project(-BANK_RADIUS * Math.sin(BANK_ANGLE), -BANK_RADIUS * Math.cos(BANK_ANGLE) - 20, frontZ)
          const pCamR = project(BANK_RADIUS * Math.sin(BANK_ANGLE), -BANK_RADIUS * Math.cos(BANK_ANGLE) - 20, frontZ)

          // Serpentine Belt
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)'
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.moveTo(pMain.x, pMain.y)
          ctx.lineTo(pCamR.x, pCamR.y)
          ctx.lineTo(pCamL.x, pCamL.y)
          ctx.closePath()
          ctx.stroke()

          // Three Pulleys
          const drawPulley = (p, r, color) => {
            const rad = r * p.scale
            ctx.beginPath()
            ctx.arc(p.x, p.y, rad, 0, Math.PI * 2)
            ctx.strokeStyle = color
            ctx.lineWidth = 1.6
            ctx.stroke()
            // Rotating spokes
            for (let i = 0; i < 4; i++) {
              const a = (i / 4) * Math.PI * 2 + rpmPhase
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p.x + Math.cos(a) * rad, p.y + Math.sin(a) * rad)
              ctx.stroke()
            }
          }

          drawPulley(pMain, 24, 'rgba(6, 182, 212, 0.8)')
          drawPulley(pCamL, 18, 'rgba(139, 92, 246, 0.8)')
          drawPulley(pCamR, 18, 'rgba(139, 92, 246, 0.8)')
        },
      })

      // ── 16 CYLINDERS (8 ON EACH 45° BANK) ──
      for (let i = 0; i < CYLINDERS_PER_BANK; i++) {
        const cylZ = START_Z + i * BORE_SPACING
        const staggerZ = 10 // Bank stagger

        // Cylinders 0..7: Bank 1 (Right, +45°)
        // Cylinders 8..15: Bank 2 (Left, -45°)
        const banks = [
          { bankIdx: 1, sign: 1, cylIdx: i, zPos: cylZ },
          { bankIdx: 2, sign: -1, cylIdx: i + 8, zPos: cylZ + staggerZ },
        ]

        for (const b of banks) {
          const angle = b.sign * BANK_ANGLE
          const sinA = Math.sin(angle)
          const cosA = Math.cos(angle)

          // Cylinder center along the bore axis
          const baseDist = 20
          const topDist = BANK_RADIUS + 25
          const boreRadius = 14

          // Piston motion
          const firingPhase = (FIRING_ORDER[b.cylIdx] / 16) * Math.PI * 2
          const pistonStroke = Math.cos(rpmPhase + firingPhase)
          const pistonDist = baseDist + (topDist - baseDist) * (0.35 + pistonStroke * 0.3)
          const isFiring = pistonStroke > 0.82

          // Compute 3D points
          const boreCenter3D = {
            x: ((baseDist + topDist) / 2) * sinA,
            y: -((baseDist + topDist) / 2) * cosA,
            z: b.zPos,
          }
          const projectedCenter = project(boreCenter3D.x, boreCenter3D.y, boreCenter3D.z)

          renderQueue.push({
            type: 'cylinder',
            z: projectedCenter.z,
            draw: () => {
              // Draw cylinder sleeve rings (4 rings)
              const ringCount = 4
              ctx.lineWidth = 1.0
              for (let r = 0; r < ringCount; r++) {
                const d = baseDist + (r / (ringCount - 1)) * (topDist - baseDist)
                const rx = d * sinA
                const ry = -d * cosA
                const cp = project(rx, ry, b.zPos)

                // Cylinder elliptical bore
                const rScreen = boreRadius * cp.scale
                ctx.beginPath()
                ctx.ellipse(cp.x, cp.y, rScreen, rScreen * 0.65, -angle, 0, Math.PI * 2)
                ctx.strokeStyle = 'rgba(6, 182, 212, 0.45)'
                ctx.stroke()
              }

              // Piston Head
              const px = pistonDist * sinA
              const py = -pistonDist * cosA
              const pp = project(px, py, b.zPos)
              const pRad = (boreRadius - 1.5) * pp.scale

              ctx.beginPath()
              ctx.ellipse(pp.x, pp.y, pRad, pRad * 0.65, -angle, 0, Math.PI * 2)
              ctx.fillStyle = isFiring ? 'rgba(245, 158, 11, 0.45)' : 'rgba(99, 102, 241, 0.25)'
              ctx.fill()
              ctx.strokeStyle = isFiring ? '#FDE68A' : 'rgba(192, 193, 255, 0.7)'
              ctx.lineWidth = isFiring ? 1.8 : 1.1
              ctx.stroke()

              // Combustion Flame Spark at Top Dead Center (TDC)
              if (isFiring) {
                const topX = (topDist + 4) * sinA
                const topY = -(topDist + 4) * cosA
                const topP = project(topX, topY, b.zPos)

                const sparkGrad = ctx.createRadialGradient(topP.x, topP.y, 0, topP.x, topP.y, 22 * topP.scale)
                sparkGrad.addColorStop(0, '#FFFFFF')
                sparkGrad.addColorStop(0.3, '#FDE68A')
                sparkGrad.addColorStop(0.7, '#F59E0B')
                sparkGrad.addColorStop(1, 'transparent')

                ctx.fillStyle = sparkGrad
                ctx.beginPath()
                ctx.arc(topP.x, topP.y, 22 * topP.scale, 0, Math.PI * 2)
                ctx.fill()

                // Spark spikes
                ctx.strokeStyle = '#FFFFFF'
                ctx.lineWidth = 1.0
                for (let s = 0; s < 4; s++) {
                  const sAngle = (s / 4) * Math.PI * 2 + t * 10
                  const len = 14 * topP.scale
                  ctx.beginPath()
                  ctx.moveTo(topP.x, topP.y)
                  ctx.lineTo(topP.x + Math.cos(sAngle) * len, topP.y + Math.sin(sAngle) * len)
                  ctx.stroke()
                }
              }

              // Intake Velocity Stacks in Center V-Valley
              const stackBaseX = 14 * b.sign
              const stackBaseY = -35
              const stackTopX = 22 * b.sign
              const stackTopY = -85
              const s1 = project(stackBaseX, stackBaseY, b.zPos)
              const s2 = project(stackTopX, stackTopY, b.zPos)

              ctx.strokeStyle = 'rgba(6, 182, 212, 0.65)'
              ctx.lineWidth = 1.2
              ctx.beginPath()
              ctx.moveTo(s1.x, s1.y)
              ctx.lineTo(s2.x, s2.y)
              ctx.stroke()

              // Velocity Trumpet Lip
              ctx.beginPath()
              ctx.ellipse(s2.x, s2.y, 8 * s2.scale, 4 * s2.scale, 0, 0, Math.PI * 2)
              ctx.strokeStyle = 'rgba(245, 158, 11, 0.8)'
              ctx.stroke()

              // Exhaust Runner Tube sweeping outward
              const ex1 = project((BANK_RADIUS + 10) * sinA, -(BANK_RADIUS + 10) * cosA, b.zPos)
              const exMidX = (BANK_RADIUS + 40) * b.sign
              const exMidY = 10
              const ex2 = project(exMidX, exMidY, b.zPos)
              const exCollectX = (BANK_RADIUS + 46) * b.sign
              const exCollectY = 55
              const ex3 = project(exCollectX, exCollectY, b.zPos)

              ctx.strokeStyle = 'rgba(239, 68, 68, 0.45)'
              ctx.lineWidth = 1.4
              ctx.beginPath()
              ctx.moveTo(ex1.x, ex1.y)
              ctx.quadraticCurveTo(ex2.x, ex2.y, ex3.x, ex3.y)
              ctx.stroke()
            },
          })
        }
      }

      // ── DUAL VALVE COVERS (CAM COVERS) ──
      for (const sign of [-1, 1]) {
        const angle = sign * BANK_ANGLE
        const sinA = Math.sin(angle)
        const cosA = Math.cos(angle)
        const camDist = BANK_RADIUS + 30

        renderQueue.push({
          type: 'camCover',
          z: project(camDist * sinA, -camDist * cosA, 0).z,
          draw: () => {
            const zA = START_Z - 15
            const zB = START_Z + TOTAL_LENGTH + 20
            const w = 18

            // 4 points of the valve cover top face
            const pt1 = project(camDist * sinA - cosA * w, -camDist * cosA - sinA * w, zA)
            const pt2 = project(camDist * sinA + cosA * w, -camDist * cosA + sinA * w, zA)
            const pt3 = project(camDist * sinA + cosA * w, -camDist * cosA + sinA * w, zB)
            const pt4 = project(camDist * sinA - cosA * w, -camDist * cosA - sinA * w, zB)

            ctx.beginPath()
            ctx.moveTo(pt1.x, pt1.y)
            ctx.lineTo(pt2.x, pt2.y)
            ctx.lineTo(pt3.x, pt3.y)
            ctx.lineTo(pt4.x, pt4.y)
            ctx.closePath()

            ctx.fillStyle = sign > 0 ? 'rgba(26, 28, 42, 0.75)' : 'rgba(22, 24, 36, 0.75)'
            ctx.fill()
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.7)'
            ctx.lineWidth = 1.5
            ctx.stroke()

            // Valve cover longitudinal ribs
            for (let i = -1; i <= 1; i++) {
              const rOffset = (i * w) / 2
              const ra = project(camDist * sinA + cosA * rOffset, -camDist * cosA + sinA * rOffset, zA)
              const rb = project(camDist * sinA + cosA * rOffset, -camDist * cosA + sinA * rOffset, zB)
              ctx.beginPath()
              ctx.moveTo(ra.x, ra.y)
              ctx.lineTo(rb.x, rb.y)
              ctx.strokeStyle = 'rgba(139, 92, 246, 0.5)'
              ctx.lineWidth = 1.0
              ctx.stroke()
            }
          },
        })
      }

      // ── DRIFTING TELEMETRY PARTICLES ──
      for (const p of particles) {
        p.y += p.vy
        p.x += p.vx
        p.z += p.vz
        if (p.y < -160) p.y = 160
        if (p.x < -180) p.x = 180
        if (p.x > 180) p.x = -180
        if (p.z < -200) p.z = 200
        if (p.z > 200) p.z = -200

        const projP = project(p.x, p.y, p.z)
        renderQueue.push({
          type: 'particle',
          z: projP.z,
          draw: () => {
            ctx.fillStyle = p.color + p.alpha + ')'
            ctx.beginPath()
            ctx.arc(projP.x, projP.y, p.size * projP.scale, 0, Math.PI * 2)
            ctx.fill()
          },
        })
      }

      // 3. Depth Sort back-to-front (Z descending)
      renderQueue.sort((a, b) => b.z - a.z)

      // 4. Render Depth-Sorted Queue
      for (const item of renderQueue) {
        item.draw()
      }

      // 5. Draw High-Tech Engine Telemetry HUD
      ctx.font = '10px "JetBrains Mono", monospace'
      ctx.fillStyle = 'rgba(6, 182, 212, 0.7)'
      ctx.fillText('90° V16 QUAD-BANK TELEMETRY', 24, H - 36)

      const activeCyl = Math.floor((t * 6.0) % 16)
      ctx.fillStyle = 'rgba(245, 158, 11, 0.85)'
      ctx.fillText(`FIRING CYCLE: CYL #${FIRING_ORDER[activeCyl] + 1} ACTIVE`, 24, H - 20)

      ctx.textAlign = 'right'
      ctx.fillStyle = 'rgba(139, 92, 246, 0.75)'
      ctx.fillText('RPM: 8,750 / 9,000 REDLINE', W - 24, H - 36)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
      ctx.fillText('DISPLACEMENT: 8.3L · 1,800 HP HYBRID', W - 24, H - 20)
      ctx.textAlign = 'left'

      rafId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('mousemove', onMouse)
    }
  }, [canvasRef])
}

export default function Hero() {
  const canvasRef = useRef(null)
  useV16EngineCanvas(canvasRef)

  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    let rafId
    function onScroll() {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setScrollY(window.scrollY)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Calculate split offsets dynamically based on scroll down
  const splitDist = Math.min(scrollY * 1.6, 650)
  const splitRot = Math.min(scrollY * 0.035, 9)
  const splitOpacity = Math.max(0, 1 - scrollY / 420)
  const splitBlur = Math.min(scrollY * 0.015, 6)

  return (
    <section id="hero" className={styles.hero} aria-label="Hero section">
      {/* Background ambient glows */}
      <div className={styles.ambientBg} aria-hidden="true" />

      {/* 3D V16 Engine Canvas */}
      <canvas ref={canvasRef} id="v16-engine-canvas" className={styles.canvas} aria-hidden="true" />

      {/* Corner meta labels */}
      <div className={`${styles.cornerLabel} ${styles.topLeft}`} aria-hidden="true">
        Apex Machines<br />Technical Archive
      </div>
      <div className={`${styles.cornerLabel} ${styles.topRight}`} aria-hidden="true">
        Authentic Specs<br />Factory Telemetry
      </div>
      <div className={`${styles.cornerLabel} ${styles.bottomLeft}`} aria-hidden="true">
        V16 Hybrid · Twin-Turbo V8<br />S58 Turbo I6 · V12 HDi
      </div>
      <div className={`${styles.cornerLabel} ${styles.bottomRight}`} aria-hidden="true">
        GUDU<br />Engineering
      </div>

      {/* Hero content */}
      <div className={styles.content}>
        <Badge variant="live" className={styles.statusBadge}>
          V16 Telemetry Active
        </Badge>

        <div
          className={styles.titleBoard}
          style={{
            transform: `scale(${Math.max(0.88, 1 - scrollY / 1800)})`,
            opacity: Math.max(0, 1 - scrollY / 460),
          }}
        >
          <h1 className={styles.title}>
            <span
              className={`${styles.titleMaroon} ${styles.splitLeft}`}
              style={{
                transform: `translate3d(-${splitDist}px, -${splitDist * 0.12}px, 0) rotate(-${splitRot}deg)`,
                opacity: splitOpacity,
                filter: `drop-shadow(0 2px 14px rgba(159, 18, 57, 0.6)) blur(${splitBlur}px)`,
              }}
            >
              Apex Automotive
            </span>
            <br />
            <span
              className={`${styles.titleGold} ${styles.splitRight}`}
              style={{
                transform: `translate3d(${splitDist}px, ${splitDist * 0.12}px, 0) rotate(${splitRot}deg)`,
                opacity: splitOpacity,
                filter: `drop-shadow(0 4px 18px rgba(245, 158, 11, 0.45)) blur(${splitBlur}px)`,
              }}
            >
              Engineering
            </span>
          </h1>
        </div>

        <div className={styles.subWrapper}>
          <p className={styles.sub}>
            High-performance super cars, powerful V-engines, and aerodynamics.
          </p>
          <blockquote className={styles.quote}>
            <span className={styles.quoteMark}>“</span>
            Speed is not a choice, it's a requirement.
            <span className={styles.quoteMark}>”</span>
          </blockquote>
        </div>

        <div className={styles.actions}>
          <Button as="a" href="#work" variant="primary" id="view-work-btn">
            Explore Vehicles & Specs
          </Button>
          <Button as="a" href="#about" variant="ghost" id="about-btn">
            Engineering Philosophy
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollLabel}>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}
