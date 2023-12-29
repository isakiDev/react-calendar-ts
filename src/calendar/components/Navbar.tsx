// import { useAuthStore } from '../../hooks'

export const Navbar = () => {
  // const { user, startLogout } = useAuthStore()

  const user = {
    name: 'test'
  }

  const startLogout = () => {}

  return (
    <nav
      className='flex justify-between items-center p-3 bg-gray-950 mb-4 shadow-lg'
    >
      <h1 className='text-gray-200 font-semibold'>{user?.name}</h1>
      <button
        className='py-1 px-4 bg-transparent border-[1px] border-red-600 rounded-md text-gray-200 hover:bg-red-800 duration-300'
        onClick={startLogout}
      >Salir
      </button>
    </nav>
  )
}
