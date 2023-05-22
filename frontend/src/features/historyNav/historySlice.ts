import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {fetchHistory} from '../api'

export const getHistory = createAsyncThunk(
  'history/fetchData',
  async ({
    _id,
    page,
    pageSize,
  }: {
    _id: string
    page: number
    pageSize: number
  }) => {
    const data = await fetchHistory(_id, page, pageSize)
    return data.data
  },
)
interface HistoryData {
  title: string
  url: string
  _id?: string
}
interface DataState {
  loading: boolean
  error: string | null
  history: HistoryData[]
  currentPage: number
}

const initialState: DataState = {
  loading: false,
  error: null,
  history: [],
  currentPage: 1,
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getHistory.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(getHistory.fulfilled, (state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const data: any = action.payload
        state.loading = false
        state.history = data?.results
        if (data?.next) {
          state.currentPage = data?.next.page
        } else if (data?.previous) {
          state.currentPage = data?.previous.page
        }
        // Adjust totalPages and reachedEnd based on your pagination logic
      })
      .addCase(getHistory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Error fetching data'
      })
  },
})

export default historySlice.reducer
