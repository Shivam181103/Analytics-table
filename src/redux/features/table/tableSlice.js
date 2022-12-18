import axios from 'axios'
 import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
const initialState = {
  loading: false,
  data: [],
  error: ''
}

// Generates pending, fulfilled and rejected action types
export const fetchData = createAsyncThunk('user/fetchData', (url) => {
  return axios
    .get(url)
    .then(response =>  response.data.data )
})

const tableSlice = createSlice({
  name: 'table',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchData.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
      state.error = ''
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false
      state.data = []
      state.error = action.error.message
    })
  }
})

export default tableSlice.reducer
 