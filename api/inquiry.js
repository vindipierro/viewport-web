import { eventTypes, inquiryNeeds } from '../src/siteContent.js'

const emailPattern = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const allowedFields = { name: 120, company: 160, email: 254, date: 10, venue: 200, eventType: 80, attendance: 7, message: 5000, website: 200, source: 30, requestId: 36 }

export function validateInquiry(body) {
  if (!body || typeof body !== 'object' || Array.isArray(body)) return { error: 'Please send a valid event brief.' }
  const data = {}
  const fields = {}
  for (const [key, max] of Object.entries(allowedFields)) {
    if (body[key] !== undefined && typeof body[key] !== 'string') return { error: 'Please check the event details and try again.' }
    data[key] = (body[key] || '').trim()
    if (data[key].length > max) fields[key] = `Please keep this field under ${max + 1} characters.`
  }
  if (data.name.length < 2 || /[\r\n]/.test(data.name)) fields.name = 'Please enter your name.'
  if (!emailPattern.test(data.email) || /[\r\n]/.test(data.email)) fields.email = 'Please enter a valid email address.'
  if (data.message.length < 10) fields.message = 'Please share a little more about the event (at least 10 characters).'
  if (data.date && (!/^\d{4}-\d{2}-\d{2}$/.test(data.date) || !Number.isFinite(Date.parse(data.date)) || new Date(data.date).toISOString().slice(0, 10) !== data.date)) fields.date = 'Please enter a valid event date.'
  if (data.attendance && (!/^\d+$/.test(data.attendance) || Number(data.attendance) < 1 || Number(data.attendance) > 1000000)) fields.attendance = 'Please enter a whole number from 1 to 1,000,000.'
  if (data.eventType && !eventTypes.includes(data.eventType)) fields.eventType = 'Please select an event type from the list.'
  if (!Array.isArray(body.needs) || body.needs.length > inquiryNeeds.length || body.needs.some(need => typeof need !== 'string' || !inquiryNeeds.includes(need))) return { error: 'Please select production needs from the list.' }
  if (!uuidPattern.test(data.requestId)) return { error: 'Please reload the page and try again.' }
  if (!['homepage', 'event-planners'].includes(data.source)) return { error: 'Please reload the page and try again.' }
  data.needs = [...new Set(body.needs)]
  return Object.keys(fields).length ? { error: 'Please check the highlighted details and try again.', fields } : { data }
}

function makeEmail(data) {
  return [
    'Viewport Works / Production quote inquiry',
    '',
    `Name: ${data.name}`,
    `Company: ${data.company || 'Not provided'}`,
    `Email: ${data.email}`,
    `Event date: ${data.date || 'Still planning'}`,
    `Venue / city: ${data.venue || 'Not provided'}`,
    `Event type: ${data.eventType || 'Still planning'}`,
    `Attendance: ${data.attendance || 'Not provided'}`,
    `Production needs: ${data.needs.join(', ') || 'Help defining the scope'}`,
    `Source: ${data.source}`,
    '',
    'Event brief:',
    data.message,
  ].join('\n')
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Please use the production quote form to send an inquiry.' })
  }
  if (!(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) return res.status(415).json({ error: 'Please send a valid event brief.' })
  if (Number(req.headers['content-length']) > 20000) return res.status(413).json({ error: 'Your brief is too long. Please shorten it and try again.' })
  const origin = req.headers.origin
  const expectedHost = req.headers.host
  if (origin) {
    try {
      if (new URL(origin).host !== expectedHost) return res.status(403).json({ error: 'Please submit the form from the Viewport website.' })
    } catch {
      return res.status(403).json({ error: 'Please submit the form from the Viewport website.' })
    }
  }
  let body = req.body
  if (typeof body === 'string') {
    try { body = JSON.parse(body) } catch { return res.status(400).json({ error: 'Please send a valid event brief.' }) }
  }
  if (Buffer.byteLength(JSON.stringify(body) || '') > 20000) return res.status(413).json({ error: 'Your brief is too long. Please shorten it and try again.' })
  if (body?.website) return res.status(400).json({ error: 'We couldn’t accept this inquiry. Please email us directly.' })
  const result = validateInquiry(body)
  if (result.error) return res.status(400).json(result)
  if (!process.env.RESEND_API_KEY || !process.env.INQUIRY_FROM_EMAIL) return res.status(503).json({ error: 'Online inquiries are temporarily unavailable. Please email your event brief directly to us.' })
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
        'Idempotency-Key': `production-inquiry/${result.data.requestId}`,
      },
      body: JSON.stringify({
        from: process.env.INQUIRY_FROM_EMAIL,
        to: [process.env.INQUIRY_TO_EMAIL || 'hello@viewportworks.com'],
        reply_to: result.data.email,
        subject: 'Viewport Works / Production quote inquiry',
        text: makeEmail(result.data),
      }),
      signal: AbortSignal.timeout(10000),
    })
    const delivery = await response.json()
    if (!response.ok || !delivery.id) return res.status(response.status === 429 ? 429 : 502).json({ error: 'We couldn’t send your inquiry just now. Please try again shortly or email us directly.' })
    return res.status(200).json({ ok: true })
  } catch {
    return res.status(502).json({ error: 'We couldn’t send your inquiry just now. Please try again shortly or email us directly.' })
  }
}
