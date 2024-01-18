import {parseISO} from "date-fns";
import { CalendarEvent } from "../types";

export const convertEventsToDate = (events: CalendarEvent[]) => {
  return events?.map(event => {
    event.start = parseISO(event.start)
    event.end = parseISO(event.end)
  })
}
