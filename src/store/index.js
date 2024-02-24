import { configureStore } from "@reduxjs/toolkit";
import apiSliceReducer from "./slices/apiSlice";

export default configureStore({
  reducer: {
    getData: apiSliceReducer,
  }
})