import React, { useRef, useState } from 'react'
import { eventTypes, inquiryNeeds, site } from './siteContent'

export default function InquiryForm({ planner = false }) {
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const requestId = useRef(null)
  const statusRef = useRef(null)

  async function submit(event) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    if (!form.reportValidity()) return
    const data = new FormData(form)
    requestId.current ||= crypto.randomUUID()
    setStatus('sending')
    setMessage('Sending your event brief…')
    setErrors({})
    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...Object.fromEntries(data), needs: data.getAll('needs'), source: planner ? 'event-planners' : 'homepage', requestId: requestId.current }),
        signal: AbortSignal.timeout(15000),
      })
      const result = await response.json()
      if (!response.ok) {
        setErrors(result.fields || {})
        throw new Error(result.error || 'We couldn’t send your inquiry. Please try again or email us directly.')
      }
      setStatus('success')
      setMessage('Your event brief is on its way to Viewport. We’ll follow up at the email address you provided.')
      form.reset()
      requestId.current = null
    } catch (error) {
      setStatus('error')
      setMessage(error.name === 'TimeoutError' ? 'The request timed out. Please try again or email us directly.' : error.message === 'Failed to fetch' ? 'We couldn’t connect. Please try again or email us directly.' : error.message)
    }
    requestAnimationFrame(() => statusRef.current?.focus())
  }

  function fieldError(name) {
    return errors[name] ? <span className="field-error" id={`${name}-error`}>{errors[name]}</span> : null
  }

  return (
    <section className="inquiry-band" id="inquiry" aria-labelledby="inquiry-heading">
      <div className="section inquiry-layout">
        <div className="inquiry-intro">
          <span className="section-kicker">Discuss an event</span>
          <h2 id="inquiry-heading">Let’s put a plan<br />behind your event.</h2>
          <p>Have a date, venue, brief or just an idea? Tell us what’s taking shape. We’ll help define the technical scope and the right next step.</p>
          <div className="inquiry-next"><span className="operational-label">What happens next</span><p>We review your brief, clarify the requirements and discuss a production approach before preparing a quote.</p></div>
          <p className="email-alternative">Prefer email?<br /><a className="contact-email" href={`mailto:${site.email}`}>{site.email}</a></p>
        </div>
        <form className="inquiry-form" onSubmit={submit} aria-label="Production quote inquiry" aria-describedby="form-note" onChange={() => { requestId.current = null }}>
          <p className="form-note" id="form-note">Name, email and a brief description are required. Share the details you have; the rest can follow.</p>
          <fieldset disabled={status === 'sending'} className="inquiry-fields">
            <legend className="sr-only">Your contact and event details</legend>
            <div className="form-grid">
              <label>Name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required maxLength={120} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} />{fieldError('name')}</label>
              <label>Company<input name="company" autoComplete="organization" maxLength={160} /></label>
              <label className="field-full">Email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />{fieldError('email')}</label>
              <label>Event date<input name="date" type="date" aria-invalid={!!errors.date} aria-describedby={errors.date ? 'date-error' : undefined} />{fieldError('date')}</label>
              <label>Venue / city<input name="venue" autoComplete="off" maxLength={200} placeholder="Venue confirmed or still exploring" /></label>
              <label>Event type<select name="eventType" defaultValue="" aria-invalid={!!errors.eventType} aria-describedby={errors.eventType ? 'eventType-error' : undefined}><option value="">Select if known</option>{eventTypes.map(type => <option key={type}>{type}</option>)}</select>{fieldError('eventType')}</label>
              <label>Estimated attendance<input name="attendance" type="number" min="1" max="1000000" step="1" inputMode="numeric" placeholder="If known" aria-invalid={!!errors.attendance} aria-describedby={errors.attendance ? 'attendance-error' : undefined} />{fieldError('attendance')}</label>
              <fieldset className="needs-field field-full"><legend>What do you need?</legend><div className="needs-options">{inquiryNeeds.map(need => <label key={need}><input type="checkbox" name="needs" value={need} /><span>{need}</span></label>)}</div></fieldset>
              <label className="field-full">Tell us about the event <span aria-hidden="true">*</span><textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="The format, schedule, creative, budget, existing vendors, or what you’d like us to own." aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />{fieldError('message')}</label>
              <label className="form-trap" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <p className="form-privacy">Your details are used to respond to this inquiry. Please leave out confidential or sensitive information.</p>
            <button type="submit" className="button button-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending your brief…' : 'Request a Production Quote'}<span aria-hidden="true">↗</span></button>
          </fieldset>
          <div ref={statusRef} tabIndex={-1} className={`form-status form-status--${status}`} role="status" aria-live="polite" aria-atomic="true">{message}{status === 'error' && <> <a href={`mailto:${site.email}`}>{site.email}</a></>}</div>
          <noscript><p>Email your event brief to <a href={`mailto:${site.email}`}>{site.email}</a>. The inquiry form requires JavaScript.</p></noscript>
        </form>
      </div>
    </section>
  )
}
