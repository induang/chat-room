import clsx from "clsx";
import { useEffect, useState } from "react";
import { getChats } from "../../services/chat";
import { IChat } from "../../services/chat.type";
import ChatItem from "./ChatItem";

export default function MyChats() {
  const [chats, setChats] = useState<Array<IChat>>([]);
  const [selectId, setSelectId] = useState("");

  const handleSelectClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    selectId: string
  ) => {
    setSelectId(selectId);
  };

  useEffect(() => {
    getChats().then((res) => setChats(res));
  }, []);

  return (
    <ul className="menu bg-base-100/75 w-96 rounded h-screen">
      {chats?.map((chat) => (
        <li key={chat._id} onClick={(e) => handleSelectClick(e, chat._id)}>
          <a className={clsx(selectId === chat._id ? "active" : "")}>
            <ChatItem chat={chat} isActive={chat._id === selectId} />
          </a>
        </li>
      ))}
    </ul>
  );
}
