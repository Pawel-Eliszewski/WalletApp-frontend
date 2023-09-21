import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { financeReduser } from "./finance/financeSlice";
import { sessionReducer } from "./session/sessionSlice";
import { globalReducer } from "./global/globalSlice";

const sessionPersistConfig = {
  key: "session",
  storage,
  whitelist: ["token"],
};

export const store = configureStore({
  reducer: {
    session: persistReducer(sessionPersistConfig, sessionReducer),
    finance: financeReduser,
    global: globalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
