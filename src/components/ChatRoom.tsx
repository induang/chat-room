import Header from "./Header";
import Sender from "./Sender";
import Shower from "./Shower";

export default () => {
  return (
    <div className="container m-auto mt-20 p-1 bg-slate-500 w-fit rounded">
      <div className="nav-bar">
        <Header />
      </div>
      <div className="message-show">
        <Shower />
      </div>
      <div className="user-operate-pane w-96">
        <Sender />
      </div>
    </div>
  );
};
