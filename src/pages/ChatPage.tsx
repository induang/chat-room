import ChatBox from "../components/Chats/ChatBox";
import CreateGroupModal from "../components/Chats/CreateGroupModal";
import UpdateGroupModal from "../components/Chats/UpdateGroupModal";
import MyChats from "../components/Chats/MyChats";
import Header from "../components/Headers/Header";
import { IChat } from "../services/chat.type";

export default () => {
  return (
    <div className="chat-page">
      <div className="chat-page-header">
        <Header />
      </div>
      <div className="chat-page-content flex justify-between m-1 gap-x-1">
        <div className="side-panel basis-1">
          <MyChats />
        </div>
        <div className="chat-box grow">
          <ChatBox />
        </div>
      </div>
      <CreateGroupModal />
      {/* <UpdateGroupModal chat={{} as IChat} /> */}
    </div>
  );
};
