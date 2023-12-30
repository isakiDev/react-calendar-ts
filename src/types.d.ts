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
