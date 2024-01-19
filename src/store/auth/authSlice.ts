import { createSlice } from '@reduxjs/toolkit'
import { type AUTH_STATUS } from '../../consts'
import { type User } from '../../types'

interface AuthState {
  status: typeof AUTH_STATUS[keyof typeof AUTH_STATUS]
  user: User | null
  errorMessage: string | null
}

type ErrorMessage = AuthState['errorMessage']

const initialState: AuthState = {
  status: 'checking',
  user: null,
  errorMessage: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking'
      state.user = null
      state.errorMessage = null
    },
    onLogin: (state, { payload }: { payload: User }) => {
      state.status = 'authenticated'
      state.user = payload
      state.errorMessage = null
    },
    onLogout: (state, { payload }: { payload: ErrorMessage }) => {
      state.status = 'not_authenticated'
      state.user = null
      state.errorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null
    }
  }
})

export const {
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout
} = authSlice.actions
