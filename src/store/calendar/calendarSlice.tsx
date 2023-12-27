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

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }: { payload: CalendarEvent }) => {
      state.activeEvent = payload
    },
    onAddNewEvent: (state, { payload }: { payload: CalendarEvent }) => {
      state.activeEvent = null
      state.events.push(payload)
    },
    onUpdateEvent: (state, { payload }: { payload: CalendarEvent }) => {
      state.events = state.events.map(event => {
        if (event.id === payload.id) return payload
        return event
      })
    },
    onLoadEvents: (state, { payload = [] }: { payload: CalendarEvent[] }) => {
      state.isLoadingEvents = false
      payload.forEach(event => {
        const exists = state.events.some(dbEvent => dbEvent.id === event.id)

        if (!exists) {
          state.events.push(event)
        }
      })
    }
  }
})

export const {
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents
} = calendarSlice.actions
