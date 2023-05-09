import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChat } from "../../services/chat.type";
import { IMessage } from "../../services/message.type";

export interface ChatState {
	selectedChat: IChat;
	chats: Array<IChat>;
	receivedNewMessagesChats: Array<IChat>;
}

const initialState: ChatState = {
	selectedChat: {
		_id: "",
		chatName: "",
		isGroupChat: false,
		users: []
	},
	chats: [],
	receivedNewMessagesChats: []
}
export const chatSliceName = 'chat'
export const chatSlice = createSlice({
	name: chatSliceName,
	initialState,
	reducers: {
		setSelectedChat: (state, action: PayloadAction<IChat>) => {
			const {payload: selectedChat} = action;
			return {
				...state,
				selectedChat: {
					...state.selectedChat,
					...selectedChat
				}
			}
		},
		setChats:(state, action: PayloadAction<Array<IChat>>) => {
			const {payload: chats} = action;
			return {
				...state,
				chats
			}
		},
		updateLastestMessage: (state, action: PayloadAction<{id: string, newLastestMessage: IMessage}>) => {
			const {id, newLastestMessage} = action.payload;
			const foundChat = state.chats.find((chat) => chat._id === id);
			if(!foundChat?._id) return state;
			const updatedChat: IChat = {
				...foundChat,
				latestMessage: newLastestMessage
			};
			return {
				...state,
				chats: [
					updatedChat,
					...state.chats.filter((chat) => chat._id !== id),
				]
			}
		},
		addReceivedNewMessagesChats: (state, action: PayloadAction<IChat>) => {
			const { payload: chat} = action;
			const isFound = state.receivedNewMessagesChats.findIndex((item) => item._id === chat._id);
			if(isFound === -1)
				return {
					...state,
					receivedNewMessagesChats: [
						...state.receivedNewMessagesChats,
						chat
					]
				}
		},
		removeReceivedNewMessagesChats: (state, action: PayloadAction<IChat>) => {
			const{ payload: removedchat} = action;
			return {
				...state,
				receivedNewMessagesChats: [
					...state.receivedNewMessagesChats.filter((chat) => chat._id !== removedchat._id)
				]
			}
		}
	}
})

export const { setSelectedChat, setChats, updateLastestMessage, addReceivedNewMessagesChats, removeReceivedNewMessagesChats } = chatSlice.actions;

export default chatSlice.reducer;