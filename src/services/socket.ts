import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

export default class SocketConnect {
	private static _socket: Socket<DefaultEventsMap, DefaultEventsMap>;
	
	constructor(){
	}

	static getInstance(url: string){
		if(this._socket){
			return this._socket;
		}
		this._socket = io(url);
		return this._socket;
	}

	static connectToService(connectId: string){
		this._socket.emit("setup", { _id: connectId });
	}


	static clearConnect(){
		this._socket.disconnect();
	}

	static ListenOnConnectStatus(){
		this._socket.on("connected", () => {
			console.log('connected')
    });
    this._socket.on("disconnect", () => {
      console.log("disconnect");
    });
	}

	static clearListenerOfConnectStatus(){
		this._socket.off('connected');
		this._socket.off('disconnect');
	}

	static connectToChat(chatId: string){
		this._socket.emit('join chat', chatId);
	}

	static disconnectToChat(chatId: string){
		this._socket.emit("leave chat", chatId);
	}

	static ListenOnMessages(handler: Function){
		this._socket.on("message received", handler);
	}
	static clearListenerOfMessages(){
		this._socket.off("message received")
	}

	static emitter(name: string, data: any){
		this._socket.emit(name, data);
	}
}