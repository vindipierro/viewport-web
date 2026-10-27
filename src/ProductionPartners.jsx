import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const partners = [
  'Soundhouse AV Rentals',
  'Shadowbox Design Management',
  'Long Island Video / LIVE',
  'Hart to Hart Entertainment',
  'Boom Event Source',
  'NY Talent Group',
  'DJUSA',
  'DJs Unlimited / DJU Events',
  'InHouse Design',
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
          <div className="production-partner" key={partner}>
            <span className="production-partner-name">{partner}</span>
          </div>
        ))}
      </div>
    </div>,
    host,
  )
}
