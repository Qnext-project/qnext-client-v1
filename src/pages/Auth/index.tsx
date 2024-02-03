import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logoEn.png";
import { reactRouts } from "../../utils/reactRouts";
import React, { useEffect, useState } from "react";
import Ads from "../../components/auth/Ads";
import { useDispatch, useSelector } from "react-redux";
import { SignInAction, setUserData,checkAuthUser } from "../../Redux/slices/Login";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#3A5DF0",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  width: "90%",
}));

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const SignIn: React.FC = () => {
  const dispach = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { loading, authorized,userData }: { loading: boolean; authorized: boolean,userData:any } =
    useSelector((state: any) => state.login);
  const navigate: (to: string, options?: { replace?: boolean }) => void =
    useNavigate();

  const loginHandler: () => void = () => {
    dispach<any>(SignInAction());
  };

  useEffect(() => {
    if (authorized||localStorage.hasOwnProperty("token")) {
      dispach(checkAuthUser())
      navigate(reactRouts.home);
    }
  }, [authorized]);

  return (
    <Box sx={{ flexGrow: 1, p: 1 }}>
      <Grid container spacing={2} sx={{ width: "100%" }}>
        <Grid item xs={4.5} sx={{ height: "100vh" }}>
          <Item sx={{ p: 3, height: "100%" }}>
            {" "}
            <Ads />{" "}
          </Item>
        </Grid>
        <Grid item xs={6} sx={{ height: "100vh", width: "100%" }}>
          <Box
            sx={{
              ...center,
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-evenly",
              // border: "1px solid red",
              width: "100%",
            }}
          >
            <Box sx={{ ...center, flexDirection: "column", gap: "10px" }}>
              <img src={logo} height={80} width={250} />
              <Typography
                sx={{
                  fontSize: "20px",
                  color: (theme) => theme.palette.primary.dark,
                  fontWeight: 700,
                }}
              >
                سامانه فراخوان کلینیکی
              </Typography>
            </Box>
            <Box
              sx={{
                ...center,
                flexDirection: "column",
                gap: "15px",
                width: "80%",
              }}
            >
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.primary,
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                اطلاعات خود را برای ورود به نرم‌افزار وارد کنید.
              </Typography>
              <TextField
                onChange={(e) =>
                  dispach(
                    setUserData({
                      key: "username",
                      value: e.target.value,
                    })
                  )
                }
                fullWidth
                variant="outlined"
                placeholder="نام‌کاربری خود را وارد کنید"
                InputProps={{
                  // shirink: true,
                  style: {
                    backgroundColor: "transparent",
                    color: "#000000",
                  },
                }}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  dispach(
                    setUserData({
                      key: "password",
                      value: e.target.value,
                    })
                  )
                }
                fullWidth
                variant="outlined"
                placeholder="رمز عبور خود را وارد کنید"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      sx={{ cursor: "pointer" }}
                      position="end"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </InputAdornment>
                  ),
                  style: {
                    backgroundColor: "transparent",
                    color: "#000000",
                  },
                }}
              />
              <Box sx={{ ...center, mt: 3 }}>
                <Typography
                  sx={{
                    color: (theme) => theme.palette.text.primary,
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  آیا رمز عبور خود را فراموش کرده‌اید؟
                </Typography>
                <Typography
                  sx={{
                    color: (theme) => theme.palette.primary.light,
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  کلیک کنید.
                </Typography>
              </Box>
              <Button
                disabled={(userData.username.length<=0||userData.password.length<=0)?true:false}
                onClick={loginHandler}
                variant="contained"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.dark,
                  color: (theme) => theme.palette.text.secondary,
                  borderRadius: "12px",
                  p: 2,
                  textAlign: "center",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  " ورود به نرم‌افزار"
                )}
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
