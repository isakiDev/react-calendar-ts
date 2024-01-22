import { useEffect } from 'react'

import Modal from 'react-modal'
import { differenceInSeconds } from 'date-fns'
import DatePicker, { registerLocale } from 'react-datepicker'
import { toast } from 'react-hot-toast'
import es from 'date-fns/locale/es'

import { useCalendarStore, useForm, useUiStore } from '../../hooks'

import 'react-datepicker/dist/react-datepicker.css'
import { CALENDAR_FORM_FIELDS, CALENDAR_FORM_VALIDATIONS } from '../../consts'
import { ButtonDelete } from '..'

registerLocale('es', es)
Modal.setAppElement('#root')

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
    onSetFormState,
    isFormValid,
    getValidationError
  } = useForm({
    initialState: CALENDAR_FORM_FIELDS,
    formValidations: CALENDAR_FORM_VALIDATIONS
  })

  useEffect(() => {
    if (activeEvent !== null) {
      onSetFormState(activeEvent)
    }
  }, [activeEvent])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const difference = differenceInSeconds(end, start)

    if (isNaN(difference) || difference <= 0) {
      toast.error('Invalid start or end date')
      return
    }

    if (!isFormValid) {
      toast.error(getValidationError)
      return
    }

    startSavingEvent(formState)
      .then(() => toast.success('Event saved'))
      .catch((error: Error) => toast.error(error.message))

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

        { activeEvent?.id && <ButtonDelete/>}

      </form>

    </Modal>
  )
}
