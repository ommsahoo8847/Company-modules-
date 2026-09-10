import React, { useEffect, useRef } from 'react'
import styles from './SolarStarsBackground.module.css'

export default function SolarStarsBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W, H
    let rafId
    let mouseX = 0
    let mouseY = 0
    let targetMouseX = 0
    let targetMouseY = 0

    // Generate solar stars with varied spectral classes and twinkle properties
    const STAR_COUNT = 380
    const stars = []
    const solarColors = [
      '#FFF8E7', // Solar Warm White
      '#FDE68A', // Amber/Golden Sun
      '#F59E0B', // Solar Flare Amber
      '#67E8F9', // Cyan Dwarf
      '#A5B4FC', // Violet Starlight
      '#FFFFFF', // Pure Star
    ]

    function initStars() {
      stars.length = 0
      for (let i = 0; i < STAR_COUNT; i++) {
        const isSolarGiant = Math.random() < 0.05
        const hasDiffractionSpikes = isSolarGiant || Math.random() < 0.08
        stars.push({
          x: Math.random() * W,
          y: Math.random() * H,
          z: Math.random() * 0.8 + 0.2, // Depth layer
          radius: isSolarGiant ? Math.random() * 2.2 + 1.8 : Math.random() * 1.4 + 0.4,
          baseAlpha: Math.random() * 0.6 + 0.3,
          twinkleSpeed: Math.random() * 0.03 + 0.008,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: solarColors[Math.floor(Math.random() * solarColors.length)],
          hasSpikes: hasDiffractionSpikes,
          driftX: (Math.random() - 0.5) * 0.08,
          driftY: -Math.random() * 0.12 - 0.02, // Gentle cosmic drift
        })
      }
    }

    // Solar nebula dust clouds
    const NEBULA_COUNT = 5
    const nebulas = []
    function initNebulas() {
      nebulas.length = 0
      const colors = [
        'rgba(245, 158, 11, 0.06)',  // Amber Solar Core
        'rgba(99, 102, 241, 0.08)',  // Deep Indigo
        'rgba(6, 182, 212, 0.06)',   // Solar Cyan
        'rgba(239, 68, 68, 0.04)',   // Solar Flare Red
        'rgba(139, 92, 246, 0.06)',  // Violet Corona
      ]
      for (let i = 0; i < NEBULA_COUNT; i++) {
        nebulas.push({
          x: (i / NEBULA_COUNT) * W + (Math.random() - 0.5) * (W * 0.3),
          y: Math.random() * H,
          radius: Math.min(W, H) * (Math.random() * 0.4 + 0.35),
          color: colors[i % colors.length],
          pulseSpeed: Math.random() * 0.008 + 0.004,
          pulseOffset: Math.random() * Math.PI * 2,
        })
      }
    }

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      initStars()
      initNebulas()
    }

    resize()
    window.addEventListener('resize', resize)

    function handleMouseMove(e) {
      targetMouseX = (e.clientX / W - 0.5) * 30
      targetMouseY = (e.clientY / H - 0.5) * 30
    }
    window.addEventListener('mousemove', handleMouseMove)

    let t = 0
    function render() {
      // Smooth mouse parallax
      mouseX += (targetMouseX - mouseX) * 0.05
      mouseY += (targetMouseY - mouseY) * 0.05
      t += 0.016

      ctx.clearRect(0, 0, W, H)

      // 1. Draw Deep Space Solar Gradient
      const solarGrad = ctx.createRadialGradient(
        W * 0.5 + mouseX * 0.5,
        H * 0.35 + mouseY * 0.5,
        W * 0.05,
        W * 0.5,
        H * 0.4,
        Math.max(W, H) * 0.85
      )
      solarGrad.addColorStop(0, 'rgba(28, 20, 48, 0.65)')
      solarGrad.addColorStop(0.35, 'rgba(16, 15, 26, 0.9)')
      solarGrad.addColorStop(1, '#070709')

      ctx.fillStyle = solarGrad
      ctx.fillRect(0, 0, W, H)

      // 2. Draw Pulsating Solar Nebulas
      ctx.globalCompositeOperation = 'screen'
      for (const neb of nebulas) {
        const pulse = Math.sin(t * neb.pulseSpeed + neb.pulseOffset) * 0.15 + 1.0
        const currentR = neb.radius * pulse
        const nx = neb.x + mouseX * 0.2
        const ny = neb.y + mouseY * 0.2

        const g = ctx.createRadialGradient(nx, ny, 0, nx, ny, currentR)
        g.addColorStop(0, neb.color)
        g.addColorStop(1, 'transparent')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(nx, ny, currentR, 0, Math.PI * 2)
        ctx.fill()
      }

      // 3. Draw Stars with Parallax and Twinkle
      for (const s of stars) {
        // Apply cosmic drift
        s.x += s.driftX
        s.y += s.driftY
        if (s.y < -10) s.y = H + 10
        if (s.x < -10) s.x = W + 10
        if (s.x > W + 10) s.x = -10

        const px = s.x + mouseX * s.z
        const py = s.y + mouseY * s.z
        const twinkle = Math.sin(t + s.twinkleOffset) * 0.35 + 0.65
        const alpha = Math.min(1, Math.max(0.1, s.baseAlpha * twinkle))

        ctx.fillStyle = s.color
        ctx.globalAlpha = alpha

        // Star core
        ctx.beginPath()
        ctx.arc(px, py, s.radius * s.z, 0, Math.PI * 2)
        ctx.fill()

        // Soft halo for bright stars
        if (s.radius > 1.2) {
          ctx.beginPath()
          const haloGrad = ctx.createRadialGradient(px, py, 0, px, py, s.radius * 4.5 * s.z)
          haloGrad.addColorStop(0, s.color)
          haloGrad.addColorStop(1, 'transparent')
          ctx.fillStyle = haloGrad
          ctx.globalAlpha = alpha * 0.4
          ctx.arc(px, py, s.radius * 4.5 * s.z, 0, Math.PI * 2)
          ctx.fill()
        }

        // Diffraction spikes for solar giants
        if (s.hasSpikes && alpha > 0.4) {
          ctx.strokeStyle = s.color
          ctx.globalAlpha = alpha * 0.5
          ctx.lineWidth = 0.8
          const spikeLen = s.radius * 6 * s.z

          ctx.beginPath()
          ctx.moveTo(px - spikeLen, py)
          ctx.lineTo(px + spikeLen, py)
          ctx.moveTo(px, py - spikeLen)
          ctx.lineTo(px, py + spikeLen)
          ctx.stroke()
        }
      }

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'

      rafId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.solarCanvas} aria-hidden="true" />
}
