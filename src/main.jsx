import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const services = [
  ['Live Event Production', 'Technical planning and onsite execution for conferences, meetings, galas, live shows, and special events.'],
  ['Video & Playback', 'Switching, playback, projection, LED, graphics, and signal distribution built around the show.'],
  ['Audio', 'Live sound, wireless systems, playback, routing, and production audio for rooms of every scale.'],
  ['Broadcast & Streaming', 'Multi-camera production, livestreaming, remote contributors, and hybrid event workflows.'],
  ['Technical Direction & Engineering', 'Freelance technical direction, video engineering, systems support, and production integration.'],
]

const work = [
  {
    title: 'Corporate Production',
    meta: 'Technical production · Video · Playback',
    image: 'https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Live Show Control',
    meta: 'Technical direction · Engineering',
    image: 'https://images.pexels.com/photos/7431356/pexels-photo-7431356.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Broadcast & Streaming',
    meta: 'Multi-camera · Streaming · Show control',
    image: 'https://images.pexels.com/photos/37668809/pexels-photo-37668809.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
  {
    title: 'Live Audio',
    meta: 'Audio systems · FOH · Show support',
    image: 'https://images.pexels.com/photos/34612567/pexels-photo-34612567.jpeg?auto=compress&cs=tinysrgb&w=1600',
  },
]

function Mark() {
  return (
    <div className="mark" aria-hidden="true">
      <span className="mark-arm mark-arm-left" />
      <span className="mark-arm mark-arm-right" />
      <span className="mark-core" />
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const items = [...document.querySelectorAll('[data-reveal]')]
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 }
    )
    items.forEach(item => observer.observe(item))
    return () => observer.disconnect()
  }, [])

  return (
    <main>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Viewport Works home">
          <Mark />
          <span>Viewport Works</span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">Menu</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a className="nav-cta" href="mailto:hello@viewportworks.com">Discuss Your Production</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" />
        <div className="hero-shade" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="eyebrow">New York · Technical Production</div>
          <h1>Viewport Works</h1>
          <p>Technical production for live events, broadcast, and the teams behind them.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">View Our Work</a>
            <a className="text-link" href="mailto:hello@viewportworks.com">Discuss Your Production <span>↗</span></a>
          </div>
        </div>
        <div className="scroll-cue">Scroll</div>
      </section>

      <section className="client-strip" data-reveal>
        <span className="section-kicker">Selected experience</span>
        <div className="logo-row" aria-label="Placeholder clients">
          <span>CLIENT 01</span><span>CLIENT 02</span><span>CLIENT 03</span><span>CLIENT 04</span><span>CLIENT 05</span>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">What we do</span>
          <h2>Built around the production.</h2>
          <p>From one technical role to a complete production package, Viewport Works scales to fit the job.</p>
        </div>
        <div className="service-list">
          {services.map(([title, copy], index) => (
            <article className="service-row" key={title} data-reveal>
              <span className="service-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section work" id="work">
        <div className="section-heading work-heading" data-reveal>
          <span className="section-kicker">Selected work</span>
          <h2>Production from every angle.</h2>
        </div>
        <div className="work-grid">
          {work.map((item, index) => (
            <article className={`work-card work-card-${index + 1}`} key={item.title} data-reveal>
              <img src={item.image} alt="Production placeholder" />
              <div className="work-overlay" />
              <div className="work-copy">
                <span>{item.meta}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <p className="placeholder-note" data-reveal>Placeholder imagery shown for layout. Real Viewport Works production photography will replace these images.</p>
      </section>

      <section className="about-band" id="about">
        <div className="about-image" data-reveal>
          <img src="https://images.pexels.com/photos/7431356/pexels-photo-7431356.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Production operator placeholder" />
        </div>
        <div className="about-copy" data-reveal>
          <span className="section-kicker">About Viewport Works</span>
          <h2>Experienced people. Clear execution.</h2>
          <p>Viewport Works is a New York-based technical production company providing production support for live events, broadcast, and creative teams.</p>
          <p>Founder-led and built to stay flexible, we can step into a production as a technical partner, engineer a specific system, or support the full show from planning through execution.</p>
          <a className="text-link" href="mailto:hello@viewportworks.com">Work with Viewport Works <span>↗</span></a>
        </div>
      </section>

      <section className="contact" data-reveal>
        <div>
          <span className="section-kicker">Start a conversation</span>
          <h2>Have a production coming up?</h2>
        </div>
        <a className="button button-primary button-large" href="mailto:hello@viewportworks.com">Discuss Your Production</a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><Mark /><span>Viewport Works</span></a>
        <div className="footer-copy">New York, NY · Technical Production</div>
        <div className="footer-copy">© {new Date().getFullYear()} Viewport Works</div>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
