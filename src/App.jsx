import React, { useEffect, useRef, useState } from 'react'
import InquiryForm from './InquiryForm'
import { audiences, clients, partnerModes, plannerFaqs, processSteps, responsibilities, services, site, work } from './siteContent'

function BrandLockup() {
  return <span className="brand-lockup" aria-hidden="true"><img src="/branding/text-light.png" alt="" width="1236" height="400" /></span>
}

function Navigation({ planner }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const buttonRef = useRef(null)
  const navRef = useRef(null)
  const close = () => setMenuOpen(false)

  useEffect(() => {
    function dismiss(event) {
      if (event.key === 'Escape' && menuOpen) { close(); buttonRef.current?.focus() }
      if (event.type === 'pointerdown' && !navRef.current?.contains(event.target) && !buttonRef.current?.contains(event.target)) close()
    }
    document.addEventListener('keydown', dismiss)
    document.addEventListener('pointerdown', dismiss)
    return () => { document.removeEventListener('keydown', dismiss); document.removeEventListener('pointerdown', dismiss) }
  }, [menuOpen])

  return <header className="nav-wrap">
    <a className="brand" href="/" aria-label="Viewport Works home"><BrandLockup /></a>
    <button ref={buttonRef} className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="primary-navigation">{menuOpen ? 'Close' : 'Menu'}<span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
    <nav id="primary-navigation" ref={navRef} className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== buttonRef.current) close() }}>
      <a href="/#services" onClick={close}>Capabilities</a>
      <a href="/event-planners" aria-current={planner ? 'page' : undefined} onClick={close}>For Planners & Agencies</a>
      <a href="/#experience" onClick={close}>Experience</a>
      <a href="/#process" onClick={close}>Our Process</a>
      <a className="nav-cta" href="#inquiry" onClick={close}>Discuss an Event <span aria-hidden="true">↗</span></a>
    </nav>
  </header>
}

function Hero({ planner }) {
  return <section className={`hero${planner ? ' hero--planners' : ''}`} id="top" aria-labelledby="hero-heading">
    <div className="hero-media" style={{ backgroundImage: `url(${site.hero.image})` }} />
    <div className="hero-shade" /><div className="hero-glow" />
    <div className="hero-content">
      <div className="eyebrow">{planner ? 'New York · For planners, agencies & producers' : site.hero.eyebrow}</div>
      <h1 id="hero-heading">{planner ? <>The technical partner<br className="desktop-break" /> behind your production.</> : <>One technical partner.<br className="desktop-break" /> From scope to show day.</>}</h1>
      <p>{planner ? 'Your creative. Your client. A technical team that fits the way you produce, from the first brief to the final cue.' : site.hero.copy}</p>
      <div className="hero-actions"><a className="button button-primary" href="#inquiry">Request Information <span aria-hidden="true">↗</span></a><a className="text-link" href={planner ? '#partnership' : '#services'}>{planner ? 'Find your way to work with us' : 'Explore our capabilities'} <span aria-hidden="true">↓</span></a></div>
      <div className="hero-production-note"><span>01 / Plan</span><span>02 / Build</span><span>03 / Run the show</span></div>
    </div>
  </section>
}

function ClientLogo({ client, duplicate }) {
  return <div className={`client-logo-card client-logo-card--${client.size}`} aria-label={duplicate ? undefined : client.name} aria-hidden={duplicate || undefined} tabIndex={duplicate ? -1 : 0}>
    <span className="client-logo-glow" aria-hidden="true" /><img className="client-logo-image" src={client.logo} alt="" loading="lazy" /><span className="client-logo-label">{client.name}</span>
  </div>
}

function ClientExperience() {
  const [paused, setPaused] = useState(false)
  const [active, setActive] = useState(false)
  const stripRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.1 })
    if (stripRef.current) observer.observe(stripRef.current)
    return () => observer.disconnect()
  }, [])
  return <section ref={stripRef} className="client-strip" aria-label="Selected production experience">
    <div className="client-strip-heading"><div><span className="section-kicker">Selected brands & venues in our production experience</span><p className="experience-note">{site.experienceNote}</p></div><button className="marquee-toggle" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? 'Play logos' : 'Pause logos'}<span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span></button></div>
    <div className={`client-marquee${active ? ' is-active' : ''}${paused ? ' is-paused' : ''}`}><div className="client-marquee-track">{[false, true].map(duplicate => <div className="client-marquee-group" key={String(duplicate)} aria-hidden={duplicate || undefined}>{clients.map(client => <ClientLogo client={client} duplicate={duplicate} key={client.name} />)}</div>)}</div></div>
  </section>
}

