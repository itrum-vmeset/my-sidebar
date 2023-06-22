import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { bannerAPI } from "../../services/BannerService";
import { brandAPI } from "../../services/BrandService";
import { categoryAPI } from "../../services/CategoryService";
import { cityAPI } from "../../services/CityService";
import { clientAPI } from "../../services/ClientsService";
import { orderAPI } from "../../services/OrderService";
import { productAPI } from "../../services/ProductService";
import { promocodeAPI } from "../../services/PromocodeService";
import { protocolCategoriesAPI } from "../../services/ProtocolCategoriesService";
import { protocolAPI } from "../../services/ProtocolsService";
import { seminarAPI } from "../../services/SeminarService";
import { subCategoryAPI } from "../../services/SubCategoryService";

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
  [seminarAPI.reducerPath]: seminarAPI.reducer,
  [bannerAPI.reducerPath]: bannerAPI.reducer,
  [promocodeAPI.reducerPath]: promocodeAPI.reducer,
  authReducer,
});

export const setupStore = (initialState = {}) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: { authReducer: initialState as any },
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
        .concat(cityAPI.middleware)
        .concat(seminarAPI.middleware)
        .concat(bannerAPI.middleware)
        .concat(promocodeAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
