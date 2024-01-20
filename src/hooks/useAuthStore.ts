import { useDispatch, useSelector } from 'react-redux'
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar, type RootState } from '../store'
import { type ErrorResponse, type AuthUser, type TokenResponse, type ValidationError, type ValidationErrors } from '../types'

import { calendarApi } from '../config'
import { type AxiosError, isAxiosError } from 'axios'

export const useAuthStore = () => {
  const dispatch = useDispatch()
  const { user, errorMessage, status } = useSelector((state: RootState) => state.auth)

  const startLogin = async ({ email, password }: AuthUser) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post<TokenResponse>('auth/login', { email, password })

      window.localStorage.setItem('token', data.token)

      dispatch(onLogin({ name: data.user.name, id: data.user.id }))
    } catch (error) {
      dispatch(onLogout('Invalid email or password'))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startRegister = async ({ name, email, password }: AuthUser) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post<TokenResponse>('auth/register', { name, email, password })

      window.localStorage.setItem('token', data.token)

      dispatch(onLogin({ name: data.user.name, id: data.user.id }))
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>
        const errors: ValidationErrors[] = axiosError?.response?.data.errors ?? []
        const message = Object.entries(errors).map(([_, { msg }]) => msg).join('\n')

        dispatch(onLogout(message))
        return
      }

      dispatch(onLogout('Error'))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const checkAuthToken = async () => {
    const token = window.localStorage.getItem('token')

    if (!token) return dispatch(onLogout(null))

    try {
      const { data } = await calendarApi.get<TokenResponse>('auth/rev')

      window.localStorage.setItem('token', data.token)

      dispatch(onLogin({ name: data.user.name, id: data.user.id }))
    } catch (error) {
      dispatch(onLogout(null))
    }
  }

  const startLogout = () => {
    window.localStorage.clear()
    dispatch(onLogoutCalendar())
    dispatch(onLogout(null))
  }

  return {
    errorMessage,
    status,
    user,

    checkAuthToken,
    startLogin,
    startLogout,
    startRegister
  }
}
