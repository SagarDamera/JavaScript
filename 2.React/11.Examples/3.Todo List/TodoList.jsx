import React, { useRef, useState } from "react";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const nextTodoId = useRef(1);

  const handleAddTodo = () => {
    const trimmedValue = inputValue.trim();

    if (trimmedValue === "") return;

    const newTodo = {
      id: nextTodoId.current,
      text: trimmedValue,
      completed: false,
    };

    nextTodoId.current += 1;

    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setInputValue("");
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div data-testid="todo-list-container">
      <h2 data-testid="todo-list-title">Todo List</h2>

      <input
        data-testid="todo-input"
        type="text"
        placeholder="Enter todo"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <button data-testid="add-button" onClick={handleAddTodo}>
        Add
      </button>

      {todos.length === 0 && (
        <p data-testid="empty-message">No todos added yet.</p>
      )}

      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} data-testid={`todo-item-${todo.id}`}>
            <span
              data-testid={`todo-text-${todo.id}`}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>

            <button
              data-testid={`toggle-button-${todo.id}`}
              onClick={() => handleToggleComplete(todo.id)}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>

            <button
              data-testid={`delete-button-${todo.id}`}
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
