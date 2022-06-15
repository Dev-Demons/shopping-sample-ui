import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { api } from "./api";
import { UploadDetails, FileState } from "../models/fileUploadModels";
import { REQUEST_STATUS } from "../constants/enums"



/**
 * Creating Async Thunks 
 *  */
export const uploadProcess = createAsyncThunk(
  "POST:upload_file/{file_type}/",
  async (parm: UploadDetails, { rejectWithValue }) => {
    try {
      const data = new FormData();
      const file = parm.file;
      const endpoint = `upload_file/${parm.fileType}/`

      data.append("file", file[0]);
      data.append("title", parm.title);
      data.append("useship_price", parm.useship_price as Blob);
      data.append("resellship_price", parm.resellship_price as Blob);
      data.append("ownership_price", parm.ownership_price as Blob);

      const options = {
        headers: {
          "Content-Type": file.type,
        },
      }

      const response = await api.post(endpoint, data, options);
      console.log(response.data)
      return response.data;

    } catch (err: any) {
      if (!err.response) throw err;
  
      if (err.response.data.detail){
        return rejectWithValue(err.response.data.detail);
      }
      return rejectWithValue(err.response.data.file);
      
    }
  }
);

export const getAllUploadedProductFiles: any = createAsyncThunk(
  "GET:upload_file/product/all/",
  async (creds: FileState, { rejectWithValue }) => {
    try {
      const response = await api.get<any>(`upload_file/product/all/`);
      return response.data;
    } catch (err: any) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

export const getOwnedUploadedProductFiles: any = createAsyncThunk(
  "GET:upload_file/product/owned/",
  async (creds: FileState, { rejectWithValue }) => {
    try {
      const response = await api.get<any>(`upload_file/product/owned/`);
      return response.data;
    } catch (err: any) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);

export const getVideos: any = createAsyncThunk(
  "GET:upload_file/Mp4/all/",
  async (creds: FileState, { rejectWithValue }) => {
    try {
      const response = await api.get<any>(`upload_file/Mp4/all/`);
      console.log("videos data ", response.data)
      return response.data;
    } catch (err: any) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data);
    }
  }
);



/**
 * Creating File State Slice
 **/
const initialState: FileState = {
  status: REQUEST_STATUS.IDLE,
  error: null,
  data: null,
};

const caseFactory = (builder:any, thunk:any) => {
  builder
    .addCase(
      thunk.pending, 
      (state:any, action:any) => {
        state.status = REQUEST_STATUS.LOADING;
      }
    )
    .addCase(
      thunk.fulfilled,
      (state:any, action:any) => { 
        state.status = REQUEST_STATUS.SUCCEEDED;
        state.data = action.payload
      }
    )
    .addCase(
      thunk.rejected,
      (state:any, action:any) => {
        state.status = REQUEST_STATUS.FAILED;
        state.error = action.payload;
      }
    )
}

export const fileSlice = createSlice(
  {
    name: "files",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      caseFactory(builder, uploadProcess),
      caseFactory(builder, getAllUploadedProductFiles),
      caseFactory(builder, getOwnedUploadedProductFiles),
      caseFactory(builder, getVideos)
    },
  }
);

export const selectUploadStatus = (state: RootState):REQUEST_STATUS => state.files.status;
export const selectUploadError  = (state: RootState) => state.files.error;
export const selectUploadData   = (state: RootState) => state.files.data;

export const uploadStatus = (state: RootState) => state.files.status;
export const uploadError  = (state: RootState) => state.files.error;
export const uploadData   = (state: RootState) => state.files.data;

export default fileSlice.reducer;
