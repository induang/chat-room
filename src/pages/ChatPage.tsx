import ChatBox from "../components/Chats/ChatBox";
import MyChats from "../components/Chats/MyChats";
import Header from "../components/Chats/Header";

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
    </div>
  );
};
