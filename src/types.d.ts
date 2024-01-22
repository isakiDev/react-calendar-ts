import { type AxiosError } from 'axios'

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

export interface ValidationError {
  type: string
  value: string
  msg: string
  path: string
  location: string
}

export type ValidationErrors = Record<string, ValidationError>

export interface ErrorResponse {
  errors: ValidationErrors
}

export type ErrorType = Error | AxiosError

// form
export type FormValidation = Record<string, [(value: string) => boolean, string]> | {}
