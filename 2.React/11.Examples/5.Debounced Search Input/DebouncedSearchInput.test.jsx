import { render, screen, fireEvent, act } from "@testing-library/react";
import DebouncedSearchInput from "./DebouncedSearchInput";

describe("DebouncedSearchInput Component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  test("renders debounced search title", () => {
    render(<DebouncedSearchInput />);

    expect(screen.getByTestId("debounced-search-title")).toBeInTheDocument();
    expect(screen.getByTestId("debounced-search-title")).toHaveTextContent(
      "Debounced Search",
    );
  });

  test("renders search input", () => {
    render(<DebouncedSearchInput />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toHaveAttribute(
      "placeholder",
      "Search users...",
    );
  });

  test("renders searching text initially empty", () => {
    render(<DebouncedSearchInput />);

    expect(screen.getByTestId("searching-text")).toBeInTheDocument();
    expect(screen.getByTestId("searching-text")).toHaveTextContent(
      "Searching for:",
    );
  });

  test("renders user list", () => {
    render(<DebouncedSearchInput />);

    expect(screen.getByTestId("user-list")).toBeInTheDocument();
  });

  test("renders all users initially", () => {
    render(<DebouncedSearchInput />);

    expect(screen.getByTestId("user-item-1")).toHaveTextContent("John Smith");
    expect(screen.getByTestId("user-item-2")).toHaveTextContent(
      "Sarah Johnson",
    );
    expect(screen.getByTestId("user-item-3")).toHaveTextContent(
      "Michael Brown",
    );
    expect(screen.getByTestId("user-item-4")).toHaveTextContent("Emily Davis");
    expect(screen.getByTestId("user-item-5")).toHaveTextContent("David Wilson");
  });

  test("updates input value immediately when user types", () => {
    render(<DebouncedSearchInput />);

    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, {
      target: { value: "John" },
    });

    expect(searchInput).toHaveValue("John");
  });

  test("does not update searching text before debounce delay", () => {
    render(<DebouncedSearchInput />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "John" },
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(screen.getByTestId("searching-text")).toHaveTextContent(
      "Searching for:",
    );
    expect(screen.getByTestId("searching-text")).not.toHaveTextContent(
      "Searching for: John",
    );
  });

  test("updates searching text after debounce delay", () => {
    render(<DebouncedSearchInput />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "John" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("searching-text")).toHaveTextContent(
      "Searching for: John",
    );
  });

  test("filters users after debounce delay", () => {
    render(<DebouncedSearchInput />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "John Smith" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("user-item-1")).toHaveTextContent("John Smith");

    expect(screen.queryByTestId("user-item-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-4")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("does not filter users before debounce delay", () => {
    render(<DebouncedSearchInput />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Emily" },
    });

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(screen.getByTestId("user-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-3")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-4")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-5")).toBeInTheDocument();
  });

  test("filters users by partial name after debounce delay", () => {
    render(<DebouncedSearchInput />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Sarah" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("user-item-2")).toHaveTextContent(
      "Sarah Johnson",
    );

    expect(screen.queryByTestId("user-item-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-4")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("filters users case-insensitively after debounce delay", () => {
    render(<DebouncedSearchInput />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "michael" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("user-item-3")).toHaveTextContent(
      "Michael Brown",
    );

    expect(screen.queryByTestId("user-item-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-4")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("shows matching users when search text matches multiple users", () => {
    render(<DebouncedSearchInput />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "john" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("user-item-1")).toHaveTextContent("John Smith");
    expect(screen.getByTestId("user-item-2")).toHaveTextContent(
      "Sarah Johnson",
    );

    expect(screen.queryByTestId("user-item-3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-4")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("shows no users found after debounce delay when no users match", () => {
    render(<DebouncedSearchInput />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Robert" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("no-users-message")).toBeInTheDocument();
    expect(screen.getByTestId("no-users-message")).toHaveTextContent(
      "No users found",
    );

    expect(screen.queryByTestId("user-item-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-4")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("trims search text after debounce delay", () => {
    render(<DebouncedSearchInput />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "   Emily   " },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("searching-text")).toHaveTextContent(
      "Searching for: Emily",
    );

    expect(screen.getByTestId("user-item-4")).toHaveTextContent("Emily Davis");

    expect(screen.queryByTestId("user-item-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("clears previous timer when user types again before debounce delay", () => {
    render(<DebouncedSearchInput />);

    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, {
      target: { value: "J" },
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    fireEvent.change(searchInput, {
      target: { value: "John" },
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(screen.getByTestId("searching-text")).not.toHaveTextContent(
      "Searching for: John",
    );

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.getByTestId("searching-text")).toHaveTextContent(
      "Searching for: John",
    );
  });

  test("shows all users again after search input is cleared and debounce completes", () => {
    render(<DebouncedSearchInput />);

    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, {
      target: { value: "David" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("user-item-5")).toHaveTextContent("David Wilson");

    expect(screen.queryByTestId("user-item-1")).not.toBeInTheDocument();

    fireEvent.change(searchInput, {
      target: { value: "" },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("user-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-3")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-4")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-5")).toBeInTheDocument();
  });

  test("shows all users when search input contains only spaces after debounce", () => {
    render(<DebouncedSearchInput />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "     " },
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(screen.getByTestId("user-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-3")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-4")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-5")).toBeInTheDocument();

    expect(screen.queryByTestId("no-users-message")).not.toBeInTheDocument();
  });
});
