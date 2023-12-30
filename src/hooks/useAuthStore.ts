import { useDispatch, useSelector } from "react-redux"

import { onChecking, onLogin, onLogout } from '../store'

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
      dispatch(onLogin({ name: 'Test', id: '1'}))
    } catch (error) {
      dispatch(onLogout('Incorrect credentials'))

      // setTimeout(() => {
      //   dispatch(clearErrorMessage())
      // }, 10)
    }
  }

  const startRegister = async ({ name, email, password }: AuthUser) => {

  }

  const checkAuthToken = async () => {

  }

  const startLogout = () => {

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
