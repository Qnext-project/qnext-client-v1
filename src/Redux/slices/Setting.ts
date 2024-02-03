import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/Request";
// import { toastHandler } from "../../utils/setting";

interface States {
  loading: boolean;
  tab: number;
  newDoctor: any;
  refresh: boolean;
}
const initialState = {
  loading: false,
  refresh: false,
  tab: 1,
  newDoctor: {
    first_name: "",
    last_name: "",
    expertise_id: "",
    title_id: "",
    list: [],
  },
} as States;

export const createDoctor = createAsyncThunk(
  "setting/create doctor",
  async (_, { getState }) => {
    const state = getState() as { setting: States };

    const { first_name, last_name, expertise_id, title_id } =
      state.setting.newDoctor;
    return await Axios.post("api/v1/admin/doctor", {
      first_name,
      last_name,
      expertise_id,
      title_id,
    });
  }
);

export const getDoctors = createAsyncThunk("setting/get doctor", async () => {
  return await Axios.get("api/v1/admin/doctor");
});
export const deleteDoctor = createAsyncThunk(
  "setting/delete doctor",
  async (user: string) => {
    return await Axios.delete(`api/v1/admin/doctor/${user}`);
  }
);
export const editDoctor = createAsyncThunk(
  "setting/edit doctor",
  async (user_id: string, { getState }) => {
    const state = getState() as { setting: States };

    const { first_name, last_name, expertise_id, title_id } =
      state.setting.newDoctor;
    return await Axios.put(`api/v1/admin/doctor/${user_id}`, {
      first_name,
      last_name,
      expertise_id,
      title_id,
    });
  }
);



export const setting = createSlice({
  name: "setting",
  initialState,
  reducers: {
    changeTabas: (state, { payload }) => {
      state.tab = payload;
    },
    addDRInfo: (state, { payload }) => {
      state.newDoctor[payload.key] = payload.value;
    },
    setDrInfo: (state, { payload }) => {
      for (let item in payload.info) {
        state.newDoctor[item] = payload.info[item];
      }
    },
  },
  extraReducers: (builder) => {
    //?create new doctor
    builder.addCase(createDoctor.pending, (state, {}) => {
      state.loading = true;
    });
    builder.addCase(createDoctor.fulfilled, (state, {}) => {
      state.loading = false;
      state.refresh = true;
    });
    builder.addCase(createDoctor.rejected, (state, {}) => {
      state.loading = false;
    });
    //?get doctor list
    builder.addCase(getDoctors.pending, (state, {}) => {
      state.loading = true;
    });
    builder.addCase(getDoctors.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.refresh = false;
      state.newDoctor.list = (payload as any)?.data;
    });
    builder.addCase(getDoctors.rejected, (state, {}) => {
      state.loading = false;
    });
    //?delete doctor list
    builder.addCase(deleteDoctor.pending, (state, {}) => {
      state.loading = true;
    });
    builder.addCase(deleteDoctor.fulfilled, (state, {}) => {
      state.loading = false;
      state.refresh = true;
      // state.newDoctor.list = (payload as any)?.data;
    });
    builder.addCase(deleteDoctor.rejected, (state, {}) => {
      state.loading = false;
    });
    //?edit doctor list
    builder.addCase(editDoctor.pending, (state, {}) => {
      state.loading = true;
    });
    builder.addCase(editDoctor.fulfilled, (state, {}) => {
      state.loading = false;
      state.refresh = true;
      // state.newDoctor.list = (payload as any)?.data;
    });
    builder.addCase(editDoctor.rejected, (state, {}) => {
      state.loading = false;
    });
  },
});

export const { changeTabas, addDRInfo,setDrInfo } = setting.actions;
export default setting.reducer;
