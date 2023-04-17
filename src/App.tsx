import { useState } from "react";
import "./App.css";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ChatRoom />
    </div>
  );
}

export default App;
