import { CalendarEvent as CalendarEventType } from '../../types'

interface Props {
  event: CalendarEventType
}

export const CalendarEvent = ({ event }: Props) => {
  const { title } = event

  return (
    <>
      <strong>{title}</strong>
      <span>A user</span>
    </>
  )
}
