import { useDispatch, useSelector } from 'react-redux'

import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar, type RootState } from '../store'
import { handleErrorAxios } from '../helpers'
import { calendarApi } from '../config'
import { type ErrorType, type AuthUser, type TokenResponse } from '../types'

export const useAuthStore = () => {
  const { user, errorMessage, status } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()

  const startLogin = async ({ email, password }: AuthUser) => {
    dispatch(onChecking())

    try {
      const { data } = await calendarApi.post<TokenResponse>('auth/login', { email, password })
      const { id, name } = data.user

      window.localStorage.setItem('token', data.token)

      dispatch(onLogin({ name, id }))
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
      dispatch(onLogout(handleErrorAxios(error as ErrorType)))

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
      const { id, name } = data.user

      window.localStorage.setItem('token', data.token)

      dispatch(onLogin({ name, id }))
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
