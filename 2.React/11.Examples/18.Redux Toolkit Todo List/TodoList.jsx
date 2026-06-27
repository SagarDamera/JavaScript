// TodoList.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  clearCompleted,
} from "./todoSlice";

function TodoList() {
  const [inputValue, setInputValue] = useState("");

  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (!inputValue.trim()) return;

    dispatch(addTodo(inputValue));
    setInputValue("");
  };

  return (
    <div>
      <h2>Redux Toolkit Todo List</h2>

      <input
        type="text"
        placeholder="Enter todo"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <button onClick={handleAddTodo}>Add</button>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>

            <button onClick={() => dispatch(toggleTodo(todo.id))}>
              {todo.completed ? "Undo" : "Complete"}
            </button>

            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <button onClick={() => dispatch(clearCompleted())}>
        Clear Completed
      </button>
    </div>
  );
}

export default TodoList;