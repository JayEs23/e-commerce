import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';

const CartPage = () => {
  const [cartData, setCartData] = useState([]);

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
      <div className="page-container bg-gray">
        <Navbar />
        <div className="content font-sm p-4">
          <div className="row mt-4 p-4">
            <div className="col-lg-9 card p-4">
              <div className="card-title"><h3>Shopping Cart ({cartData.length}) </h3></div>
              {/* Display the list of products in the cart */}
              {cartData.map((cartItem) => (
                <CartItem key={cartItem.id} product={cartItem.product} />
              ))}
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
