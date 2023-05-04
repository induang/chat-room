import clsx from "clsx";
import { IMessage } from "../../services/message.type";

interface ChatBubbleProps {
  message: IMessage;
  isFirst: boolean;
  isLast: boolean;
}

export default function ChatBubble({
  message,
  isFirst = true,
  isLast = true,
}: ChatBubbleProps) {
  const userId = window.localStorage.getItem("userId");
  const { _id: senderId } = message.sender;
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
            <time className="text-xs opacity-50">12:45</time>
          </div>
        )}
        <div className="chat-bubble">{message.content}</div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>
    </>
  );
}
