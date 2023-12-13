import { configureStore } from '@reduxjs/toolkit'
import { calendarSlice, uiSlice } from '.'

export const store = configureStore({
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>
// export type AppDicpatch = typeof store.dispatch
