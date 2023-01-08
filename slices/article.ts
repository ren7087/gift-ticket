import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditArticle, EditArticleStatus } from '../types/type'
import { RootState } from '../app/store'

export interface uiState {
  editedArticleStatus: EditArticleStatus
  editedArticle: EditArticle
}

const initialState: uiState = {
  editedArticle: {
    userId: '',
    title: '',
    content: '',
  },
  editedArticleStatus: {
    articleId: '',
    receiverId: '',
    isDone: false,
  },
}
export const article = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setEditedArticle: (state, action: PayloadAction<EditArticle>) => {
      state.editedArticle = action.payload
    },
    resetEditedArticle: (state) => {
      state.editedArticle = initialState.editedArticle
    },
  },
})
export const { setEditedArticle, resetEditedArticle } = article.actions

export const selectArticle = (state: RootState) => state.article.editedArticle

export default article.reducer
