import React from "react";
import BusinessDashboardWrapper from "../components/business/dasboard-content-wrapper";
import BusinessStoreIndex from "../components/business/store";
const Store = () => {
  return (
    <div>
      <BusinessDashboardWrapper child={<BusinessStoreIndex />} />
    </div>
  );
};

export default Store;
