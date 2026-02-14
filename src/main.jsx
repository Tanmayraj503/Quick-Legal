import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from './Pages/About.jsx'
import Contact from './Pages/Contact.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Contact />
  </StrictMode>,
)
