import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import ProfileModal from "../ProfileModal";
import UpdateGroupModal from "./UpdateGroupModal";
import menuIcon from "../../assets/list.png";
import { getAllMessage, sendMessage } from "../../services/message";
import { useEffect, useState } from "react";
import MessagesShower from "./MessagesShower";
import { IMessage } from "../../services/message.type";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
let socket, selectedChatCompare;

export default function ChatBox() {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  const handleSendClick = () => {
    setNewMessage("");
    sendMessage(selectedChat._id, newMessage).then(() => {
      getAllMessage(selectedChat._id).then((messages) => {
        setMessages(messages);
      });
    });
  };

  const handleEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleSendClick();
  };

  useEffect(() => {
    getAllMessage(selectedChat._id).then((messages) => {
      setMessages(messages);
      socket.emit("join chat", selectedChat._id);
      selectedChatCompare = selectedChat;
    });
  }, [selectedChat._id]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        !selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  useEffect(() => {
    // TODO tmp way
    const userId = window.localStorage.getItem("userId");
    socket = io(ENDPOINT);
    socket.emit("setup", { _id: userId });
    socket.on("connection", () => {
      // something to do like set connect state on
      console.log("Socket connectted");
    });
  }, []);

  return (
    <div className="bg-white/75 h-full flex flex-col gap-y-2 rounded">
      <div className="chat-box-header flex p-6 justify-between basis-4">
        <div className="chat-name text-3xl text-primary">
          {selectedChat.isGroupChat
            ? selectedChat.chatName
            : selectedChat.users[1].name}
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
      <div className="chat-box-messages flex-grow shadow-inner rounded m-2 p-2 overflow-y-scroll">
        {messages.length && <MessagesShower messages={messages} />}
      </div>
      <div className="chat-box-message-sender basis-16 m-2">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Type you message..."
              className="input input-bordered input-primary w-full bg-transparent"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleEnterDown}
            />
            <button className="btn btn-primary" onClick={handleSendClick}>
              SEND
            </button>
          </div>
        </div>
      </div>
      {selectedChat.isGroupChat && <UpdateGroupModal />}
      {!selectedChat.isGroupChat && <ProfileModal />}
    </div>
  );
}
