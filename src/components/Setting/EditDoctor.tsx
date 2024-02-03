import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import { Button, CircularProgress, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addDRInfo, editDoctor, setDrInfo } from "../../Redux/slices/Setting";

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

interface EditUserprops {
  first_name: string;
  last_name: string;
  expertise_name: string;
  title_name: string;
  audios: [];
  expertise_id: string;
  title_id: string;
  user_id: string;
}

export const EditDoctor: React.FC<EditUserprops> = ({
  first_name,
  last_name,
  expertise_name,
  title_name,
  expertise_id,
  title_id,
  user_id,
}) => {
  const { expertiseTitle }: { expertiseTitle: any } = useSelector(
    (state: any) => state.admin
  );
  const { loading }: { loading: boolean } = useSelector(
    (state: any) => state.setting
  );
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
    dispatch(
      setDrInfo({
        info: {
          first_name,
          last_name,
          expertise_id,
          title_id,
        },
      })
    );
  };

  const submithandler = () => {
    dispatch<any>(editDoctor(user_id));
    if (!loading) {
      setOpen(false);
    }
  };

  return (
    <div>
      <EditIcon onClick={handleOpen} sx={{ cursor: "pointer" }} />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            ویرایش اطلاعات کاربر
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              my: 2,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography>نام </Typography>

              <TextField
                // value={username ?? ""}
                type="text"
                onChange={(e) =>
                  dispatch(
                    addDRInfo({
                      key: "first_name",
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
              <Typography sx={{ fontSize: "10px" }}>
                نام فعلی:{first_name}
              </Typography>
            </Box>
            <Box>
              <Typography>نام خانوادگی</Typography>

              <TextField
                // value={username ?? ""}
                type="text"
                onChange={(e) =>
                  dispatch(
                    addDRInfo({
                      key: "last_name",
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
              <Typography sx={{ fontSize: "10px" }}>
                نام خانوادگی فعلی:{last_name}
              </Typography>
            </Box>
            <Box>
              <Typography> عنوان</Typography>
              <TextField
                onChange={(e) =>
                  dispatch(
                    addDRInfo({
                      key: "title_id",
                      value: e.target.value,
                    })
                  )
                }
                select
                type="text"
                id="input-with-icon-textfield"
                InputProps={{
                  style: {
                    // background: "#F2F2F2",
                    color: "#000",
                    direction: "ltr",
                    height: "40px",
                    width: "10rem",
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
                    عنوان
                  </Typography>
                </option>
                {expertiseTitle.listTitle.map((item: any) => (
                  <option key={item.id} value={item?.id}>
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
              <Typography sx={{ fontSize: "10px" }}>
                عنوان فعلی:{title_name}
              </Typography>
            </Box>
            <Box>
              <Typography> تخصص</Typography>
              <TextField
                onChange={(e) =>
                  dispatch(
                    addDRInfo({
                      key: "expertise_id",
                      value: e.target.value,
                    })
                  )
                }
                select
                type="text"
                id="input-with-icon-textfield"
                InputProps={{
                  style: {
                    // background: "#F2F2F2",
                    color: "#000",
                    direction: "ltr",
                    height: "40px",
                    width: "10rem",
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
                    نوع تخصص
                  </Typography>
                </option>
                {expertiseTitle.listExp.map((item: any) => (
                  <option key={item.id} value={item?.id}>
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

              <Typography sx={{ fontSize: "10px" }}>
                تخصص فعلی:{expertise_name}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              onClick={() => submithandler()}
              variant="contained"
              sx={{
                bgcolor: (theme) => theme.palette.success.main,
                color: (theme) => theme.palette.text.secondary,
                px: 3,
              }}
            >
              {loading ? <CircularProgress size={24} /> : <>ویرایش</>}
            </Button>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                bgcolor: (theme) => theme.palette.warning.main,
                color: (theme) => theme.palette.text.secondary,
                px: 3,
              }}
            >
              انصراف
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
