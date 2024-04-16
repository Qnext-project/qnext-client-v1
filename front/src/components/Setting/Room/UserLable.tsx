import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { center } from "../../../styles/theme";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { purgeUser } from "../../../Redux/slices/Admin";

interface UserProps {
  userName: string;
  user_id: string;
}
export const UserLable: FC<UserProps> = ({ userName, user_id }) => {
  const dispach = useDispatch();
  return (
      <Box
             onClick={() => dispach<any>(purgeUser(user_id))}
      sx={{
        ...center,
          justifyContent: "space-between",
        cursor:"pointer",
        boxShadow: 3,
        p: 2,
        m: 0,
        width: "80%",
        borderRadius: "15px",
        ":hover": {
            bgcolor: (theme) => theme.palette.primary.main,
             "&:hover > *": { color: (theme) => theme.palette.text.secondary },
        },
      }}
    >
      <Box
        sx={{
          ...center,
          justifyContent: "start",
        }}
      >
        <Typography
          sx={{ fontSize: "16px", fontWeight: "700", color: "inherit" }}
        >
          نام کاربری:
        </Typography>
        <Typography
          sx={{ fontSize: "16px", fontWeight: "500", color: "inherit" }}
        >
          {userName}
        </Typography>
      </Box>

      <LogoutIcon
        sx={{ cursor: "pointer", fill: (theme) => theme.palette.warning.main }}
     
      />
    </Box>
  );
};
