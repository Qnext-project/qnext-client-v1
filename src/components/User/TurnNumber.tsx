import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import { TextField } from "@mui/material";
import { turnHandler } from "../../Redux/slices/User";
import { useDispatch } from "react-redux";
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
interface propType {}
export const TurnNumber: React.FC<propType> = () => {
  const [open, setOpen] = React.useState(false);
  const [number, setNumber] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  return (
    <>

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
        <FormatListNumberedIcon
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
            مقدار مورد نظر را وارد کنید
          </Typography>
          <TextField
            type="number"
            fullWidth
            sx={{ my: 2 }}
            onChange={(e) => setNumber(e.target.value)}
          />
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
              disabled={number === null || +number === 0 ? true : false}
              onClick={() => {
                  dispatch<any>(turnHandler(+number));
                  setNumber("0")
                handleClose();
              }}
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.palette.warning.main,
                color: (theme) => theme.palette.text.secondary,
              }}
            >
              اعمال
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
