import { combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categoriesReducer";
import { cartReducer } from "./cartReducer";
import { wishlistReducer } from "./wishlistReducer";
import { productReducer } from "./productReducers";

export const rootReducer = combineReducers({
  products: productReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});
