import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { clients, services, site, work } from './siteContent'

function Mark() {
  return (
    <div className="mark" aria-hidden="true">
      <span className="mark-arm mark-arm-left" />
      <span className="mark-arm mark-arm-right" />
      <span className="mark-core" />
    </div>
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
          <Mark />
          <span>{site.name}</span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">Menu</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a className="nav-cta" href={mailto}>Discuss Your Production</a>
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
            <a className="button button-primary" href="#work">View Our Work</a>
            <a className="text-link" href={mailto}>Discuss Your Production <span>↗</span></a>
          </div>
        </div>
        <div className="scroll-cue">Scroll</div>
      </section>

      <section className="client-strip" data-reveal>
        <div className="client-strip-heading">
          <span className="section-kicker">Selected experience</span>
        </div>
        <div className="client-marquee" aria-label="Selected clients and organizations">
          <div className="client-marquee-track">
            <div className="client-marquee-group">
              {clients.map(client => <ClientLogo client={client} key={client.name} />)}
            </div>
            <div className="client-marquee-group" aria-hidden="true">
              {clients.map(client => <ClientLogo client={client} duplicate key={`duplicate-${client.name}`} />)}
            </div>
          </div>
        </div>
      </section>

      <section className="section services" id="services">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">What we do</span>
          <h2>Built around the production.</h2>
          <p>From one technical role to a complete production package, {site.name} scales to fit the job.</p>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <article className="service-row" key={service.title} data-reveal>
              <span className="service-number">0{index + 1}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
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
              <img src={item.image} alt={item.alt} />
              <div className="work-overlay" />
              <div className="work-copy">
                <span>{item.meta}</span>
                <h3>{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
        <p className="placeholder-note" data-reveal>Placeholder imagery shown for layout. Real {site.name} production photography will replace these images.</p>
      </section>

      <section className="about-band" id="about">
        <div className="about-image" data-reveal>
          <img src={site.about.image} alt="Production operator placeholder" />
        </div>
        <div className="about-copy" data-reveal>
          <span className="section-kicker">About {site.name}</span>
          <h2>{site.about.heading}</h2>
          {site.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <a className="text-link" href={mailto}>Work with {site.name} <span>↗</span></a>
        </div>
      </section>

      <section className="contact" data-reveal>
        <div>
          <span className="section-kicker">Start a conversation</span>
          <h2>Have a production coming up?</h2>
        </div>
        <a className="button button-primary button-large" href={mailto}>Discuss Your Production</a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top"><Mark /><span>{site.name}</span></a>
        <div className="footer-copy">{site.location} · {site.descriptor}</div>
        <div className="footer-copy">© {new Date().getFullYear()} {site.name}</div>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
