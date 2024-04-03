import { Box, Typography } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import logo from "../assets/images/logoEn.png";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { useNavigate } from "react-router-dom";
import { reactRouts } from "../utils/reactRouts";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthUser, handleLogOut } from "../Redux/slices/Login";
import { ExitToApp } from "@mui/icons-material";
import SelectFloor from "../components/Queue/SelectFloor";
function Home() {
  const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const { userInfo, authorized }: { userInfo: any; authorized: boolean } =
    useSelector((state: any) => state.login);

  const navigate: (to: string) => void = useNavigate();
  const dispach = useDispatch();
  const handleNavigate: (e: string) => void = (id) => {
    if (id === "user") {
      navigate(reactRouts.user.main);
    } else if (id === "admin") {
      navigate(reactRouts.admin.main);
    } else if (id === "setting") {
      navigate(reactRouts.setting.main);
    } else if (id === "queue") {
      navigate(reactRouts.queue.main)
    }
  };

  //?chek auth
  useEffect(() => {
    if (!localStorage.hasOwnProperty("token")) {
      navigate(reactRouts.auth.main);
    } else {
      dispach(checkAuthUser());
    }
  }, [authorized]);
  
  
  return (
    <Box
      sx={{
        ...center,
        height: "100vh",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      <Box sx={{ ...center, flexDirection: "column", gap: "10px" }}>
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

          height: "60%",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        {((authorized && userInfo?.acl && userInfo?.acl.includes("personnel"))&&userInfo.role==="admin") && (
          <Box
            id="personnel"
            onClick={() => handleNavigate("user")}
            sx={{
              ...center,
              flexDirection: "column",
              p: 3,
              px: 4,
              bgcolor: (theme) => theme.palette.background.paper,
              borderRadius: "12px",
              boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
              cursor: "pointer",
              "&:hover": {
                bgcolor: (theme) => theme.palette.primary.main,
                "& #child": {
                  fill: (theme) => theme.palette.text.secondary,
                  color: (theme) => theme.palette.text.secondary,
                },
              },
            }}
          >
            <PersonOutlineIcon
              sx={{
                fontSize: "65px",
                fill: (theme) => theme.palette.primary.light,
              }}
              id="child"
            />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                color: (theme) => theme.palette.primary.light,
              }}
              id="child"
            >
              کاربر
            </Typography>
          </Box>
        )}
        {((authorized && userInfo?.acl && userInfo?.acl.includes("queue"))&&userInfo.role==="admin" )&& (
          <SelectFloor/>
          // <Box
          //      onClick={() => handleNavigate("queue")}
          //   id={"queue"}
          //   sx={{
          //     ...center,
          //     flexDirection: "column",
          //     p: 3,
          //     px: 4,
          //     bgcolor: (theme) => theme.palette.background.paper,
          //     borderRadius: "12px",
          //     boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
          //     cursor: "pointer",
          //     "&:hover": {
          //       bgcolor: (theme) => theme.palette.primary.main,
          //       "& #child": {
          //         fill: (theme) => theme.palette.text.secondary,
          //         color: (theme) => theme.palette.text.secondary,
          //       },
          //     },
          //   }}
          // >
          //   <MenuIcon
          //     sx={{
          //       fontSize: "65px",
          //       fill: (theme) => theme.palette.primary.light,
          //     }}
          //     id="child"
          //   />
          //   <Typography
          //     sx={{
          //       fontSize: "18px",
          //       fontWeight: 500,
          //       color: (theme) => theme.palette.primary.light,
          //     }}
          //     id="child"
          //   >
          //     صف نوبت
          //   </Typography>
          // </Box>
        )}
        {((authorized && userInfo?.acl && userInfo?.acl.includes("setting"))&&userInfo.role==="admin") && (
          <Box
            id={"setting"}
            onClick={() => handleNavigate("setting")}
            sx={{
              ...center,
              flexDirection: "column",
              p: 3,
              px: 4,
              bgcolor: (theme) => theme.palette.background.paper,
              borderRadius: "12px",
              boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
              cursor: "pointer",
              "&:hover": {
                bgcolor: (theme) => theme.palette.primary.main,
                "& #child": {
                  fill: (theme) => theme.palette.text.secondary,
                  color: (theme) => theme.palette.text.secondary,
                },
              },
            }}
          >
            <SettingsIcon
              sx={{
                fontSize: "65px",
                fill: (theme) => theme.palette.primary.light,
              }}
              id="child"
            />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                color: (theme) => theme.palette.primary.light,
              }}
              id="child"
            >
              تنظیمات
            </Typography>
          </Box>
        )}
        {userInfo?.is_super_admin ? (
          <Box
            onClick={() => handleNavigate("admin")}
            id={"admin"}
            sx={{
              ...center,
              flexDirection: "column",
              p: 3,
              px: 4,
              bgcolor: (theme) => theme.palette.background.paper,
              borderRadius: "12px",
              boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
              cursor: "pointer",
              "&:hover": {
                bgcolor: (theme) => theme.palette.primary.main,
                "& #child": {
                  fill: (theme) => theme.palette.text.secondary,
                  color: (theme) => theme.palette.text.secondary,
                },
              },
            }}
          >
            <AdminPanelSettingsIcon
              sx={{
                fontSize: "65px",
                fill: (theme) => theme.palette.primary.light,
              }}
              id="child"
            />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 500,
                color: (theme) => theme.palette.primary.light,
              }}
              id="child"
            >
              کاربر ارشد
            </Typography>
          </Box>
        ):null}
      </Box>

      <Box sx={{ ...center, flexDirection: "column", cursor: "default" }}>
        <Box sx={{ ...center, gap: "5px" }}>
          <Box
            onClick={() => dispach<any>(handleLogOut())}
            sx={{
              cursor: "pointer",
              ...center,
              borderRadius: "20px",
              bgcolor: (theme) => theme.palette.background.default,
              p: 2,
            }}
          >
            <ExitToApp
              sx={{
                "&:hover": {
                  fill: (theme) => theme.palette.warning.main,
                  cursor: "pointer",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              ...center,
              borderRadius: "20px",
              bgcolor: (theme) => theme.palette.background.default,
              px: 2,
            }}
          >
            <PersonRoundedIcon
              sx={{
                fontSize: "60px",
                fill: (theme) => theme.palette.primary.dark,
              }}
            />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: 700,
                color: (theme) => theme.palette.primary.main,
              }}
            >
              {userInfo?.username}
            </Typography>
          </Box>
        </Box>

        <a target="_blank" href={"https://www.arta-tech.ir/"}>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 500,
              mt: 1,
              color: (theme) => theme.palette.primary.main,
            }}
          >
            POWERED BY ARTA-TECH.IR
          </Typography>
        </a>
      </Box>
    </Box>
  );
}

export default Home;