function Partnerships({ planner }) {
  return <section className="section partnership" id="partnership" aria-labelledby="partnership-heading">
    <div className="split-heading" data-reveal><div><span className="section-kicker">For planners, producers & agencies</span><h2 id="partnership-heading">Technical production that fits into yours.</h2></div><div><p>You lead the event. We take responsibility for the technical scope you put in our hands, with a clear point of contact and a team that works with yours.</p>{!planner && <a className="text-link" href="/event-planners">Meet your production partner <span aria-hidden="true">↗</span></a>}</div></div>
    <div className="partner-grid">{partnerModes.map((mode, index) => <article className="partner-card" key={mode.title} data-reveal><div className="card-topline"><span>0{index + 1}</span><span>{mode.label}</span></div><h3>{mode.title}</h3><p>{mode.copy}</p></article>)}</div>
  </section>
}

function Capabilities({ planner = false }) {
  return <section className="light-section services" id="services" aria-labelledby="services-heading"><div className="section light-section-inner">
    <div className="split-heading" data-reveal><div><span className="section-kicker">The technical scope</span><h2 id="services-heading">{planner ? 'The expertise behind your team.' : 'Every discipline. One coordinated production.'}</h2></div><p>From a focused technical role to a complete event production. The systems, people and planning are connected around the same show.</p></div>
    <div className="service-grid">{services.map((service, index) => <article className="service-card" key={service.title} data-reveal><span className="service-number">0{index + 1} / Capability</span><h3>{service.title}</h3><p>{service.copy}</p></article>)}</div>
  </div></section>
}

function BuiltAroundShow() {
  return <section className="built-band" id="why" aria-labelledby="built-heading"><div className="section built-layout">
    <div data-reveal><span className="section-kicker">Built around the show</span><h2 id="built-heading">Scope first.<br /><span>Equipment second.</span></h2></div>
    <div className="built-copy" data-reveal><p className="lead">The brief sets the production. The production sets the system.</p><p>We start with the experience you want to create, the room it needs to work in and the budget behind it. Then we assemble the equipment, crew and specialists to match.</p><p>That means technical decisions shaped by your show, with one lead keeping the complete scope connected.</p><a className="text-link" href="#inquiry">Discuss your production <span aria-hidden="true">↗</span></a><div className="production-rule" aria-label="Brief to technical plan to equipment and crew"><span>Event brief</span><span aria-hidden="true">→</span><span>Technical plan</span><span aria-hidden="true">→</span><span>Equipment & crew</span></div></div>
  </div></section>
}

function WhoWeProduceFor() {
  return <section className="light-section audience-band" aria-labelledby="audience-heading"><div className="section audience-layout"><div className="section-heading" data-reveal><span className="section-kicker">Who we produce for</span><h2 id="audience-heading">Different rooms.<br />The same ownership.</h2><p>Technical production for the people bringing audiences together in New York.</p></div><div className="audience-list">{audiences.map((audience, index) => <article className="audience-row" key={audience.title} data-reveal><span className="row-number">0{index + 1}</span><div><h3>{audience.title}</h3><p>{audience.copy}</p>{index === 3 && <a className="text-link text-link-dark" href="/event-planners">Explore partnership options <span aria-hidden="true">↗</span></a>}</div></article>)}</div></div></section>
}

function Process() {
  return <section className="process-band" id="process" aria-labelledby="process-heading"><div className="process-inner"><div className="section-heading process-heading" data-reveal><span className="section-kicker">How we work</span><h2 id="process-heading">A clear plan.<br />Ownership at every step.</h2><p>One connected method, from understanding the brief to running the show.</p></div><div className="process-grid">{processSteps.map((step, index) => <article className="process-step" key={step.title} data-reveal><span className="process-number">0{index + 1}<span aria-hidden="true">{index < 3 ? '→' : '↗'}</span></span><h3>{step.title}</h3><p>{step.copy}</p><span className="process-output">{step.output}</span></article>)}</div></div></section>
}

