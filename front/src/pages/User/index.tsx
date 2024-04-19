import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import logo from "../../assets/images/logoEn.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
import { reactRouts } from "../../utils/reactRouts";
import { useDispatch, useSelector } from "react-redux";
import { DoctorList, getRoomList } from "../../Redux/slices/Admin";
import { getDoctors } from "../../Redux/slices/Setting";
import {
  getUserData,
  setCheckBoxValue,
  setUserData,
} from "../../Redux/slices/User";
const User: React.FC = () => {
  const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const navigate: (to: string) => void = useNavigate();

  const homeBtn: () => void = () => {
    navigate(reactRouts.home);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(getRoomList());
    dispatch<any>(getDoctors());
  }, []);

  const { room }: { room: any } = useSelector((state: any) => state.admin);
  const { newDoctor }: { newDoctor: any } = useSelector(
    (state: any) => state.setting
  );

  const {
    loading,
    allow,
    userData,
    checkBox,
  }: { loading: boolean; allow: boolean; userData: any; checkBox: boolean } =
    useSelector((state: any) => state.user);

  const Enterhandler: () => void = () => {
    dispatch<any>(getUserData());
  };
  useEffect(() => {
    if (allow) {
      navigate(reactRouts.user.turn_rating);
    }
  }, [allow]);

  const checkBoxHandler = () => {
    let savedUser = localStorage.getItem("userData");
    if (savedUser == null) {
      if (userData?.user_id !== null) {
        if (userData?.room_id !== null) {
          localStorage.setItem("userData", JSON.stringify(userData));
          dispatch(setCheckBoxValue());
        }
      }
    } else {
      localStorage.setItem("userData", JSON.stringify(userData));
      dispatch(setCheckBoxValue());
      
    }
  };

  const getExactDoctor: any = (name: string) => {
    let savedUser: any = JSON.parse(localStorage.getItem("userData") ?? "{}");

    let resualt = null;
    if (name === "doctor") {
      resualt = newDoctor?.list.find(
        (item: any) => item.id == savedUser?.user_id
      );
      resualt = `${resualt?.first_name} ${resualt?.last_name}-${resualt?.title_name}-${resualt?.expertise_name}`;

      dispatch<any>(
        setUserData({
          key: "user_id",
          value: savedUser?.user_id,
        })
      );
    } else if (name === "room") {
      resualt = room?.list.find((item: any) => item.id == savedUser?.room_id);
      resualt = `${resualt?.name === "room" ? "اتاق" : "پذیرش"}${
        resualt?.number
      }-${resualt?.floor_name}`;

      dispatch<any>(
        setUserData({
          key: "room_id",
          value: savedUser?.room_id,
        })
      );
    }

    return resualt;
  };
  return (
    <Box
      sx={{
        ...center,
        height: "100vh",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        sx={{
          ...center,
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <img src={logo} height={80} width={250} />
        <Typography
          sx={{
            fontSize: "20px",
            color: (theme) => theme.palette.primary.main,
            fontWeight: 700,
          }}
        >
          سامانه فراخوان کلینیکی
        </Typography>
      </Box>

      <Box
        sx={{
          ...center,
          gap: "50px",
          height: "40%",
          width: "100%",
          borderRadius: "12px",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{ ...center, flexDirection: "column", width: "30%", gap: "5px" }}
        >
          <Typography
            sx={{
              textAlign: "start",
              width: "100%",
              color: (theme) => theme.palette.primary.light,
              fontWeight: 600,
            }}
          >
            واحد
          </Typography>

          <Autocomplete
            disablePortal
            autoHighlight
            getOptionLabel={(option: any) =>
              `${option.name === "room" ? "اتاق" : "پذیرش"}${option?.number}-${
                option?.floor_name
              }`
            }
            options={room?.list}
            onChange={(_, value) => {
              dispatch<any>(
                setUserData({
                  key: "room_id",
                  value: value?.id,
                })
              );
            }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Typography>
                  {option.name === "room" ? "اتاق" : "پذیرش"}
                </Typography>
                <Typography>{option?.number}</Typography>
                <Typography>-{option?.floor_name}</Typography>
              </Box>
            )}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={!checkBox ? "انتخاب اتاق" : getExactDoctor("room")}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Box>
        <Box
          sx={{ ...center, flexDirection: "column", width: "30%", gap: "5px" }}
        >
          <Typography
            sx={{
              textAlign: "start",
              width: "100%",
              color: (theme) => theme.palette.primary.light,
              fontWeight: 600,
            }}
          >
            کاربر
          </Typography>

          <Autocomplete
            disablePortal
            autoHighlight
            getOptionLabel={(option: any) =>
              `${option?.first_name} ${option?.last_name}-${option?.title_name}-${option?.expertise_name}`
            }
            options={newDoctor?.list}
            onChange={(_, value) => {
              dispatch<any>(
                setUserData({
                  key: "user_id",
                  value: value?.id,
                })
              );
            }}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: (theme) => theme.palette.primary.main,
                  }}
                >{`${option?.first_name} ${option?.last_name}-${option?.title_name}-${option?.expertise_name}`}</Typography>
              </Box>
            )}
            sx={{ width: "100%" }}
            renderInput={(params) => (
              <TextField
                autoComplete="none"
                {...params}
                placeholder={!checkBox ? " نام پزشک" : getExactDoctor("doctor")}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "none", // disable autocomplete and autofill
                }}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox checked={checkBox} onClick={() => checkBoxHandler()} />
            }
            label="پیش فرض"
          />

          <Button
            disabled={
              userData?.user_id == null || userData?.room_id == null
                ? true
                : false
            }
            onClick={() => Enterhandler()}
            fullWidth
            variant="contained"
            sx={{
              bgcolor: (theme) => theme.palette.primary.dark,
              color: (theme) => theme.palette.text.secondary,
              fontSize: "18px",
              height: "3rem",
              fontWeight: 600,
              width: "50%",
            }}
          >
            {loading ? <CircularProgress size={24} /> : "ورود"}
          </Button>
        </Box>
        <Box sx={{ width: "30%", ...center }}>
          <Box
            onClick={homeBtn}
            sx={{
              borderRadius: "12px",
              boxShadow: "0px 4px 40px 20px rgba(0, 0, 0, 0.08)",
              p: 1,
              ...center,
              cursor: "pointer",
            }}
          >
            <HomeOutlinedIcon
              fontSize="large"
              sx={{ fill: (theme) => theme.palette.primary.light }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default User;
