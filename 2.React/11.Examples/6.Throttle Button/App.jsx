import React, { useRef } from "react";

function ThrottleButton() {
  const lastClickedTimeRef = useRef(0);

  const handleClick = () => {
    const now = Date.now();
    const delay = 2000;

    if (now - lastClickedTimeRef.current >= delay) {
      console.log("Button clicked");
      lastClickedTimeRef.current = now;
    }
  };

  return (
    <div>
      <h2>Throttle Button Example</h2>

      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default ThrottleButton;