import test, { afterEach, mock } from 'node:test'
import assert from 'node:assert/strict'
import handler, { validateInquiry } from '../api/inquiry.js'

const valid = { name: 'Preview Reviewer', email: 'reviewer@example.com', company: '', date: '', venue: '', eventType: '', attendance: '', needs: [], message: 'A sample production brief for validation.', website: '', source: 'homepage', requestId: 'd3d16c26-37a8-499a-bb57-70ce72814166' }
const originalEnv = { key: process.env.RESEND_API_KEY, from: process.env.INQUIRY_FROM_EMAIL }
afterEach(() => {
  mock.restoreAll()
  for (const [key, value] of [['RESEND_API_KEY', originalEnv.key], ['INQUIRY_FROM_EMAIL', originalEnv.from]]) {
    if (value === undefined) delete process.env[key]
    else process.env[key] = value
  }
})
async function request(body = valid, overrides = {}) {
  const res = { code: 200, headers: {}, setHeader(key, value) { this.headers[key] = value }, status(code) { this.code = code; return this }, json(data) { this.data = data; return this } }
  await handler({ method: 'POST', headers: { 'content-type': 'application/json', host: 'preview.example.com', origin: 'https://preview.example.com' }, body, ...overrides }, res)
  return res
}
test('accepts an early brief with unknown optional details', () => assert.ok(validateInquiry(valid).data))
test('rejects invalid contact, dates, attendance, long fields and unlisted needs', () => {
  for (const patch of [{ email: 'bad' }, { name: 'a' }, { message: 'short' }, { date: '2026-02-30' }, { attendance: '-2' }, { company: 'x'.repeat(161) }, { needs: ['injected-service'] }, { requestId: 'bad-id' }]) assert.ok(validateInquiry({ ...valid, ...patch }).error)
})
test('rejects malformed JSON, foreign origins, unsupported methods and oversized payloads', async () => {
  assert.equal((await request('{')).code, 400)
  assert.equal((await request(valid, { headers: { 'content-type': 'application/json', host: 'preview.example.com', origin: 'https://foreign.example.com' } })).code, 403)
  assert.equal((await request(valid, { method: 'GET' })).code, 405)
  assert.equal((await request({ ...valid, message: 'x'.repeat(21000) })).code, 413)
})
test('honeypot never sends mail', async () => {
  const spy = mock.method(globalThis, 'fetch', () => { throw new Error('Should not send') })
  assert.equal((await request({ ...valid, website: 'spam.example.com' })).code, 400)
  assert.equal(spy.mock.callCount(), 0)
})
test('missing delivery configuration returns an honest unavailable response', async () => {
  delete process.env.RESEND_API_KEY
  delete process.env.INQUIRY_FROM_EMAIL
  assert.equal((await request()).code, 503)
})
test('sends plain text to the fixed recipient with reply-to and idempotency, only reports success after acceptance', async () => {
  process.env.RESEND_API_KEY = 'unit-test-placeholder'
  process.env.INQUIRY_FROM_EMAIL = 'Viewport Works <inquiries@example.com>'
  const spy = mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ id: 'mock-delivery-id' }), { status: 200 }))
  const res = await request()
  assert.equal(res.code, 200)
  const args = spy.mock.calls[0].arguments
  const email = JSON.parse(args[1].body)
  assert.equal(args[0], 'https://api.resend.com/emails')
  assert.equal(email.reply_to, valid.email)
  assert.deepEqual(email.to, [process.env.INQUIRY_TO_EMAIL || 'hello@viewportworks.com'])
  assert.match(email.text, /sample production brief/)
  assert.equal(email.html, undefined)
  assert.equal(args[1].headers['Idempotency-Key'], `production-inquiry/${valid.requestId}`)
})
test('provider errors never report success or leak provider details', async () => {
  process.env.RESEND_API_KEY = 'unit-test-placeholder'
  process.env.INQUIRY_FROM_EMAIL = 'inquiries@example.com'
  mock.method(globalThis, 'fetch', async () => new Response(JSON.stringify({ secret: 'private-error' }), { status: 403 }))
  const res = await request()
  assert.equal(res.code, 502)
  assert.ok(!JSON.stringify(res.data).includes('private-error'))
})
