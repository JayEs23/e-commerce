import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartService from "./cartServices";

// fetch cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (thunkAPI) => {
    try {
      // console.log("cart fetched");
      return await cartService.getCart();
    } catch (err) {
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Add cart items
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (data, thunkAPI) => {
    try {
      // console.log("cart items fetched");
      return await cartService.postCartItem(data);
    } catch (err) {
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// fetch cart items
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (thunkAPI) => {
    try {
      // console.log("cart items fetched");
      return await cartService.getCartItems();
    } catch (err) {
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// remove cart items
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id, thunkAPI) => {
    try {
      // console.log("cart items fetched");
      return await cartService.deleteCartItem(id);
    } catch (err) {
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  items: [],
  cart: {},
  status: null,
  isFetching: false,
  isFetchingProductById: false,
  isSuccess: false,
  isFetchProdcutIdSuccess: false,
  isError: false,
  errorMessage: "",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCart.pending]: (state, action) => {
      state.status = "pending";
      state.isFetching = true;
    },
    [fetchCart.fulfilled]: (state, action) => {
      state.cart = action.payload;
      state.status = "success";
      state.isFetching = false;
    },
    [fetchCart.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [fetchCartItems.pending]: (state, action) => {
      state.status = "pending";
      state.isFetching = true;
    },
    [fetchCartItems.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
      state.isFetching = false;
    },
    [addCartItem.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [addCartItem.pending]: (state, action) => {
      state.status = "pending";
      state.isFetching = true;
    },
    [addCartItem.fulfilled]: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.cart_item.cart === action.payload.cart
      );
      if (itemIndex >= 0) {
        state.cart.cart_items[itemIndex].quantity += action.payload.quantity;
        state.items[itemIndex].cart_item.quantity += action.payload.quantity;
      } else {
        state.cart.cart_items.push(action.payload);
        state.items.push(action.payload);
      }

      state.status = "success";
      state.isFetching = false;
    },
    [fetchCartItems.rejected]: (state, action) => {
      state.status = "rejected";
    },
    [removeCartItem.pending]: (state, action) => {
      state.status = "pending";
      state.isFetching = true;
    },
    [removeCartItem.fulfilled]: (state, action) => {
      state.status = "success";
      state.isFetching = false;
      state.items = state.items.filter(
        (item) => item.cart_item.id !== action.meta.arg
      );
    },
    [removeCartItem.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const cartReducer = cartSlice.reducer;
