import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from the API route
    fetch('/api/cart')
      .then(response => response.json())
      .then(data => setCartItems(data));
  }, []);

  return (
    <div className="row">
      <div className="col-md-8">
        <h2>Your Cart</h2>
        <p>Total Items: {cartItems.length}</p>
        <div className="cart-items">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      <div className="col-md-4">
        {/* Right section */}
        {/* Display total, discount, subtotal, and checkout button */}
      </div>
    </div>
  );
};

export default Cart;
