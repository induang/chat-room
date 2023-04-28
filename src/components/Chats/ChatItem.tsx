import clsx from "clsx";
import { IChat } from "../../services/chat.type";

interface IChatItemProps {
  chat: IChat;
  isActive: boolean;
}

export default function ChatItem({ chat, isActive }: IChatItemProps) {
  return (
    <div className="chat-item flex">
      <div className="chat-profile">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          {chat.isGroupChat ? (
            <div className="w-14 rounded-full bg-secondary text-white text-2xl leading-10 overflow-hidden text-center">
              {chat.chatName}
            </div>
          ) : (
            <div className="w-14 rounded-full">
              <img src={chat?.users[1].pic} />
            </div>
          )}
        </label>
      </div>
      <div className="chat-details ml-3">
        <div
          className={clsx(
            "chat-identity",
            isActive ? "text-white" : "text-primary"
          )}
        >
          {chat.isGroupChat ? chat.chatName : chat.users[1]?.name}
        </div>
        <div className="chat-lastest-message text-slate-300">
          {chat.latestMessage?.content}
        </div>
      </div>
    </div>
  );
}
