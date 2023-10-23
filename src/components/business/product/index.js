import React, { useState } from "react";
import NoProduct from "./no-product";
import ProductTable from "./product-table";

const BusinessProductIndex = () => {
  const [selectedOption, setSelectedOption] = useState("all");
  const [products, setProducts] = useState([{}, {}, {}, {}, {}]);
  const handleSelectAll = () => {
    setSelectedOption("all");
    setProducts([{}, {}, {}, {}, {}])
  };
  const handleSelectOnline = () => {
    setSelectedOption("online");
    setProducts([{},{}])
  };
  const handleSelectOffline = () => {
    setSelectedOption("offline");
    setProducts([{},{}, {}])
  };
  return (
    <div className="product-main-container">
      <h3>product page</h3>
      {products.length <= 0 && <NoProduct />}
      {products.length >= 1 && (
        <ProductTable
          selectAll={handleSelectAll}
          selectOnline={handleSelectOnline}
          selectOffline={handleSelectOffline}
          products={products}
          selectedButton={selectedOption}
        />
      )}
    </div>
  );
};

export default BusinessProductIndex;
