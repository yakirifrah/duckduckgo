import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {fetchDataAutocomplete} from '../api'

export interface AutocompleteResultType {
  title: string
}

export interface AutocompleteState {
  suggests: AutocompleteResultType[]
  status: 'idle' | 'loading' | 'failed'
}

const initialState: AutocompleteState = {
  suggests: [],
  status: 'idle',
}

export const autocompleteAsync = createAsyncThunk(
  'autocomplete/fetchData',
  async (query: string) => {
    const data = await fetchDataAutocomplete(query)
    return data
  },
)

export const autocompleteSlice = createSlice({
  name: 'autocomplete',
  initialState,
  reducers: {
    resetSuggests: state => {
      state.suggests = []
    },
  },
  extraReducers: builder => {
    builder
      .addCase(autocompleteAsync.pending, state => {
        state.status = 'loading'
      })
      .addCase(autocompleteAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.suggests = action.payload
        state.suggests = action.payload
      })
      .addCase(autocompleteAsync.rejected, state => {
        state.status = 'failed'
      })
  },
})
export const {resetSuggests} = autocompleteSlice.actions

export default autocompleteSlice.reducer
