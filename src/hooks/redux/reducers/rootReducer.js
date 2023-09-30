import { combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categoriesReducer";
import { cartReducer } from "./cart/cartReducer";
import { wishlistReducer } from "./wishlist/wishlistReducer";
import { productReducer } from "./product/productReducers";

export const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});
