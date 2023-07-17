import { useCallback, useEffect, useRef, useState } from "react";

export default function Interview() {
  const [count, setCount] = useState(0);
  const [time, setTime] = useState(0);
  const [toggle, setToggle] = useState(false);
  const intervalId = useRef<NodeJS.Timer>();
  const handleAddClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  const handleMinusClick = useCallback(() => {
    if (count > 0) setCount(count - 1);
  }, [count]);
  const handleToggleClick = useCallback(() => {
    setToggle(!toggle);
  }, [intervalId, toggle]);

  useEffect(() => {
    if (toggle) {
      intervalId.current = setInterval(() => setTime((time) => time + 1), 1000);
    } else {
      clearInterval(intervalId.current);
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [toggle]);

  useEffect(() => {}, []);

  return (
    <div className="h-screen flex items-center gap-x-2">
      <div className="counter bg-slate-50 card w-96 h-48">
        <h4 className="m-auto">Counter</h4>
        <div className="m-auto flex items-center gap-x-2">
          <button
            className="btn btn-primary btn-circle"
            onClick={handleMinusClick}
          >
            -
          </button>
          <div className="text-center card w-20 bg-slate-200 text-4xl">
            {count}
          </div>
          <button
            className="btn btn-primary btn-circle"
            onClick={handleAddClick}
          >
            +
          </button>
        </div>
      </div>
      <div className="timer bg-slate-50 card w-96 h-48">
        <h4 className="m-auto">Timer</h4>
        <div className="m-auto bg-slate-100 w-20 text-center card">{time}</div>
        <div className="button-group m-auto">
          <button className="btn btn-primary" onClick={handleToggleClick}>
            {toggle ? "END" : "START"}
          </button>
        </div>
      </div>
    </div>
  );
}
