import { IMessage } from "../../services/message.type";
import { sameSenderAsAfter, sameSenderAsPre } from "../../utils/chatLogic";
import ChatBubble from "./ChatBubble";
import "./messagesShower.css";

export default function MessagesShower({
  messages,
}: {
  messages: Array<IMessage>;
}) {
  return (
    <div id="messages-shower-board">
      {messages?.map((message, i, messages) => {
        if (sameSenderAsPre(i, messages)) {
          if (sameSenderAsAfter(i, messages)) {
            return (
              <ChatBubble
                key={message._id}
                message={message}
                isFirst={false}
                isLast={false}
              />
            );
          } else {
            return (
              <ChatBubble key={message._id} message={message} isFirst={false} />
            );
          }
        } else {
          if (sameSenderAsAfter(i, messages)) {
            return (
              <ChatBubble key={message._id} message={message} isLast={false} />
            );
          } else {
            return <ChatBubble key={message._id} message={message} />;
          }
        }
      })}
      <div id="anchor"></div>
    </div>
  );
}
