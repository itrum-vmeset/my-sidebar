import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { brandAPI } from "../service/BrandService";
import { categoryAPI } from "../service/CategoryService";
import { cityAPI } from "../service/CityService";
import { clientAPI } from "../service/ClientsService";
import { orderAPI } from "../service/OrderService";
import { productAPI } from "../service/ProductService";
import { protocolCategoriesAPI } from "../service/ProtocolCategoriesService";
import { protocolAPI } from "../service/ProtocolsService";
import { subCategoryAPI } from "../service/SubCategoryService";

import authReducer from "./reducers/AuthSlice";

const rootReducer = combineReducers({
  [productAPI.reducerPath]: productAPI.reducer,
  [orderAPI.reducerPath]: orderAPI.reducer,
  [brandAPI.reducerPath]: brandAPI.reducer,
  [categoryAPI.reducerPath]: categoryAPI.reducer,
  [subCategoryAPI.reducerPath]: subCategoryAPI.reducer,
  [clientAPI.reducerPath]: clientAPI.reducer,
  [protocolCategoriesAPI.reducerPath]: protocolCategoriesAPI.reducer,
  [protocolAPI.reducerPath]: protocolAPI.reducer,
  [cityAPI.reducerPath]: cityAPI.reducer,
  authReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(productAPI.middleware)
        .concat(orderAPI.middleware)
        .concat(brandAPI.middleware)
        .concat(categoryAPI.middleware)
        .concat(subCategoryAPI.middleware)
        .concat(clientAPI.middleware)
        .concat(protocolCategoriesAPI.middleware)
        .concat(protocolAPI.middleware)
        .concat(cityAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
