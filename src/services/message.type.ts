import { IChat } from "./chat.type";
import { IUser } from "./user.type";

export interface IMessage {
	_id: string;
	chat: IChat;
	content: string;
	sender: IUser;
	createdAt: Date;
	updatedAt: Date; 
}