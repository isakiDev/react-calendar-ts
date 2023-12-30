export const AUTH_STATUS = {
  CHECKING: 'checking',
  NOT_AUTHEN: 'not_authenticated',
  AUTHENTICATED: 'authenticated'
} as const

export const LOGIN_FORM_FIELDS = {
  email: '',
  password: ''
}

export const REGISTER_FORM_FIELDS = {
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
}
