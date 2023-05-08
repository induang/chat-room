import clsx from "clsx";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { IMessage } from "../../services/message.type";
import { timeTransform } from "../../utils/tools";

interface ChatBubbleProps {
  message: IMessage;
  isFirst?: boolean;
  isLast?: boolean;
}

export default function ChatBubble({
  message,
  isFirst = true,
  isLast = true,
}: ChatBubbleProps) {
  const userId = window.localStorage.getItem("userId");
  const { _id: senderId } = message.sender;
  // 考虑伪类选择器去掉气泡小尾巴
  return (
    <>
      <div
        className={clsx(
          "chat",
          userId === senderId ? "chat-end" : "chat-start"
        )}
      >
        <div className={clsx("chat-image avatar", isLast ? "" : "invisible")}>
          <div className="w-10 rounded-full">
            <img src={message.sender.pic} />
          </div>
        </div>
        {isFirst && (
          <div className="chat-header ml-2">
            {message.sender.name + " "}
            <time className="text-xs opacity-50">
              {timeTransform(message.createdAt)}
            </time>
          </div>
        )}
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
    </>
  );
}
