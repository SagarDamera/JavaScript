// Counter.test.jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

describe("Counter", () => {
  test("renders counter title", () => {
    render(<Counter />);

    expect(screen.getByRole("heading", { name: /counter/i })).toBeInTheDocument();
  });

  test("renders initial count as 0", () => {
    render(<Counter />);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("increments count when Increment button is clicked", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    const incrementButton = screen.getByRole("button", {
      name: /increment/i,
    });

    await user.click(incrementButton);

    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  test("decrements count when Decrement button is clicked", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    const decrementButton = screen.getByRole("button", {
      name: /decrement/i,
    });

    await user.click(decrementButton);

    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });

  test("resets count to 0 when Reset button is clicked", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    const incrementButton = screen.getByRole("button", {
      name: /increment/i,
    });

    const resetButton = screen.getByRole("button", {
      name: /reset/i,
    });

    await user.click(incrementButton);
    await user.click(incrementButton);

    expect(screen.getByText("Count: 2")).toBeInTheDocument();

    await user.click(resetButton);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("handles multiple increment and decrement clicks correctly", async () => {
    const user = userEvent.setup();

    render(<Counter />);

    const incrementButton = screen.getByRole("button", {
      name: /increment/i,
    });

    const decrementButton = screen.getByRole("button", {
      name: /decrement/i,
    });

    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(decrementButton);

    expect(screen.getByText("Count: 2")).toBeInTheDocument();
  });
});