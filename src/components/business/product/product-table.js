import React from "react";

const ProductTable = ({
  products,
  selectedButton,
  selectAll,
  selectOnline,
  selectOffline,
  deleteSelected,
}) => {
  return (
    <div className="product-container">
      <div className="product-search-header">
        <input type="text" placeholder="Search for a product" />
        <button>+ Add product</button>
      </div>
      <div className="product-table-container">
        <div className="product-table-tabs">
          <button
            onClick={selectAll}
            className={selectedButton === "all" && "active"}
          >
            All
          </button>
          <button
            onClick={selectOnline}
            className={selectedButton === "online" && "active"}
          >
            Online
          </button>
          <button
            onClick={selectOffline}
            className={selectedButton === "offline" && "active"}
          >
            Offline
          </button>
          <button
            onClick={deleteSelected}
            className={selectedButton === "delete" && "active"}
          >
            Delete
          </button>
        </div>
        <div className="product-table">
          <table className="table bg-white">
            <thead className="product-th">
              <tr>
                <th scope="col">Product </th>
                <th scope="col">Category</th>
                <th scope="col">Stock</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody className="product-table-body">
              {products.map((items) => (
                <tr>
                  <th scope="row">
                    <div className="tb-items-container">
                      <input type="checkbox" />
                      <img
                        src="/assets/images/business/Rectangle 3463617.png"
                        alt=""
                      />
                      <span>Tom ford perfume</span>
                    </div>
                  </th>
                  <td>Beauty $ health</td>
                  <td>218</td>
                  <td>$ 620.000</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
