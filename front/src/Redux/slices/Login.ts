import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/Request";
import { toastHandler } from "../../utils/setting";
interface States {
  loading: boolean;
  userData: any;
  authorized: boolean;
  userInfo: any;
}

const initialState = {
  loading: false,
  authorized: false,
  userData: {
    username: "",
    password: "",
  },
  userInfo: {},
} as States;

export const SignInAction = createAsyncThunk(
  "auth/loginUser",
  async (_, { getState }) => {
    const state = getState() as { login: States };
    const { username, password } = state?.login?.userData;
    return await Axios.post("/api/v1/login", {
      username: username,
      password: password,
    });
  }
);

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.userData[payload?.key] = payload.value;
    },
    setUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    handleLogOut: (state) => {
      state.authorized=false
      localStorage.removeItem("token")
      
    },

    checkAuthUser: (state) => {      
      state.authorized = true;
      let storedUserInfo = localStorage.getItem("userInfo");
      const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
      state.userInfo = userInfo;
    },
  },

  extraReducers: (builder) => {
    //* login user
    builder.addCase(SignInAction.pending, (state, {}) => {
      state.loading = true;
    });
    builder.addCase(SignInAction.fulfilled, (state, { payload }) => {
      state.loading = false;
      localStorage.setItem("token", (payload as any)?.data?.token);

      localStorage.setItem(
        "userInfo",
        JSON.stringify((payload as any)?.data?.user)
      );
      localStorage.setItem(
        "clinic",
        JSON.stringify((payload as any)?.data?.clinic)
      );
      state.authorized = true;
      state.userInfo = (payload as any)?.data?.user;
      toastHandler("شما با موفقیت وارد شدین");
    });
    builder.addCase(SignInAction.rejected, (state, {}) => {
      state.loading = false;
      toastHandler("کاربر با این مشخصات یافت نشد");
    });
  },
});

export const { setUserData, setUserInfo, checkAuthUser,handleLogOut } = login.actions;
export default login.reducer;
