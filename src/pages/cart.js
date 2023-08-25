import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartItem from './components/cart/CartItem';
import CartSummary from './components/cart/CartSummary';
import api from '@/utils/api';
const CartPage = () => {
  const [cartData, setCartData] = useState([]);
  const [cartId, setCartId] = useState(null);

  useEffect(() => {

    const fetchCartData = async () => {
      try {
        const response = await api.get("order/cart");
        setCartData(response.data.cartItems);
        setCartId(response.data.id);
      } catch (error) {
        console.error("Error Fetching Cart Details",error);
      }
    }
    // Fetch cart data from your API
      fetchCartData();
  }, []);

  return (
    <>
      <div className="page-container bg-gray">
        <Header />
        <div className="content font-sm p-4">
          <div className="row mt-4 p-4">
            <div className="col-lg-9 card p-4">
              <div className="card-title"><h3>Shopping Cart ({cartData.length}) </h3></div>
              {/* Display the list of products in the cart */}
              {cartData.map((cartItem) => (
                <CartItem key={cartId} product={cartItem.product} />
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
