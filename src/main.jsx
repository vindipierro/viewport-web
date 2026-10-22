import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './positioning.css'
import { clients, processSteps, services, site, work } from './siteContent'

const CLIENT_HOVER_COLORS = {
  'Macy’s Herald Square': '#e21a2c',
  'Cipriani': '#d7b56d',
  'Javits Center': '#00a6ce',
  'Nassau Coliseum': '#1f5fa8',
  'Jones Beach Amphitheater': '#f2bf3d',
  'Old Westbury Gardens': '#6f8f52',
  'NYC EDC': '#00a9e0',
  'Vista Equity Partners': '#8a6bbf',
  'BlackRock': '#f5f7fb',
  'One World Trade Center': '#5aa9df',
  'Radio Park at Rockefeller Center': '#d3ad58',
  'United Nations NYC': '#009edb',
  'Michelob Ultra': 'linear-gradient(90deg, #d71920 0 42%, #65b8df 42% 58%, #14365d 58% 100%)',
  'FIFA': '#4f7fa8',
  'High Line NYC': '#8dc63f',
  'Anthropic': '#d97757',
}

function Mark() {
  return <img className="mark" src="/viewport-mark.svg" alt="" aria-hidden="true" />
}

function ClientLogo({ client, duplicate = false }) {
  const [active, setActive] = useState(false)
  const hoverFill = CLIENT_HOVER_COLORS[client.name] || '#f5f7fb'
  const colorLogoStyle = {
    position: 'absolute',
    width: client.size === 'mark' ? '52px' : '164px',
    height: '52px',
    background: hoverFill,
    WebkitMaskImage: `url("${client.logo}")`,
    maskImage: `url("${client.logo}")`,
    WebkitMaskRepeat: 'no-repeat',
    maskRepeat: 'no-repeat',
    WebkitMaskPosition: 'center',
    maskPosition: 'center',
    WebkitMaskSize: 'contain',
    maskSize: 'contain',
    opacity: active ? 0.98 : 0,
    transform: active ? 'translateY(-8px) scale(1.035)' : 'translateY(4px) scale(.97)',
    filter: active ? 'drop-shadow(0 6px 18px rgba(137,168,255,.12))' : 'none',
    transition: 'opacity .3s ease, transform .35s cubic-bezier(.2,.7,.2,1), filter .3s ease',
    pointerEvents: 'none',
  }

  return (
    <div
      className={`client-logo-card client-logo-card--${client.size || 'wide'}`}
      aria-label={duplicate ? undefined : client.name}
      aria-hidden={duplicate ? 'true' : undefined}
      tabIndex={duplicate ? -1 : 0}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <span className="client-logo-glow" aria-hidden="true" />
      <img
        className="client-logo-image"
        src={client.logo}
        alt=""
        style={{ opacity: active ? 0 : undefined }}
      />
      <span aria-hidden="true" style={colorLogoStyle} />
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
          <Mark />
          <span>{site.name}</span>
        </a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">Menu</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
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
            <a className="button button-primary" href={mailto}>Discuss Your Production</a>
            <a className="text-link" href="#process">How We Work <span>↓</span></a>
          </div>
        </div>
        <div className="scroll-cue">Scroll</div>
      </section>

      <section className="client-strip" data-reveal>
        <div className="client-strip-heading">
          <span className="section-kicker">Selected experience</span>
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

      <section className="section services" id="services">
        <div className="section-heading" data-reveal>
          <span className="section-kicker">What we do</span>
          <h2>One technical partner, built around the job.</h2>
          <p>From complete production management to a focused technical role, {site.name} scales around what the production actually needs.</p>
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

      <section className="process-band" id="process">
        <div className="process-inner">
          <div className="section-heading process-heading" data-reveal>
            <span className="section-kicker">How we work</span>
            <h2>Bring us the production. We handle the technical path.</h2>
            <p>Viewport can enter early in planning, translate the creative and operational brief into technical requirements, and carry that plan through show day.</p>
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
          <p className="process-principle" data-reveal>Equipment and crew are selected around the requirements of each production rather than a fixed house inventory.</p>
        </div>
      </section>

      <section className="section work" id="work">
        <div className="section-heading work-heading" data-reveal>
          <span className="section-kicker">Selected work</span>
          <h2>Technical production in practice.</h2>
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
          <img src={site.about.image} alt="Technical production control position placeholder" />
        </div>
        <div className="about-copy" data-reveal>
          <span className="section-kicker">About {site.name}</span>
          <h2>{site.about.heading}</h2>
          {site.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
          <a className="text-link" href={mailto}>Bring Us Your Production <span>↗</span></a>
        </div>
      </section>

      <section className="contact" data-reveal>
        <div className="contact-intro">
          <span className="section-kicker">Start a conversation</span>
          <h2>Have a production taking shape?</h2>
          <p>Send us the brief, venue, date, or even the early idea. We can help define what the technical side needs next.</p>
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