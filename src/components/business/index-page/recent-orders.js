import React from "react";

const RecentOrdersTable = () => {
  const recent_orders = [{}, {}, {}, {}, {}];
  return (
    <div className="recent-order-container">
      <div className="heading-container">
        <h4>Recent orders</h4>
        <button>View all</button>
      </div>
      <table className="table bg-white">
        <thead>
          <tr>
            <th scope="col">Product </th>
            <th scope="col">Order no</th>
            <th scope="col">Price</th>
            <th scope="col">Stock</th>
          </tr>
        </thead>
        <tbody>
          {recent_orders.map((items) => (
            <tr>
              <th scope="row">Tom ford perfume</th>
              <td>5678324</td>
              <td>$ 50,000</td>
              <td>008</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrdersTable;
