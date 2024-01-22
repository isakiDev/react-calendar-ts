import { type CalendarEvent as CalendarEventType } from '../../types'

interface Props {
  event: CalendarEventType
}

export const CalendarEvent = ({ event }: Props) => {
  const { title, user } = event

  return (
    <>
      <span>{title} - </span>
      <strong>{user?.name}</strong>
    </>
  )
}
