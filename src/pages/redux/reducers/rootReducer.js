import { combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./categoriesReducer";

export const rootReducer = combineReducers({
  categories: categoriesReducer,
});
