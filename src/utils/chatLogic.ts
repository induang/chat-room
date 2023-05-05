import { IMessage } from "../services/message.type";

const FIVE_MINUTE = 60*5*1000;
// 连续两条消息若超过五分钟，则另打时间戳
export function sameSenderAsPre(i: number, messages: Array<IMessage>): boolean{
	if(i === 0) return false;
	if(new Date(messages[i].createdAt).getTime() - new Date(messages[i-1].createdAt).getTime() > FIVE_MINUTE) return false;
	return messages[i].sender._id === messages[i-1].sender._id;
}

export function sameSenderAsAfter(i: number, messages: Array<IMessage>): boolean{
	if(i === messages.length-1) return false;
	if(new Date(messages[i+1].createdAt).getTime() - new Date(messages[i].createdAt).getTime() > FIVE_MINUTE) return false;
	return messages[i].sender._id === messages[i+1].sender._id;
}