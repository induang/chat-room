import { IMessage } from "./message.type";
import { IUser } from "./user.type";

export interface IChat {
	_id: string;
	chatName: string;
	isGroupChat: boolean;
	users: Array<IUser>;
	groupAdmin?: IUser;
	latestMessage?: IMessage;
}