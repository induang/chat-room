import clsx from "clsx";
import { IMessage } from "../../services/message.type";
import { timeTransform } from "../../utils/tools";

interface ChatBubbleProps {
  userId: string;
  message: IMessage;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function ChatBubble({
  userId,
  message,
  isFirst = true,
  isLast = true,
}: ChatBubbleProps) {
  const { _id: senderId } = message.sender;

  return (
    <div
      className={clsx("chat", userId === senderId ? "chat-end" : "chat-start")}
    >
      {/* 用户头像 */}
      <div className={clsx("chat-image avatar", isLast ? "" : "invisible")}>
        <div className="w-10 rounded-full">
          <img src={message.sender.pic} />
        </div>
      </div>
      {/* 用户名 时间戳 */}
      {isFirst && (
        <div className="chat-header ml-2">
          {message.sender.name + " "}
          <time className="text-xs opacity-50">
            {timeTransform(message.createdAt)}
          </time>
        </div>
      )}
      {/* 气泡 */}
      <div
        className={clsx(
          !isLast && "before:!left-1/2",
          "chat-bubble",
          userId === senderId ? "chat-bubble-accent" : ""
        )}
      >
        {message.content}
      </div>
    </div>
  );
}
