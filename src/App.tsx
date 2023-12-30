import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { authRouter, calendarRouter } from './router'
import { AUTH_STATUS } from './consts'
import { useAuthStore } from './hooks'

export const App = () => {
  const { status } = useAuthStore()

  // useEffect(() => {
  //   checkAuthToken()
  // }, [])

  // if (status === AUTH_STATUS.CHECKING) {
  //   return (
  //     <Loading />
  //   )
  // }

  const checkRoutes = (status === AUTH_STATUS.NOT_AUTHEN || status === AUTH_STATUS.CHECKING)
    ? createBrowserRouter(authRouter)
    : createBrowserRouter(calendarRouter)

  return <RouterProvider router={checkRoutes}/>
}
