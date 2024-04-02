import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import { editFloor, setFloorInfo } from "../../../../Redux/slices/Admin";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

interface editFloor {
  name: string;
  row_id: string;
}

export const FloorEdit: React.FC<editFloor> = ({ name, row_id }) => {
  const { loading }: { loading: boolean } = useSelector(
    (state: any) => state.general
  );

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);

  };
  const handleClose = () => setOpen(false);

  const submithandler = () => {
    dispatch<any>(editFloor(row_id ));
    if (!loading) {
      setOpen(false);
    }
  };
  return (
    <div>
      <EditIcon onClick={handleOpen} sx={{ cursor: "pointer" }} />
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ویرایش اطلاعات
          </Typography>
          <Box
            sx={{ ...center, gap: "15px", justifyContent: "flex-start", mt: 2 }}
          >
            <TextField
              placeholder="طبقه"
              onChange={(e) =>
                dispatch(
                  setFloorInfo({
                    key: "name",
                    value: e.target.value,
                  })
                )
              }
              InputProps={{
                style: {
                  height: "40px",
                  color: "#000",
                  direction: "ltr",
                },
              }}
            />

            <Box>
              <Button
                onClick={() => submithandler()}
                sx={{ bgcolor: (theme) => theme.palette.success.main }}
                component="label"
                variant="contained"
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <>
                    <Typography
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                        mx: 2,
                      }}
                    >
                      ویرایش
                    </Typography>
                    <AddIcon
                      sx={{ fill: (theme) => theme.palette.text.secondary }}
                    />
                  </>
                )}
              </Button>
              <Button
                onClick={handleClose}
                sx={{
                  bgcolor: (theme) => theme.palette.warning.main,
                  px: 4,
                  mx: 3,
                }}
                component="label"
                variant="contained"
              >
                انصراف
              </Button>
            </Box>
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mt: 4 }}
          >
            اطلاعات فعلی
          </Typography>

          <Box sx={{ ...center, justifyContent: "flex-start", gap: "2rem" }}>
            <Box sx={{ ...center, gap: "15px" }}>
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                عنوان طبقه :{" "}
              </Typography>
              <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
                {name}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
