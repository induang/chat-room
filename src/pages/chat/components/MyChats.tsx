import clsx from "clsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { setChats, setSelectedChat } from "../../../redux/slices/chatSlice";
import { getChats } from "../../../services/chat";
import { IChat } from "../../../services/chat.type";
import ChatItem from "../../../components/chats/ChatItem";
import CreateGroupModal from "../../../components/modals/CreateGroupModal";
import addChatIcon from "@/assets/plus-sign-button.png";

export default function MyChats() {
  const dispatch = useDispatch();
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat,
  );
  const chats = useSelector((state: RootState) => state.chat.chats);
  const [selectId, setSelectId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSelectClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    selectedChat: IChat,
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
      <ul className="menu h-full rounded overflow-y-scroll flex-nowrap px-2">
        <div className="side-panel-header flex p-3 items-center justify-between">
          <span className="title text-3xl">Messages</span>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="m-1">
              <img
                src={addChatIcon}
                className="w-8 h-8 mr-2 cursor-pointer"
                alt="add group chat"
              ></img>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 font-normal"
            >
              <label htmlFor="chat-search-users-drawer">
                <li>
                  <a>one one chat</a>
                </li>
              </label>
              <label htmlFor="create-group-modal">
                <li>
                  <a>group chat</a>
                </li>
              </label>
            </ul>
          </div>
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
