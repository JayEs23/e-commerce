import React from "react";

const LoadingSkeleton = ({ type }) => {
  const COUNTER = 8;
  const ProductSkeleton = () => (
    <div className="product-sk">
      <div className="product-sk-img"></div>
      <div className="product-sk-info">
        <div className="product-sk-detail">
          <div className="product-sk-text"></div>
          <div className="product-sk-text sm"></div>
        </div>
      </div>
      <div className="product-sk-info">
        <div className="product-sk-color"></div>
        <div className="product-sk-text sm"></div>
      </div>
    </div>
  );

  if (type === "product") return Array(COUNTER).fill(<ProductSkeleton />);
};

export default LoadingSkeleton;
