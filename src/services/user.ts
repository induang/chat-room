import httpRequest from "../utils/httpRequest"
import { IUser } from "./user.type"

export const getUserList = async (param: string):Promise<Array<IUser>> => {
	return httpRequest.get(`/api/user?search=${param}`)
}