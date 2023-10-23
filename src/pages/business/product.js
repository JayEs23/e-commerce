import React from "react";
import BusinessDashboardWrapper from "../../components/business/dasboard-content-wrapper";
import BusinessProductIndex from "../../components/business/product";

const Product = () => {
  return (
    <div>
      <BusinessDashboardWrapper child={<BusinessProductIndex />} />
    </div>
  );
};

export default Product;
