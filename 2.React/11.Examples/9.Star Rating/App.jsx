import React, { useState } from "react";

function StarRating() {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <h2>Star Rating</h2>

      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => setRating(star)}
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

      <p>Rating: {rating}</p>
    </div>
  );
}

export default StarRating;
