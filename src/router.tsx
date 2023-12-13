import { Navigate } from 'react-router-dom'
import { authRoutes } from './auth/routes/authRoutes'
import { CalendarPage } from './calendar'

export const authRouter = [
  {
    path: '/*',
    element: <Navigate to='auth/login'/>
  },
  {
    path: 'auth/*',
    children: authRoutes
  }
]

export const journalRouter = [
  {
    path: '/*',
    element: <Navigate to='/'/>
  },
  {
    path: '/',
    element: <CalendarPage/>
  }
]
