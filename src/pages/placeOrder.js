import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [address,setAddress] = useState("27 dedamola Crescent, Olodi Apapa, Amosun, Oyo, Lagos State, Nigeria")

  useEffect(() => {
    // Fetch cart data from your API
    // Example: Fetch from '/api/cart'
    fetch('/api/cart')
      .then((response) => response.json())
      .then((data) => setCartData(data))
      .catch((error) => console.error('Error fetching cart data:', error));
  }, []);

  return (
    <>
    <Head>
        <title>Inshopper Ecommerce - Place Order</title>
      </Head>
      <div className="page-container bg-gray">
        <Header />
        <div className="content font-sm p-4">
          <div className="row mt-4 p-4">
            <div className="col-lg-9 card p-4">
              <div className="card-title"><h3>Place Order </h3></div>
              <div className="card-body">
                <div className="row bg-gray h-200 mb-4" style={{fontSize:"14px !important"}}>
                  <div className="col-10">
                    <p className="font-sm font-weight-bold btn-sm btn">Address info</p>
                    <p className="font-sm mt-2">Delivery Address</p>
                    <p className="font-sm font-weight-bold">{address}</p>
                    <p className="font-sm mt-2">Billing Address</p>
                    <p className="font-sm font-weight-bold">{address}</p>
                  </div>
                  <div className="col-2 justify-content-end align-item-right"><button className="btn btn-sm text-primary"><i className="ni ni-pen"></i> Edit</button></div>
                </div>
                <div className="row bg-gray h-200 mb-4"></div>
                <div className="row bg-gray h-200 mb-4"></div>

              </div>
              {/* {cartData.map((cartItem) => (
                <CartItem key={cartItem.id} product={cartItem.product} />
              ))} */}
            </div>
            <div className="col-lg-3">
              <CartSummary cartData={cartData} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
