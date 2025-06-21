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
    <div className="flex flex-col justify-center items-center">
      <div className="border border-[#ccc] rounded-lg m-5 p-10 font-bold text-lg">
        <h2>{text.length > 0 && `${text}, Executed at ${date})`}</h2>
        <h1>{count}</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col m-5 w-[90%] text-left"
      >
        <label htmlFor="text" className="ml-5">
          Task name
        </label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border p-1 m-2 rounded-lg shadow-md"
        />
        <label htmlFor="delay" className="ml-5">
          Delay
        </label>
        <input
          type="number"
          value={delay}
          onChange={(e) => setDelay(e.target.value)}
          className="border p-1 m-2 rounded-lg shadow-md"
          min="1000"
          length="4"
        />

        <label htmlFor="repeat" className="ml-5">
          Repeat for
        </label>
        <input
          type="checkbox"
          value={repeat}
          checked={repeat}
          onChange={(e) => setRepeat(e.target.checked)}
          className="border p-1 m-2 rounded-lg shadow-md w-fit"
        />
        <button
          type="submit"
          className="bg-blue-300 p-2 m-2 rounded-lg shadow-lg"
        >
          Start
        </button>
      </form>
      <div className="flex flex-col justify-center w-full items-center">
        <button
          onClick={handleClear}
          className="w-[88%] bg-green-300 p-2 m-2 rounded-lg shadow-lg"
        >
          Cleat all
        </button>
      </div>
    </div>
  );
};

export default Clock;
