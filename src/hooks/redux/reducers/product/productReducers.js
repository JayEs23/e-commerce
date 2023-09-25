import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productServices";

// create product
// export const createProduct = createAsyncThunk(
//   "products/createProduct",
//   async (product, thunkAPI) => {
//     try {
//       return await productService.createProduct(product);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(error.response.data.message, "checking product service");
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// fetch product Id
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (page, thunkAPI) => {
    try {
      console.log("products fetched");
      return await productService.getProducts(page);
    } catch (err) {
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// fetch product by Id
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId, thunkAPI) => {
    try {
      console.log("products fetched", productId);
      return await productService.getProductById(productId);
    } catch (err) {
      console.log(err.response);
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    singleProduct: {},
    status: null,
    isFetching: false,
    isFetchingProductById: false,
    isSuccess: false,
    isFetchProdcutIdSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {},
  extraReducers: {
    [fetchProducts.pending]: (state, action) => {
      state.status = "pending";
      state.isFetching = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
      state.isFetching = false;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = "rejected";
    },
    // [fetchProductsByCategory.pending]: (state, action) => {
    //   state.status = "pending";
    //   state.isFetching = true;
    // },
    // [fetchProductsByCategory.fulfilled]: (state, action) => {
    //   state.items = action.payload;
    //   state.status = "success";
    //   state.isFetching = false;
    // },
    // [fetchProductsByCategory.rejected]: (state, action) => {
    //   state.status = "rejected";
    // },
    [fetchProductById.pending]: (state, action) => {
      state.status = "pending";
      state.isFetchingProductById = true;
    },
    [fetchProductById.fulfilled]: (state, action) => {
      state.singleProduct = action.payload;
      state.status = "success";
    },
    [fetchProductById.rejected]: (state, action) => {
      state.status = "rejected";
    },
    // [addReview.pending]: (state, action) => {
    //   state.status = "pending";
    //   state.isFetchingProductById = true;
    // },
    // [addReview.fulfilled]: (state, action) => {
    //   state.singleProduct = action.payload;
    //   state.status = "success";
    // },
    // [addReview.rejected]: (state, action) => {
    //   state.status = "rejected";
    // },
  },
});

export const productReducer = productSlice.reducer;

// export const productsSelector = (state) => state.product;
