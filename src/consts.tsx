import { type FormValidation } from './types'

export const AUTH_STATUS = {
  CHECKING: 'checking',
  NOT_AUTHEN: 'not_authenticated',
  AUTHENTICATED: 'authenticated'
} as const

export const LOGIN_FORM_FIELDS = {
  email: '',
  password: ''
}

export const LOGIN_FORM_VALIDATIONS: FormValidation = {
  email: [(email: string) => email.trim().length <= 0, 'The email is not invalid'],
  password: [(password: string) => password.trim().length <= 0, 'The password is not invalid']
}

export const REGISTER_FORM_FIELDS = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}

export const REGISTER_FORM_VALIDATIONS: FormValidation = {
  name: [(name: string) => name.trim().length <= 0, 'The name is not valid'],
  password: [(password: string) => password.trim().length <= 0, 'Password cannot contain spaces']
}
