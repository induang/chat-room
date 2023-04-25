import httpRequest from "../utils/httpRequest";
import { ILoginer, ILoginerResponse, INewUser, IRegisterResponse, IVerifyResponse } from "./auth.type";

export const login = async (user: ILoginer): Promise<ILoginerResponse> =>{
	return httpRequest.post('api/user/login', user);
}

export const register = async (user:INewUser): Promise <IRegisterResponse> => {
	return httpRequest.post('api/user', user)
}
// email 需要包在对象中
export const verify = async ({email}: {email: string}): Promise <IVerifyResponse> => {
	return httpRequest.post('api/user/verify', email);
}