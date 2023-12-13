import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { authRouter, journalRouter } from './router'
import { AUTH_STATUS } from './consts'

export const App = () => {
  const status = AUTH_STATUS.AUTHENTICATED

  const checkRoutes = (status === AUTH_STATUS.NOT_AUTHEN)
    ? createBrowserRouter(authRouter)
    : createBrowserRouter(journalRouter)

  return <RouterProvider router={checkRoutes}/>
}
