import React from "react";
import RecentOrdersTable from "./recent-orders";
import MyLineChart from "./chart-comp";
const BusinessDashboardIndex = () => {
  return (
    <div className="business-index-page-container">
      <div className="business-index-header">
        <h2 className="header-text">Dashboard</h2>
        <div className="store-link">
          <p>
            <span>My store link:</span> http/adereal@inshopper
          </p>
          <button>copy</button>
        </div>
      </div>
      <div className="business-index-content-body">
        <div className="left-content">
          <div className="card active-product-card">
            <p>Total active product</p>
            <h4>16,561</h4>
          </div>
          <div className="card product-value-card">
            <p>Total product value</p>
            <h4>$ 11,6561</h4>
          </div>
          <div className="card total-balance-card">
            <p>Total balance</p>
            <h4>$ 2,000,000</h4>
            <button>Withdraw funds</button>
          </div>
        </div>
        <div className="right-content">
          <MyLineChart />
          <RecentOrdersTable />
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardIndex;
