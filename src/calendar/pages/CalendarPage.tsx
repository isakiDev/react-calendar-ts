import { useEffect } from 'react'

import { Calendar, type View } from 'react-big-calendar'
import toast from 'react-hot-toast'

import { localizer, getMessages, handleErrorAxios } from '../../helpers'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'
import { ButtonAdd, ButtonDelete, CalendarEvent, CalendarModal, Navbar } from '..'
import { type ErrorType, type CalendarEvent as CalendarEventType } from '../../types'

import 'react-big-calendar/lib/css/react-big-calendar.css'

export const CalendarPage = () => {
  const { toggleModal } = useUiStore()
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore()
  const { user } = useAuthStore()

  const eventStyleGetter = (event: CalendarEventType) => {
    const isMyEvent = user?.id === event.user._id

    const style = {
      backgroundColor: isMyEvent ? '#000' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style }
  }

  // const onDoubleClick = (event: CalendarEventType) => {
  //   console.log('click')
  // }

  const onSelectEvent = (event: CalendarEventType) => {
    setActiveEvent(event)
    toggleModal()
  }

  const onViewChanged = (event: View) => {
    console.log({ change: event })
  }

  useEffect(() => {
    toast.success(`Welcome ${user?.name}`)

    startLoadingEvents()
      .catch((error: ErrorType) => toast.error(handleErrorAxios(error)))
  }, [])

  return (
    <>
      <Navbar/>
      <Calendar
        components={{
          event: CalendarEvent
        }}
        culture='es'
        // endAccessor='slotEnd'
        eventPropGetter={eventStyleGetter}
        events={events}
        localizer={localizer}
        messages={getMessages()}
        // onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChanged}
        // startAccessor='slotStart'

        style={{ height: '100vh' }}
      />

      <CalendarModal/>
      <ButtonAdd/>
      <ButtonDelete/>
    </>
  )
}
