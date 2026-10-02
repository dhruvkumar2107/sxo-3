import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import './App.css'
import Kolam from './components/Kolam'
import MangoLeafToran from './components/MangoLeafToran'
import SectionHeader from './components/SectionHeader'
import { events, galleryImages, storyCopy, timeline, venueDetails } from './data/invitation'

const TempleScene = lazy(() => import('./components/TempleScene'))
type HeroPhase = 'intro' | 'reveal' | 'entered'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [heroPhase, setHeroPhase] = useState<HeroPhase>('intro')
  const [invitationOpen, setInvitationOpen] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const audioContextRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const splashTimer = window.setTimeout(() => setIsLoading(false), 900)

    return () => {
      window.clearTimeout(splashTimer)
    }
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

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleOpenInvitation = () => {
    triggerChime()
    setInvitationOpen(true)
    setHeroPhase('reveal')
    window.setTimeout(() => setHeroPhase('entered'), 1800)
  }

  const startCelebration = () => {
    triggerChime()
    setMusicOn(true)
    setHeroPhase('entered')
    window.setTimeout(() => scrollToSection('story'), 500)
  }

  return (
    <div className={`app-shell ${heroPhase === 'entered' ? 'entered' : ''}`}>
      {isLoading ? (
        <div className="loading-screen">
          <div className="loading-badge">
            <Kolam className="loading-kolam" />
            <span>Shubhamastu</span>
          </div>
        </div>
      ) : null}

      <div className="transition-overlay" aria-hidden="true">
        <span className="transition-particle p1" />
        <span className="transition-particle p2" />
        <span className="transition-particle p3" />
        <span className="transition-particle p4" />
      </div>

      <button
        type="button"
        className="music-control"
        aria-label={musicOn ? 'Pause music' : 'Play music'}
        onClick={toggleMusic}
      >
        <span className="music-icon">♫</span>
        {musicOn ? 'Music On' : 'Music Off'}
      </button>

      <header className={`hero hero-${heroPhase} ${invitationOpen ? 'invitation-open' : ''}`} id="top">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />

        <div className="hero-3d" aria-hidden="true">
          <Suspense fallback={<div className="hero-scene-fallback" />}>
            <TempleScene phase={heroPhase} />
          </Suspense>
        </div>

        <div className={`invitation-shell ${invitationOpen ? 'is-open' : ''}`}>
          <div className="invitation-glow" aria-hidden="true" />
          <div className="invitation-particles" aria-hidden="true">
            <span className="particle p1" />
            <span className="particle p2" />
            <span className="particle p3" />
            <span className="particle p4" />
            <span className="particle p5" />
            <span className="particle p6" />
            <span className="particle p7" />
            <span className="particle p8" />
          </div>

          <button
            type="button"
            className="invitation-card"
            onClick={handleOpenInvitation}
            aria-label="Open the invitation"
          >
            <div className="invitation-garland" aria-hidden="true" />
            <div className="invitation-inner" aria-hidden="true">
              <span className="invitation-blessing">With the blessings of our families</span>
              <div className="invitation-names">
                <span>GIRISHA</span>
                <span>SAGAR</span>
                <strong>×</strong>
                <span>YASHASWINI</span>
              </div>
            </div>
            <div className="invitation-seal" aria-hidden="true">
              <span>ॐ</span>
            </div>
          </button>
        </div>

        <div className={`hero-teaser ${invitationOpen || heroPhase !== 'intro' ? 'is-visible' : ''}`}>
          <p className="blessing-line">With the blessings of our families</p>

          <div className="names-block">
            <div className="name-column">
              <span>GIRISHA</span>
              <span>SAGAR</span>
            </div>
            <div className="name-divider">×</div>
            <div className="name-column name-column-right">
              <span>YASHASWINI</span>
            </div>
          </div>

          <div className="date-block">
            <p>17 OCTOBER</p>
            <p>KANAKAPURA, KARNATAKA</p>
          </div>

          <button type="button" className="primary-button" onClick={startCelebration}>
            ENTER THE CELEBRATION
          </button>
        </div>
      </header>

      <main className="page-main">
        <section id="story" className="content-section story-section">
          <MangoLeafToran className="section-toran" />
          <SectionHeader
            eyebrow="Our Story"
            title="A celebration rooted in love, family, and tradition"
            subtitle="Placeholder copy for the couple’s story, values, and shared journey."
          />
          <div className="story-card">
            <div className="story-ornament">
              <Kolam className="story-kolam" />
            </div>
            <div className="story-copy">
              {storyCopy.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

        <section id="couple" className="content-section couple-section">
          <SectionHeader eyebrow="The Couple" title="A timeless union in the making" />
          <div className="couple-grid">
            <article className="portrait-card">
              <div className="portrait-image portrait-one">
                <div className="portrait-label">
                  <span>GIRISHA</span>
                  <span>SAGAR</span>
                </div>
              </div>
            </article>

            <article className="portrait-card">
              <div className="portrait-image portrait-two">
                <div className="portrait-label">
                  <span>YASHASWINI</span>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section id="events" className="content-section events-section">
          <MangoLeafToran className="section-toran" />
          <SectionHeader eyebrow="Wedding Events" title="Moments of joy, blessings, and celebration" />
          <div className="events-grid">
            {events.map((event) => (
              <article className="event-card" key={event.name}>
                <div className="event-badge">✦</div>
                <p className="event-name">{event.name}</p>
                <ul>
                  <li>{event.date}</li>
                  <li>{event.time}</li>
                  <li>{event.venue}</li>
                </ul>
                <p>{event.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="timeline" className="content-section timeline-section">
          <SectionHeader eyebrow="Ceremony Timeline" title="A gentle flow through the rituals" />
          <div className="timeline">
            {timeline.map((item) => (
              <div className="timeline-item" key={item.time}>
                <div className="timeline-dot" aria-hidden="true" />
                <div className="timeline-card">
                  <span>{item.time}</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="gallery" className="content-section gallery-section">
          <SectionHeader
            eyebrow="Photo Gallery"
            title="A few treasured moments from the journey"
            subtitle="Add the final collection of wedding photographs and portraits here."
          />
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <figure className={`gallery-item item-${index + 1}`} key={`${image.alt}-${index}`}>
                <img src={image.src} alt={image.alt} loading="lazy" />
              </figure>
            ))}
          </div>
        </section>

        <section id="venue" className="content-section venue-section">
          <MangoLeafToran className="section-toran" />
          <div className="venue-card">
            <div className="venue-copy">
              <p className="eyebrow">Venue</p>
              <h2>{venueDetails.name}</h2>
              <p>{venueDetails.address}</p>
              <p>
                {venueDetails.date} • {venueDetails.time}
              </p>
              <a
                href="https://maps.google.com/?q=Kanakapura+Karnataka"
                target="_blank"
                rel="noreferrer"
                className="map-button"
              >
                Open in Maps
              </a>
            </div>
            <div className="venue-illustration" aria-hidden="true">
              <div className="location-mark">✦</div>
            </div>
          </div>
        </section>

        <section id="rsvp" className="content-section rsvp-section">
          <div className="rsvp-card">
            <div className="rsvp-header">
              <p className="eyebrow">RSVP</p>
              <h2>Join us in celebration</h2>
            </div>

            <form className="rsvp-form">
              <div className="field-row">
                <label>
                  Name
                  <input type="text" placeholder="Your name" />
                </label>
                <label>
                  Guests
                  <input type="text" placeholder="2 guests" />
                </label>
              </div>
              <label>
                Message
                <textarea placeholder="With love and blessings..." rows={4} />
              </label>
              <button type="submit" className="submit-button">
                SEND RSVP
              </button>
            </form>
          </div>
        </section>

        <section id="closing" className="content-section closing-section">
          <MangoLeafToran className="section-toran" />
          <div className="closing-card">
            <div className="closing-ornament" aria-hidden="true">
              <div className="diya" />
            </div>
            <p className="closing-names">GIRISHA SAGAR</p>
            <p className="closing-symbol">&</p>
            <p className="closing-names">YASHASWINI</p>
            <p className="closing-date">17 OCTOBER</p>
            <p className="closing-location">KANAKAPURA</p>
            <p className="closing-blessing">With love and the blessings of our families</p>
            <p className="closing-thanks">Thank you for celebrating with us.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
