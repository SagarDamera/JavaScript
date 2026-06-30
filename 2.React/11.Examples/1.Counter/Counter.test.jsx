import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component", () => {
  test("renders counter title", () => {
    render(<Counter />);

    const titleElement = screen.getByTestId("counter-title");

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent("Counter");
  });

  test("renders initial count as 0", () => {
    render(<Counter />);

    const countElement = screen.getByTestId("count-value");

    expect(countElement).toBeInTheDocument();
    expect(countElement).toHaveTextContent("Count: 0");
  });

  test("increments count when Increment button is clicked", () => {
    render(<Counter />);

    const incrementButton = screen.getByTestId("increment-button");
    const countElement = screen.getByTestId("count-value");

    fireEvent.click(incrementButton);

    expect(countElement).toHaveTextContent("Count: 1");
  });

  test("decrements count when Decrement button is clicked", () => {
    render(<Counter />);

    const decrementButton = screen.getByTestId("decrement-button");
    const countElement = screen.getByTestId("count-value");

    fireEvent.click(decrementButton);

    expect(countElement).toHaveTextContent("Count: -1");
  });

  test("resets count to 0 when Reset button is clicked", () => {
    render(<Counter />);

    const incrementButton = screen.getByTestId("increment-button");
    const resetButton = screen.getByTestId("reset-button");
    const countElement = screen.getByTestId("count-value");

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(countElement).toHaveTextContent("Count: 2");

    fireEvent.click(resetButton);

    expect(countElement).toHaveTextContent("Count: 0");
  });

  test("handles multiple increment clicks correctly", () => {
    render(<Counter />);

    const incrementButton = screen.getByTestId("increment-button");
    const countElement = screen.getByTestId("count-value");

    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);

    expect(countElement).toHaveTextContent("Count: 3");
  });

  test("handles multiple decrement clicks correctly", () => {
    render(<Counter />);

    const decrementButton = screen.getByTestId("decrement-button");
    const countElement = screen.getByTestId("count-value");

    fireEvent.click(decrementButton);
    fireEvent.click(decrementButton);

    expect(countElement).toHaveTextContent("Count: -2");
  });

  test("renders all action buttons", () => {
    render(<Counter />);

    expect(screen.getByTestId("increment-button")).toBeInTheDocument();
    expect(screen.getByTestId("decrement-button")).toBeInTheDocument();
    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
  });
});
