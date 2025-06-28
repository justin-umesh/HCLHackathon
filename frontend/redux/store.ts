// import logger from "redux-logger";
import { baseSliceAPI } from "../utils/api/base-slice";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    [baseSliceAPI.reducerPath]: baseSliceAPI.reducer,
  },
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(baseSliceAPI.middleware),
  // .concat(logger),
});

export default store;
