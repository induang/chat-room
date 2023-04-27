import httpRequest from "../utils/httpRequest"
import { IChat } from "./chat.type";

export const getChats = async (): Promise<Array<IChat>> => {
	return httpRequest.get('/api/chat');
}

export const getOrCreateChat =async (userId: string): Promise<IChat> => {
	return httpRequest.post('/api/chat', {userId});
}