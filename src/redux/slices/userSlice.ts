import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../services/user.type";

export interface UserState {
	selectedUser: IUser
}

const initialState: UserState = {
	selectedUser: {
		_id: "",
		name: "",
		pic: "",
		email: ""
	}
}

export const userSliceName = 'user'

export const userSlice = createSlice({
	name: userSliceName,
	initialState,
	reducers: {
		setSelectedUser: (state, action: PayloadAction<IUser>) => {
			const { payload} = action;
			return {
				...state,
				selectedUser: payload
			}
		}
	}
})

export const { setSelectedUser } = userSlice.actions;

export default userSlice.reducer;