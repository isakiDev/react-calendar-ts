import { type AxiosError, isAxiosError } from 'axios'

export const handleErrorAxios = (error: Error | AxiosError): string => {
  if (isAxiosError(error)) return error.response?.data.error || 'Unexpected Error'
  return error.message
}
