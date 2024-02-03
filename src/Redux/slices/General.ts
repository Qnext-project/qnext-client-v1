import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/Request";

interface States {
  loading: boolean;
  refresh: boolean;
  voiceList: [];
  name: string;
  fullScreen: boolean;
  voiceFile: any;
  voiceType: string;
}
const initialState = {
  loading: false,
  refresh: false,
  voiceList: [],
  name: "",
  fullScreen: false,
  voiceFile: null,
  voiceType: "doctor",
} as States;

//? voice
export const VoiceList = createAsyncThunk(
  "general/voice list",
  async (type: string) => {
    //    const state = getState() as { general: States };
    return await Axios.get(`api/v1/admin/media/${type}`);
  }
);
export const deleteleVoice = createAsyncThunk(
  "general/voice delete",
  async (media_id: string) => {
    //    const state = getState() as { general: States };
    return await Axios.get(`api/v1/admin/media/${media_id}`);
  }
);

//? clinic
export const EditClinicName = createAsyncThunk(
  "general/EditClinicName",
  async (_, { getState }) => {
    const state = getState() as { general: States };
    const { name } = state.general;
    return await Axios.post(`api/v1/admin/clinic/edit`, {
      name,
    });
  }
);

export const general = createSlice({
  name: "general",
  initialState,
  reducers: {
    getClinicName: (state, { payload }) => {
      state.name = payload;
    },

    changeFullScreen: (state, { payload }) => {
      state.fullScreen = payload;
    },

    setVoiceType: (state, { payload }) => {
      state.voiceType = payload;
      state.refresh = true;
    },
  },

  extraReducers: (builder) => {
    //? voice list
    builder.addCase(VoiceList.pending, (state, {}) => {
      state.loading = true;
    });
    builder.addCase(VoiceList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.refresh = false;
      state.voiceList = (payload as any)?.data;
    });
    builder.addCase(VoiceList.rejected, (state, {}) => {
      state.loading = false;
    });

    builder.addCase(deleteleVoice.pending, (state, {}) => {
      state.loading = true;
    });
    builder.addCase(deleteleVoice.fulfilled, (state, {}) => {
      state.loading = false;
      state.refresh = true;
    });
    builder.addCase(deleteleVoice.rejected, (state, {}) => {
      state.loading = false;
    });
    //? clicnic name

    builder.addCase(EditClinicName.pending, (state, {}) => {
      state.loading = true;
    });
    builder.addCase(EditClinicName.fulfilled, (state, { payload }) => {
      state.loading = false;

      state.name = (payload as any)?.data?.name;

      localStorage.setItem("clinic", JSON.stringify((payload as any)?.data));
    });
    builder.addCase(EditClinicName.rejected, (state, {}) => {
      state.loading = false;
    });
  },
});

export const { getClinicName, changeFullScreen, setVoiceType } =
  general.actions;
export default general.reducer;
