import { Box, Typography } from "@mui/material";
import React from "react";
import logo from "../../assets/images/logoEn.png";
import { useNavigate } from "react-router-dom";
import { reactRouts } from "../../utils/reactRouts";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useSelector } from "react-redux";

const Header: React.FC = () => {
  const navigate: (to: string) => void = useNavigate();
  const { userInfo }: { userInfo: any } = useSelector(
    (state: any) => state.user
  );
  const homeBtn: () => void = () => {
    navigate(reactRouts.home);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
        }}
      >
        <AccountCircleOutlinedIcon
          sx={{ fontSize: "50px", fill: (theme) => theme.palette.primary.main }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              color: (theme) => theme.palette.primary.main,
            }}
          >
            
            {userInfo?.doc_info?.name}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "14px",
              color: (theme) => theme.palette.primary.main,
            }}
          >
            {`
               ${userInfo?.doc_info?.title}
                
           ${userInfo?.doc_info?.expertise=== "*" ?"":userInfo?.doc_info?.expertise}
              `}
          </Typography>
        </Box>

        <Box sx={{ border: "1px solid #25277e", borderRadius: "12px" }}>
          <Typography
            sx={{ color: (theme) => theme.palette.primary.main, m: 1 }}
          >
            اتاق {userInfo?.doc_info?.room&&digitsEnToFa(userInfo?.doc_info?.room)}
          </Typography>
        </Box>
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
