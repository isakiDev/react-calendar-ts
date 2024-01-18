import { useDispatch, useSelector } from "react-redux"

import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from '../store'

import { AuthUser, ErrorResponse, TokenResponse, ValidationErrors } from "../types"
import { RootState } from "../store"
import { calendarApi } from "../config"
import { AxiosError, isAxiosError } from "axios"

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
      dispatch(onLogout('Incorrect credentials'))

      setTimeout(() => {
        dispatch(clearErrorMessage())
      }, 10)
    }
  }

  const startRegister = async ({ name, email, password }: AuthUser) => {
    dispatch(onChecking())

    try {
      
      // create a user

      window.localStorage.setItem('token', 'dawdawdawd')

      dispatch(onLogin({ name: 'TestRegister', id: '1' }))
    } catch (error) {
      // dispatch(onLogout(error.response.data?.msg || '--'))
      dispatch(onLogout('error'))

      // setTimeout(() => {
      //   dispatch(clearErrorMessage())
      // }, 10)
    }
  }

  const checkAuthToken = async () => {
    const token = window.localStorage.getItem('token')

    if (!token) return dispatch(onLogout(null))

    try {
      const { data } = await calendarApi.get<TokenResponse>('auth/rev')

      window.localStorage.setItem('token', data.token)

      dispatch(onLogin({ name: data.user.name, id: data.user.id}))
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
