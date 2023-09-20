import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist(state, action) {
      state.wishlist = action.payload;
    },
  },
});

export const { setWishlist } = wishlistSlice.actions;

export const wishlistReducer = wishlistSlice.reducer;
