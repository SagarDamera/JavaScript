import React, { useEffect, useState } from "react";

function AutoCounter() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setCount(0);
    setIsRunning(false);
  };

  return (
    <section
      aria-label="auto counter component"
      data-testid="auto-counter-container"
    >
      <h2 data-testid="auto-counter-title">Auto Counter</h2>

      <p aria-live="polite" data-testid="count-value">
        Count: {count}
      </p>

      <p data-testid="counter-status">
        Status: {isRunning ? "Running" : "Stopped"}
      </p>

      <button
        type="button"
        onClick={handleStart}
        aria-label="start auto counter"
        data-testid="start-button"
      >
        Start
      </button>

      <button
        type="button"
        onClick={handleStop}
        aria-label="stop auto counter"
        data-testid="stop-button"
      >
        Stop
      </button>

      <button
        type="button"
        onClick={handleReset}
        aria-label="reset auto counter"
        data-testid="reset-button"
      >
        Reset
      </button>
    </section>
  );
}

export default AutoCounter;
