import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { setChats, setSelectedChat } from "../../../redux/slices/chatSlice";
import { getChats } from "../../../services/chat";
import { IChat } from "../../../services/chat.type";
import ChatItem from "../../../components/chats/ChatItem";
import CreateGroupModal from "../../../components/modals/CreateGroupModal";

export default function MyChats() {
  const dispatch = useDispatch();
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const chats = useSelector((state: RootState) => state.chat.chats);
  const [selectId, setSelectId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSelectClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    selectedChat: IChat
  ) => {
    setSelectId(selectedChat._id);
    dispatch(setSelectedChat(selectedChat));
  };

  useEffect(() => {
    setSelectId(selectedChat._id);
  }, [selectedChat]);

  useEffect(() => {
    getChats().then((chats) => dispatch(setChats(chats)));
  }, []);

  return (
    <>
      <CreateGroupModal isShow={isModalOpen} setIsShow={setIsModalOpen} />
      <ul className="menu bg-base-100/75 h-full rounded overflow-y-scroll flex-nowrap">
        <div className="side-panel-header flex justify-between p-6">
          <div className="title text-3xl">Chats</div>
          <label
            className="create-group-chat-btn btn btn-primary btn-md"
            htmlFor="create-group-modal"
            onClick={() => setIsModalOpen(true)}
          >
            + Group Chat
          </label>
        </div>
        {chats?.map((chat) => (
          <li key={chat._id} onClick={(e) => handleSelectClick(e, chat)}>
            <a className={clsx(selectId === chat._id ? "active" : "")}>
              <ChatItem chat={chat} isActive={chat._id === selectId} />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
