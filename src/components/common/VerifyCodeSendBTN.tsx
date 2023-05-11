import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { verify } from "../../services/auth";

export default function VerifyCodeSendBTN({ email }: { email: string }) {
  const [count, setCount] = useState(60);
  const [isSendClick, setIsSendClick] = useState(false);
  const timer = useRef(0);

  const handleSendClick = () => {
    setIsSendClick(true);
    clearInterval(timer.current);
    timer.current = setInterval(
      () => setCount((preCount) => preCount - 1),
      1000
    );
    verify(email).catch(() => {
      setIsSendClick(false);
      clearInterval(timer.current);
    });
  };

  useEffect(() => {
    if (count <= 0) {
      setIsSendClick(false);
      clearInterval(timer.current);
    }
  }, [count]);

  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  return (
    <button
      className={clsx("btn btn-primary", isSendClick ? "btn-disabled" : "")}
      onClick={handleSendClick}
    >
      {isSendClick ? <div>Wait {count}s</div> : "SEND"}
    </button>
  );
}
