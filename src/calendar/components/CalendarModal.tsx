import Modal from 'react-modal'
import DatePicker from 'react-datepicker'
import { addHours } from 'date-fns'

import 'react-datepicker/dist/react-datepicker.css'
import { useForm, useUiStore } from '../../hooks'

Modal.setAppElement('#root')

const initialState = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2)
}

export const CalendarModal = () => {
  const { toggleModal, isOpenModal } = useUiStore()
  const {
    title,
    start,
    end,
    notes,
    onInputChange
  } = useForm({ initialState })

  const onCloseModal = () => {
    toggleModal()
  }

  return (
    <Modal
      className='modal'
      closeTimeoutMS={200}
      isOpen={isOpenModal}
      onRequestClose={onCloseModal}
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
        // onSubmit={onSubmit}
      >
        <div className='flex flex-col'>
          <label className='font-semibold'>Initial date and time</label>
          <DatePicker
            className='border border-gray-300 p-2 rounded-md pl-3 w-full'
            dateFormat='Pp'
            locale='es'
            name='start'
            // onChange={onInputChange}
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
            name='end'
            showTimeSelect
            timeCaption='Hora'
            minDate={start}
            // onChange={(event) => onDateChange(event, 'end')}
            selected={end}
          />
        </div>
        <hr />
        <div className='flex flex-col'>
          <label className='font-semibold'>Title</label>
          <input
            // className={`border border-gray-300 p-2 rounded-md pl-3 ${titleClass}`}
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
