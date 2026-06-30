import React, { useState } from "react";

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  const handleIncrease = () => {
    setProgress((prevProgress) => Math.min(prevProgress + 10, 100));
  };

  const handleDecrease = () => {
    setProgress((prevProgress) => Math.max(prevProgress - 10, 0));
  };

  const handleReset = () => {
    setProgress(0);
  };

  return (
    <div data-testid="progress-bar-container">
      <h2 data-testid="progress-bar-title">Progress Bar</h2>

      <div
        data-testid="progress-track"
        style={{
          width: "300px",
          height: "25px",
          border: "1px solid black",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div
          data-testid="progress-fill"
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "green",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <p data-testid="progress-value">{progress}%</p>

      <button
        data-testid="increase-button"
        type="button"
        onClick={handleIncrease}
      >
        Increase
      </button>

      <button
        data-testid="decrease-button"
        type="button"
        onClick={handleDecrease}
      >
        Decrease
      </button>

      <button data-testid="reset-button" type="button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default ProgressBar;
