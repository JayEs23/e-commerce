import { combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categoriesReducer";
import { cartReducer } from "./cartReducer";
import { wishlistReducer } from "./wishlistReducer";

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  cart: cartReducer,
});
