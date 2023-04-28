import httpRequest from "../utils/httpRequest"
import { IChat } from "./chat.type";

export const getChats = async (): Promise<Array<IChat>> => {
	return httpRequest.get('/api/chat');
}

export const getOrCreateChat = async (userId: string): Promise<IChat> => {
	return httpRequest.post('/api/chat', {userId});
}

export const removeMemberFromChat = async (chatId: string, userId: string): Promise<IChat> => {
	return httpRequest.put('/api/chat/groupremove', {chatId, userId})
}

export const addMemberToChat = async (chatId: string, userId: string ): Promise<IChat> => {
	return httpRequest.put('/api/chat/groupadd', {chatId, userId})
}

export const createGroupChat = async (name: string, users: Array<string>): Promise<IChat> => {
	return httpRequest.post('/api/chat/group', {name, users: JSON.stringify(users)})
}

export const renameChat = async (chatId:string, chatName: string): Promise<IChat> => {
	return httpRequest.put('/api/chat/rename', {chatId, chatName})
}