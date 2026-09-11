/**
 * Audio Synthesis Engine — Obsidian Kinetic Audio
 *
 * Synthesizes the iPhone Duo "unfolding transition" sonic character:
 *   — A warm, premium glass+metal mechanical POP with a resonant chest-level impact
 *   — Rich harmonic cavity resonance (like glass panels meeting or a precision hinge snapping open)
 *   — A silky high-frequency whoosh / shimmer trailing off (premium hinge sweep)
 *   — Deep sub-bass body impact for tactile weight sensation
 *
 * Volume: ~50dB SPL equivalent (clearly audible, present and satisfying)
 * 100% offline, zero network requests, 0ms latency — pure Web Audio API synthesis.
 */

let audioCtx = null
let soundEnabled = true

// Initialize sound enabled from localStorage if available
try {
  const saved = localStorage.getItem('gudu_sound_effects')
  if (saved !== null) {
    soundEnabled = saved === 'true'
  }
} catch (e) {
  // Ignore storage access errors
}

const listeners = new Set()

export function isSoundEnabled() {
  return soundEnabled
}

export function setSoundEnabled(enabled) {
  soundEnabled = Boolean(enabled)
  try {
    localStorage.setItem('gudu_sound_effects', String(soundEnabled))
  } catch (e) {
    // Ignore storage errors
  }
  listeners.forEach(fn => {
    try { fn(soundEnabled) } catch (e) { console.error(e) }
  })
}

export function toggleSound() {
  const next = !soundEnabled
  setSoundEnabled(next)
  if (next) {
    playBottleCapPop(1.0)
  }
  return next
}

export function subscribeSoundChange(callback) {
  listeners.add(callback)
  return () => listeners.delete(callback)
}

function getAudioContext() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (AC) audioCtx = new AC()
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

/**
 * Generate a noise buffer (pink noise approximation for warm, natural texture).
 */
function createNoiseBuffer(ctx, durationSec = 0.12) {
  const sz = Math.floor(ctx.sampleRate * durationSec)
  const buf = ctx.createBuffer(1, sz, ctx.sampleRate)
  const out = buf.getChannelData(0)
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0
  for (let i = 0; i < sz; i++) {
    const w = Math.random() * 2 - 1
    b0 = 0.99886 * b0 + w * 0.0555179
    b1 = 0.99332 * b1 + w * 0.0750759
    b2 = 0.96900 * b2 + w * 0.1538520
    b3 = 0.86650 * b3 + w * 0.3104856
    b4 = 0.55000 * b4 + w * 0.5329522
    b5 = -0.7616 * b5 - w * 0.0168980
    out[i] = (b0 + b1 + b2 + b3 + b4 + b5 + w * 0.1) * 0.18
  }
  return buf
}

/**
 * Plays the iPhone Duo-inspired "Transition Open" sound:
 * — Warm glass-panel resonant pop (like precision panels clicking together or a premium hinge locking open)
 * — Rich low-mid cavity body thump for satisfying physical weight
 * — Silky high harmonic shimmer (premium hinge sweep / glass resonance)
 * — Deep sub-bass pulse for tactile impact
 *
 * Volume boosted to ~50dB equivalent — present, clear, and satisfying.
 *
 * @param {number} [vol=1.0] — Volume multiplier (1.0 = full 50dB calibrated level)
 */
