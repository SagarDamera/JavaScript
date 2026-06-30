import { render, screen, fireEvent } from "@testing-library/react";
import StarRating from "./StarRating";

describe("StarRating Component", () => {
  test("renders star rating title", () => {
    render(<StarRating />);

    expect(screen.getByTestId("star-rating-title")).toBeInTheDocument();
    expect(screen.getByTestId("star-rating-title")).toHaveTextContent(
      "Star Rating",
    );
  });

  test("renders stars container", () => {
    render(<StarRating />);

    expect(screen.getByTestId("stars-container")).toBeInTheDocument();
  });

  test("renders all five star buttons", () => {
    render(<StarRating />);

    expect(screen.getByTestId("star-button-1")).toBeInTheDocument();
    expect(screen.getByTestId("star-button-2")).toBeInTheDocument();
    expect(screen.getByTestId("star-button-3")).toBeInTheDocument();
    expect(screen.getByTestId("star-button-4")).toBeInTheDocument();
    expect(screen.getByTestId("star-button-5")).toBeInTheDocument();
  });

  test("renders initial rating as 0", () => {
    render(<StarRating />);

    expect(screen.getByTestId("rating-value")).toHaveTextContent("Rating: 0");
  });

  test("renders all stars as gray initially", () => {
    render(<StarRating />);

    expect(screen.getByTestId("star-button-1")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-2")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-3")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-4")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-5")).toHaveStyle({
      color: "gray",
    });
  });

  test("sets rating to 1 when first star is clicked", () => {
    render(<StarRating />);

    fireEvent.click(screen.getByTestId("star-button-1"));

    expect(screen.getByTestId("rating-value")).toHaveTextContent("Rating: 1");

    expect(screen.getByTestId("star-button-1")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-2")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-3")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-4")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-5")).toHaveStyle({
      color: "gray",
    });
  });

  test("sets rating to 2 when second star is clicked", () => {
    render(<StarRating />);

    fireEvent.click(screen.getByTestId("star-button-2"));

    expect(screen.getByTestId("rating-value")).toHaveTextContent("Rating: 2");

    expect(screen.getByTestId("star-button-1")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-2")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-3")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-4")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-5")).toHaveStyle({
      color: "gray",
    });
  });

  test("sets rating to 3 when third star is clicked", () => {
    render(<StarRating />);

    fireEvent.click(screen.getByTestId("star-button-3"));

    expect(screen.getByTestId("rating-value")).toHaveTextContent("Rating: 3");

    expect(screen.getByTestId("star-button-1")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-2")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-3")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-4")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-5")).toHaveStyle({
      color: "gray",
    });
  });

  test("sets rating to 4 when fourth star is clicked", () => {
    render(<StarRating />);

    fireEvent.click(screen.getByTestId("star-button-4"));

    expect(screen.getByTestId("rating-value")).toHaveTextContent("Rating: 4");

    expect(screen.getByTestId("star-button-1")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-2")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-3")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-4")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-5")).toHaveStyle({
      color: "gray",
    });
  });

  test("sets rating to 5 when fifth star is clicked", () => {
    render(<StarRating />);

    fireEvent.click(screen.getByTestId("star-button-5"));

    expect(screen.getByTestId("rating-value")).toHaveTextContent("Rating: 5");

    expect(screen.getByTestId("star-button-1")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-2")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-3")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-4")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-5")).toHaveStyle({
      color: "gold",
    });
  });

  test("updates rating from higher value to lower value", () => {
    render(<StarRating />);

    fireEvent.click(screen.getByTestId("star-button-5"));

    expect(screen.getByTestId("rating-value")).toHaveTextContent("Rating: 5");

    fireEvent.click(screen.getByTestId("star-button-2"));

    expect(screen.getByTestId("rating-value")).toHaveTextContent("Rating: 2");

    expect(screen.getByTestId("star-button-1")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-2")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-3")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-4")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-5")).toHaveStyle({
      color: "gray",
    });
  });

  test("updates rating from lower value to higher value", () => {
    render(<StarRating />);

    fireEvent.click(screen.getByTestId("star-button-1"));

    expect(screen.getByTestId("rating-value")).toHaveTextContent("Rating: 1");

    fireEvent.click(screen.getByTestId("star-button-4"));

    expect(screen.getByTestId("rating-value")).toHaveTextContent("Rating: 4");

    expect(screen.getByTestId("star-button-1")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-2")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-3")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-4")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-5")).toHaveStyle({
      color: "gray",
    });
  });

  test("keeps same rating when same star is clicked again", () => {
    render(<StarRating />);

    fireEvent.click(screen.getByTestId("star-button-3"));
    fireEvent.click(screen.getByTestId("star-button-3"));

    expect(screen.getByTestId("rating-value")).toHaveTextContent("Rating: 3");

    expect(screen.getByTestId("star-button-1")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-2")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-3")).toHaveStyle({
      color: "gold",
    });
    expect(screen.getByTestId("star-button-4")).toHaveStyle({
      color: "gray",
    });
    expect(screen.getByTestId("star-button-5")).toHaveStyle({
      color: "gray",
    });
  });
});
