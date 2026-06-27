import React, { useState } from "react";

function ProgressBar() {
  const [progress, setProgress] = useState(0);

  const handleIncrease = () => {
    setProgress((prevProgress) =>
      prevProgress < 100 ? prevProgress + 10 : 100
    );
  };

  const handleDecrease = () => {
    setProgress((prevProgress) =>
      prevProgress > 0 ? prevProgress - 10 : 0
    );
  };

  const handleReset = () => {
    setProgress(0);
  };

  return (
    <div>
      <h2>Progress Bar</h2>

      <div
        style={{
          width: "300px",
          height: "25px",
          border: "1px solid black",
          borderRadius: "5px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "green",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      <p>{progress}%</p>

      <button onClick={handleIncrease}>Increase</button>
      <button onClick={handleDecrease}>Decrease</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default ProgressBar;