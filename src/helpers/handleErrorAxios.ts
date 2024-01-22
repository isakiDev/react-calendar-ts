import { type AxiosError, isAxiosError } from 'axios'
import { ErrorResponse, ValidationErrors } from '../types'

export const handleErrorAxios = (error: Error | AxiosError): string => {
  const errorMessage = 'Unexpected Error'

  // if (!isAxiosError(error)) return error.message
  if (!isAxiosError(error)) return errorMessage

  if (error.response?.data?.errors) {
    const axiosError = error as AxiosError<ErrorResponse>
    const errors: ValidationErrors = axiosError?.response?.data?.errors ?? {}
    return Object.entries(errors).map(([_, { msg }]) => msg).join('\n')
  }
  
  return error.response?.data?.error || errorMessage
}