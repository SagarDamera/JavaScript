import React, { memo, useCallback, useMemo, useState } from "react";

const ProductItem = memo(function ProductItem({ product, onAddToCart }) {
  console.log("ProductItem rendered:", product.name);

  return (
    <li>
      <span>
        {product.name} - ${product.price}
      </span>

      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </li>
  );
});

function OptimizedProductList() {
  const [searchText, setSearchText] = useState("");
  const [cartCount, setCartCount] = useState(0);

  const products = useMemo(
    () => [
      { id: 1, name: "Laptop", price: 1200 },
      { id: 2, name: "Phone", price: 800 },
      { id: 3, name: "Tablet", price: 500 },
      { id: 4, name: "Headphones", price: 150 },
      { id: 5, name: "Keyboard", price: 100 },
    ],
    []
  );

  const filteredProducts = useMemo(() => {
    console.log("Filtering products");

    return products.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [products, searchText]);

  const handleAddToCart = useCallback((product) => {
    console.log("Added to cart:", product.name);
    setCartCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <h2>Optimized Product List</h2>

      <p>Cart Count: {cartCount}</p>

      <input
        type="text"
        placeholder="Search product"
        value={searchText}
        onChange={(event) => setSearchText(event.target.value)}
      />

      <ul>
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </ul>
    </div>
  );
}

export default OptimizedProductList;