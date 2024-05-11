import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import VoiceTable from "./VoiceTable";
import { toastHandler } from "../../../utils/setting";
import axios from "axios";
import { VoiceList, setVoiceType } from "../../../Redux/slices/General";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const Voice: React.FC = () => {
  const { loading, voiceType }: { loading: boolean; voiceType: string } =
    useSelector((state: any) => state.general);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch<any>(VoiceList("expertise"));
  // }, []);
  const [uploadedFile, setUploadedFile] = useState<File | any>();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target?.files?.[0];

    if (file) {
      setUploadedFile(file);
    } else {
      toastHandler("فایل مورد نظر مشکل دارد.");
    }
  };
  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("audios[]", uploadedFile);

    const res = await axios.post(
      `http://127.0.0.1:8000/api/v1/admin/media/${voiceType}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.status == 200) {
      dispatch<any>(VoiceList(voiceType));
    } else {
      toastHandler("خطایی رخ داده است. مجدد تست کنید");
    }
  };
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
      <Box sx={{ mt: 2, display: "flex", gap: "15px" }}>
        <Button
          onClick={() => dispatch<any>(setVoiceType("doctor"))}
          variant="contained"
          id="doctor"
          sx={{
            bgcolor: (theme) =>
              voiceType === "doctor"
                ? theme.palette.text.secondary
                : theme.palette.primary.dark,
            color: (theme) =>
              voiceType === "doctor"
                ? theme.palette.primary.dark
                : theme.palette.text.secondary,
            // width: "5rem",
          }}
        >
          لیست دکتر ها
        </Button>
        <Button
          onClick={() => dispatch<any>(setVoiceType("number"))}
          variant="contained"
          id="doctor"
          sx={{
            bgcolor: (theme) =>
              voiceType === "number"
                ? theme.palette.text.secondary
                : theme.palette.primary.dark,
            color: (theme) =>
              voiceType === "number"
                ? theme.palette.primary.dark
                : theme.palette.text.secondary,
            // width: "5rem",
          }}
        >
          لیست عدد ها
        </Button>
        <Button
          onClick={() => dispatch<any>(setVoiceType("room"))}
          variant="contained"
          id="doctor"
          sx={{
            bgcolor: (theme) =>
              voiceType === "room"
                ? theme.palette.text.secondary
                : theme.palette.primary.dark,
            color: (theme) =>
              voiceType === "room"
                ? theme.palette.primary.dark
                : theme.palette.text.secondary,
            // width: "5rem",
          }}
        >
          لیست اتاق ها
        </Button>
        <Button
          onClick={() => dispatch<any>(setVoiceType("expertise"))}
          variant="contained"
          id="doctor"
          sx={{
            bgcolor: (theme) =>
              voiceType === "expertise"
                ? theme.palette.text.secondary
                : theme.palette.primary.dark,
            color: (theme) =>
              voiceType === "expertise"
                ? theme.palette.primary.dark
                : theme.palette.text.secondary,
            // width: "5rem",
          }}
        >
          لیست تخصص ها
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: "5px", my: 2 }}>
        <Box>
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
            <VisuallyHiddenInput
              type="file"
              accept="audio/wav, audio/mp3"
              size={2000000}
              onChange={(e) => handleFileChange(e)}
            />
          </Button>
        </Box>
        <Box>
          <Button
            onClick={() => uploadFile()}
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
      <VoiceTable />
    </Box>
  );
};
