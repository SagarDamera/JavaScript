import React, { useEffect, useState } from "react";

function InfiniteScrollExample() {
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => i + 1));
  const [loading, setLoading] = useState(false);

  const loadMoreItems = () => {
    setLoading(true);

    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from({ length: 10 }, (_, i) => prevItems.length + i + 1),
      ]);

      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (isBottom && !loading) {
        loadMoreItems();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  return (
    <div>
      <h2>Infinite Scroll</h2>

      <ul>
        {items.map((item) => (
          <li key={item}>Item {item}</li>
        ))}
      </ul>

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default InfiniteScrollExample;