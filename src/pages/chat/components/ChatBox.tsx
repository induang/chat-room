import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux";
import arrowIcon from "@/assets/arrow.png";
import groupChatMenuIcon from "@/assets/menu.png";
import { getAllMessage, sendMessage } from "../../../services/message";
import { useEffect, useState } from "react";
import MessagesShower from "@/components/chats/MessagesShower";
import { IMessage } from "@/services/message.type";
import { IChat } from "@/services/chat.type";
import { exceptMeBetween2 } from "@/utils/tools";
import {
  addReceivedNewMessagesChats,
  setSelectedChat,
  updateLastestMessage,
} from "@/redux/slices/chatSlice";
import SocketConnect from "@/services/socket";
import clsx from "clsx";

let selectedChatCompare: IChat | null;

export default function ChatBox() {
  const userId = window.localStorage.getItem("userId") || "";
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const dispatch = useDispatch();
  const [newMessage, setNewMessage] = useState<string>("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendClick = () => {
    if (!newMessage) return;
    setNewMessage("");
    sendMessage(selectedChat._id, newMessage).then((newMessage) => {
      SocketConnect.emitter("new message", newMessage);
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
    getAllMessage(selectedChat._id)
      .then((messages) => {
        setMessages(messages);
        SocketConnect.connectToChat(selectedChat._id);
        selectedChatCompare = selectedChat;
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      setNewMessage("");
      SocketConnect.disconnectToChat(selectedChat._id);
    };
  }, [selectedChat._id]);

  useEffect(() => {
    SocketConnect.ListenOnMessages((newMessageReceived: IMessage) => {
      dispatch(
        updateLastestMessage({
          id: newMessageReceived?.chat._id,
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
      SocketConnect.clearListenerOfMessages();
    };
  }, []);

  return (
    <div className="h-full flex flex-col  rounded">
      <div className="chat-box-headerp-4 basis-4">
        {/* 名字 */}
        <div className="chat-name text-xl sm:text-3xl py-2 truncate ml-2 text-primary font-light block text-center">
          <img
            src={arrowIcon}
            className="sm:hidden w-6 inline float-left"
            onClick={handleReturnArrowClick}
          />
          <label htmlFor="update-group-modal">
            <span className="cursor-pointer">
              {selectedChat.isGroupChat
                ? selectedChat.chatName
                : exceptMeBetween2(selectedChat.users)[0].name}
            </span>
          </label>

          {/* 菜单按钮 */}
          <label htmlFor="update-group-modal">
            <img
              src={groupChatMenuIcon}
              className={clsx(
                !selectedChat.isGroupChat && "hidden",
                "w-5 h-5 inline cursor-pointer"
              )}
            ></img>
          </label>
        </div>
      </div>
      <div className="chat-box-messages bg-slate-100 flex-grow bg-base-100/80 rounded p-2 overflow-y-scroll">
        {!isLoading && messages?.length ? (
          <MessagesShower userId={userId} messages={messages} />
        ) : (
          <></>
        )}
      </div>
      <div className="chat-box-message-sender bg-slate-100 p-2">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Type you message..."
            className="w-4/5 input input-bordered join-item rounded-l-full shadow-md"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleEnterDown}
          />
          <button
            className="w-1/5 btn btn-primary join-item rounded-r-full shadow-md"
            onClick={handleSendClick}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
