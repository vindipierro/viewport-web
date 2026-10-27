import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const partners = [
  { name: 'Soundhouse AV Rentals', logo: '/partner-logos/soundhouse.svg' },
  { name: 'Shadowbox Design Management', logo: '/partner-logos/shadowbox.svg' },
  { name: 'Long Island Video / LIVE', logo: '/partner-logos/live.svg' },
  { name: 'Hart to Hart Entertainment', logo: '/partner-logos/hart-to-hart.svg' },
  { name: 'Boom Event Source', logo: '/partner-logos/boom-event-source.svg' },
  { name: 'NY Talent Group', logo: '/partner-logos/ny-talent-group.svg' },
  { name: 'DJUSA', logo: '/partner-logos/djusa.svg' },
  { name: 'DJs Unlimited / DJU Events', logo: '/partner-logos/dju-events.svg' },
  { name: 'InHouse Design', logo: '/partner-logos/inhouse-design.svg' },
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
          <div className="production-partner" key={partner.name}>
            <img className="production-partner-logo" src={partner.logo} alt={partner.name} loading="lazy" />
          </div>
        ))}
      </div>
    </div>,
    host,
  )
}
