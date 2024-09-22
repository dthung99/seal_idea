import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./color_variables/CustomBootstrapTheme.scss"

import AllContextProvider from './AllContextProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AllContextProvider>
      <App />
    </AllContextProvider>
  </StrictMode>
)
