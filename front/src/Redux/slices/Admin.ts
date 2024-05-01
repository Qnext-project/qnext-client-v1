import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../utils/Request";
import { toastHandler } from "../../utils/setting";
// import { toastHandler } from "../../utils/setting";

interface States {
  loading: boolean;
  tab: number;
  doctors: [];
  detailSection: number;
  newUser: any;
  refresh: boolean;
  expertiseTitle: any;
  room: any;
  queueDt: any;
  activeQueueCard: any;
  floor: any;
}
const initialState = {
  loading: false,
  refresh: false,
  tab: 1,
  doctors: [],
  detailSection: 1,
  newUser: {
    username: "",
    password: "",
    acl: [],
  },
  expertiseTitle: {
    name: "",
    media_id: 0,
    list: [],
    listTitle: [],
    listExp: [],
  },
  room: {
    name: "",
    number: "",
    media_id: "",
    list: [],
  },
  queueDt: {
    loading: true,
    data: [],
    AllAudios: [],
  },
  floor: {
    name: "",
    list: [],
  },
  activeQueueCard: null,
} as States;

export const DoctorList = createAsyncThunk("admin/list", async () => {
  return await Axios.get("api/v1/admin/list/full");
});

export const CreateNewUser = createAsyncThunk(
  "admin/createNewUser",
  async (_, { getState }) => {
    const state = getState() as { admin: States };
    const { username, password, acl } = state?.admin?.newUser;
    let password_confirmation = password;
    return await Axios.post("api/v1/admin/doctor", {
      username,
      password,
      password_confirmation,
      acl,
    });
  }
);

export const DeleteUser = createAsyncThunk(
  "admin/ delete user",
  async (doctor_id: string) => {
    return await Axios.delete(`api/v1/admin/doctor/${doctor_id}`);
  }
);

export const EditUser = createAsyncThunk(
  "admin/ edit user",

  async (doctor_id: string, { getState }) => {
    const state = getState() as { admin: States };
    const { username, password, acl } = state?.admin?.newUser;
    let password_confirmation = password;
    return await Axios.put(`api/v1/admin/doctor/${doctor_id}`, {
      username,
      password,
      password_confirmation,
      acl,
    });
  }
);

//*EXP

export const createExpTitle = createAsyncThunk(
  "admin/exp title",
  async (is_title: boolean, { getState }) => {
    const state = getState() as { admin: States };
    const { name, media_id } = state?.admin.expertiseTitle;
    return await Axios.post("api/v1/admin/expertise", {
      is_title: is_title,
      name,
      media_id,
    });
  }
);
export const getExpTitleList = createAsyncThunk(
  "admin/get expertise title list",
  async () => {
    return await Axios.get("api/v1/admin/expertise");
  }
);
export const deleteExpertise = createAsyncThunk(
  "admin/ delete expertise",
  async (expertise: string) => {
    return await Axios.delete(`api/v1/admin/expertise/${expertise}`);
  }
);
export const EditExpTitle = createAsyncThunk(
  "admin/edit expertise title",
  async (
    { expertise_id, is_title }: { expertise_id: string; is_title: boolean },
    { getState }
  ) => {
    const state = getState() as { admin: States };
    const { name, media_id } = state?.admin.expertiseTitle;
    return await Axios.put(`api/v1/admin/expertise/${expertise_id}`, {
      is_title: is_title,
      name,
      media_id,
    });
  }
);

export const createNewRoom = createAsyncThunk(
  "admin/ new room",
  async (floor_id: string, { getState }) => {
    const state = getState() as { admin: States };

    const { name, number, media_id } = state.admin.room;
    return await Axios.post("api/v1/admin/room", {
      name,
      number,
      media_id,
      floor_id,
    });
  }
);
export const getRoomList = createAsyncThunk("admin/get room list", async () => {
  return await Axios.get("api/v1/admin/room");
});

export const deleteRoom = createAsyncThunk(
  "admin/room delete",
  async (room: string) => {
    return await Axios.delete(`api/v1/admin/room/${room}`);
  }
);
export const editRoom = createAsyncThunk(
  "admin/room edit",
  async (
    { room_id, floor_id }: { room_id: string; floor_id: string },
    { getState }
  ) => {
    const state = getState() as { admin: States };
    const { name, number, media_id } = state.admin.room;

    return await Axios.put(`api/v1/admin/room/${room_id}`, {
      name,
      number,
      media_id,
      floor_id,
    });
  }
);

export const getAdminsListWithDoctor = createAsyncThunk(
  "admin/getAdminList",
  async (floor_id: string, { getState, dispatch }) => {
    const getstate = getState() as { admin: States };
    return await Axios.get(`api/v1/admin/list/queue/${floor_id}`).then(
      (res) => {
        const differentData = getstate.admin?.queueDt?.data?.filter(
          (dt: any) =>
            !res?.data?.some(
              (dt2: any) =>
                dt?.current_turn_number === dt2?.current_turn_number &&
                dt2?.current_turn_number != null
            )
        );
        // console.log(differentData.every((item: any) => item !== null));

        // if (differentData?.length > 0) {
        //   console.log("here")
        //   console.log(differentData)
          
        //   if (differentData.filter((item: any) => item != null)) {
        //     console.log(differentData);

        //     dispatch(getDocVoice(differentData));
        //   }
        // }
           const filteredDifferentData = differentData.filter((item: any) => item !== null);

        console.log(filteredDifferentData.every((item: any) => item !== null));

        if (filteredDifferentData.length > 0) {
          console.log("here");
          console.log(filteredDifferentData);

          // No need to check for null items again here
          dispatch(getDocVoice(filteredDifferentData));
        }
        return res;
      }
    );
  }
);

