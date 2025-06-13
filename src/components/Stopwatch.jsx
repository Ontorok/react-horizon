import { useRef, useState } from "react";

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  let intervalRef = useRef(null);

  const handleStart = () => {
    setStartTime(Date.now);
    setNow(Date.now);

    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setNow(Date.now);
    }, 1000);
  };

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime && now) {
    secondsPassed = (now - startTime) / 1000;
  }

  console.log(intervalRef.current);

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </>
  );
}