export function playBottleCapPop(vol = 1.0) {
  if (!soundEnabled) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    // Master gain — calibrated for ~50dB SPL presence
    const master = ctx.createGain()
    // 50dB equivalent: gain ~3.5 on Web Audio (which is linear amplitude, not SPL)
    // We aim for perceptually loud-but-clean — gain 3.2 hits the sweet spot
    master.gain.setValueAtTime(3.2 * vol, now)

    // Compressor to keep the loudness punchy without clipping
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.setValueAtTime(-12, now)
    comp.knee.setValueAtTime(6, now)
    comp.ratio.setValueAtTime(4, now)
    comp.attack.setValueAtTime(0.001, now)
    comp.release.setValueAtTime(0.08, now)
    comp.connect(ctx.destination)
    master.connect(comp)

    // Organic pitch variation ±3% per event (physical variance)
    const jitter = 0.97 + Math.random() * 0.06

    // ─── LAYER 1: Glass Panel Impact Click ─────────────────────────────────
    // The iPhone Duo's sharp "click" as the glass panels lock in place —
    // a crisp transient with glassy high frequency content.
    const clickOsc = ctx.createOscillator()
    const clickGain = ctx.createGain()
    const clickHPF = ctx.createBiquadFilter()

    clickHPF.type = 'highpass'
    clickHPF.frequency.setValueAtTime(5000 * jitter, now)
    clickHPF.Q.setValueAtTime(0.7, now)

    clickOsc.type = 'triangle'
    clickOsc.frequency.setValueAtTime(6200 * jitter, now)
    clickOsc.frequency.exponentialRampToValueAtTime(2400, now + 0.006)

    // Very sharp attack transient (0.5ms) that decays quickly (6ms)
    clickGain.gain.setValueAtTime(0.0001, now)
    clickGain.gain.linearRampToValueAtTime(0.95, now + 0.0005)
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.007)

    clickOsc.connect(clickHPF)
    clickHPF.connect(clickGain)
    clickGain.connect(master)
    clickOsc.start(now)
    clickOsc.stop(now + 0.01)

    // ─── LAYER 2: Main Resonant Glass-Body Pop ──────────────────────────────
    // The "meaty" center of the transition — a warm modal resonance like
    // a glass panel body vibrating after a sharp strike, the iPhone Duo's
    // characteristic rich opening tone.
    const popOsc = ctx.createOscillator()
    const popGain = ctx.createGain()
    const popBPF = ctx.createBiquadFilter()

    // Resonant bandpass simulating the glass+aluminum body cavity (~320–380 Hz)
    popBPF.type = 'bandpass'
    popBPF.frequency.setValueAtTime(350 * jitter, now)
    popBPF.Q.setValueAtTime(8.5, now)

    popOsc.type = 'sine'
    // Sweeps from high down: warm unfolding sweep
    popOsc.frequency.setValueAtTime(780 * jitter, now)
    popOsc.frequency.exponentialRampToValueAtTime(190 * jitter, now + 0.032)

    // Strong punch attack (0.8ms), then natural modal decay
    popGain.gain.setValueAtTime(0.0001, now)
    popGain.gain.linearRampToValueAtTime(1.0, now + 0.0008)
    popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09)

    popOsc.connect(popBPF)
    popBPF.connect(popGain)
    popGain.connect(master)
    popOsc.start(now)
    popOsc.stop(now + 0.095)

    // ─── LAYER 3: Sub-bass Body Thump ──────────────────────────────────────
    // The low physical weight you FEEL in your chest — the "premium device" sensation.
    const subOsc = ctx.createOscillator()
    const subGain = ctx.createGain()

    subOsc.type = 'sine'
    subOsc.frequency.setValueAtTime(130 * jitter, now)
    subOsc.frequency.exponentialRampToValueAtTime(42, now + 0.05)

    subGain.gain.setValueAtTime(0.0001, now)
    subGain.gain.linearRampToValueAtTime(1.2, now + 0.001)
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055)

    subOsc.connect(subGain)
    subGain.connect(master)
    subOsc.start(now)
    subOsc.stop(now + 0.06)

    // ─── LAYER 4: Premium Hinge Shimmer / Whoosh Tail ──────────────────────
    // The silky high-frequency shimmer unique to the iPhone Duo transition —
    // like glass panels sliding across each other, a premium resonant sweep.
    // Filtered pink noise for the breath/whoosh character, then a mid-range
    // harmonic tone for the glass shimmer tail.
    const noiseBuf = createNoiseBuffer(ctx, 0.12)
    const noiseSrc = ctx.createBufferSource()
    const noiseGain = ctx.createGain()
    const noiseBPF = ctx.createBiquadFilter()
    const noiseHPF = ctx.createBiquadFilter()

    // High-passed then bandpassed — silk shimmer region (~2kHz–5kHz)
    noiseHPF.type = 'highpass'
    noiseHPF.frequency.setValueAtTime(2000, now)
    noiseBPF.type = 'bandpass'
    noiseBPF.frequency.setValueAtTime(3800 * jitter, now)
    noiseBPF.Q.setValueAtTime(1.4, now)

    noiseGain.gain.setValueAtTime(0.0001, now)
    noiseGain.gain.linearRampToValueAtTime(0.55, now + 0.004)
    noiseGain.gain.exponentialRampToValueAtTime(0.08, now + 0.04)
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.10)

    noiseSrc.buffer = noiseBuf
    noiseSrc.connect(noiseHPF)
    noiseHPF.connect(noiseBPF)
    noiseBPF.connect(noiseGain)
    noiseGain.connect(master)
    noiseSrc.start(now + 0.001)
    noiseSrc.stop(now + 0.105)

    // ─── LAYER 5: Glass harmonic ring (shimmer tail overtone) ──────────────
    // The rich high-frequency "ring" that lingers after the initial impact —
    // gives the iPhone Duo sound its unmistakable premium glass quality.
    const ringOsc = ctx.createOscillator()
    const ringGain = ctx.createGain()

    ringOsc.type = 'sine'
    ringOsc.frequency.setValueAtTime(1800 * jitter, now + 0.005)
    ringOsc.frequency.exponentialRampToValueAtTime(900 * jitter, now + 0.055)

    ringGain.gain.setValueAtTime(0.0001, now + 0.004)
    ringGain.gain.linearRampToValueAtTime(0.35, now + 0.009)
    ringGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.065)

    ringOsc.connect(ringGain)
    ringGain.connect(master)
    ringOsc.start(now + 0.004)
    ringOsc.stop(now + 0.07)

  } catch (err) {
    // Non-blocking: audio failures must never interrupt UI
  }
}

