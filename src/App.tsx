import { useEffect } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { authRouter, calendarRouter } from './router'
import { useAuthStore } from './hooks'
import { AUTH_STATUS } from './consts'
import { Spinner } from './calendar'

export const App = () => {
  const { status, checkAuthToken } = useAuthStore()

  useEffect(() => {
    checkAuthToken()
  }, [])

  if (status === AUTH_STATUS.CHECKING) {
    return (
      <Spinner />
    )
  }

  const checkRoutes = (status === AUTH_STATUS.NOT_AUTHEN)
    ? createBrowserRouter(authRouter)
    : createBrowserRouter(calendarRouter)

  return <RouterProvider router={checkRoutes}/>
}
