/**
 * Entry point for the React application.
 * This script renders the root component of the application into the DOM.
 */
// External imports
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


/**
 * WARNING!! react-toastify notifications must be imported above index.css
 * to avoid CSS styling conflicts.
 *
 * The toast notifications are rendered at the top-center of the screen and
 * are styled using the CSS file 'ReactToastify.css' which must be imported
 * before any other CSS files. This also will let you MODIFY the custom CSS
 * wrappers and the global CSS (index.css) without any conflicts.
 *
 */
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Global CSS styles -> Ref client index.css for more details
import './index.css'


/**
 * Renders the root component of the application into the DOM element with the
 * ID 'root'.
 *
 * React.StrictMode: Used during development for additional checks and more logs.
 * App: The root component of the application.
 * ToastContainer: Used to display toast notifications at the top-center of the screen
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
      <ToastContainer position='top-center' />
  </React.StrictMode>,
)
