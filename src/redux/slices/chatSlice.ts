import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../services/chat.type";
import { IUser } from "../../services/user.type";

export interface ChatState {
	selectedChat: IChat
}

const initialState: ChatState = {
	selectedChat: {
		_id: "",
		chatName: "",
		isGroupChat: false,
		users: []
}
}
export const chatSliceName = 'chat'
export const chatSlice = createSlice({
	name: chatSliceName,
	initialState,
	reducers: {
		setSelectedChat: (state, action: PayloadAction<IChat>) => {
			const {payload} = action;
			return {
				...state,
				selectedChat: payload
			}
		}
	}
})

export const { setSelectedChat } = chatSlice.actions;

export default chatSlice.reducer;