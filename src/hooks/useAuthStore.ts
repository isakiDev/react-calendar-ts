import { useDispatch, useSelector } from "react-redux"

import { onChecking, onLogin, onLogout, onLogoutCalendar } from '../store'

import { AuthUser } from "../types"
import { RootState } from "../store"

export const useAuthStore = () => {
  const dispatch = useDispatch()
  const { user, errorMessage, status } = useSelector((state: RootState) => state.auth)

  const startLogin = async ({ email, password }: AuthUser) => {
    dispatch(onChecking())

    try {
      // checking user with credentials
      // set token in local storage
      window.localStorage.setItem('token', 'dawdawdawdawd')
      // dispatch login
      dispatch(onLogin({ name: 'TestLogin', id: '1'}))
    } catch (error) {
      dispatch(onLogout('Incorrect credentials'))

      // setTimeout(() => {
      //   dispatch(clearErrorMessage())
      // }, 10)
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

    if (!token) return dispatch(onLogout('null'))

    try {
      // renew token
      window.localStorage.setItem('token', 'tokenrenewPPPPPPPP')
      dispatch(onLogin({ name: 'TestCheck', id: '1'}))
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
