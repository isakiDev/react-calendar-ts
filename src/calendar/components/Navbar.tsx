import { useAuthStore } from '../../hooks'

export const Navbar = () => {
  const { user, startLogout } = useAuthStore()

  return (
    <nav
      className='flex justify-between items-center p-3 bg-slate-950 mb-4 shadow-sm'
    >
      <h1 className='text-gray-200 font-bold'>{user?.name}</h1>

      <button
        className='py-1 px-2 bg-transparent border-[1px] border-red-800 rounded-xl text-gray-200 hover:bg-red-900 duration-300'
        onClick={startLogout}
      >Sign out
      </button>
    </nav>
  )
}
