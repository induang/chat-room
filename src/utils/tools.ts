import { IUser } from "../services/user.type";

export function exceptMeBetween2(users: Array<IUser>): Array<IUser>{
	const meId = window.localStorage.getItem('userId');
	return users.filter((user) => user._id !== meId);
}

const HALF_DAY = 60*60*12*1000;
export function timeTransform(timeISO8601: Date): string{
	const timestamp = new Date(timeISO8601).getTime();
	const now = new Date().getTime();

	if(now-timestamp > HALF_DAY) return new Date(timeISO8601).toLocaleString();
	else return new Date(timeISO8601).toLocaleTimeString();
}

export const IDStringReducer = (users: Array<IUser>) => {
	return users.reduce((sumString, user) => (sumString += user._id), "");
};

