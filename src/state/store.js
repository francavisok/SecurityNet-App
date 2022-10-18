import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import logger from "redux-logger";
import resetedReducer from "./reseted";
import eventsGuardReducer from "./eventsGuard";
import reportReducer from "./reports";

const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  reducer: {
    user: userReducer,
    reseted: resetedReducer,
    eventsGuard: eventsGuardReducer,
    report: reportReducer,
  },
});

export default store;
