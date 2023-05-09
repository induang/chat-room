import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux";
import ProfileModal from "../ProfileModal";
import UpdateGroupModal from "./UpdateGroupModal";
import menuIcon from "../../assets/list.png";
import arrowIcon from "../../assets/left-arrow-primary.png";
import { getAllMessage, sendMessage } from "../../services/message";
import { useEffect, useRef, useState } from "react";
import MessagesShower from "./MessagesShower";
import { IMessage } from "../../services/message.type";
import io, { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { IChat } from "../../services/chat.type";
import { exceptMeBetween2 } from "../../utils/tools";
import {
  addReceivedNewMessagesChats,
  setSelectedChat,
  updateLastestMessage,
} from "../../redux/slices/chatSlice";
import { useNavigate } from "react-router-dom";

const ENDPOINT = "http://localhost:5000";
let socket: Socket<DefaultEventsMap, DefaultEventsMap>,
  selectedChatCompare: IChat | null;
export default function ChatBox() {
  const userId = window.localStorage.getItem("userId") || "";
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [socketConnect, setSocketConnect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendClick = () => {
    if (!newMessage) return;
    setNewMessage("");
    sendMessage(selectedChat._id, newMessage).then((newMessage) => {
      // 新消息发出
      socket.emit("new message", newMessage);
      setMessages([...messages, newMessage]);
      dispatch(
        updateLastestMessage({
          id: selectedChat._id,
          newLastestMessage: newMessage,
        })
      );
    });
  };

  const handleReturnArrowClick = () => {
    dispatch(
      setSelectedChat({
        _id: "",
      } as IChat)
    );
  };

  const handleEnterDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.key === "Enter" && handleSendClick();
  };

  // 同步聊天室改变
  useEffect(() => {
    setIsLoading(true);
    getAllMessage(selectedChat._id).then((messages) => {
      setMessages(messages);
      setIsLoading(false);
      socket.emit("join chat", selectedChat._id);
      selectedChatCompare = selectedChat;
    });
    return () => {
      setNewMessage("");
      socket.emit("leave chat", selectedChat._id);
    };
  }, [selectedChat._id]);

  useEffect(() => {
    socket = io(ENDPOINT);

    socket.emit("setup", { _id: userId });
    socket.on("connected", () => {
      setSocketConnect(true);
    });
    return () => {
      socket.emit("leave chat", selectedChat._id);
      socket.off("message received");
      socket.off("connected");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      dispatch(
        updateLastestMessage({
          id: newMessageReceived.chat._id,
          newLastestMessage: newMessageReceived,
        })
      );
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        dispatch(addReceivedNewMessagesChats(newMessageReceived.chat));
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
    return () => {
      socket.off("message received");
    };
  });

  return (
    <div className="bg-white/75 h-full flex flex-col gap-y-1 rounded">
      <div className="chat-box-header flex p-4 sm:p-6 basis-4 items-center justify-between">
        {/* 返回按钮 */}
        <span className="sm:hidden" onClick={handleReturnArrowClick}>
          <img src={arrowIcon} className="w-8" />
        </span>
        {/* 名字 */}
        <div className="chat-name text-xl sm:text-3xl text-primary truncate ml-2">
          {selectedChat.isGroupChat
            ? selectedChat.chatName
            : exceptMeBetween2(selectedChat.users)[0].name}
        </div>
        {/* 菜单按钮 */}
        <div className="chat-details ml-4">
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
          <MessagesShower userId={userId} messages={messages} />
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
      {!selectedChat.isGroupChat && (
        <ProfileModal selectedUser={exceptMeBetween2(selectedChat.users)[0]} />
      )}
    </div>
  );
}
