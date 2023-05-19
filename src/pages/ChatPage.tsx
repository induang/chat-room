import clsx from "clsx";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Socket } from "socket.io-client";
import ChatBox from "../components/Chats/ChatBox";
import EmptyChatBox from "../components/Chats/EmptyChatBox";
import MyChats from "../components/Chats/MyChats";
import UpdateGroupModal from "../components/Chats/UpdateGroupModal";
import Drawer from "../components/Headers/Drawer";
import DrawerToggle from "../components/Headers/DrawerToggle";
import Header from "../components/Headers/Header";
import ProfileModal from "../components/ProfileModal";
import { RootState } from "../redux";
import { exceptMeBetween2 } from "../utils/tools";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import SocketConnect from "../services/socket";
import { IMessage } from "../services/message.type";
import {
  addReceivedNewMessagesChats,
  updateLastestMessage,
} from "../redux/slices/chatSlice";
import CreateGroupModal from "../components/Chats/CreateGroupModal";

const ENDPOINT = "http://localhost:5000";
export default function ChatPage() {
  const userId = window.localStorage.getItem("userId") || "";
  const dispatch = useDispatch();
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const { _id: chatId } = selectedChat;
  const socket = useRef<Socket<DefaultEventsMap, DefaultEventsMap>>();

  useEffect(() => {
    socket.current = SocketConnect.getInstance(ENDPOINT);
    SocketConnect.connectToService(userId);
    SocketConnect.ListenOnConnectStatus();
    return () => {
      SocketConnect.clearListenerOfConnectStatus();
    };
  }, []);

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
  });

  return (
    <div className="drawer">
      <DrawerToggle />
      <div className="drawer-content">
        <div className="chat-page flex flex-col h-screen">
          <div className="chat-page-header basis-20">
            <Header />
          </div>
          <div className="chat-page-content flex-grow flex justify-between m-1 gap-x-1 overflow-y-scroll">
            <div
              className={clsx(
                "side-panel w-screen sm:basis-96 sm:shrink-0",
                chatId ? "hidden sm:block" : ""
              )}
            >
              <MyChats />
            </div>
            <div
              className={clsx(
                "chat-box grow",
                chatId ? "" : "hidden sm:block",
                "sm:basis-96 sm:shrink-0"
              )}
            >
              {chatId ? <ChatBox /> : <EmptyChatBox />}
            </div>
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
