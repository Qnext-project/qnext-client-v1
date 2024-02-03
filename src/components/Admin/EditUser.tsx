import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { EditUser, addNewUserInfo, setUserInfo } from "../../Redux/slices/Admin";

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
  username: string;
  password: string;
  user_acl: string;
  user_Id: any;
}

export const EditUserInfo: React.FC<EditUserprops> = ({
  username,
  password,
  user_acl,
  user_Id,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const [acl, setAcl] = useState<any>([]);

  const handleAcl = (event: any) => {
    if (event.target.checked) {
      setAcl((prevAcl: string[]) => [...prevAcl, event.target.id]);
    } else {
      setAcl((prevAcl: any[]) =>
        prevAcl.filter((item: any) => item !== event.target.id)
      );
    }
  };

  useEffect(() => {
    dispatch(
      addNewUserInfo({
        key: "acl",
        value: acl,
      })
    );
  }, [acl, dispatch]);

  const handleOpen = () => {
    setOpen(true);
    dispatch(
        setUserInfo({
            
        info: {
          username,
          password,
          user_acl,
        },
      })
    );
  };

  const { loading }: { loading: boolean } = useSelector(
    (state: any) => state.admin
  );
  const submithandler = () => {
    dispatch<any>(EditUser(user_Id));
    if (!loading) {
      setOpen(false);
    }
  };
  type TranslationMap = {
    setting: string;
    personnel: string;
    queue: string;
  };
  function translateToPersian(word: keyof TranslationMap) {
    const translationMap: TranslationMap = {
      setting: "تنظیمات",
      personnel: "کاربر",
      queue: "صف نوبت",
    };
    return translationMap[word] || word;
  }

  function translateArrayToPersian(array: any) {
    const persianArray = array?.map((word: any) => translateToPersian(word));
    const resultString = persianArray?.join(" -  ");
    return resultString;
  }
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
              <Typography>نام کاربری</Typography>

              <TextField
                // value={username ?? ""}
                type="text"
                onChange={(e) =>
                  dispatch(
                    addNewUserInfo({
                      key: "username",
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
                نام کاربری فعلی:{username}
              </Typography>
            </Box>
            <Box>
              <Typography> رمزعبور</Typography>
              <TextField
                // value={password ?? ""}
                type="text"
                onChange={(e) =>
                  dispatch(
                    addNewUserInfo({
                      key: "password",
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
                رمزعبور فعلی:{password}
              </Typography>
            </Box>
            <Box>
              <Typography>دسترسی</Typography>

              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="personnel"
                      //   checked={user_acl.includes("personnel") ? true : false}
                      onClick={(e) => handleAcl(e)}
                    />
                  }
                  label="کاربر"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      id="queue"
                      onClick={(e) => handleAcl(e)}
                      //   checked={user_acl.includes("queue") ? true : false}
                    />
                  }
                  label="صف نوبت"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      id="setting"
                      onClick={(e) => handleAcl(e)}
                      //   checked={user_acl.includes("setting") ? true : false}
                    />
                  }
                  label="تنظیمات"
                />
              </Box>
              <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                سطح دسترسی فعلی: {translateArrayToPersian(user_acl)}
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
