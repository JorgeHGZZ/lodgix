import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from './routes/AppRoutes'
import "../../main.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppRouter/>
  </StrictMode>,
)
