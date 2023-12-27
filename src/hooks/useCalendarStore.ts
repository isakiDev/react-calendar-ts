import { useDispatch, useSelector } from 'react-redux'
import { 
  onSetActiveEvent,
  onUpdateEvent,
  onAddNewEvent,
  onLoadEvents,
  RootState 
} from '../store'

import { CalendarEvent } from '../types'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar)

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent: CalendarEvent) => {
    dispatch(onUpdateEvent(calendarEvent))
  }

  const startLoadingEvents = () => {
    const events: CalendarEvent[] = [
      {
        id: '1',
        notes: 'First note',
        title: 'A title 1',
        start: new Date(),
        end: new Date(),
        user: {
          id: '1',
          name: 'Gaspar'
        }
      }
    ]

    dispatch(onLoadEvents(events))
  }

  return {
    events,
    activeEvent,
    
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents
  }
}
