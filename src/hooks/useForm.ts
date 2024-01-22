import { useEffect, useState, useMemo } from 'react'
import { type ValidationResponse, type FormValidation } from '../types'

type FormState = Record<string, any>

interface Props<T> {
  initialState: T
  formValidations?: FormValidation
}

interface DatePickerChange {
  value: Date | null
  type: 'start' | 'end'
}

export const useForm = <T extends FormState>({ initialState, formValidations = {} }: Props<T>) => {
  const [formState, setFormState] = useState(initialState)
  const [formValidation, setFormValidation] = useState<ValidationResponse>({})

  useEffect(() => {
    createValidators()
  }, [formState])

  useEffect(() => {
    setFormState(initialState)
  }, [initialState])

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false
    }

    return true
  }, [formValidation])

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

  const createValidators = () => {
    const formCheckValues: ValidationResponse = {}

    for (const formField of Object.keys(formValidations)) {
      const [fn, errorMessage] = formValidations[formField]

      formCheckValues[`${formField}Valid`] = fn(formState[formField]) ? errorMessage : null
    }

    setFormValidation(formCheckValues)
  }

  const getValidationError = () => {
    return Object.entries(formValidation).map(([_, msg]) => msg).join('\n').trim() ?? ''
  }

  return {
    formState,
    ...formState,
    onInputChange,
    onDateChange,
    onSetFormState,

    isFormValid,
    getValidationError
  }
}
