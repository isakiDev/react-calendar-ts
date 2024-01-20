import { useDispatch, useSelector } from 'react-redux'

import {
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents,
  type RootState,
  onAddNewEvent
} from '../store'

import { type CalendarEvent } from '../types'
import { calendarApi } from '../config'
import { convertEventsToDate } from '../helpers'
import { isAxiosError } from 'axios'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar)

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent: CalendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`calendar/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent(calendarEvent))
        return
      }

      const { data } = await calendarApi.post<CalendarEvent>('calendar', { calendarEvent })
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.id }))
    } catch (error) {
      if (isAxiosError(error)) throw error
      throw new Error('Error to update event')
    }
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get<CalendarEvent[]>('calendar')
      const events = convertEventsToDate(data)

      dispatch(onLoadEvents(events))
    } catch (error) {
      throw new Error('Error loading events')
    }
  }

  return {
    events,
    activeEvent,

    setActiveEvent,
    startSavingEvent,
    startLoadingEvents
  }
}
