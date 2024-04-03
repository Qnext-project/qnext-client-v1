import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import {
  addRoomInfo,
  editRoom,
  setRoomInfo,
} from "../../../Redux/slices/Admin";
import { setFloorId } from "../../../Redux/slices/General";
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

interface editRoom {
  name: string;
  room_id: string;
  number: string;
  media_id: string;
  floor_name:string
}

export const RoomExpEdit: React.FC<editRoom> = ({
  name,
  number,
  room_id,
  media_id,
  floor_name
}) => {
  const { voiceList, loading,floor_id }: { voiceList: any; loading: boolean,floor_id:string } =
    useSelector((state: any) => state.general);
  const { floor }: { floor: {list:any}} =
    useSelector((state: any) => state.admin);

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    dispatch(
      setRoomInfo({
        info: {
          name,
          number,
          media_id,
        },
      })
    );
  };
  const handleClose = () => setOpen(false);

  const submithandler = () => {
    dispatch<any>(editRoom({room_id,floor_id}));
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
                setFloorId(e.target.value)
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
            {floor?.list?.map((item: any, index: any) => (
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
              placeholder="شماره"
              type={"number"}
              onChange={(e) =>
                dispatch(
                  addRoomInfo({
                    key: "number",
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
                عنوان:
              </Typography>
              <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
                {name === "room" ? "اتاق" : "پذیرش"}-{floor_name}
              </Typography>
            </Box>
            <Box sx={{ ...center, gap: "15px" }}>
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
                شماره:
              </Typography>
              <Typography sx={{ fontSize: "18px", fontWeight: 500 }}>
                {number}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
