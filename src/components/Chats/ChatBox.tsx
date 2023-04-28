import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import ProfileModal from "../ProfileModal";
import EmptyChat from "./EmptyChat";
import UpdateGroupModal from "./UpdateGroupModal";
import menuIcon from "../../assets/list.png";

export default function ChatBox() {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );

  if (!selectedChat._id) return <EmptyChat />;

  return (
    <div className="bg-white/75 h-full flex flex-col gap-y-2 rounded">
      <div className="chat-box-header flex p-6 justify-between basis-4">
        <div className="chat-name text-3xl text-primary">
          {selectedChat.isGroupChat
            ? selectedChat.chatName
            : selectedChat?.users[1].name || "Please Select a Chat"}
        </div>
        <div className="chat-details">
          <label
            className="chat-detail-btn"
            htmlFor={
              selectedChat.isGroupChat
                ? "update-group-modal"
                : "talker-details-modal"
            }
          >
            <img src={menuIcon} className="w-8" />
          </label>
        </div>
      </div>
      <div className="chat-box-messages flex-grow shadow-inner rounded m-2"></div>
      <div className="chat-box-message-sender basis-16 m-2">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Type you message..."
              className="input input-bordered input-primary w-full bg-transparent"
            />
            <button className="btn btn-primary">SEND</button>
          </div>
        </div>
      </div>
      {selectedChat.isGroupChat && <UpdateGroupModal />}
      {!selectedChat.isGroupChat && <ProfileModal />}
    </div>
  );
}
