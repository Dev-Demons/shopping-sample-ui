// External Imports
import {toast} from "react-toastify";
import {
  createSlice,
  PayloadAction,
  createAsyncThunk
} from "@reduxjs/toolkit";


// Internal Imports
import type {RootState}              from "./store";
import {api, CommonHeaderProperties} from "./api";
import { REQUEST_STATUS }            from "../constants/enums"

import * as tokenService from "../local_storage/token"
import * as userService  from "../local_storage/user"

import {
  UserState, 
  LoginCredentials, 
  Token, 
  UserDataForm,
  UserData, 
  ChangePassword
} from "../models/userModels";

const TOAST_TIMEOUT = 1000 // ms
const LOGIN_SUCESS_MESSAGE = "Login Was Successful"
const LOGIN_FAILURE_MESSAGE = "Login has failed"

toast.configure();



// Get User Data
export const getOwnUser: any = createAsyncThunk(
  "GET:users/update",
  async (parameters: any, {rejectWithValue, fulfillWithValue}) => {
    const endpoint = "users/update/"

    try {
      const response = await api.get<UserData>(endpoint);

      let gender = response.data.gender
      let first_character  = gender.charAt(0).toUpperCase()
      let second_character = gender.slice(1)
      response.data.gender = first_character + second_character

      console.log("GET:users/update", response.data)
      return fulfillWithValue(response.data);
    } catch (error: any) {

      if (!error.response) throw error;

      return rejectWithValue(
        error
          .response
          .data
          .non_field_errors
      );
    }
  }
);

// Change Password
export const changePassword: any = createAsyncThunk(
  "PATCH:users/changepassword",
  async (credentials: ChangePassword, {rejectWithValue}) => {
    try {
      // Prepare Request
      const endpoint:string = "users/changepassword/"
      const payload = {
        current_password: credentials.current_password,
        new_password: credentials.new_password,
      }

      // Send Request
      const response = await api.patch<ChangePassword>(endpoint, payload);
      return response.data;

    } catch (err: any) {

      if (!err.response) throw err;

      return rejectWithValue(
        err
          .response
          .data
          .non_field_errors
      );
    }
  }
);

// Get User Data
export const updateUser: any = createAsyncThunk(
  "PUT:users/update",
  async (data: UserDataForm, {rejectWithValue}) => {
    try {
      // Prepare Request
      const endpoint:string = "users/update/"
      const payload = {
        display_name: data.display_name,
        gender: data.gender.toLowerCase(),
        phone_number: data.phone_number,
      }

      // Send Request
      const response = await api.put<UserDataForm>(endpoint, payload);
      return response.data;

    } catch (err: any) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data.non_field_errors);
    }
  }
);

// Login
export const loginUser: any = createAsyncThunk(
  "POST:users/login",
  async (creds: LoginCredentials, {rejectWithValue}) => {
    try {
      // Prepare Request
      const endpoint:string = "users/login/"
      const payload = {
        email: creds.email,
        password: creds.password,
        role: creds.role,
      }

      // Send HTTP Request
      const response = await api.post<Token>(endpoint, payload);

      // Write to Local Storage
      tokenService.setToken(response.data.token);
      userService.setUser(JSON.stringify(response.data));

      toast.success(LOGIN_SUCESS_MESSAGE, { autoClose: TOAST_TIMEOUT });
      return response.data;

    } catch (err: any) {

      if (!err.response) throw err;

      toast.error(LOGIN_FAILURE_MESSAGE, { autoClose: TOAST_TIMEOUT });

      return rejectWithValue(
        err
          .response
          .data
          .non_field_errors
      );
    }
  }
);

// Logout
export const logoutUser: any = createAsyncThunk(
  "POST:users/logout",
  async (params:any, {rejectWithValue}) => {

    // Prepare Request
    const endpoint:string = "users/logout/"
    const payload = {}

    try {
      // Send Request
      const response = await api.post<any>(endpoint, payload);

      // Write to Local Storage
      tokenService.removeToken();
      userService.removeUser();

      window.location.replace('/');
      return response.data;

    } catch (error: any) {

      if (!error.response) throw error;
      
      return rejectWithValue(
        error
          .response
          .data
          .non_field_errors
      );
    }
  }
);

