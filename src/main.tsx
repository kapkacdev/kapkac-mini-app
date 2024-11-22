import React from 'react' // Import React to use JSX
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App' // Removed '.tsx' extension
// If you're using buffer polyfill, import it here
// import { Buffer } from 'buffer'
// window.Buffer = window.Buffer || Buffer
// console error: Uncaught SyntaxError: The requested module '/node_modules/.vite/deps/buffer.js?v=44740e28' does not provide an export named 'default' 
// the reason why it doesn't provide that is because it's a polyfill, not a module

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)