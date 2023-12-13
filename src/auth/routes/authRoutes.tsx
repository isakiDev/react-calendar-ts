import { Navigate } from 'react-router-dom'

import { LoginPage, RegisterPage } from '../pages'

export const authRoutes = [
  {
    path: '*',
    element: <Navigate to='login'/>
  },
  {
    path: 'login',
    element: <LoginPage/>
  },
  {
    path: 'register',
    element: <RegisterPage/>
  }
]
