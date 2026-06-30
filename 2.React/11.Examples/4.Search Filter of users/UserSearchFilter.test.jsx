import { render, screen, fireEvent } from "@testing-library/react";
import UserSearchFilter from "./UserSearchFilter";

describe("UserSearchFilter Component", () => {
  test("renders user search title", () => {
    render(<UserSearchFilter />);

    expect(screen.getByTestId("user-search-title")).toBeInTheDocument();
    expect(screen.getByTestId("user-search-title")).toHaveTextContent(
      "User Search",
    );
  });

  test("renders search input", () => {
    render(<UserSearchFilter />);

    expect(screen.getByTestId("search-input")).toBeInTheDocument();
    expect(screen.getByTestId("search-input")).toHaveAttribute(
      "placeholder",
      "Search users...",
    );
  });

  test("renders user list", () => {
    render(<UserSearchFilter />);

    expect(screen.getByTestId("user-list")).toBeInTheDocument();
  });

  test("renders all users initially", () => {
    render(<UserSearchFilter />);

    expect(screen.getByTestId("user-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-3")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-4")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-5")).toBeInTheDocument();
  });

  test("renders John Smith user details initially", () => {
    render(<UserSearchFilter />);

    expect(screen.getByTestId("user-name-1")).toHaveTextContent("John Smith");
    expect(screen.getByTestId("user-email-1")).toHaveTextContent(
      "john@example.com",
    );
  });

  test("renders Sarah Johnson user details initially", () => {
    render(<UserSearchFilter />);

    expect(screen.getByTestId("user-name-2")).toHaveTextContent(
      "Sarah Johnson",
    );
    expect(screen.getByTestId("user-email-2")).toHaveTextContent(
      "sarah@example.com",
    );
  });

  test("updates search input value when user types", () => {
    render(<UserSearchFilter />);

    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, {
      target: { value: "John" },
    });

    expect(searchInput).toHaveValue("John");
  });

  test("filters users by full name", () => {
    render(<UserSearchFilter />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "John Smith" },
    });

    expect(screen.getByTestId("user-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-name-1")).toHaveTextContent("John Smith");

    expect(screen.queryByTestId("user-item-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-4")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("filters users by partial name", () => {
    render(<UserSearchFilter />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Sarah" },
    });

    expect(screen.getByTestId("user-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("user-name-2")).toHaveTextContent(
      "Sarah Johnson",
    );

    expect(screen.queryByTestId("user-item-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-4")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("filters users case-insensitively", () => {
    render(<UserSearchFilter />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "michael" },
    });

    expect(screen.getByTestId("user-item-3")).toBeInTheDocument();
    expect(screen.getByTestId("user-name-3")).toHaveTextContent(
      "Michael Brown",
    );

    expect(screen.queryByTestId("user-item-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-4")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("filters users using last name", () => {
    render(<UserSearchFilter />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Davis" },
    });

    expect(screen.getByTestId("user-item-4")).toBeInTheDocument();
    expect(screen.getByTestId("user-name-4")).toHaveTextContent("Emily Davis");

    expect(screen.queryByTestId("user-item-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("shows matching users when search text matches multiple users", () => {
    render(<UserSearchFilter />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "john" },
    });

    expect(screen.getByTestId("user-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-name-1")).toHaveTextContent("John Smith");

    expect(screen.getByTestId("user-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("user-name-2")).toHaveTextContent(
      "Sarah Johnson",
    );

    expect(screen.queryByTestId("user-item-3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-4")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("shows no users found message when no users match search", () => {
    render(<UserSearchFilter />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "Robert" },
    });

    expect(screen.getByTestId("no-users-message")).toBeInTheDocument();
    expect(screen.getByTestId("no-users-message")).toHaveTextContent(
      "No users found",
    );
  });

  test("does not show no users found message when users are available", () => {
    render(<UserSearchFilter />);

    expect(screen.queryByTestId("no-users-message")).not.toBeInTheDocument();
  });

  test("trims search text before filtering", () => {
    render(<UserSearchFilter />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "   Emily   " },
    });

    expect(screen.getByTestId("user-item-4")).toBeInTheDocument();
    expect(screen.getByTestId("user-name-4")).toHaveTextContent("Emily Davis");

    expect(screen.queryByTestId("user-item-1")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-2")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-3")).not.toBeInTheDocument();
    expect(screen.queryByTestId("user-item-5")).not.toBeInTheDocument();
  });

  test("shows all users again when search input is cleared", () => {
    render(<UserSearchFilter />);

    const searchInput = screen.getByTestId("search-input");

    fireEvent.change(searchInput, {
      target: { value: "David" },
    });

    expect(screen.getByTestId("user-item-5")).toBeInTheDocument();
    expect(screen.queryByTestId("user-item-1")).not.toBeInTheDocument();

    fireEvent.change(searchInput, {
      target: { value: "" },
    });

    expect(screen.getByTestId("user-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-3")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-4")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-5")).toBeInTheDocument();
  });

  test("shows all users when search input contains only spaces", () => {
    render(<UserSearchFilter />);

    fireEvent.change(screen.getByTestId("search-input"), {
      target: { value: "     " },
    });

    expect(screen.getByTestId("user-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-2")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-3")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-4")).toBeInTheDocument();
    expect(screen.getByTestId("user-item-5")).toBeInTheDocument();
  });
});
