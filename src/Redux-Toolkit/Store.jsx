import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import newUserPasswordChangeReducer from "./NewUserPasswordChangeSlice";
import { createLogger } from "redux-logger";

const logger = createLogger({
  collapsed: true,
  predicate: true,
  diff: true,
  duration: true,
  timestamp: true,
  level: console.warn,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [
    'auth',
    'newUserPasswordChange'
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
  newUserPasswordChange: newUserPasswordChangeReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(process.env.NODE_ENV === "development" ? logger : []),
});

export const persistor = persistStore(store);

export default store;
