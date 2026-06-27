// Counter.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from "./counterSlice";

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Redux Toolkit Counter</h2>

      <p>Count: {count}</p>

      <button onClick={() => dispatch(increment())}>Increment</button>

      <button onClick={() => dispatch(decrement())}>Decrement</button>

      <button onClick={() => dispatch(reset())}>Reset</button>

      <button onClick={() => dispatch(incrementByAmount(5))}>
        Increment By 5
      </button>
    </div>
  );
}

export default Counter;