import React, { useEffect, useRef } from "react";
import { IMessage } from "../../services/message.type";
import { sameSenderAsAfter, sameSenderAsPre } from "../../utils/chatLogic";
import ChatBubble from "./ChatBubble";
import "./messagesShower.css";

export default React.memo(function MessagesShower({
  userId,
  messages,
}: {
  userId: string;
  messages: Array<IMessage>;
}) {
  const scrollAnchor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollAnchor.current?.scrollIntoView();
  }, []);
  return (
    <div id="messages-shower-board">
      {messages?.map((message, i, messages) => {
        if (sameSenderAsPre(i, messages)) {
          if (sameSenderAsAfter(i, messages)) {
            return (
              <ChatBubble
                userId={userId}
                key={message._id}
                message={message}
                isFirst={false}
                isLast={false}
              />
            );
          } else {
            return (
              <ChatBubble
                userId={userId}
                key={message._id}
                message={message}
                isFirst={false}
              />
            );
          }
        } else {
          if (sameSenderAsAfter(i, messages)) {
            return (
              <ChatBubble
                userId={userId}
                key={message._id}
                message={message}
                isLast={false}
              />
            );
          } else {
            return (
              <ChatBubble userId={userId} key={message._id} message={message} />
            );
          }
        }
      })}
      <div id="anchor"></div>
      <div id="scroll-anchor" ref={scrollAnchor}></div>
    </div>
  );
});
