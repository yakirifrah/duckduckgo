import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {fetchDataSearch} from '../api'
import {ISitelinks} from '../../components/List/List'
import {PAGE_SIZE} from '../../utils/constants'

export interface SearchResultType {
  position?: number
  favicon?: string
  snippet?: string
  title?: string
  link?: string
  sitelinks?: ISitelinks[]
}

export interface SearchResultState {
  result: SearchResultType[]
  status: 'idle' | 'loading' | 'failed'
}

interface IPagination {
  count: number
  from?: number
  to?: number
}
interface SetPaginationPayload {
  count?: number
  from?: number
  to?: number
}

interface InitialState extends SearchResultState {
  pagination: IPagination
  currentDataForPage: SearchResultType[]
}
const initialState: InitialState = {
  result: [],
  currentDataForPage: [],
  pagination: {
    count: 0,
    from: 0,
    to: PAGE_SIZE,
  },
  status: 'idle',
}

export const fetchSearchAsync = createAsyncThunk(
  'search/fetchData',
  async (query: string) => {
    const data = await fetchDataSearch(query)
    return data
  },
)

export const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setPagination: (
      {pagination},
      {payload: {count, from, to}}: PayloadAction<SetPaginationPayload>,
    ) => {
      if (count !== undefined) {
        pagination.count = count
      }
      if (from !== undefined) {
        pagination.from = from
      }
      if (to !== undefined) {
        pagination.to = to
      }
    },
    setCurrentData: (state, {payload: {from, to}}) => {
      const data = state.result?.slice(from, to)
      state.currentDataForPage = data
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSearchAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(fetchSearchAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.result = action.payload
        state.pagination.count = action.payload?.length || 0
        const data = action.payload?.slice(0, PAGE_SIZE)
        state.currentDataForPage = data
      })
      .addCase(fetchSearchAsync.rejected, state => {
        state.status = 'failed'
      })
  },
})
export const {setPagination, setCurrentData} = searchResultSlice.actions

export default searchResultSlice.reducer
