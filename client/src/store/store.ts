import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { brandAPI } from "../service/BrandService";
import { orderAPI } from "../service/OrderService";
import { productAPI } from "../service/ProductService";

import authReducer from "./reducers/AuthSlice";

const rootReducer = combineReducers({
  [productAPI.reducerPath]: productAPI.reducer,
  [orderAPI.reducerPath]: orderAPI.reducer,
  [brandAPI.reducerPath]: brandAPI.reducer,
  authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(productAPI.middleware)
        .concat(orderAPI.middleware)
        .concat(brandAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
