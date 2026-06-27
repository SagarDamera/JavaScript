// AutoCounter.test.jsx

import React from "react";
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

  test("renders Auto Counter heading and initial count", () => {
    render(<AutoCounter />);

    expect(screen.getByText("Auto Counter")).toBeInTheDocument();
    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.getByText("Stop")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  test("increments count automatically every 1 second when running", () => {
    render(<AutoCounter />);

    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("Count: 1")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText("Count: 3")).toBeInTheDocument();
  });

  test("stops incrementing count when Stop button is clicked", () => {
    render(<AutoCounter />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText("Count: 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Stop"));

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText("Count: 2")).toBeInTheDocument();
  });

  test("starts incrementing again when Start button is clicked after stop", () => {
    render(<AutoCounter />);

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText("Count: 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Stop"));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(screen.getByText("Count: 2")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Start"));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText("Count: 3")).toBeInTheDocument();
  });

  test("resets count to 0 and stops the counter when Reset button is clicked", () => {
    render(<AutoCounter />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText("Count: 3")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Reset"));

    expect(screen.getByText("Count: 0")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  test("clears interval when component is unmounted", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");

    const { unmount } = render(<AutoCounter />);

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();

    clearIntervalSpy.mockRestore();
  });
});
