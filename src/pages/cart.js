import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import api from "@/utils/api";
const CartPage = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await api.get("order/cart");
        setCartData(response.data.cartItems);
        setCartId(response.data.id);
      } catch (error) {
        console.error("Error Fetching Cart Details", error);
      }
    };
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
              <div className="card-title">
                <h3>Shopping Cart ({cartData.length}) </h3>
              </div>
              {/* Display the list of products in the cart */}
              {cart?.items?.map((item) => (
                <CartItem
                  key={item.cart_item.id}
                  product={item.cart_item.product}
                  setQuantity={setQuantity}
                  quantity={quantity}
                  cart={item.cart_item}
                  handleDeleteItem={handleDeleteItem}
                />
              ))}
            </div>
            <div className="col-lg-3">
              <CartSummary cartData={cart?.items} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default CartPage;
