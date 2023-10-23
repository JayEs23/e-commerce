import React from "react";

const NoStore = () => {
  return (
    <div className="product-container">
      <div className="no-product-image-container">
        <img src="/assets/images/business/Error.png" alt="" />
      </div>
      <p>Oops! You do not have an active store.</p>
      <button>Setup store </button>
    </div>
  );
};

export default NoStore;
