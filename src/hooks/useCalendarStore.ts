import { useDispatch } from 'react-redux'
import { onSetActiveEvent } from '../store'

import { CalendarEvent } from '../types'

export const useCalendarStore = () => {
  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  return {
    setActiveEvent
  }
}