/**
 * Plays the closing "Transition Close" sound:
 * — A soft warm glass-panel settle / fold-close
 * — Gentle downward sweep with rounded decay
 * — Lower volume than open (softer action)
 *
 * @param {number} [vol=1.0] — Volume multiplier
 */
export function playClosePop(vol = 1.0) {
  if (!soundEnabled) return
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const now = ctx.currentTime

    const master = ctx.createGain()
    master.gain.setValueAtTime(2.2 * vol, now) // Slightly quieter on close

    const comp = ctx.createDynamicsCompressor()
    comp.threshold.setValueAtTime(-14, now)
    comp.knee.setValueAtTime(6, now)
    comp.ratio.setValueAtTime(4, now)
    comp.attack.setValueAtTime(0.001, now)
    comp.release.setValueAtTime(0.08, now)
    comp.connect(ctx.destination)
    master.connect(comp)

    const jitter = 0.97 + Math.random() * 0.06

    // Main glass-settle pop — downward sweep, warm and rounded
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const bpf = ctx.createBiquadFilter()

    bpf.type = 'bandpass'
    bpf.frequency.setValueAtTime(280 * jitter, now)
    bpf.Q.setValueAtTime(6.0, now)

    osc.type = 'sine'
    osc.frequency.setValueAtTime(480 * jitter, now)
    osc.frequency.exponentialRampToValueAtTime(95 * jitter, now + 0.028)

    gain.gain.setValueAtTime(0.0001, now)
    gain.gain.linearRampToValueAtTime(0.85, now + 0.001)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055)

    osc.connect(bpf)
    bpf.connect(gain)
    gain.connect(master)
    osc.start(now)
    osc.stop(now + 0.06)

    // Soft sub-bass close thump
    const sub = ctx.createOscillator()
    const subGain = ctx.createGain()
    sub.type = 'sine'
    sub.frequency.setValueAtTime(95 * jitter, now)
    sub.frequency.exponentialRampToValueAtTime(38, now + 0.03)
    subGain.gain.setValueAtTime(0.0001, now)
    subGain.gain.linearRampToValueAtTime(0.7, now + 0.001)
    subGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035)
    sub.connect(subGain)
    subGain.connect(master)
    sub.start(now)
    sub.stop(now + 0.04)

    // Delicate contact click
    const snap = ctx.createOscillator()
    const snapGain = ctx.createGain()
    snap.type = 'triangle'
    snap.frequency.setValueAtTime(2200 * jitter, now)
    snap.frequency.exponentialRampToValueAtTime(700, now + 0.008)
    snapGain.gain.setValueAtTime(0.45, now)
    snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01)
    snap.connect(snapGain)
    snapGain.connect(master)
    snap.start(now)
    snap.stop(now + 0.012)

  } catch (err) {
    // Non-blocking
  }
}
