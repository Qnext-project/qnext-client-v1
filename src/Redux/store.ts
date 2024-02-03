import { configureStore } from "@reduxjs/toolkit";
import loginRedicer from "./slices/Login";
import adminReducer from "./slices/Admin";
import settingReducer from "./slices/Setting";
import generalReducer from "./slices/General";
import userReducer from "./slices/User";

const store = configureStore({
  reducer: {
    login: loginRedicer,
    admin: adminReducer,
    setting: settingReducer,
    general: generalReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
