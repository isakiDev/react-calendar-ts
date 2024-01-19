import { useEffect } from 'react'

import Modal from 'react-modal'
import DatePicker, { registerLocale } from 'react-datepicker'

import { addHours, differenceInSeconds } from 'date-fns'
import es from 'date-fns/locale/es'

import { useCalendarStore, useForm, useUiStore } from '../../hooks'
import { type CalendarEvent } from '../../types.d'

import 'react-datepicker/dist/react-datepicker.css'
import Swal from 'sweetalert2'

registerLocale('es', es)
Modal.setAppElement('#root')

const initialState: CalendarEvent = {
  id: '',
  user: {
    id: '',
    name: ''
  },
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2)
}

export const CalendarModal = () => {
  const { toggleModal, isOpenModal } = useUiStore()
  const { activeEvent, startSavingEvent } = useCalendarStore()

  const {
    title,
    start,
    end,
    notes,
    formState,
    onInputChange,
    onDateChange,
    onSetFormState
  } = useForm({ initialState })

  useEffect(() => {
    if (activeEvent !== null) {
      onSetFormState(activeEvent)
    }
  }, [activeEvent])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const difference = differenceInSeconds(end, start)

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Incorrect Dates', 'Review the date entered', 'error')
      return
    }

    if (title.trim().length <= 0) {
      Swal.fire('Empy Title', 'Review the title entered', 'error')
      return
    }

    startSavingEvent(formState)
    toggleModal()
  }

  return (
    <Modal
      className='modal'
      closeTimeoutMS={200}
      isOpen={isOpenModal}
      onRequestClose={toggleModal}
      overlayClassName='modal-background'
      style={{
        content: {
          width: '500px'
        }
      }}
    >
      <h1 className='font-bold text-2xl pb-4'>New Event</h1>

      <hr />

      <form
        className='flex flex-col gap-2 px-4 py-2'
        onSubmit={onSubmit}
      >
        <div className='flex flex-col'>
          <label className='font-semibold'>Initial date and time</label>
          <DatePicker
            className='border border-gray-300 p-2 rounded-md pl-3 w-full'
            dateFormat='Pp'
            locale='es'
            name='start'
            onChange={(event) => { onDateChange({ value: event, type: 'start' }) } }
            selected={start}
            showTimeSelect
            timeCaption='Hora'
          />
        </div>
        <div className='flex flex-col pb-2'>
          <label className='font-semibold'>Final date and time</label>
          <DatePicker
            className='border border-gray-300 p-2 rounded-md pl-3 w-full'
            dateFormat='Pp'
            locale='es'
            minDate={start}
            name='end'
            onChange={(event) => { onDateChange({ value: event, type: 'end' }) } }
            selected={end}
            showTimeSelect
            timeCaption='Hora'
          />
        </div>
        <hr />
        <div className='flex flex-col'>
          <label className='font-semibold'>Title</label>
          <input
            // className={`border border-gray-300 p-2 rounded-md pl-3 ${titleClass}`}
            className={'border border-gray-300 p-2 rounded-md pl-3'}
            name='title'
            onChange={onInputChange}
            placeholder='Event title'
            type='text'
            value={title}
          />
          <textarea
            className='pt-2 border border-gray-300 pl-3 mt-2 rounded-md' name='notes'
            onChange={onInputChange}
            placeholder='Notes'
            rows={8}
            value={notes}
          />
        </div>
        <button
          className='py-2 px-4 rounded-md text-cyan-700 border border-cyan-700 font-semibold hover:bg-cyan-700 hover:text-white duration-300'
        >
          Save
        </button>
      </form>
    </Modal>
  )
}
