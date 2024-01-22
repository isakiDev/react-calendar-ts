import toast from 'react-hot-toast'
import { useCalendarStore } from '../../hooks'

export const ButtonDelete = () => {
  const { startDeletingEvent } = useCalendarStore()

  const handleClickDelete = () => {
    startDeletingEvent()
      .then(() => toast.success('Event Deleted'))
      .catch((error: Error) => toast.error(error.message))
  }

  return (
    <button
      type='button'
      aria-label='btn-delete'
      onClick={handleClickDelete}
      className='w-full py-2 px-4 rounded-md text-red-800 border border-red-800 font-semibold hover:bg-red-800 hover:text-white duration-300'
    >Delete</button>
  )
}
