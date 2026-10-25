import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './positioning.css'
import { clients, processSteps, services, site, whyViewport, work } from './siteContent'

function BrandLockup() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: 'relative',
        display: 'block',
        width: '214px',
        height: '34px',
        overflow: 'hidden',
        flex: '0 0 auto'
      }}
    >
      <img
        src="/branding/text-light.png"
        alt=""
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          display: 'block',
          width: 'auto',
          height: '80px',
          maxWidth: 'none',
          transform: 'translate(-50%, -50%)'
        }}
      />
    </span>
  )
}

function ClientLogo({ client, duplicate = false }) {
  return (
    <div
      className={`client-logo-card client-logo-card--${client.size || 'wide'}`}
      aria-label={duplicate ? undefined : client.name}
      aria-hidden={duplicate ? 'true' : undefined}
      tabIndex={duplicate ? -1 : 0}
    >
      <span className="client-logo-glow" aria-hidden="true" />
      <img className="client-logo-image" src={client.logo} alt="" />
      <span className="client-logo-label">{client.name}</span>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const randomizedClients = useMemo(() => {
    const shuffled = [...clients]
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }, [])
  const mailto = `mailto:${site.email}`

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
        <a className="brand" href="#top" aria-label={`${site.name} home`}>
          <BrandLockup />
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">Menu</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#why" onClick={() => setMenuOpen(false)}>Why Viewport</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a className="nav-cta" href={mailto}>Start a Project</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" style={{ backgroundImage: `url(${site.hero.image})` }} />
        <div className="hero-shade" />
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="eyebrow">{site.hero.eyebrow}</div>
          <h1>{site.hero.title}</h1>
          <p>{site.hero.copy}</p>
          <div className="hero-actions">
            <a className="button button-primary" href={mailto}>Start a Project</a>
            <a className="text-link" href="#experience">View Experience <span>↓</span></a>
          </div>
        </div>
        <div className="scroll-cue">Scroll</div>
      </section>

      <section className="client-strip" data-reveal>
        <div className="client-strip-heading">
          <span className="section-kicker">Selected clients & venues</span>
          <p className="experience-note">{site.experienceNote}</p>
        </div>
        <div className="client-marquee" aria-label="Organizations represented in selected production experience">
          <div className="client-marquee-track">
            <div className="client-marquee-group">
              {randomizedClients.map(client => <ClientLogo client={client} key={client.name} />)}
            </div>
            <div className="client-marquee-group" aria-hidden="true">
              {randomizedClients.map(client => <ClientLogo client={client} duplicate key={`duplicate-${client.name}`} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="section work" id="experience">
        <div className="section-heading work-heading" data-reveal>
          <span className="section-kicker">Production experience</span>
          <h2>Work in the room, not just on paper.</h2>
          <p>Experience across live events, corporate productions, broadcast, and large-scale venues.</p>
        </div>
        <div className="work-grid">
          {work.map((item, index) => (
            <article className={`work-card work-card-${index + 1}`} key={item.title} data-reveal>
              <img src={item.image} alt={item.alt} />
              <div className="work-overlay" />
              <div className="work-copy">
                <span>{item.meta}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <p className="placeholder-note" data-reveal>Placeholder imagery remains in use while final Viewport production photography is selected.</p>
      </section>

      <section className="light-section services" id="services">
        <div className="section light-section-inner">
          <div className="section-heading" data-reveal>
            <span className="section-kicker">What we do</span>
            <h2>One technical partner, built around the show.</h2>
            <p>From a focused technical role to broader production responsibility, Viewport scales around what the event actually needs.</p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title} data-reveal>
                <span className="service-number">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="why-band" id="why">
        <div className="section why-inner">
          <div className="section-heading why-heading" data-reveal>
            <span className="section-kicker">Why Viewport</span>
            <h2>Technical without the friction.</h2>
          </div>
          <div className="why-grid">
            {whyViewport.map(item => (
              <article className="why-card" key={item.title} data-reveal>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="process-band" id="process">
        <div className="process-inner">
          <div className="section-heading process-heading" data-reveal>
            <span className="section-kicker">How we work</span>
            <h2>Clear path. Clean execution.</h2>
          </div>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <article className="process-step" key={step.title} data-reveal>
                <span className="process-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
          <p className="process-principle" data-reveal><strong>Built around the show, not around a warehouse.</strong> Equipment and specialists are selected for the production rather than a fixed package.</p>
        </div>
      </section>

      <section className="about-band" id="about">
        <div className="about-image" data-reveal>
          <img src={site.about.image} alt="Technical production control position placeholder" />
        </div>
        <div className="about-copy" data-reveal>
          <span className="section-kicker">About {site.name}</span>
          <h2>{site.about.heading}</h2>
          {site.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <a className="text-link text-link-dark" href={mailto}>Start a Project <span>↗</span></a>
        </div>
      </section>

      <section className="contact" data-reveal>
        <div className="contact-intro">
          <span className="section-kicker">Start a conversation</span>
          <h2>Have a date, venue, brief, or just an idea?</h2>
          <p>Send it over. We can help define what the technical side needs next.</p>
          <a className="contact-email" href={mailto}>{site.email}</a>
        </div>
        <a className="button button-primary button-large" href={mailto}>Start a Project</a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label={`${site.name} home`}><BrandLockup /></a>
        <div className="footer-copy"><a href={site.url}>{site.domain}</a> · {site.location} · {site.descriptor}</div>
        <div className="footer-copy">© {new Date().getFullYear()} {site.name}</div>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
