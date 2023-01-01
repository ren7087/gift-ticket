import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EditArticle } from '../types/type'
import { RootState } from '../app/store'

export interface uiState {
	editedArticle: EditArticle
}
const initialState: uiState = {
	editedArticle: {
		userId: '',
		title: '',
		content: '',
	},
}
export const uiSlice = createSlice({
	name: 'ui',
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
export const { setEditedArticle, resetEditedArticle } = uiSlice.actions

export const selectArticle = (state: RootState) => state.ui.editedArticle

export default uiSlice.reducer
