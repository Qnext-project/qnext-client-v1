import { Box, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/images/logoEn.png";
import { useNavigate } from "react-router-dom";
import { reactRouts } from "../../utils/reactRouts";
import { useDispatch, useSelector } from "react-redux";
import { changeTabas } from "../../Redux/slices/Admin";

const Header: React.FC = () => {
  const navigate: (to: string) => void = useNavigate();
  const dispatch = useDispatch();
  const { tab }: { tab: number } = useSelector((state: any) => state.admin);

  const homeBtn: () => void = () => {
    navigate(reactRouts.home);
  };

  const handleTabs: (number: number) => void = (number) => {
    dispatch<any>(changeTabas(number));
  };
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.background.paper,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        p: 1,
        px: 2,
        boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <Typography
          onClick={() => handleTabs(1)}
          sx={{
            fontSize: "20px",
            fontWeight: 600,
           p:1,
            bgcolor: (theme) =>
              tab === 1 ? theme.palette.primary.dark : theme.palette.background.paper,
            color: (theme) =>
              tab === 1
                ? theme.palette.text.secondary
                : theme.palette.primary.main,
            borderRadius: "7px",
            cursor:"pointer"
          }}
        >
          تعریف کاربر
        </Typography>
        <Typography
          onClick={() => handleTabs(2)}
          sx={{
            fontSize: "20px",
            fontWeight: 600,
            p:1,
         bgcolor: (theme) =>
              tab === 2 ? theme.palette.primary.dark : theme.palette.background.paper,
            color: (theme) =>
              tab === 2
                ? theme.palette.text.secondary
                : theme.palette.primary.main,
            borderRadius: "7px",
            cursor:"pointer"

          }}
        >
        ویرایش جزییات 
        </Typography>
      </Box>
      <Box>
        <img
          src={logo}
          alt="Qnext logo"
          height={35}
          width={100}
          onClick={homeBtn}
          style={{ cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};

export default Header;
