import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import { initBotId } from 'botid/client/core'
import App from './App'
import './styles.css'
import './positioning.css'

initBotId({
  protect: [
    {
      path: '/api/inquiry',
      method: 'POST',
      advancedOptions: { checkLevel: 'basic' },
    },
  ],
})

const root = document.getElementById('root')
const app = <App path={window.location.pathname} />
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
