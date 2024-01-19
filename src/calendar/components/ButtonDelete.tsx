import { useUiStore } from '../../hooks'

export const ButtonDelete = () => {
  // const { hasEventSelected, startDeletingEvent } = useCalendarStore()
  const { isOpenModal } = useUiStore()

  const handleClickDelete = () => {
    // startDeletingEvent()
  }

  return (
    <button
      aria-label='btn-delete'
      className='fixed bottom-8 left-8 bg-red-700 rounded-full w-[50px] h-[50px] font-bold text-white text-xl
      hover:bg-red-800'
      onClick={handleClickDelete}
      // style={{ display: hasEventSelected && !isOpenModal ? '' : 'none' }}
    >
      -
    </button>
  )
}
