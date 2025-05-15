import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext.jsx'

// Import BrowserRouter
//import './index.css'
import './home.css'
import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* Wrap your app with UserProvider for ease of use of userId */}
      <UserProvider> 
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>,
)
