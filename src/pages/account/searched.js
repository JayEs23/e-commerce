import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItem from "@/components/product/ListCard";
import ListCard from "@/components/product/ListCard";

const SearchedProducts = () => {
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    // Fetch cart data from your API
    // Example: Fetch from '/api/cart'
    fetch("/api/cart")
      .then((response) => response.json())
      .then((data) => setSearchData(data))
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  return (
    <>
      <Head>
        <title>Inshopper Ecommerce - Recent Search</title>
      </Head>
      <div className="page-container bg-gray">
        <Header />
        <div className="content font-sm p-4">
          <div className="row mt-4 p-4">
            <div className="col-lg-10 mx-auto card p-4">
              <div className="card-title">
                <h3>Recently Searched</h3>
              </div>
              {/* Display the list of products in the cart */}
              {searchData.map((cartItem) => (
                <ListCard
                  key={cartItem.id}
                  product={cartItem.product}
                  showBuyButton={false}
                />
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SearchedProducts;
