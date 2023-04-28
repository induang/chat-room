import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IChat } from "../../services/chat.type";
import UpdateGroupModal from "./UpdateGroupModal";

export default function ChatBox() {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  console.log("selectedChat: ", selectedChat);
  return (
    <div className="bg-white/75 h-screen flex flex-col gap-y-1">
      <div className="chat-box-header flex p-6 justify-between">
        <div className="chat-name text-3xl">
          {selectedChat.chatName || "Please Select a Chat"}
        </div>
        <div className="chat-details">
          <label
            className="update-group-chat-btn btn btn-primary btn-md"
            htmlFor="update-group-modal"
          >
            Chat Detail
          </label>
        </div>
      </div>
      <div className="chat-box-messages"></div>
      <div className="chat-box-message-sender"></div>
      <UpdateGroupModal chat={{} as IChat} />
    </div>
  );
}
