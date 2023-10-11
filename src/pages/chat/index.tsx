import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import ChatBox from "./components/ChatBox";
import EmptyChatBox from "./components/EmptyChatBox";
import MyChats from "./components/MyChats";
import UpdateGroupModal from "@/components/modals/UpdateGroupModal";
import Drawer from "@/components/headers/Drawer";
import DrawerToggle from "@/components/headers/DrawerToggle";
import Header from "@/components/headers/Header";
import ProfileModal from "@/components/modals/ProfileModal";
import { RootState } from "@/redux";
import { exceptMeBetween2 } from "@/utils/tools";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import SocketConnect from "@/services/socket";
import { IMessage } from "@/services/message.type";
import {
  addReceivedNewMessagesChats,
  updateLastestMessage,
} from "@/redux/slices/chatSlice";

export default function ChatPage() {
  const userId = window.localStorage.getItem("userId") ?? "";
  const dispatch = useDispatch();
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const { _id: chatId } = selectedChat;

  // initial socket instance
  useEffect(() => {
    SocketConnect.getInstance(import.meta.env.VITE_WS_CONN_URL);
    SocketConnect.connectToService(userId);
    SocketConnect.ListenOnConnectStatus();
    return () => {
      SocketConnect.clearListenerOfConnectStatus();
    };
  }, []);

  // socket listener
  useEffect(() => {
    SocketConnect.ListenOnMessages((newMessageReceived: IMessage) => {
      dispatch(
        updateLastestMessage({
          id: newMessageReceived?.chat._id,
          newLastestMessage: newMessageReceived,
        })
      );
      dispatch(addReceivedNewMessagesChats(newMessageReceived.chat));
    });
    return () => {
      SocketConnect.clearListenerOfMessages();
    };
  }, []);

  return (
    <div className="chat-page h-screen">
      <DrawerToggle />
      <div className="chat-page-container flex flex-col bg-white rounded shadow-xl h-full sm:h-5/6 max-w-screen-md m-auto">
        <div className="chat-page-header basis-16">
          <Header />
        </div>
        <div className="chat-page-content flex-grow flex justify-between m-1 overflow-y-scroll">
          <div
            className={clsx(
              "side-panel w-screen sm:basis-32 sm:shrink-0",
              chatId ? "hidden sm:block" : ""
            )}
          >
            <MyChats />
          </div>
          <div
            className={clsx(
              "chat-box grow",
              chatId ? "" : "hidden sm:block",
              "sm:basis-96 shrink-0"
            )}
          >
            {chatId ? <ChatBox key={chatId} /> : <EmptyChatBox />}
          </div>
        </div>
      </div>
      <Drawer />
      {selectedChat._id && selectedChat.isGroupChat && <UpdateGroupModal />}
      {selectedChat._id && !selectedChat.isGroupChat && (
        <ProfileModal selectedUser={exceptMeBetween2(selectedChat.users)[0]} />
      )}
    </div>
  );
}
