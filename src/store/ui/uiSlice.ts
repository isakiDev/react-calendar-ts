import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  isOpenModal: boolean
}

const initialState: InitialState = {
  isOpenModal: false
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onToggleModal: (state) => {
      state.isOpenModal = !state.isOpenModal
    }
  }
})

export const { onToggleModal } = uiSlice.actions
