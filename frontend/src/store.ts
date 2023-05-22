import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import autocompleteReducer from './features/autocomplete/autocompleteSlice'
import searchResultReducer from './features/searchResult/searchResultSlice'
import historyReducer from './features/historyNav/historySlice'
export const store = configureStore({
  reducer: {
    autocomplete: autocompleteReducer,
    searchResult: searchResultReducer,
    history: historyReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
