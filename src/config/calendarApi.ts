import axios from 'axios'

const URL = import.meta.env.VITE_API_URL

export const calendarApi = axios.create({
  baseURL: URL
})

calendarApi.interceptors.request.use(config => {
  config.headers = config.headers ?? ''
  config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token') ?? ''

  return config
})
