import { IMessage } from "../../services/message.type";
import { sameSenderAsAfter, sameSenderAsPre } from "../../utils/chatLogic";
import ChatBubble from "./ChatBubble";

export default function MessagesShower({
  messages,
}: {
  messages: Array<IMessage>;
}) {
  console.log(messages);
  return (
    <>
      {messages?.map((message, i, messages) => {
        if (sameSenderAsPre(i, messages)) {
          if (sameSenderAsAfter(i, messages)) {
            return (
              <ChatBubble message={message} isFirst={false} isLast={false} />
            );
          } else {
            return (
              <ChatBubble message={message} isFirst={false} isLast={true} />
            );
          }
        } else {
          if (sameSenderAsAfter(i, messages)) {
            return (
              <ChatBubble message={message} isFirst={true} isLast={false} />
            );
          } else {
            return (
              <ChatBubble message={message} isFirst={true} isLast={true} />
            );
          }
        }
      })}
    </>
  );
}
