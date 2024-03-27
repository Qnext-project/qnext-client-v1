import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import RotateLeftOutlinedIcon from "@mui/icons-material/RotateLeftOutlined";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
};
interface propType {
  number: number;

  changeTurn: any;
}
export const ResetModal: React.FC<propType> = ({ number, changeTurn }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}

      <Button
        onClick={handleOpen}
        //   fullWidth
        variant="outlined"
        sx={{
          bgcolor: (theme) => theme.palette.text.secondary,
          width: "20%",
          p: 2,
        }}
      >
        <RotateLeftOutlinedIcon
          sx={{ fill: (theme) => theme.palette.primary.light }}
        />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ایا از صفر کردن شماره نوبت اطمینان دارید؟
          </Typography>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.palette.primary.light,
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              لغو درخواست
            </Button>
            <Button
              disabled={number === null || number === 0 ? true : false}
              onClick={() => {
                changeTurn("reset");
                handleClose();
              }}
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.palette.warning.main,
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              بله
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
