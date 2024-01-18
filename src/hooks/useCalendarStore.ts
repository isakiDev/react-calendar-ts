import { useDispatch, useSelector } from 'react-redux'
import { 
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents,
  RootState 
} from '../store'

import { CalendarEvent } from '../types'
import { calendarApi } from '../config'
import Swal from 'sweetalert2'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar)

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent: CalendarEvent) => {
    dispatch(onUpdateEvent(calendarEvent))
  }

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get('/calendar')
      dispatch(onLoadEvents(data))
    } catch (error) {
      Swal.fire('Error')      
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
