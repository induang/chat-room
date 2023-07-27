import { configureStore } from "@reduxjs/toolkit";
import chatReducer, { chatSliceName } from "./slices/chatSlice";
import userReducer, { userSliceName } from "./slices/userSlice";
const store = configureStore({
  reducer: {
    [chatSliceName]: chatReducer,
    [userSliceName]: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
