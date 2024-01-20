import { parseISO } from 'date-fns'
import { type CalendarEvent } from '../types'

export const convertEventsToDate = (events: CalendarEvent[]) => {
  return events.map(event => {
    event.start = parseISO(event.start.toString())
    event.end = parseISO(event.end.toString())
    return event
  })
}
