import React from 'react' // Import React to use JSX
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App' // Removed '.tsx' extension
// If you're using buffer polyfill, import it here
// import { Buffer } from 'buffer'
// window.Buffer = window.Buffer || Buffer

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
