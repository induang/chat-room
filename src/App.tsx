import { Outlet } from "react-router-dom";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import EmojiShower from "./components/EmojiShower";

function App() {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [isEmojiVisible, setIsEmojiVisible] = useState(false);
  const emojiDisappearTimer = useRef<NodeJS.Timeout>();

  const handleWholePageClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setLeft(e.pageX);
    setTop(e.pageY);
    setIsEmojiVisible(true);
  };

  useEffect(() => {
    if (isEmojiVisible) {
      emojiDisappearTimer.current = setTimeout(
        () => setIsEmojiVisible(false),
        500
      );
    }
  }, [isEmojiVisible]);

  return (
    <div
      className="App"
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleWholePageClick(e)
      }
    >
      <Outlet />
      <EmojiShower left={left} top={top} visible={isEmojiVisible} />
    </div>
  );
}

export default App;
