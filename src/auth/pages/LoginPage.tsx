import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { toast } from 'react-hot-toast'
import { useForm } from '../../hooks/useForm'

import { useAuthStore } from '../../hooks'
import { LOGIN_FORM_FIELDS, LOGIN_FORM_VALIDATIONS } from '../../consts'

export const LoginPage = () => {
  const { email, password, onInputChange, isFormValid, getValidationError } = useForm({
    initialState: LOGIN_FORM_FIELDS,
    formValidations: LOGIN_FORM_VALIDATIONS

  })

  const { startLogin, errorMessage } = useAuthStore()

  useEffect(() => {
    if (errorMessage !== null) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormValid) {
      toast.error(getValidationError)
      return
    }

    startLogin({ email, password })
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
      <form
        className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'
        onSubmit={onSubmit}
      >
        <h1 className='font-bold text-center text-2xl mb-5'>Login</h1>
        <div className='bg-white shadow w-full rounded-lg divide-y divide-gray-200'>
          <div className='px-5 py-7'>
            <label className='font-semibold text-sm text-gray-600 pb-1 block'>E-mail</label>
            <input
              className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
              name='email'
              onChange={onInputChange}
              type='email'
              value={email}
              required
            />
            <label className='font-semibold text-sm text-gray-600 pb-1 block'>Password</label>
            <input
              className='border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full'
              name='password'
              onChange={onInputChange}
              type='password'
              value={password}
              required
            />
            <button
              className='transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block'
              type='submit'
            >
              <span className='inline-block mr-2'>Login</span>
              <svg className='w-4 h-4 inline-block' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path d='M17 8l4 4m0 0l-4 4m4-4H3' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' />
              </svg>
            </button>
          </div>
          <div className='py-2'>
            <div className='flex items-center justify-end'>
              <Link
                className='inline-block ml-1 transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset'
                to='/auth/register'
              >Create account
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
