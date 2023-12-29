import { addHours } from 'date-fns'
import { useCalendarStore, useUiStore } from '../../hooks'

export const ButtonAdd = () => {
  const { toggleModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()

  const handleClick = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      user: {
        id: '123',
        name: 'Gaspar'
      }
    })

    toggleModal()
  }

  return (
    <button
      className='fixed bottom-8 right-8 bg-blue-600 rounded-full w-[80px] h-[80px] font-bold text-white text-xl
      hover:bg-blue-700 border border-blue-800'
      onClick={handleClick}
    >
      +
    </button>
  )
}
