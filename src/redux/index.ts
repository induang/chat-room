import { configureStore } from "@reduxjs/toolkit";
import chatReducer, { chatSliceName } from './slices/chatSlice';
const store = configureStore({
	reducer: {
		[chatSliceName]: chatReducer
	}
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store