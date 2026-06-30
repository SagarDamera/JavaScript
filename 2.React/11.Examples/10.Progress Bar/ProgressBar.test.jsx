import { render, screen, fireEvent } from "@testing-library/react";
import ProgressBar from "./ProgressBar";

describe("ProgressBar Component", () => {
  test("renders progress bar title", () => {
    render(<ProgressBar />);

    expect(screen.getByTestId("progress-bar-title")).toBeInTheDocument();
    expect(screen.getByTestId("progress-bar-title")).toHaveTextContent(
      "Progress Bar",
    );
  });

  test("renders progress track", () => {
    render(<ProgressBar />);

    expect(screen.getByTestId("progress-track")).toBeInTheDocument();
  });

  test("renders progress fill", () => {
    render(<ProgressBar />);

    expect(screen.getByTestId("progress-fill")).toBeInTheDocument();
  });

  test("renders initial progress value as 0%", () => {
    render(<ProgressBar />);

    expect(screen.getByTestId("progress-value")).toHaveTextContent("0%");
  });

  test("renders initial progress width as 0%", () => {
    render(<ProgressBar />);

    expect(screen.getByTestId("progress-fill")).toHaveStyle({
      width: "0%",
    });
  });

  test("renders all action buttons", () => {
    render(<ProgressBar />);

    expect(screen.getByTestId("increase-button")).toBeInTheDocument();
    expect(screen.getByTestId("increase-button")).toHaveTextContent("Increase");

    expect(screen.getByTestId("decrease-button")).toBeInTheDocument();
    expect(screen.getByTestId("decrease-button")).toHaveTextContent("Decrease");

    expect(screen.getByTestId("reset-button")).toBeInTheDocument();
    expect(screen.getByTestId("reset-button")).toHaveTextContent("Reset");
  });

  test("increases progress by 10 when Increase button is clicked", () => {
    render(<ProgressBar />);

    fireEvent.click(screen.getByTestId("increase-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("10%");
    expect(screen.getByTestId("progress-fill")).toHaveStyle({
      width: "10%",
    });
  });

  test("increases progress multiple times", () => {
    render(<ProgressBar />);

    fireEvent.click(screen.getByTestId("increase-button"));
    fireEvent.click(screen.getByTestId("increase-button"));
    fireEvent.click(screen.getByTestId("increase-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("30%");
    expect(screen.getByTestId("progress-fill")).toHaveStyle({
      width: "30%",
    });
  });

  test("does not increase progress above 100%", () => {
    render(<ProgressBar />);

    const increaseButton = screen.getByTestId("increase-button");

    for (let i = 0; i < 15; i += 1) {
      fireEvent.click(increaseButton);
    }

    expect(screen.getByTestId("progress-value")).toHaveTextContent("100%");
    expect(screen.getByTestId("progress-fill")).toHaveStyle({
      width: "100%",
    });
  });

  test("decreases progress by 10 when Decrease button is clicked", () => {
    render(<ProgressBar />);

    fireEvent.click(screen.getByTestId("increase-button"));
    fireEvent.click(screen.getByTestId("increase-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("20%");

    fireEvent.click(screen.getByTestId("decrease-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("10%");
    expect(screen.getByTestId("progress-fill")).toHaveStyle({
      width: "10%",
    });
  });

  test("decreases progress multiple times", () => {
    render(<ProgressBar />);

    fireEvent.click(screen.getByTestId("increase-button"));
    fireEvent.click(screen.getByTestId("increase-button"));
    fireEvent.click(screen.getByTestId("increase-button"));
    fireEvent.click(screen.getByTestId("increase-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("40%");

    fireEvent.click(screen.getByTestId("decrease-button"));
    fireEvent.click(screen.getByTestId("decrease-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("20%");
    expect(screen.getByTestId("progress-fill")).toHaveStyle({
      width: "20%",
    });
  });

  test("does not decrease progress below 0%", () => {
    render(<ProgressBar />);

    fireEvent.click(screen.getByTestId("decrease-button"));
    fireEvent.click(screen.getByTestId("decrease-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("0%");
    expect(screen.getByTestId("progress-fill")).toHaveStyle({
      width: "0%",
    });
  });

  test("resets progress to 0%", () => {
    render(<ProgressBar />);

    fireEvent.click(screen.getByTestId("increase-button"));
    fireEvent.click(screen.getByTestId("increase-button"));
    fireEvent.click(screen.getByTestId("increase-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("30%");

    fireEvent.click(screen.getByTestId("reset-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("0%");
    expect(screen.getByTestId("progress-fill")).toHaveStyle({
      width: "0%",
    });
  });

  test("reset keeps progress at 0% when already 0%", () => {
    render(<ProgressBar />);

    fireEvent.click(screen.getByTestId("reset-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("0%");
    expect(screen.getByTestId("progress-fill")).toHaveStyle({
      width: "0%",
    });
  });

  test("can increase again after reset", () => {
    render(<ProgressBar />);

    fireEvent.click(screen.getByTestId("increase-button"));
    fireEvent.click(screen.getByTestId("increase-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("20%");

    fireEvent.click(screen.getByTestId("reset-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("0%");

    fireEvent.click(screen.getByTestId("increase-button"));

    expect(screen.getByTestId("progress-value")).toHaveTextContent("10%");
    expect(screen.getByTestId("progress-fill")).toHaveStyle({
      width: "10%",
    });
  });
});
