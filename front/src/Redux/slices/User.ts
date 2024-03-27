import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/Request";
import { toastHandler } from "../../utils/setting";

interface States {
  loading: boolean;
  userInfo: any;
  allow: boolean;
  userData: any;
  turn: number;
}
const initialState = {
  loading: false,
  allow: false,
  userInfo: "",
  turn: 0,
  userData: {
    user_id: "",
    room_id: "",
  },
} as States;

export const getUserData = createAsyncThunk(
  "user/get data",

  async (_, { getState }) => {
    const state = getState() as { user: States };

    const { user_id, room_id } = state.user.userData;
    return await Axios.get(`api/v1/admin/doctor/${user_id}/${room_id}`);
  }
);

export const turnHandler = createAsyncThunk(
  "user/turn hander",
  async (turn_number: number) => {
    return await Axios.post("api/v1/admin/doctor/turn", { turn_number });
  }
);

export const freeRoom = createAsyncThunk("user/free room", async () => {
  return await Axios.post("api/v1/admin/doctor/purge");
});

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, { payload }) => {
      state.userData[payload.key] = payload.value;
    },
    exitTurnRating: (state) => {
      state.allow = false;
    },
  },
  extraReducers: (builder) => {
    //!get user data
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.allow = true;
      state.userInfo = (payload as any)?.data;
    });
    builder.addCase(getUserData.rejected, (state) => {
      state.loading = false;
      state.allow = false;
      toastHandler("اتاق مورد قبلا در دسترس نست");
    });
    //!turn handler
    builder.addCase(turnHandler.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(turnHandler.fulfilled, (state, { payload }) => {
      state.loading = false;
      // state.allow = true;
      state.userInfo = (payload as any)?.data;
      console.log(payload);
    });
    builder.addCase(turnHandler.rejected, (state) => {
      state.loading = false;
      state.allow = false;
      toastHandler("خطایی رخ داده است");
    });
    //!free handler
    builder.addCase(freeRoom.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(freeRoom.fulfilled, (state) => {
      state.loading = false;
      state.allow = false;
 
    });
    builder.addCase(freeRoom.rejected, (state) => {
      state.loading = false;
      state.allow = false;
      toastHandler("خطایی رخ داده است");
    });
  },
});

export const { setUserData, exitTurnRating } = user.actions;
export default user.reducer;
