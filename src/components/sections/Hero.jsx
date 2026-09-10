import React, { useEffect, useRef } from 'react'
import { Badge } from '../ui/Badge.jsx'
import { Button } from '../ui/Button.jsx'
import styles from './Hero.module.css'

/* ── Crystal canvas animation (ported from index.html prototype) ── */
function useCrystalCanvas(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H, cx, cy, t = 0
    let mouseX = 0, mouseY = 0
    let rafId

    function resize() {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
      cx = W / 2
      cy = H / 2
    }
    resize()
    window.addEventListener('resize', resize)

    function onMouse(e) {
      mouseX = (e.clientX / W - 0.5) * 2
      mouseY = (e.clientY / H - 0.5) * 2
    }
    document.addEventListener('mousemove', onMouse)

    const sideColors = [
      ['rgba(192,193,255,0.55)', 'rgba(99,102,241,0.15)'],
      ['rgba(255,120,200,0.50)', 'rgba(139,92,246,0.10)'],
      ['rgba(6,182,212,0.45)',   'rgba(99,102,241,0.08)'],
      ['rgba(240,200,255,0.40)', 'rgba(139,92,246,0.12)'],
      ['rgba(255,160,120,0.38)', 'rgba(180,60,200,0.08)'],
      ['rgba(180,220,255,0.42)', 'rgba(6,182,212,0.10)'],
    ]

    function buildPrism(pcx, pcy, size, rotX, rotY) {
      const faces = []
      const n = 6
      const top = [], bot = []
      const h = size * 1.6
      const rx = rotX + mouseY * 0.18
      const ry = rotY + mouseX * 0.18

      function project(x, y, z) {
        const x1 = x * Math.cos(ry) - z * Math.sin(ry)
        const z1 = x * Math.sin(ry) + z * Math.cos(ry)
        const y2 = y * Math.cos(rx) - z1 * Math.sin(rx)
        const z2 = y * Math.sin(rx) + z1 * Math.cos(rx)
        const fov = 900
        const s = fov / (fov + z2 + 200)
        return { x: pcx + x1 * s, y: pcy + y2 * s, z: z2 }
      }

      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 - Math.PI / 2
        const r = size * (i % 2 === 0 ? 1 : 0.72)
        top.push(project(Math.cos(a) * r, -h / 2, Math.sin(a) * r))
        bot.push(project(Math.cos(a) * r,  h / 2, Math.sin(a) * r))
      }
      for (let i = 0; i < n; i++) {
        const j = (i + 1) % n
        faces.push({ type: 'side', verts: [top[i], top[j], bot[j], bot[i]], idx: i, avgZ: (top[i].z + top[j].z + bot[j].z + bot[i].z) / 4 })
      }
      faces.push({ type: 'top', verts: top, avgZ: top.reduce((a, v) => a + v.z, 0) / n })
      faces.push({ type: 'bot', verts: bot, avgZ: bot.reduce((a, v) => a + v.z, 0) / n })
      faces.sort((a, b) => b.avgZ - a.avgZ)
      return faces
    }

    function drawFace(verts, type, idx) {
      if (verts.length < 3) return
      ctx.beginPath()
      ctx.moveTo(verts[0].x, verts[0].y)
      for (let i = 1; i < verts.length; i++) ctx.lineTo(verts[i].x, verts[i].y)
      ctx.closePath()
      if (type === 'top') {
        const grd = ctx.createRadialGradient(verts[0].x, verts[0].y, 0, verts[0].x, verts[0].y, 80)
        grd.addColorStop(0, 'rgba(255,255,255,0.70)')
        grd.addColorStop(0.4, 'rgba(200,195,255,0.40)')
        grd.addColorStop(1, 'rgba(99,102,241,0.05)')
        ctx.fillStyle = grd; ctx.fill()
        ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 0.8; ctx.stroke()
      } else if (type === 'bot') {
        ctx.fillStyle = 'rgba(6,182,212,0.08)'; ctx.fill()
        ctx.strokeStyle = 'rgba(6,182,212,0.12)'; ctx.lineWidth = 0.5; ctx.stroke()
      } else {
        const [c1, c2] = sideColors[idx % sideColors.length]
        const grd = ctx.createLinearGradient(verts[0].x, verts[0].y, verts[3]?.x ?? verts[2].x, verts[3]?.y ?? verts[2].y)
        const flicker = 0.85 + 0.15 * Math.sin(t * 1.2 + idx * 0.9)
        grd.addColorStop(0, c1); grd.addColorStop(1, c2)
        ctx.globalAlpha = flicker; ctx.fillStyle = grd; ctx.fill(); ctx.globalAlpha = 1
        ctx.strokeStyle = 'rgba(255,255,255,0.08)'; ctx.lineWidth = 0.6; ctx.stroke()
      }
    }

    function drawGlow(gcx, gcy, size) {
      const glows = [
        { color: 'rgba(255,100,200,0.18)', off: [-size * 0.12, size * 0.06], r: size * 1.1 },
        { color: 'rgba(6,182,212,0.15)',   off: [ size * 0.10,-size * 0.05], r: size * 1.0 },
        { color: 'rgba(139,92,246,0.12)',  off: [0, 0],                      r: size * 1.3 },
      ]
      glows.forEach(g => {
        const grd = ctx.createRadialGradient(gcx + g.off[0], gcy + g.off[1], 0, gcx + g.off[0], gcy + g.off[1], g.r)
        grd.addColorStop(0, g.color); grd.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.ellipse(gcx + g.off[0], gcy + g.off[1], g.r, g.r * 0.65, 0, 0, Math.PI * 2)
        ctx.fillStyle = grd; ctx.fill()
      })
    }

    function drawStreak(scx, scy, size) {
      const angle = t * 0.3 + Math.PI * 0.3
      const len = size * 1.8
      const grd = ctx.createLinearGradient(scx + Math.cos(angle) * 5, scy + Math.sin(angle) * 5, scx + Math.cos(angle) * len, scy + Math.sin(angle) * len)
      grd.addColorStop(0, 'rgba(255,255,255,0.40)'); grd.addColorStop(0.2, 'rgba(200,180,255,0.18)'); grd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.beginPath(); ctx.moveTo(scx + Math.cos(angle) * 5, scy + Math.sin(angle) * 5); ctx.lineTo(scx + Math.cos(angle) * len, scy + Math.sin(angle) * len)
      ctx.strokeStyle = grd; ctx.lineWidth = 1.5 + Math.sin(t) * 0.5
      ctx.globalAlpha = 0.6 + 0.4 * Math.sin(t * 0.7); ctx.stroke(); ctx.globalAlpha = 1
    }

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(),
      r: 0.5 + Math.random() * 1.5,
      speed: 0.0002 + Math.random() * 0.0004,
      phase: Math.random() * Math.PI * 2,
      color: ['rgba(192,193,255,', 'rgba(6,182,212,', 'rgba(255,130,210,'][Math.floor(Math.random() * 3)],
    }))

    function drawParticles() {
      particles.forEach(p => {
        const px = (p.x * W + Math.sin(t * p.speed * 200 + p.phase) * 30 + W) % W
        const py = (p.y * H - t * p.speed * H * 0.6 + H) % H
        const alpha = 0.3 + 0.4 * Math.sin(t * 0.5 + p.phase)
        ctx.beginPath(); ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + alpha + ')'; ctx.fill()
      })
    }

    function render() {
      ctx.clearRect(0, 0, W, H)
      const size = Math.min(W, H) * 0.18
      const rotX = -0.35 + Math.sin(t * 0.25) * 0.04
      const rotY = t * 0.18
      drawGlow(cx, cy + size * 0.1, size)
      ctx.globalCompositeOperation = 'screen'
      drawParticles()
      ctx.globalCompositeOperation = 'source-over'
      const faces = buildPrism(cx, cy, size, rotX, rotY)
      faces.forEach(f => drawFace(f.verts, f.type, f.idx))
      ctx.globalCompositeOperation = 'screen'
      drawStreak(cx, cy - size * 0.4, size)
      ctx.globalCompositeOperation = 'source-over'
      t += 0.012
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
  useCrystalCanvas(canvasRef)

  return (
    <section id="hero" className={styles.hero} aria-label="Hero section">
      {/* Background ambient glows */}
      <div className={styles.ambientBg} aria-hidden="true" />

      {/* Crystal canvas */}
      <canvas ref={canvasRef} id="crystal-canvas" className={styles.canvas} aria-hidden="true" />

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
        Obsidian<br />Kinetic
      </div>

      {/* Hero content */}
      <div className={styles.content}>
        <Badge variant="live" className={styles.statusBadge}>
          Performance Archive Active
        </Badge>

        <h1 className={styles.title}>
          Apex Automotive<br />
          <span className={styles.titleGradient}>Engineering</span>
        </h1>

        <p className={styles.sub}>
          High-performance hypercars, bespoke one-offs, and Le Mans legends.<br />
          Explore authentic manufacturer specifications, powertrain telemetry, and aerodynamic dossiers.
        </p>

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