// Consumer registration
export const consumerRegistration: any = createAsyncThunk(
  "POST:users/register/consumer/",
  async (creds: LoginCredentials, {rejectWithValue}) => {
    try {
      // Prepare Request
      const endpoint:string = "users/register/consumer/"
      const payload = {
        email: creds.email,
        password: creds.password,
      }

      // Send Request
      const response = await api.post<any>(endpoint, payload);

      return response.data;
    } catch (err: any) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data.email);
    }
  }
);

// Register Producer
export const producerRegistration: any = createAsyncThunk(
  "POST:users/register/producer/",
  async (credentials: LoginCredentials, {rejectWithValue}) => {

    // Prepare Request
    const endpoint:string = "users/register/producer/"
    const payload = {
      email: credentials.email,
      password: credentials.password,
    }

    try {
      const response = await api.post<any>(endpoint, payload);
      return response.data;
    } catch (err: any) {
      if (!err.response) throw err;
      return rejectWithValue(err.response.data.email);
    }
  }
);

export const paymentProcess = createAsyncThunk(
  "POST:payment/save-stripe-info",
  async (parm: any, {rejectWithValue}) => {
    // Prepare Request
    const endpoint:string = "payment/save-stripe-info//"
    const payload = parm

    try {
      const response = await api.post(endpoint, payload);
      console.log("paymentProcess thunk data:", response.data);
      return response.data;
    } catch (err: any) {
      console.log("paymentProcess thunk error:", err);
      return rejectWithValue(err.response.data);
    }
  }
);

// Login using google
export const googleUserLogin = createAsyncThunk(
  "POST:users/rest-auth/google/",
  async (accesstoken: number, {rejectWithValue}) => {
    const endpoint:string = "users/rest-auth/google/"
    const payload = {
      access_token: accesstoken,
    }
    try {
      const response = await api.post(endpoint, payload);

      api.defaults.headers = {
        Authorization: "Token " + response.data.token,
      } as CommonHeaderProperties;

      localStorage.setItem("token", response.data.token);

      return response.data;
    } catch (err: any) {
      console.log("googleUserLogin thunk error", err);
      return rejectWithValue(err.response.data);
    }
  }
);

// Register Vendor
export const vendorRegistration: any = createAsyncThunk(
  "user/vendorRegistration",
  async (creds: LoginCredentials, {rejectWithValue}) => {
    try {
      const response = await api.post<any>("users/register/vendor/", {
        email: creds.email,
        password: creds.password,
      });
      return response.data;
    } catch (err: any) {
  
      if (!err.response) throw err;

      return rejectWithValue(
        err
          .response
          .data
          .email
      );
    }
  }
);

//Get User Info
export const getUserInfo: any = createAsyncThunk(
  "user/load-user",
  async (params: any, {rejectWithValue}) => {
    try {
      const response = await api.get<any>("users/load-user/");
      return response.data;
    } catch (err: any) {

      if (!err.response) throw err;

      return rejectWithValue(
        err
          .response
          .data
          .non_field_errors
      );
    }
  }
);


