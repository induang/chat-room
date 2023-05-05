import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import ProfileModal from "../ProfileModal";
import UpdateGroupModal from "./UpdateGroupModal";
import menuIcon from "../../assets/list.png";
import { getAllMessage, sendMessage } from "../../services/message";
import { useEffect, useState } from "react";
import MessagesShower from "./MessagesShower";
import { IMessage } from "../../services/message.type";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { IChat } from "../../services/chat.type";
import { exceptMeBetween2 } from "../../utils/exceptMe";

const ENDPOINT = "http://localhost:5000";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  selectedChatCompare: IChat | null;

export default function ChatBox() {
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [socketConnect, setSocketConnect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendClick = () => {
    setNewMessage("");
    sendMessage(selectedChat._id, newMessage).then((newMessage) => {
      socket.emit("new message", newMessage);
      setMessages([...messages, newMessage]);
    });
  };

  const handleEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleSendClick();
  };

  useEffect(() => {
    setIsLoading(true);
    getAllMessage(selectedChat._id).then((messages) => {
      setMessages(messages);
      setIsLoading(false);
      socket.emit("join chat", selectedChat._id);
      selectedChatCompare = selectedChat;
    });
  }, [selectedChat._id]);

  useEffect(() => {
    socket = io(ENDPOINT);
    const userId = window.localStorage.getItem("userId");
    socket.emit("setup", { _id: userId });
    socket.on("connection", () => {
      setSocketConnect(true);
    });
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChat._id !== newMessageReceived.chat._id
      ) {
        // noti
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  return (
    <div className="bg-white/75 h-full flex flex-col gap-y-2 rounded">
      <div className="chat-box-header flex p-6 justify-between basis-4">
        <div className="chat-name text-3xl text-primary truncate basis-80">
          {selectedChat.isGroupChat
            ? selectedChat.chatName
            : exceptMeBetween2(selectedChat.users)[0].name}
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
      <div className="chat-box-messages flex-grow bg-base-100/80 shadow-inner rounded m-2 p-2 overflow-y-scroll">
        {!isLoading && messages?.length ? (
          <MessagesShower messages={messages} />
        ) : (
          <></>
        )}
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
