import React from "react";
import BusinessHeader from "../header";
import BusinessSideBar from "../sidebar";

const BusinessDashboardWrapper = ({ child }) => {
  return (
    <div className="business-dashboard-wrapper">
      <BusinessHeader />
      <div className="business-layout-container">
        <BusinessSideBar />
        <div className="business-content-layout">
          <div className="business-content-layout-child-container">{child}</div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardWrapper;
