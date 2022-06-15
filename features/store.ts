import { configureStore } from "@reduxjs/toolkit";

// Internal Imports
import fileReducer from "./fileSlice";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice";
import individualProductReducer from "./individualProductSlice";
import shoppingReducer from "./shoppingSlice";

export const store = configureStore(
  {
    reducer: {
      user: userReducer,
      files: fileReducer,
      uiState: uiReducer,
      individualProduct: individualProductReducer,
      shopping: shoppingReducer,
    },
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