// User Slice
const initialState: UserState = {
  role: null,
  email: null,
  status: REQUEST_STATUS.IDLE,
  error: null,
  data: {} as UserData
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //Login User
    builder
      .addCase(
        loginUser.pending, 
        state => {
          state.status = REQUEST_STATUS.LOADING;
        }
      )
      .addCase(
        loginUser.fulfilled,
        (state, action) => {
          state.status = REQUEST_STATUS.SUCCEEDED;
          state.email = action.payload.email;
        }
      )
      .addCase(
        loginUser.rejected, 
        (state, action) => {
          state.status = REQUEST_STATUS.FAILED;
          state.error = action.payload;
        }
      ),

    //Get User Info
    builder
      .addCase(
        getUserInfo.pending,
        state => {
          state.status = REQUEST_STATUS.LOADING;
        }
      )
      .addCase(
        getUserInfo.fulfilled,
        (state, action) => {
          state.status = REQUEST_STATUS.SUCCEEDED;
        }
      )
      .addCase(
        getUserInfo.rejected,
        (state, action) => {
          state.status = REQUEST_STATUS.FAILED;
          state.error = action.payload;
        }
      ),
    
    //Get OwnUser Info
    builder
      .addCase(
        getOwnUser.pending,
        state => {
          state.status = REQUEST_STATUS.LOADING;
        }
      )
      .addCase(
        getOwnUser.fulfilled,
        (state, action) => {
          state.status = REQUEST_STATUS.GETOWNSTATE;
          state.data = action.payload;
        }
      )
      .addCase(
        getOwnUser.rejected,
        (state, action) => {
          state.status = REQUEST_STATUS.FAILED;
          state.error = action.payload;
        }
      ),

    // Register Consumer
    builder
      .addCase(
        consumerRegistration.pending,
        state => {
          state.status = REQUEST_STATUS.LOADING;
        }
      )
      .addCase(
        consumerRegistration.fulfilled, 
        (state, action) => {
          state.status = REQUEST_STATUS.SUCCEEDED;
          state.email = action.payload.email;
        }
      )
      .addCase(
        consumerRegistration.rejected,
        (state, action) => {
          state.status = REQUEST_STATUS.FAILED;
          state.error = action.payload;
        }
      ),

    //Register Producer
    builder
      .addCase(
        producerRegistration.pending, 
        state => {
          state.status = REQUEST_STATUS.LOADING;
        }
      )
      .addCase(
        producerRegistration.fulfilled, 
        (state, action) => {
          state.status = REQUEST_STATUS.SUCCEEDED;
          state.email = action.payload.email;
        }
      )
      .addCase(
        producerRegistration.rejected,
        (state, action) => {
          state.status = REQUEST_STATUS.FAILED;
          state.error = action.payload;
        }
      ),

    // Boilerplate for Stripe payment
    builder
      .addCase(
        paymentProcess.pending,
        (state, action) => {
          state.status = REQUEST_STATUS.LOADING;
        }
      )
      .addCase(
        paymentProcess.fulfilled, 
        (state, action) => {
          state.status = REQUEST_STATUS.SUCCEEDED;
        }
      )
      .addCase(
        paymentProcess.rejected,
        (state, action) => {
          state.status = REQUEST_STATUS.FAILED;
          state.error = action.payload;
        }
      ),

    // Google login
    builder
      .addCase(
        googleUserLogin.pending,
        (state, action) => {
          state.status = REQUEST_STATUS.LOADING;
        }
      )
      .addCase(
        googleUserLogin.fulfilled, 
        (state, action) => {
          state.status = REQUEST_STATUS.SUCCEEDED;
          state.email = action.payload.email;
        }
      )
      .addCase(
        googleUserLogin.rejected, 
        (state, action) => {
          state.status = REQUEST_STATUS.FAILED;
          state.error = action.payload;
        }
      );

    // Register vendor
    builder
      .addCase(
        vendorRegistration.pending, 
        state => {
          state.status = REQUEST_STATUS.LOADING;
        }
      )
      .addCase(
        vendorRegistration.fulfilled,
        (state, action) => {
          state.status = REQUEST_STATUS.SUCCEEDED;
          state.email = action.payload.email;
        }
      )
      .addCase(
        vendorRegistration.rejected,
        (state, action) => {
          state.status = REQUEST_STATUS.FAILED;
          state.error = action.payload;
        }
      )
  }
});



export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserError = (state: RootState) => state.user.error;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserData = (state: RootState) => state.user.data;


export const uStatus = (state: RootState) => state.user.status;
export const uError = (state: RootState) => state.user.error;
export const uEmail = (state: RootState) => state.user.email;
export const uData = (state: RootState) => state.user.data;
export default userSlice.reducer;
