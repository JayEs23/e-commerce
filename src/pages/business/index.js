import React from "react";
import BusinessDashboardWrapper from "../../components/business/dasboard-content-wrapper";
import BusinessDashboardIndex from "../../components/business/index-page";

const Business = () => {
  return (
    <div>
      <BusinessDashboardWrapper child={<BusinessDashboardIndex />} />
    </div>
  );
};

export default Business;
