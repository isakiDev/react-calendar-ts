// calendar
export interface CalendarEvent {
  id?: string
  title: string
  notes: string
  start: Date
  end: Date
  user: User
}

export interface User {
  id: string
  name: string
}

export interface AuthUser {
  name?: string
  email: string
  password: string
}

// Axios response
export interface TokenResponse {
  token: string
  user: {
    id: string
    email?: string
    name: string
  }
}

interface ValidationError {
  type: string
  msg: string
  path: string
  location: string
}

type ValidationErrors = Record<string, ValidationError>

interface ErrorResponse {
  errors: ValidationErrors[]
}
