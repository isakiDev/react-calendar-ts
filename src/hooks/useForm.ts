import type React from 'react'
import { useState } from 'react'

interface Props<T> {
  initialState: T
  formValidations?: object
}

export const useForm = <T extends Record<string, unknown>>({ initialState, formValidations = {} }: Props<T>) => {
  const [formState, setFormState] = useState(initialState)

  // FormEvent<HTMLFormElement
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormState(prev => ({ ...prev, [name]: value }))
  }

  return {
    ...formState,
    onInputChange
  }
}
