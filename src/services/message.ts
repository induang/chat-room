import httpRequest from "../utils/httpRequest"
import { IMessage } from "./message.type";

// TODO right return type
export const sendMessage = async (chatId: string, content: string): Promise<IMessage> => {
	return httpRequest.post('/api/message', {chatId, content})
}

export const getAllMessage = async (chatId: string): Promise<Array<IMessage>> => {
	return httpRequest.get(`api/message/${chatId}`);
}