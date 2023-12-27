import type React from 'react'
import { useState } from 'react'

interface Props<T> {
  initialState: T
  formValidations?: T
}

interface DatePickerChange {
  value: Date | null
  type: 'start' | 'end'
}

export const useForm = <T>({ initialState, formValidations }: Props<T>) => {
  const [formState, setFormState] = useState(initialState)

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event?.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  const onDateChange = ({ value, type }: DatePickerChange) => {
    if (!value) return
    setFormState(prev => ({ ...prev, [type]: value }))
  }

  const onSetFormState = (data: T) => {
    setFormState(data)
  }

  return {
    formState,
    ...formState,

    onInputChange,
    onDateChange,
    onSetFormState
  }
}
