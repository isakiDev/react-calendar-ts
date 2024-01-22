import { addHours } from 'date-fns'
import { useCalendarStore, useUiStore } from '../../hooks'
import { useSelector } from 'react-redux'
import { type RootState } from '../../store'

export const ButtonAdd = () => {
  const { toggleModal } = useUiStore()
  const { setActiveEvent } = useCalendarStore()
  const { user } = useSelector(((state: RootState) => state.auth))

  const handleClick = () => {
    setActiveEvent({
      title: '',
      notes: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      user
    })

    toggleModal()
  }

  return (

   <button
      className='fixed bottom-8 right-8 bg-slate-800 rounded-full w-[70px] h-[70px] shadow-sm font-bold text-white text-xl
      hover:bg-slate-900'
      onClick={handleClick}
    >
      +
    </button>
  )
}
