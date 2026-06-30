import { render, screen, fireEvent, act } from "@testing-library/react";
import AutoCounter from "./AutoCounter";

describe("AutoCounter Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test("renders auto counter title", () => {
    render(<AutoCounter />);

    expect(screen.getByTestId("auto-counter-title")).toBeInTheDocument();
    expect(screen.getByTestId("auto-counter-title")).toHaveTextContent(
      "Auto Counter",
    );
  });

  test("renders initial count as 0", () => {
    render(<AutoCounter />);

    expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 0");
  });

  test("renders initial status as stopped", () => {
    render(<AutoCounter />);

    expect(screen.getByTestId("counter-status")).toHaveTextContent(
      "Status: Stopped",
    );
  });

  test("starts counter when Start button is clicked", () => {
    render(<AutoCounter />);

    const startButton = screen.getByTestId("start-button");

    fireEvent.click(startButton);

    expect(screen.getByTestId("counter-status")).toHaveTextContent(
      "Status: Running",
    );
  });

  test("increments count after 1 second when counter is running", () => {
    render(<AutoCounter />);

    fireEvent.click(screen.getByTestId("start-button"));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 1");
  });

  test("increments count multiple times while running", () => {
    render(<AutoCounter />);

    fireEvent.click(screen.getByTestId("start-button"));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 3");
  });

  test("stops counter when Stop button is clicked", () => {
    render(<AutoCounter />);

    fireEvent.click(screen.getByTestId("start-button"));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 2");

    fireEvent.click(screen.getByTestId("stop-button"));

    expect(screen.getByTestId("counter-status")).toHaveTextContent(
      "Status: Stopped",
    );

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 2");
  });

  test("resets count to 0 and stops counter", () => {
    render(<AutoCounter />);

    fireEvent.click(screen.getByTestId("start-button"));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 3");

    fireEvent.click(screen.getByTestId("reset-button"));

    expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 0");
    expect(screen.getByTestId("counter-status")).toHaveTextContent(
      "Status: Stopped",
    );
  });

  test("does not increment before Start button is clicked", () => {
    render(<AutoCounter />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByTestId("count-value")).toHaveTextContent("Count: 0");
  });

  test("renders all action buttons", () => {
    render(<AutoCounter />);

    expect(screen.getByTestId("start-button")).toBeInTheDocument();
    expect(screen.getByTestId("stop-button")).toBeInTheDocument();
    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
  });
});
