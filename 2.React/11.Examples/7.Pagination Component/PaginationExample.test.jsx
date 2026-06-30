import { render, screen, fireEvent } from "@testing-library/react";
import PaginationExample from "./PaginationExample";

describe("PaginationExample Component", () => {
  test("renders pagination title", () => {
    render(<PaginationExample />);

    expect(screen.getByTestId("pagination-title")).toBeInTheDocument();
    expect(screen.getByTestId("pagination-title")).toHaveTextContent(
      "Pagination Example",
    );
  });

  test("renders items list", () => {
    render(<PaginationExample />);

    expect(screen.getByTestId("items-list")).toBeInTheDocument();
  });

  test("renders previous and next buttons", () => {
    render(<PaginationExample />);

    expect(screen.getByTestId("previous-button")).toBeInTheDocument();
    expect(screen.getByTestId("previous-button")).toHaveTextContent("Previous");

    expect(screen.getByTestId("next-button")).toBeInTheDocument();
    expect(screen.getByTestId("next-button")).toHaveTextContent("Next");
  });

  test("renders initial page info as page 1 of 4", () => {
    render(<PaginationExample />);

    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 1 of 4");
  });

  test("renders first page items initially", () => {
    render(<PaginationExample />);

    expect(screen.getByTestId("item-1")).toHaveTextContent("User 1");
    expect(screen.getByTestId("item-2")).toHaveTextContent("User 2");
    expect(screen.getByTestId("item-3")).toHaveTextContent("User 3");

    expect(screen.queryByText("User 4")).not.toBeInTheDocument();
  });

  test("previous button is disabled on first page", () => {
    render(<PaginationExample />);

    expect(screen.getByTestId("previous-button")).toBeDisabled();
  });

  test("next button is enabled on first page", () => {
    render(<PaginationExample />);

    expect(screen.getByTestId("next-button")).not.toBeDisabled();
  });

  test("goes to second page when Next button is clicked", () => {
    render(<PaginationExample />);

    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 2 of 4");

    expect(screen.getByTestId("item-1")).toHaveTextContent("User 4");
    expect(screen.getByTestId("item-2")).toHaveTextContent("User 5");
    expect(screen.getByTestId("item-3")).toHaveTextContent("User 6");

    expect(screen.queryByText("User 1")).not.toBeInTheDocument();
  });

  test("previous button is enabled on second page", () => {
    render(<PaginationExample />);

    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByTestId("previous-button")).not.toBeDisabled();
  });

  test("goes to third page when Next button is clicked twice", () => {
    render(<PaginationExample />);

    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 3 of 4");

    expect(screen.getByTestId("item-1")).toHaveTextContent("User 7");
    expect(screen.getByTestId("item-2")).toHaveTextContent("User 8");
    expect(screen.getByTestId("item-3")).toHaveTextContent("User 9");

    expect(screen.queryByText("User 4")).not.toBeInTheDocument();
  });

  test("goes to last page when Next button is clicked three times", () => {
    render(<PaginationExample />);

    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 4 of 4");

    expect(screen.getByTestId("item-1")).toHaveTextContent("User 10");

    expect(screen.queryByText("User 7")).not.toBeInTheDocument();
    expect(screen.queryByText("User 8")).not.toBeInTheDocument();
    expect(screen.queryByText("User 9")).not.toBeInTheDocument();
  });

  test("next button is disabled on last page", () => {
    render(<PaginationExample />);

    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByTestId("next-button")).toBeDisabled();
  });

  test("goes back to previous page when Previous button is clicked", () => {
    render(<PaginationExample />);

    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 3 of 4");

    fireEvent.click(screen.getByTestId("previous-button"));

    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 2 of 4");

    expect(screen.getByTestId("item-1")).toHaveTextContent("User 4");
    expect(screen.getByTestId("item-2")).toHaveTextContent("User 5");
    expect(screen.getByTestId("item-3")).toHaveTextContent("User 6");
  });

  test("goes back to first page from second page", () => {
    render(<PaginationExample />);

    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 2 of 4");

    fireEvent.click(screen.getByTestId("previous-button"));

    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 1 of 4");

    expect(screen.getByTestId("item-1")).toHaveTextContent("User 1");
    expect(screen.getByTestId("item-2")).toHaveTextContent("User 2");
    expect(screen.getByTestId("item-3")).toHaveTextContent("User 3");
  });

  test("does not go before first page", () => {
    render(<PaginationExample />);

    fireEvent.click(screen.getByTestId("previous-button"));

    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 1 of 4");

    expect(screen.getByTestId("item-1")).toHaveTextContent("User 1");
    expect(screen.getByTestId("item-2")).toHaveTextContent("User 2");
    expect(screen.getByTestId("item-3")).toHaveTextContent("User 3");
  });

  test("does not go after last page", () => {
    render(<PaginationExample />);

    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));
    fireEvent.click(screen.getByTestId("next-button"));

    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 4 of 4");

    expect(screen.getByTestId("item-1")).toHaveTextContent("User 10");
    expect(screen.queryByText("User 11")).not.toBeInTheDocument();
  });
});
