import { IUser } from "../services/user.type";

export function exceptMeBetween2(users: Array<IUser>): Array<IUser>{
	const meId = window.localStorage.getItem('userId');
	return users.filter((user) => user._id !== meId);
}