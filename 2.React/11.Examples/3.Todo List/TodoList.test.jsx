import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "./TodoList";

describe("TodoList Component", () => {
  test("renders todo list title", () => {
    render(<TodoList />);

    expect(screen.getByTestId("todo-list-title")).toBeInTheDocument();
    expect(screen.getByTestId("todo-list-title")).toHaveTextContent(
      "Todo List",
    );
  });

  test("renders input field and add button", () => {
    render(<TodoList />);

    expect(screen.getByTestId("todo-input")).toBeInTheDocument();
    expect(screen.getByTestId("todo-input")).toHaveAttribute(
      "placeholder",
      "Enter todo",
    );

    expect(screen.getByTestId("add-button")).toBeInTheDocument();
    expect(screen.getByTestId("add-button")).toHaveTextContent("Add");
  });

  test("renders empty message initially", () => {
    render(<TodoList />);

    expect(screen.getByTestId("empty-message")).toBeInTheDocument();
    expect(screen.getByTestId("empty-message")).toHaveTextContent(
      "No todos added yet.",
    );
  });

  test("renders empty todo list initially", () => {
    render(<TodoList />);

    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
    expect(screen.queryByTestId("todo-item-1")).not.toBeInTheDocument();
  });

  test("updates input value when user types", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");

    fireEvent.change(input, {
      target: { value: "Learn React" },
    });

    expect(input).toHaveValue("Learn React");
  });

  test("adds a todo when Add button is clicked", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(input, {
      target: { value: "Learn React Testing" },
    });

    fireEvent.click(addButton);

    expect(screen.getByTestId("todo-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-text-1")).toHaveTextContent(
      "Learn React Testing",
    );
  });

  test("clears input after adding todo", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");

    fireEvent.change(input, {
      target: { value: "Complete assignment" },
    });

    fireEvent.click(screen.getByTestId("add-button"));

    expect(input).toHaveValue("");
  });

  test("removes empty message after adding todo", () => {
    render(<TodoList />);

    fireEvent.change(screen.getByTestId("todo-input"), {
      target: { value: "Prepare interview notes" },
    });

    fireEvent.click(screen.getByTestId("add-button"));

    expect(screen.queryByTestId("empty-message")).not.toBeInTheDocument();
  });

  test("does not add todo when input is empty", () => {
    render(<TodoList />);

    fireEvent.click(screen.getByTestId("add-button"));

    expect(screen.queryByTestId("todo-item-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("empty-message")).toBeInTheDocument();
  });

  test("does not add todo when input contains only spaces", () => {
    render(<TodoList />);

    fireEvent.change(screen.getByTestId("todo-input"), {
      target: { value: "     " },
    });

    fireEvent.click(screen.getByTestId("add-button"));

    expect(screen.queryByTestId("todo-item-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("empty-message")).toBeInTheDocument();
  });

  test("trims todo text before adding", () => {
    render(<TodoList />);

    fireEvent.change(screen.getByTestId("todo-input"), {
      target: { value: "   Buy groceries   " },
    });

    fireEvent.click(screen.getByTestId("add-button"));

    expect(screen.getByTestId("todo-text-1")).toHaveTextContent(
      "Buy groceries",
    );
  });

  test("adds multiple todos", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(input, {
      target: { value: "First Todo" },
    });
    fireEvent.click(addButton);

    fireEvent.change(input, {
      target: { value: "Second Todo" },
    });
    fireEvent.click(addButton);

    expect(screen.getByTestId("todo-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("todo-text-1")).toHaveTextContent("First Todo");

    expect(screen.getByTestId("todo-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("todo-text-2")).toHaveTextContent("Second Todo");
  });

  test("renders Complete button for new todo", () => {
    render(<TodoList />);

    fireEvent.change(screen.getByTestId("todo-input"), {
      target: { value: "Learn Jest" },
    });

    fireEvent.click(screen.getByTestId("add-button"));

    expect(screen.getByTestId("toggle-button-1")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-button-1")).toHaveTextContent("Complete");
  });

  test("marks todo as completed when Complete button is clicked", () => {
    render(<TodoList />);

    fireEvent.change(screen.getByTestId("todo-input"), {
      target: { value: "Learn RTL" },
    });

    fireEvent.click(screen.getByTestId("add-button"));

    fireEvent.click(screen.getByTestId("toggle-button-1"));

    expect(screen.getByTestId("todo-text-1")).toHaveStyle({
      textDecoration: "line-through",
    });

    expect(screen.getByTestId("toggle-button-1")).toHaveTextContent("Undo");
  });

  test("marks completed todo as incomplete when Undo button is clicked", () => {
    render(<TodoList />);

    fireEvent.change(screen.getByTestId("todo-input"), {
      target: { value: "Practice React" },
    });

    fireEvent.click(screen.getByTestId("add-button"));

    fireEvent.click(screen.getByTestId("toggle-button-1"));

    expect(screen.getByTestId("todo-text-1")).toHaveStyle({
      textDecoration: "line-through",
    });

    fireEvent.click(screen.getByTestId("toggle-button-1"));

    expect(screen.getByTestId("todo-text-1")).toHaveStyle({
      textDecoration: "none",
    });

    expect(screen.getByTestId("toggle-button-1")).toHaveTextContent("Complete");
  });

  test("deletes todo when Delete button is clicked", () => {
    render(<TodoList />);

    fireEvent.change(screen.getByTestId("todo-input"), {
      target: { value: "Delete this todo" },
    });

    fireEvent.click(screen.getByTestId("add-button"));

    expect(screen.getByTestId("todo-item-1")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("delete-button-1"));

    expect(screen.queryByTestId("todo-item-1")).not.toBeInTheDocument();
    expect(screen.getByTestId("empty-message")).toBeInTheDocument();
  });

  test("deletes only selected todo from multiple todos", () => {
    render(<TodoList />);

    const input = screen.getByTestId("todo-input");
    const addButton = screen.getByTestId("add-button");

    fireEvent.change(input, {
      target: { value: "First Todo" },
    });
    fireEvent.click(addButton);

    fireEvent.change(input, {
      target: { value: "Second Todo" },
    });
    fireEvent.click(addButton);

    fireEvent.click(screen.getByTestId("delete-button-1"));

    expect(screen.queryByTestId("todo-item-1")).not.toBeInTheDocument();

    expect(screen.getByTestId("todo-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("todo-text-2")).toHaveTextContent("Second Todo");
  });
});
