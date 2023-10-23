import React, { useState } from "react";

const WishlistButton = ({ product, inWishlist, onToggleWishlist }) => {
  const [isInWishlist, setIsInWishlist] = useState(inWishlist);

  const handleWishlistToggle = () => {
    onToggleWishlist(product.id);
    setIsInWishlist(!isInWishlist);
  };

  return product ? (
    <button
      className={`icon-btn wishlist-button ${isInWishlist ? "active" : ""}`}
      onClick={handleWishlistToggle}
    >
      <em className="ni ni-heart"></em>
    </button>
  ) : null;
};

export default WishlistButton;
