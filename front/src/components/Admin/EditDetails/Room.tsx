import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
// import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import RoomTable from "./RoomTable";
import { useDispatch, useSelector } from "react-redux";
import { addRoomInfo, createNewRoom } from "../../../Redux/slices/Admin";
import { VoiceList } from "../../../Redux/slices/General";
// const VisuallyHiddenInput = styled("input")({
//   clip: "rect(0 0 0 0)",
//   clipPath: "inset(50%)",
//   height: 1,
//   overflow: "hidden",
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   whiteSpace: "nowrap",
//   width: 1,
// });

const Room: React.FC = () => {
  const dispatch = useDispatch();
  const { loading }: { loading: boolean } = useSelector(
    (state: any) => state.admin
  );

    const { voiceList }: { voiceList: any } =
    useSelector((state: any) => state.general);

  useEffect(() => {
    dispatch<any>(VoiceList("expertise"));
  }, []);
  return (
    <Box sx={{}}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 500,
          color: (theme) => theme.palette.primary.main,
        }}
      >
        لیست اتاق ها
      </Typography>
      <Box sx={{ display: "flex", gap: "5px", my: 2 }}>
        <Box>
          <TextField
            select
            onChange={(e) => {
              dispatch<any>(
                addRoomInfo({
                  key: "name",
                  value: e.target.value,
                })
              );
            }}
            type="text"
            id="input-with-icon-textfield"
            InputProps={{
              style: {
                // background: "#F2F2F2",
                color: "#000",
                direction: "ltr",
                height: "40px",
              },
            }}
            variant="outlined"
            SelectProps={{
              native: true,
            }}
          >
            <option value="">
              <Typography
                sx={{
                  fontSize: "12px",

                  fontWeight: 400,
                }}
              >
                نوع اتاق
              </Typography>
            </option>
            <option value="room">
              <Typography
                sx={{
                  fontSize: "12px",

                  fontWeight: 400,
                }}
              >
                اتاق
              </Typography>
            </option>
            <option value="reciption">
              <Typography
                sx={{
                  fontSize: "12px",

                  fontWeight: 400,
                }}
              >
                پذیرش
              </Typography>
            </option>
          </TextField>

        </Box>
                <TextField
            select
            type="text"
            id="input-with-icon-textfield"
            InputProps={{
              style: {
                // background: "#F2F2F2",
                color: "#000",
                direction: "ltr",
                height: "40px",
              },
            }}
            variant="outlined"
            SelectProps={{
              native: true,
            }}
            onChange={(e) =>
              dispatch(
                addRoomInfo({
                  key: "media_id",
                  value: e.target.value,
                })
              )
            }
          >
            <option value="">
              <Typography
                sx={{
                  fontSize: "12px",

                  fontWeight: 400,
                }}
              >
                صدای مورد نظر را انتخاب کنید
              </Typography>
            </option>
            {voiceList.map((item: any, index: any) => (
              <option key={index} value={item?.id}>
                <Typography
                  sx={{
                    fontSize: "12px",

                    fontWeight: 400,
                  }}
                >
                  {item?.name}
                </Typography>
              </option>
            ))}
          </TextField>
                <TextField
            select
            type="text"
            id="input-with-icon-textfield"
            InputProps={{
              style: {
                // background: "#F2F2F2",
                color: "#000",
                direction: "ltr",
                height: "40px",
              },
            }}
            variant="outlined"
            SelectProps={{
              native: true,
            }}
            onChange={(e) =>
              dispatch(
                addRoomInfo({
                  key: "media_id",
                  value: e.target.value,
                })
              )
            }
          >
            <option value="">
              <Typography
                sx={{
                  fontSize: "12px",

                  fontWeight: 400,
                }}
              >
                طبقه مورد نظر را انتخاب کنید
              </Typography>
            </option>
            {voiceList.map((item: any, index: any) => (
              <option key={index} value={item?.id}>
                <Typography
                  sx={{
                    fontSize: "12px",

                    fontWeight: 400,
                  }}
                >
                  {item?.name}
                </Typography>
              </option>
            ))}
          </TextField>
        <Box>
          <TextField
            onChange={(e) => {
              dispatch<any>(
                addRoomInfo({
                  key: "number",
                  value: e.target.value,
                })
              );
            }}
            type="number"
            placeholder="شماره*"
            InputProps={{
              style: {
                height: "40px",
                color: "#000",
                direction: "ltr",
              },
            }}
          />
        </Box>
        <Box>
          <Button
            onClick={() => dispatch<any>(createNewRoom())}
            sx={{ bgcolor: (theme) => theme.palette.success.main }}
            component="label"
            variant="contained"
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <>
                <Typography
                  sx={{ color: (theme) => theme.palette.text.secondary, mx: 2 }}
                >
                  افزودن
                </Typography>
                <AddIcon
                  sx={{ fill: (theme) => theme.palette.text.secondary }}
                />
              </>
            )}
          </Button>
        </Box>
      </Box>
      <RoomTable />
      {/* </Box> */}
    </Box>
  );
};

export default Room;
