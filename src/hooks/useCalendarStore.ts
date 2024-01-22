import { useDispatch, useSelector } from 'react-redux'

import {
  onSetActiveEvent,
  onUpdateEvent,
  onLoadEvents,
  type RootState,
  onAddNewEvent,
  onDeleteEvent,
  onToggleModal,
  onCloseModal
} from '../store'

import { type ErrorType, type CalendarEvent } from '../types'
import { calendarApi } from '../config'
import { convertEventsToDate, handleErrorAxios } from '../helpers'

export const useCalendarStore = () => {
  const { events, activeEvent } = useSelector((state: RootState) => state.calendar)
  const { user } = useSelector((state: RootState) => state.auth)

  const dispatch = useDispatch()

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent: CalendarEvent) => {
    try {
      if (calendarEvent.id) {
        await calendarApi.put(`calendar/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return
      }

      const { data } = await calendarApi.post<CalendarEvent>('calendar', calendarEvent)

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.id, user }))
    } catch (error) {
      throw new Error(handleErrorAxios(error as TypeError))
    }
  }

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`calendar/${activeEvent?.id}`)
      dispatch(onDeleteEvent())
    } catch (error) {
      throw new Error(handleErrorAxios(error as ErrorType))
    } finally {
      dispatch(onToggleModal())
    }
  }

  const startLoadingEvents = async () => {
    try {
      dispatch(onCloseModal())

      const { data } = await calendarApi.get<CalendarEvent[]>('calendar')
      const events = convertEventsToDate(data)

      dispatch(onLoadEvents(events))
    } catch (error) {
      throw new Error(handleErrorAxios(error as TypeError))
    }
  }

  return {
    events,
    activeEvent,

    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
