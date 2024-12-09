import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import { authApi } from "../../../app/identify-and-access-context/services/authSlice"
import { productsApi } from "../../../app/product-context/services/productsSlice"
import { ordersApi } from "../../../app/order-context/services/orderSlice"
import { ikonkaApi } from "../../../app/product-context/services/ikonkaSlice"
import { categoryApi } from "../../../app/category-context/services/categorySlice"
import userReducer from "../../../app/identify-and-access-context/services/userSlice"
import { customersApi } from "../../../app/customer-context/services/customerSlice"

//import { createFilter } from "redux-persist-transform-filter"

//const userDataSubsetFilter = createFilter("userSlice", ["userId", "name", "surname"])

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  //  transforms: [userDataSubsetFilter],
}

const reducers = combineReducers({
  authApi: authApi.reducer,
  productsApi: productsApi.reducer,
  customersApi: customersApi.reducer,
  ordersApi: ordersApi.reducer,
  ikonkaApi: ikonkaApi.reducer,
  categoryApi: categoryApi.reducer,
  user: userReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([authApi.middleware, productsApi.middleware, customersApi.middleware, ordersApi.middleware, ikonkaApi.middleware, categoryApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)
