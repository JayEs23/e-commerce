import React from "react";
import NoStore from "./no-store";
import CreateStore from "./create-store";

const BusinessStoreIndex = () => {
  return (
    <div className="product-main-container">
      <h3>Store</h3>
      {/* <NoStore /> */}
      <CreateStore />
    </div>
  );
};

export default BusinessStoreIndex;