export const getDocVoice = createAsyncThunk(
  "admin/getDocVoice",
  async (dt: any, { dispatch }) => {
    console.log(dt);

    for (const data of dt) {
      let audios: any[] = [];
      dispatch(setActiveQueueCard(data?.id)); // comment this later
      console.log(data);

      await Axios.post("api/v1/admin/doctor/turn/voice", data).then(
        async (res) => {
          console.log(res.data);

          res?.data["num"]?.url ? audios.push(res?.data["num"]?.url) : null;
          res?.data["numbers"]?.map((n: any) =>
            n?.url ? audios.push(n?.url) : null
          );
          res?.data["room"]?.url ? audios.push(res?.data["room"]?.url) : null;
          res?.data["room_num"]?.url
            ? audios.push(res?.data["room_num"]?.url)
            : null;
          res?.data["title"]?.url ? audios.push(res?.data["title"]?.url) : null;
          res?.data["expertise"]?.url
            ? audios.push(res?.data["expertise"]?.url)
            : null;

          let prevData = JSON.parse(localStorage.getItem("audios")!) ?? [];
          let datatoadd = { id: data?.id, audios };
          prevData?.push(datatoadd);
          localStorage.setItem("audios", JSON.stringify(prevData));
          dispatch(setActiveQueueCard(null));
        }
      );
    }
  }
);

//! floor
export const createNewFloor = createAsyncThunk(
  "admin/new floor",
  async (_, { getState }) => {
    const state = getState() as { admin: States };

    const { name } = state.admin.floor;
    return await Axios.post("api/v1/admin/floors", {
      name,
    });
  }
);
export const getFloorList = createAsyncThunk("admin/floor list", async () => {
  return await Axios.get("api/v1/admin/floors");
});

export const deleteFloor = createAsyncThunk(
  "admin/Floor delete",
  async (floor_id: string) => {
    return await Axios.delete(`api/v1/admin/floors/${floor_id}`);
  }
);

export const editFloor = createAsyncThunk(
  "admin/floor edit",
  async (floor_id: string, { getState }) => {
    const state = getState() as { admin: States };
    const { name } = state.admin.floor;

    return await Axios.put(`api/v1/admin/floors/${floor_id}`, {
      name,
    });
  }
);

//!exit room
export const purgeUser = createAsyncThunk(
  "admin/userPurge",
  async (user_id: string) => {
    return await Axios.post(`api/v1/admin/doctor/purge/user`, {
      user_id,
    });
  }
);

