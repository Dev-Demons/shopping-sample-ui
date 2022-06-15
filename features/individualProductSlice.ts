import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { api } from "./api";
import { UploadDetails, FileState } from "../models/fileUploadModels";
import { REQUEST_STATUS } from "../constants/enums";


const initialState: FileState = {
  status: REQUEST_STATUS.IDLE,
  error: null,
  data: null,
};

// Get individual product
export const getIndividualProduct: any = createAsyncThunk(
    "files/getIndividualProduct",
    async (id: number, { rejectWithValue }) => {
      try {
        const response = await api.get<any>(`upload_file/product/${id}/`);
        return response.data;
      } catch (err: any) {
        if (!err.response) {
          throw err;
        }
        return rejectWithValue(err.response.data);
      }
    }
  );

export const individualProductSlice = createSlice({
    name: "individualProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Getting individual product details
      builder.addCase(getIndividualProduct.pending, (state, action) => {
        state.status = REQUEST_STATUS.LOADING;
      }),
      builder.addCase(getIndividualProduct.fulfilled, (state, action) => {
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.data = action.payload;
      }),
      builder.addCase(getIndividualProduct.rejected, (state, action) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      });
    },
});

export const productStatus = (state: RootState) => state.individualProduct.status;
export const productError = (state: RootState) => state.individualProduct.error;
export const productData = (state: RootState) => state.individualProduct.data;
export default individualProductSlice.reducer;
    