function Operations() {
  return <section className="section operations" aria-labelledby="operations-heading"><div className="split-heading" data-reveal><div><span className="section-kicker">The work behind the show</span><h2 id="operations-heading">Production is more<br />than equipment.</h2></div><p>It’s the coordination before the doors open, the decisions during the show and the responsibility to see the technical scope through.</p></div><div className="operations-grid">{responsibilities.map(([title, copy], index) => <article key={title} data-reveal><span className="row-number">0{index + 1}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>
}

function Work() {
  return <section className="section work" id="experience" aria-labelledby="work-heading"><div className="section-heading work-heading" data-reveal><span className="section-kicker">Production experience</span><h2 id="work-heading">Experience across<br />the live environment.</h2><p>A view into the kinds of production work behind Viewport, including roles delivered alongside production partners.</p></div><div className="work-grid">{work.map((item, index) => <article className={`work-card work-card-${index + 1}`} key={item.title} data-reveal><div className="work-image"><img src={item.image} alt={item.alt} loading="lazy" /><div className="work-overlay" /><span className="work-index">0{index + 1} / Experience</span></div><div className="work-copy"><span>{item.eventType}</span><h3>{item.title}</h3><dl><div><dt>Role</dt><dd>{item.role}</dd></div>{item.location && <div><dt>Location</dt><dd>{item.location}</dd></div>}<div><dt>Disciplines</dt><dd>{item.disciplines}</dd></div></dl></div></article>)}</div><p className="placeholder-note">Experience areas shown with illustrative imagery. Project-specific photography and verified project details will be added as available.</p></section>
}

function About() {
  return <section className="about-band" id="about"><div className="about-image"><img src={site.about.image} alt="Illustrative technical production control position" loading="lazy" /></div><div className="about-copy" data-reveal><span className="section-kicker">About Viewport Works</span><h2>{site.about.heading}</h2>{site.about.paragraphs.map(p => <p key={p}>{p}</p>)}<a className="text-link text-link-dark" href="#inquiry">Discuss an Event <span aria-hidden="true">↗</span></a></div></section>
}

function PlannerIntegration() {
  return <section className="light-section planner-integration"><div className="section integration-layout"><div className="section-heading" data-reveal><span className="section-kicker">An extension of your production</span><h2>Your relationships.<br />Our technical ownership.</h2><p>We work within your production structure, whether we’re leading the technical scope or supporting the team already in place.</p></div><div className="integration-list">{[
    ['Agree the boundaries', 'Define our role, budget, decision-making and reporting lines. Establish what Viewport owns and where we hand off to your team or another vendor.'],
    ['Connect the plan', 'Coordinate with venue teams, creative partners, fabricators and existing AV vendors. Align content requirements, crew calls, systems and the production schedule.'],
    ['Represent your team', 'For white-label engagements, agree how we communicate, present the crew and work behind your brand. You remain the lead relationship with your client.'],
    ['Lead the technical delivery', 'Bring the plan onsite, direct the technical crew and manage the agreed scope through testing, rehearsal, show operation and strike.'],
  ].map(([title, copy], index) => <article key={title} data-reveal><span className="row-number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
}

function PlannerFAQs() {
  return <section className="light-section"><div className="section faq-layout"><div className="section-heading"><span className="section-kicker">Before the brief</span><h2>A few practical<br />questions.</h2></div><div className="faq-list">{plannerFaqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
}

export default function App({ path = '/' }) {
  const planner = path.replace(/\/$/, '') === '/event-planners'
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const items = [...document.querySelectorAll('[data-reveal]')]
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.08 })
    items.forEach(item => { if (item.getBoundingClientRect().top > window.innerHeight) item.classList.add('reveal-ready'); observer.observe(item) })
    return () => observer.disconnect()
  }, [])
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a><Navigation planner={planner} />
    <main id="main-content"><Hero planner={planner} /><ClientExperience /><Partnerships planner={planner} />{planner && <PlannerIntegration />}<Capabilities planner={planner} /><BuiltAroundShow />{!planner && <WhoWeProduceFor />}<Process /><Operations />{planner ? <PlannerFAQs /> : <><Work /><About /></>}<InquiryForm planner={planner} /></main>
    <footer><a className="brand footer-brand" href="/" aria-label="Viewport Works home"><BrandLockup /></a><div className="footer-copy"><span>{site.location} · Technical Production</span><a href="/event-planners">For Planners & Agencies</a><a href={`mailto:${site.email}`}>{site.email}</a></div><div className="footer-copy">© {new Date().getFullYear()} Viewport Works LLC</div></footer>
  </>
}
