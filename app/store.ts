import { configureStore } from '@reduxjs/toolkit'
import articleReducer from '../slices/article'
import articleStatusReducer from '../slices/article'

export const store = configureStore({
  reducer: {
    article: articleReducer,
    articleStatus: articleStatusReducer,
  },
})
export type RootState = ReturnType<typeof store.getState>
