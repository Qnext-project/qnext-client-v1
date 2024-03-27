import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { EditClinicName, getClinicName } from "../../Redux/slices/General";
import { useDispatch } from "react-redux";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};

export default function EditClinic() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    
    const sumbmitHandler = () => {
        dispatch<any>(EditClinicName())
        setOpen(false)
    }
  return (
    <div>
      <Box
        onClick={handleOpen}
        sx={{
          display: "flex",
          bgcolor: (theme) => theme.palette.primary.light,
          p: 1,
          borderRadius: "12px",
          cursor: "pointer",
        }}
      >
        <EditIcon sx={{ fill: (theme) => theme.palette.text.secondary }} />
      </Box>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ color: (theme) => theme.palette.primary.main }}
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              ویرایش نام کلینیک
            </Typography>
            <CloseIcon sx={{ cursor: "pointer" }} onClick={handleClose} />
          </Box>

          <Typography sx={{ fontSize: "16px", my: 2 }}>
            نام کلینیک مورد نظر خود را وارد کنید
          </Typography>
          <Box sx={{ my: 2, display: "flex", gap: "15px" }}>
            <TextField
              sx={{ width: "60%" }}
              type="text"
              onChange={(e) => dispatch<any>(getClinicName(e.target.value))}
              InputProps={{
                style: {
                  height: "40px",
                  color: "#000",
                  direction: "ltr",
                },
              }}
            />
            <Button
              onClick={() => sumbmitHandler()}
              variant="contained"
              sx={{ bgcolor: (theme) => theme.palette.success.main }}
            >
              ویرایش
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
