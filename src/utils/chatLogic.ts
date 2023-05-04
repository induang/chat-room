import { IMessage } from "../services/message.type";

export function sameSenderAsPre(i: number, messages: Array<IMessage>): boolean{
	if(i === 0) return false;
	return messages[i].sender._id === messages[i-1].sender._id;
}

export function sameSenderAsAfter(i: number, messages: Array<IMessage>): boolean{
	if(i === messages.length-1) return false;
	return messages[i].sender._id === messages[i+1].sender._id;
}