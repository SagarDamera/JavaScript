import React, { useState } from "react";

const stars = [1, 2, 3, 4, 5];

function StarRating() {
  const [rating, setRating] = useState(0);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  return (
    <div data-testid="star-rating-container">
      <h2 data-testid="star-rating-title">Star Rating</h2>

      <div data-testid="stars-container">
        {stars.map((star) => (
          <button
            key={star}
            data-testid={`star-button-${star}`}
            type="button"
            onClick={() => handleRatingClick(star)}
            style={{
              fontSize: "30px",
              cursor: "pointer",
              background: "none",
              border: "none",
              color: star <= rating ? "gold" : "gray",
            }}
          >
            ★
          </button>
        ))}
      </div>

      <p data-testid="rating-value">Rating: {rating}</p>
    </div>
  );
}

export default StarRating;
