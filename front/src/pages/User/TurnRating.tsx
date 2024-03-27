import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/User/Header";
import { useNavigate } from "react-router-dom";
import { reactRouts } from "../../utils/reactRouts";
import RedoIcon from "@mui/icons-material/Redo";
import { digitsEnToFa } from "@persian-tools/persian-tools";
import { useDispatch, useSelector } from "react-redux";
import { exitTurnRating, freeRoom, turnHandler } from "../../Redux/slices/User";
import { ResetModal } from "../../components/User/ResetModal";
import React from "react";
import { TurnNumber } from "../../components/User/TurnNumber";
function TurnRating() {
  const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const navigate: (to: string) => void = useNavigate();
  const dispatch = useDispatch();

  const { userInfo }: { userInfo: any } = useSelector(
    (state: any) => state.user
  );

  const backBTn: () => void = () => {
    dispatch<any>(freeRoom());
    dispatch<any>(exitTurnRating());

    navigate(reactRouts.user.main);
  };

  const changeTurn = (status: string) => {
    if (status === "increase") {
      dispatch<any>(
        turnHandler(
          parseInt(
            userInfo?.current_turn_number === null
              ? 0
              : userInfo?.current_turn_number
          ) + 1
        )
      );
    } else if (status === "decrease") {
      dispatch<any>(turnHandler(parseInt(userInfo?.current_turn_number) - 1));
    } else if (status === "repeat") {
      dispatch<any>(turnHandler(parseInt(userInfo?.current_turn_number) + 0.1));
    } else if (status === "reset") {
      dispatch<any>(turnHandler(0));
    }
  };

  return (
    <Box sx={{ height: "100svh" }}>
      <Box sx={{ height: "10%" }}>
        <Header />
      </Box>
      <Box sx={{ height: "90%", width: "100%", ...center }}>
        <Box
          sx={{
            width: "50%",
            height: "100%",
            ...center,
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Button
            onClick={() => changeTurn("increase")}
            variant="contained"
            sx={{
              bgcolor: (theme) => theme.palette.primary.light,
              color: (theme) => theme.palette.text.secondary,
              width: "40%",
              p: 2,
            }}
          >
            بعدی
          </Button>
          <Box sx={{ ...center, width: "100%", gap: "5px" }}>
            <Button
              onClick={() => changeTurn("decrease")}
              disabled={
                userInfo?.current_turn_number === null ||
                userInfo?.current_turn_number === 0
                  ? true
                  : false
              }
              variant="outlined"
              sx={{
                // bgcolor: (theme) => theme.palette.primary.light,
                color: (theme) => theme.palette.primary.light,
                width: "20%",
                p: 2,
              }}
            >
              قبلی
            </Button>
            <Button
              onClick={() => changeTurn("repeat")}
              disabled={
                userInfo?.current_turn_number === null ||
                userInfo?.current_turn_number === 0
                  ? true
                  : false
              }
              variant="outlined"
              sx={{
                // bgcolor: (theme) => theme.palette.primary.light,
                color: (theme) => theme.palette.primary.light,
                width: "20%",
                p: 2,
              }}
            >
              تکرار
            </Button>
          </Box>
          <Box sx={{ ...center, width: "100%", gap: "5px" }}>
            <ResetModal
              number={userInfo?.current_turn_number}
              changeTurn={changeTurn}
            />
            <TurnNumber
              
            />
          </Box>

          <Box
            onClick={backBTn}
            sx={{
              borderRadius: "12px",
              boxShadow: "0px 4px 40px 20px rgba(0, 0, 0, 0.08)",
              p: 1,
              ...center,
              cursor: "pointer",
              mt: 5,
            }}
          >
            <RedoIcon
              fontSize="large"
              sx={{ fill: (theme) => theme.palette.primary.light }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "100%",
            ...center,
            flexDirection: "column",
            gap: "15px",
          }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.main,
              width: "40%",
              p: 2,
              textAlign: "center",
              fontSize: "24px",
              fontWeight: 500,
            }}
          >
            شماره نوبت
          </Typography>
          <Box
            sx={{
              ...center,
              width: "40%",
              gap: "5px",
              border: "1px solid #25277e",
              borderRadius: "18px",
              overflow: "hidden",
              height: "30%",
              bgcolor: (theme) => theme.palette.background.paper,
              boxShadow: "0px 4px 40px 20px rgba(0, 0, 0, 0.08)",
mt:4
            }}
          >
            <Typography
              sx={{
                color: (theme) => theme.palette.primary.main,
                width: "100%",
                p: 2,
                textAlign: "center",
                fontSize: "70px",
                fontWeight: "900",
              }}
            >
              {digitsEnToFa(
                `${
                  userInfo?.current_turn_number === null
                    ? 0
                    : parseInt(userInfo?.current_turn_number)
                }`
              )}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1,
              ...center,
              cursor: "pointer",
              flexDirection: "column",
            }}
          >
            {/* <Typography
              sx={{
                color: (theme) => theme.palette.primary.light,
                width: "100%",
                textAlign: "center",
                fontWeight: 600,
                p: 2,
              }}
            >
              مدت زمان ویزیت
            </Typography> */}
            {/* <Typography
              sx={{
                color: (theme) => theme.palette.primary.light,
                width: "100%",
                textAlign: "center",
                fontWeight: 600,
                p: 2,
              }}
            >
              55555
            </Typography> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TurnRating;
