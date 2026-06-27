// todoSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false,
      });
    },

    deleteTodo: (state, action) => {
      state.items = state.items.filter((todo) => todo.id !== action.payload);
    },

    toggleTodo: (state, action) => {
      const todo = state.items.find((todo) => todo.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    clearCompleted: (state) => {
      state.items = state.items.filter((todo) => !todo.completed);
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, clearCompleted } =
  todoSlice.actions;

export default todoSlice.reducer;
