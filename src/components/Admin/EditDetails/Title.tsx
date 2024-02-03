import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import TitleTable from "./TitleTable";
import { useDispatch, useSelector } from "react-redux";
import { VoiceList } from "../../../Redux/slices/General";
import { addExpTitleInfo, createExpTitle } from "../../../Redux/slices/Admin";
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

const Title: React.FC = () => {
  const { voiceList, loading }: { voiceList: any; loading: boolean } =
    useSelector((state: any) => state.general);

  const dispatch = useDispatch();
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
        لیست عناوین
      </Typography>
      {/* <Box sx={{ my: 2 }}> */}
      <Box sx={{ display: "flex", gap: "5px", my: 2 }}>
        <Box>
          <TextField
            onChange={(e) =>
              dispatch(
                addExpTitleInfo({
                  key: "name",
                  value: e.target.value,
                })
              )
            }
            placeholder="عنوان"
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
                addExpTitleInfo({
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
        </Box>
        {/* <Box>
          <Button
            component="label"
            variant="contained"
            startIcon={
              <CloudUploadIcon
                sx={{ fill: (theme) => theme.palette.text.secondary }}
              />
            }
          >
            <Typography
              sx={{ color: (theme) => theme.palette.text.secondary, mx: 2 }}
            >
              انتخاب فایل صوتی
            </Typography>
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box> */}
        <Box>
          <Button
            onClick={() => dispatch<any>(createExpTitle(true))}
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
      <TitleTable />
      {/* </Box> */}
    </Box>
  );
};

export default Title;
