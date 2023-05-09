import clsx from "clsx";
import { useSelector } from "react-redux";
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

export default function ChatPage() {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const { _id: chatId } = selectedChat;
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
