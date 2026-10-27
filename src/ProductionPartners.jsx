import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const partners = [
  { name: 'Shadowbox Design Management', brand: 'shadowbox' },
  { name: 'Hart to Hart Entertainment', brand: 'hart-to-hart' },
  { name: 'DJUSA', brand: 'djusa' },
  { name: 'DJs Unlimited', detail: 'DJU Events', brand: 'dju' },
  { name: 'InHouse Design', brand: 'inhouse' },
  { name: 'Long Island Video', detail: 'LIVE', brand: 'live' },
  { name: 'Soundhouse AV Rentals', brand: 'soundhouse' },
]

export default function ProductionPartners() {
  const [host, setHost] = useState(null)

  useEffect(() => {
    const partnership = document.querySelector('#partnership')
    const partnerGrid = partnership?.querySelector('.partner-grid')
    if (!partnership || !partnerGrid) return

    const mount = document.createElement('div')
    mount.className = 'production-partners-mount'
    partnerGrid.parentNode.insertBefore(mount, partnerGrid)
    setHost(mount)

    return () => mount.remove()
  }, [])

  if (!host) return null

  return createPortal(
    <div className="production-partners" data-reveal>
      <div className="production-partners-heading">
        <span className="section-kicker">Selected production partners</span>
        <p>Production experience includes work delivered alongside these event, AV and technical production teams.</p>
      </div>
      <div className="production-partners-grid" aria-label="Selected production partners">
        {partners.map(partner => (
          <div className={`production-partner production-partner--${partner.brand}`} key={partner.name}>
            <span className="production-partner-name">{partner.name}</span>
            {partner.detail && <span className="production-partner-detail">{partner.detail}</span>}
          </div>
        ))}
      </div>
    </div>,
    host,
  )
}
