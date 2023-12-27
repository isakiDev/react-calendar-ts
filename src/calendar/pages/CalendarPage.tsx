import { Calendar, EventProps, type View } from 'react-big-calendar'

import { localizer, getMessages } from '../../helpers'

import { useCalendarStore, useUiStore } from '../../hooks'
import { CalendarEvent, CalendarModal } from '..'
import { CalendarEvent as CalendarEventType } from '../../types'

import 'react-big-calendar/lib/css/react-big-calendar.css'

const events: CalendarEventType[] = [
  {
    title: 'All Day Event very long title',
    allDay: true,
    start: new Date(),
    end: new Date()
  },
  {
    title: 'Other notes',
    allDay: true,
    start: new Date(),
    end: new Date()
  }
]

const eventStyleGetter = () => {
  const style = {
    backgroundColor: '#465660',
    borderRadius: '0px',
    opacity: 0.8,
    color: 'white'
  }

  return { style }
}

export const CalendarPage = () => {
  const { toggleModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()

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

  return (
    <>
      <Calendar
        components={{
          event: CalendarEvent
        }}
        culture='es'
        // endAccessor='slotEnd'
        eventPropGetter={eventStyleGetter}
        events={events as Array<EventProps<CalendarEventType>>}
        localizer={localizer}
        messages={getMessages()}
        // onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChanged}
        // startAccessor='slotStart'

        style={{ height: '100vh' }}
      />

      <CalendarModal/>
    </>
  )
}
