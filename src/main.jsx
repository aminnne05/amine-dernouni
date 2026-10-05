import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'
import './index.css'
import App from './App.jsx'

const smoothScrollOptions = {
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
  smoothWheel: true,
  syncTouch: false,
  touchMultiplier: 2,
  wheelMultiplier: 1,
  anchors: true,
  stopInertiaOnNavigate: true,
  respectReducedMotion: true,
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ReactLenis root options={smoothScrollOptions}>
      <App />
    </ReactLenis>
  </StrictMode>,
)
