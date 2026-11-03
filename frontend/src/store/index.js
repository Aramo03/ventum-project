import { createSlice, configureStore } from '@reduxjs/toolkit'

const shellSlice = createSlice({
  name: 'shell',
  initialState: {},
  reducers: {},
})

export const store = configureStore({
  reducer: {
    shell: shellSlice.reducer,
  },
})