export const admin = createSlice({
  name: "admin",
  initialState,
  reducers: {
    changeTabas: (state, { payload }) => {
      state.tab = payload;
    },
    changeSection: (state, { payload }) => {
      state.detailSection = payload;
    },
    addNewUserInfo: (state, { payload }) => {
      if (payload.key !== "acl") {
        state.newUser[payload.key] = payload.value;
      } else {
        state.newUser[payload.key] = payload.value;
      }
    },
    setActiveQueueCard: (state, { payload }) => {
      state.activeQueueCard = payload;
    },
    setAllAudios: (state, { payload }) => {
      state.queueDt.AllAudios = payload;
    },
    setUserInfo: (state, { payload }) => {
      for (let item in payload.info) {
        if (item === "user_acl") {
          state.newUser.acl = payload.info[item];
        } else {
          state.newUser[item] = payload.info[item];
        }
      }
    },
    setExpInfo: (state, { payload }) => {
      for (let item in payload.info) {
        state.expertiseTitle[item] = payload.info[item];
      }
    },
    addExpTitleInfo: (state, { payload }) => {
      state.expertiseTitle[payload.key] = payload.value;
    },
    addRoomInfo: (state, { payload }) => {
      state.room[payload.key] = payload.value;
    },
    setRoomInfo: (state, { payload }) => {
      for (let item in payload.info) {
        state.room[item] = payload.info[item];
      }
    },

    setFloorInfo: (state, { payload }) => {
      state.floor[payload.key] = payload.value;
    },
  },
  extraReducers: (builder) => {
    //? list of doctors
    builder.addCase(DoctorList.pending, (state, {}) => {
      state.loading = true;
    });
    builder.addCase(DoctorList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.doctors = (payload as any)?.data;
      state.refresh = false;
    });
    builder.addCase(DoctorList.rejected, (state, {}) => {
      state.loading = false;
    });

    // ? create new user
    builder.addCase(CreateNewUser.pending, (state, {}) => {
      state.loading = true;
    });
    builder.addCase(CreateNewUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.doctors = (payload as any)?.data;
      state.refresh = true;
    });
    builder.addCase(CreateNewUser.rejected, (state, {}) => {
      state.loading = false;
    });

    // ? delete new user
    builder.addCase(DeleteUser.pending, (state, {}) => {
      state.loading = false;
    });
    builder.addCase(DeleteUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.doctors = (payload as any)?.data;
      state.refresh = true;
    });
    builder.addCase(DeleteUser.rejected, (state, {}) => {
      state.loading = false;
    });

    // ? edit new user
    builder.addCase(EditUser.pending, (state, {}) => {
      state.loading = false;
    });
    builder.addCase(EditUser.fulfilled, (state, {}) => {
      state.loading = false;
      state.refresh = true;
    });
    builder.addCase(EditUser.rejected, (state, {}) => {
      state.loading = false;
    });

    //?admin/create exp title
    builder.addCase(createExpTitle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createExpTitle.fulfilled, (state, {}) => {
      state.loading = false;
      state.refresh = true;
    });
    builder.addCase(createExpTitle.rejected, (state, {}) => {
      state.loading = false;
    });

    //?admin/get exp title
    builder.addCase(getExpTitleList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getExpTitleList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.refresh = false;
      state.expertiseTitle.list = (payload as any).data;
      let allList = (payload as any).data;
      state.expertiseTitle.listTitle = allList.filter(
        (item: any) => item.is_title === true
      );
      state.expertiseTitle.listExp = allList.filter(
        (item: any) => item.is_title === false
      );
    });
    builder.addCase(getExpTitleList.rejected, (state, {}) => {
      state.loading = false;
    });

    //? delete expertise
    builder.addCase(deleteExpertise.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteExpertise.fulfilled, (state) => {
      state.loading = false;
      state.refresh = true;
    });
    builder.addCase(deleteExpertise.rejected, (state) => {
      state.loading = false;
    });
    //!? edit expertise
    builder.addCase(EditExpTitle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(EditExpTitle.fulfilled, (state) => {
      state.loading = false;
      state.refresh = true;
    });
    builder.addCase(EditExpTitle.rejected, (state) => {
      state.loading = false;
    });
    //! create ROOM
    builder.addCase(createNewRoom.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewRoom.fulfilled, (state) => {
      state.loading = false;
      state.refresh = true;
    });
    builder.addCase(createNewRoom.rejected, (state) => {
      state.loading = false;
    });
    //! get room list
    builder.addCase(getRoomList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRoomList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.refresh = false;
      state.room.list = (payload as any)?.data;
    });
    builder.addCase(getRoomList.rejected, (state) => {
      state.loading = false;
    });

    //! delete room
    builder.addCase(deleteRoom.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteRoom.fulfilled, (state) => {
      state.loading = false;
      state.refresh = true;
    });
    builder.addCase(deleteRoom.rejected, (state) => {
      state.loading = false;
    });
    //! edit room
    builder.addCase(editRoom.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editRoom.fulfilled, (state) => {
      state.loading = false;
      state.refresh = true;
    });
    builder.addCase(editRoom.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getAdminsListWithDoctor.pending, (state, {}) => {
      state.queueDt.loading = true;
    });
    builder.addCase(getAdminsListWithDoctor.fulfilled, (state, { payload }) => {
      state.queueDt.loading = false;
      console.log((payload as any)?.data);

      state.queueDt.data = (payload as any)?.data;
    });
    builder.addCase(getAdminsListWithDoctor.rejected, (state, {}) => {
      state.queueDt.loading = false;
    });

    // ? floor
    builder.addCase(createNewFloor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewFloor.fulfilled, (state) => {
      state.loading = false;
      state.refresh = true;
    });
    builder.addCase(createNewFloor.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(getFloorList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFloorList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.refresh = false;
      state.floor.list = (payload as any)?.data;
    });
    builder.addCase(getFloorList.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(deleteFloor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFloor.fulfilled, (state) => {
      state.loading = false;
      state.refresh = true;
      toastHandler("با موفقیت حذف شد");
    });
    builder.addCase(deleteFloor.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(editFloor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editFloor.fulfilled, (state) => {
      state.loading = false;
      state.refresh = true;
      toastHandler("با موفقیت انجام شد");
    });
    builder.addCase(editFloor.rejected, (state) => {
      state.loading = false;
    });

    //?exit room

    builder.addCase(purgeUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(purgeUser.fulfilled, (state) => {
      state.loading = false;
      toastHandler(" خروج با موفقیت انجام شد");
    });
    builder.addCase(purgeUser.rejected, (state) => {
      state.loading = false;
      toastHandler("خطایی رخ داده است مجدد تلاش کنید");
    });
  },
});

export const {
  changeTabas,
  changeSection,
  addNewUserInfo,
  setUserInfo,
  addExpTitleInfo,
  setExpInfo,
  addRoomInfo,
  setRoomInfo,
  setActiveQueueCard,
  setAllAudios,
  setFloorInfo,
} = admin.actions;
export default admin.reducer;
