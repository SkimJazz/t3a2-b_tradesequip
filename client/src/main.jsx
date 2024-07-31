import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    // React.StrictMode -> Use during development for additional checks and more logs
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
