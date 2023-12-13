import { createSlice } from '@reduxjs/toolkit'
import { CalendarEvent } from '../../types'

interface CalendarState {
  isLoadingEvents: boolean
  events: CalendarEvent[]
  activeEvent: null | CalendarEvent
}

const initialState: CalendarState = {
  isLoadingEvents: false,
  events: [],
  activeEvent: null
}

interface ActionType {
  type: string
  payload: CalendarEvent
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }: ActionType) => {
      state.activeEvent = payload
    }
  }
})

export const {
  onSetActiveEvent
} = calendarSlice.actions
