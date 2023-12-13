import { useDispatch, useSelector } from 'react-redux'
import { onToggleModal } from '../store'

import { RootState } from '../store'

export const useUiStore = () => {
  const { isOpenModal } = useSelector((state: RootState) => state.ui)

  const dispatch = useDispatch()

  const toggleModal = () => {
    dispatch(onToggleModal())
  }

  return {
    toggleModal,
    isOpenModal
  }
}
