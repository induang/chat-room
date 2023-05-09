import clsx from "clsx";
import React from "react";
import { IChat } from "../../services/chat.type";
import { exceptMeBetween2 } from "../../utils/tools";
import GroupChatPreofile from "./GroupChatProfile";

interface IChatItemProps {
  chat: IChat;
  isActive: boolean;
}

export default React.memo(function ChatItem({
  chat,
  isActive,
}: IChatItemProps) {
  return (
    <div className="chat-item flex">
      <div className="chat-profile">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          {chat.isGroupChat ? (
            <GroupChatPreofile name={chat.chatName} />
          ) : (
            <div className="w-14 rounded-full">
              <img src={exceptMeBetween2(chat.users)[0].pic} />
            </div>
          )}
        </label>
      </div>
      <div className="chat-details pl-3 grow">
        <div
          className={clsx(
            "chat-identity",
            isActive ? "text-white" : "text-primary",
            "truncate"
          )}
        >
          {chat.isGroupChat
            ? chat.chatName
            : exceptMeBetween2(chat.users)[0].name}
        </div>
        <div className="chat-lastest-message text-slate-300 block w-64 truncate">
          <span
            className={clsx(
              "text-gray-500",
              !chat.isGroupChat || !chat.latestMessage ? "hidden" : ""
            )}
          >
            {chat.latestMessage?.sender.name + ":  "}
          </span>
          {chat.latestMessage?.content || "No new message"}
        </div>
      </div>
    </div>
  );
});
