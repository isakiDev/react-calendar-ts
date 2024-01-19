import { parseISO } from 'date-fns'
import { type CalendarEvent } from '../types'

export const convertEventsToDate = (events: CalendarEvent[]) => {
  events?.forEach(event => {
    event.start = parseISO(event.start)
    event.end = parseISO(event.end)
  })

  return events
}
