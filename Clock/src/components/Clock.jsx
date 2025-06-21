import React, { useState } from "react";

const Clock = () => {
  const [text, setText] = useState("");
  const [delay, setDelay] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(text, delay, repeat);
    setIsRunning(true);
    if (isRunning) {
      if (repeat) {
        setInterval(() => {
          setTimeout(() => {
            console.log("This shows after:", delay);
            setCount((prev) => prev + 1);
          }, delay);
        }, 1000);
      } else {
        setTimeout(() => {
          console.log("Delay is:", delay);
          setCount((prev) => prev + 1);
        }, delay);
      }
    }

    clearInterval(() => {
      clearClockInterval();
    });
  };

  const clearClockInterval = () => {
    setCount(0);
    // setIsRunning(false);
    setDelay(0);
    setRepeat(false);
  };

  const handleClear = () => {
    clearClockInterval();
    setIsRunning(false);
  };

  const date = Date(Date.now());

  return (
    <div>
      <div>
        <h2>{text.length > 0 && `${text}, Executed at ${date})`}</h2>
        <h1>{count}</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="text">Task name</label>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <label htmlFor="delay">Delay</label>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
        />

        <label htmlFor="repeat">Repeat for</label>
        <input
          type="checkbox"
          value={repeat}
          checked={repeat}
          onChange={(e) => setRepeat(e.target.checked)}
        />
        <button type="submit">Start</button>
      </form>
      <button onClick={handleClear}>Cleat all</button>
    </div>
  );
};

export default Clock;
