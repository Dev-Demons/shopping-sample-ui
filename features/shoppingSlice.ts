import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Internal Imports
import { shoppingState, AddProductCart, AddPackageCart } from "../models/shoppingModels";
import { REQUEST_STATUS } from "../constants/enums"
import type { RootState } from "./store";
import { api } from "./api";

const initialState: shoppingState = {
  status: REQUEST_STATUS.IDLE,
  error: null,
  data: null,
  cartdata: null,
};

// Get Cart Content
export const getCartContent: any = createAsyncThunk(
    "shopping/getCartContent",
    async (param:any, { rejectWithValue }) => {
      try {
        const response = await api.get<any>(`shopping/`);
        return response.data;
      } catch (err: any) {
        if (!err.response) {
          toast.error("Can't Load data!", { autoClose: 1000 });
          throw err;
        }
        if(err.response.data.detail!=null){
          toast.error(err.response.data.detail,{ autoClose: 1000 });
        }
        if(err.response.data.data!=null){
          toast.error(err.response.data.data,{ autoClose: 1000 });
        }

        return rejectWithValue(err.response.data);
      }
    }
  );

// Add product to cart
export const addProduct2Cart: any = createAsyncThunk(
    "shopping/addProduct2Cart",
    async (creds: AddProductCart, { rejectWithValue }) => {
      try {
        const response = await api.post<AddProductCart>(`shopping/add/`, {
            product: creds.product,
            type: creds.type,
        });
        toast.success("  Successfully Done!", { autoClose: 1000 });
        return response.data;
      } catch (err: any) {
        if (!err.response) {
          toast.error("Failed! Can't access the server!", { autoClose: 1000 });
          throw err;
        }
        if(err.response.data.detail!=null){
          toast.error(err.response.data.detail,{ autoClose: 1000 });
        }
        if(err.response.data.data!=null){
          toast.error(err.response.data.data,{ autoClose: 1000 });
        }
        return rejectWithValue(err.response.data);
      }
    }
  );

  // Remove product to cart
export const removeProductFromCart: any = createAsyncThunk(
  "shopping/removeProductFromCart",
  async (creds: AddProductCart, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await api.delete<AddProductCart>(`shopping/delete/`, {
        data: {
          product: creds.product,
          type: creds.type,
        }
      });
      toast.success("  Successfully Done!", { autoClose: 1000 });
      return fulfillWithValue(response.data);
    } catch (err: any) {
      if (!err.response) {
        toast.error("Failed! Can't access the server!", { autoClose: 1000 });
        throw err;
      }
      if(err.response.data.detail!=null){
        toast.error(err.response.data.detail,{ autoClose: 1000 });
      }
      if(err.response.data.data!=null){
        toast.error(err.response.data.data,{ autoClose: 1000 });
      }

    return rejectWithValue(err.response.data);
    }
  }
);

// Add package to cart
export const addPackage2Cart: any = createAsyncThunk(
    "shopping/addPackage2Cart",
    async (creds: AddPackageCart, { rejectWithValue }) => {
      try {
        const response = await api.post<any>(`shopping/add/package/`, {
            package: creds.package,
            type: creds.package,
        });
        return response.data;
      } catch (err: any) {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.response.data);
      }
    }
  );

export const shoppingSlice = createSlice({
    name: "shopping",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Getting cart product details
      builder.addCase(getCartContent.pending, (state, action) => {
        state.status = REQUEST_STATUS.LOADING;
      }),
      builder.addCase(getCartContent.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.GETPRODUCTS;
        state.cartdata = action.payload;
      }),
      builder.addCase(getCartContent.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      });
      // add product to cart
      builder.addCase(addProduct2Cart.pending, (state, action) => {
        state.status = REQUEST_STATUS.LOADING;
      }),
      builder.addCase(addProduct2Cart.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.data = action.payload;
      }),
      builder.addCase(addProduct2Cart.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      });
        // add package to cart
      builder.addCase(addPackage2Cart.pending, (state, action) => {
        state.status = REQUEST_STATUS.LOADING;
      }),
      builder.addCase(addPackage2Cart.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.data = action.payload;
      }),
      builder.addCase(addPackage2Cart.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      });
        // Remove product from cart
      builder.addCase(removeProductFromCart.pending, (state, action) => {
        state.status = REQUEST_STATUS.LOADING;
      }),
      builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
      }),
      builder.addCase(removeProductFromCart.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      });

    },
});

export const productStatus = (state: RootState) => state.shopping.status;
export const productError = (state: RootState) => state.shopping.error;
export const productData = (state: RootState) => state.shopping.data;
export const CartData = (state: RootState) => state.shopping.cartdata;
export default shoppingSlice.reducer;
    