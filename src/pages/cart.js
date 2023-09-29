import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartItem from "./components/cart/CartItem";
import CartSummary from "./components/cart/CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem } from "@/hooks/redux/reducers/cart/cartReducer";
// import { fetchCartItems } from "@/hooks/redux/reducers/cart/cartReducer";

const CartPage = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchCartItems());
  // }, [dispatch]);

  const cart = useSelector((state) => state.cart);

  const handleDeleteItem = (item) => {
    dispatch(removeCartItem(item));
    // window.location.reload();
  };

  return (
    <>
      <div className="page-container bg-gray">
        <Header />
        <div className="content font-sm p-4">
          <div className="row mt-4 p-4">
            <div className="col-lg-9 card p-4">
              <div className="card-title">
                <h3>Shopping Cart ({cart?.items?.length || 0}) </h3>
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
