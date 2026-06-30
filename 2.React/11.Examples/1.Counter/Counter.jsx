import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <section aria-label="counter component" data-testid="counter-container">
      <h2 data-testid="counter-title">Counter</h2>

      <p aria-live="polite" data-testid="count-value">
        Count: {count}
      </p>

      <button
        type="button"
        onClick={handleIncrement}
        aria-label="increment count"
        data-testid="increment-button"
      >
        Increment
      </button>

      <button
        type="button"
        onClick={handleDecrement}
        aria-label="decrement count"
        data-testid="decrement-button"
      >
        Decrement
      </button>

      <button
        type="button"
        onClick={handleReset}
        aria-label="reset count"
        data-testid="reset-button"
      >
        Reset
      </button>
    </section>
  );
}

export default Counter;
