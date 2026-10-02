import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [musicOn, setMusicOn] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const playTone = (
    context: AudioContext,
    frequency: number,
    startTime: number,
    duration: number,
    gainValue: number,
  ) => {
    const oscillator = context.createOscillator()
    const gainNode = context.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(frequency, startTime)
    gainNode.gain.setValueAtTime(0.0001, startTime)
    gainNode.gain.exponentialRampToValueAtTime(gainValue, startTime + 0.04)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

    oscillator.connect(gainNode)
    gainNode.connect(context.destination)

    oscillator.start(startTime)
    oscillator.stop(startTime + duration + 0.08)
  }

  const triggerChime = () => {
    const AudioConstructor =
      window.AudioContext ||
      (window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext

    if (!AudioConstructor) {
      return
    }

    const context = audioContextRef.current ?? new AudioConstructor()
    audioContextRef.current = context

    void context.resume()

    const now = context.currentTime
    playTone(context, 440, now, 0.28, 0.045)
    playTone(context, 554.37, now + 0.14, 0.32, 0.03)
    playTone(context, 659.25, now + 0.28, 0.38, 0.026)
  }

  const toggleMusic = () => {
    if (!audioContextRef.current) {
      triggerChime()
      setMusicOn(true)
      return
    }

    if (musicOn) {
      void audioContextRef.current.suspend()
      setMusicOn(false)
      return
    }

    void audioContextRef.current.resume()
    triggerChime()
    setMusicOn(true)
  }

  return (
    <div className="wedding-app">
      <button
        type="button"
        className="music-control"
        aria-label={musicOn ? 'Pause music' : 'Play music'}
        onClick={toggleMusic}
      >
        <span className="music-icon">♫</span>
        <span>{musicOn ? 'Music On' : 'Music Off'}</span>
      </button>

      <main className="page-shell">
        <section className="hero-card" aria-label="Wedding invitation hero section">
          <div className="ornament-row" aria-hidden="true">
            <span className="ornament-dot" />
            <span className="ornament-dot" />
            <span className="ornament-dot" />
            <span className="ornament-dot" />
            <span className="ornament-dot" />
            <span className="ornament-dot" />
            <span className="ornament-dot" />
          </div>

          <div className="hero-content">
            <p className="blessing-line">WITH THE BLESSINGS OF OUR FAMILIES</p>

            <div className="ys-monogram" aria-label="YS monogram">
              <div className="ys-inner">YS</div>
            </div>

            <div className="names-block">
              <div className="name-pair">
                <span>GIRISHA</span>
                <span>SAGAR</span>
              </div>
              <div className="cross-mark">×</div>
              <div className="name-single">
                <span>YASHASWINI</span>
              </div>
            </div>

            <div className="date-block">
              <p className="main-date">17 OCTOBER</p>
              <p className="location-line">KANAKAPURA, KARNATAKA</p>
            </div>

            <button type="button" className="primary-button" onClick={triggerChime}>
              ENTER THE CELEBRATION
            </button>
          </div>
        </section>

        <section className="event-grid" aria-label="Wedding details">
          <article className="event-card">
            <p className="event-label">RECEPTION</p>
            <h2>25 NOVEMBER 2026</h2>
            <p>6:30 PM ONWARDS</p>
          </article>

          <article className="event-card alt-card">
            <p className="event-label">MUHURTHAM</p>
            <h2>26 NOVEMBER 2026</h2>
            <p>8:00 AM – 9:00 AM</p>
            <p>Dhanu Lagna</p>
          </article>
        </section>
      </main>
    </div>
  )
}

export default App
