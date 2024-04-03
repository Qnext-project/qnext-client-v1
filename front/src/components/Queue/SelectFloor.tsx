import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import MenuIcon from "@mui/icons-material/Menu";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { reactRouts } from "../../utils/reactRouts";
import { useDispatch, useSelector } from "react-redux";
import { setFloorId } from "../../Redux/slices/General";
import  {Close}  from "@mui/icons-material";
import { getFloorList } from "../../Redux/slices/Admin";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "18px",
  boxShadow: 24,
  p: 4,
};

export default function SelectFloor() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const navigate: (to: string) => void = useNavigate();
  const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const { floor }: { floor: { list: any } } = useSelector(
    (state: any) => state.admin
  );
  const { floor_id}: { floor_id:string } = useSelector(
    (state: any) => state.general
  );

  React.useEffect(() => {
    dispatch<any>(getFloorList())
  },[])
  return (
    <div>
      <Box
        onClick={handleOpen}
        id={"queue"}
        sx={{
          ...center,
          flexDirection: "column",
          p: 3,
          px: 4,
          bgcolor: (theme) => theme.palette.background.paper,
          borderRadius: "12px",
          boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
          cursor: "pointer",
          "&:hover": {
            bgcolor: (theme) => theme.palette.primary.main,
            "& #child": {
              fill: (theme) => theme.palette.text.secondary,
              color: (theme) => theme.palette.text.secondary,
            },
          },
        }}
      >
        <MenuIcon
          sx={{
            fontSize: "65px",
            fill: (theme: any) => theme.palette.primary.light,
          }}
          id="child"
        />
     
    <Typography
          sx={{
            fontSize: "18px",
            fontWeight: 500,
            color: (theme) => theme.palette.primary.light,
          }}
          id="child"
        >
          صف نوبت
          </Typography>
  
    
    
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{...center,justifyContent:"space-between"}}>


          <Typography id="modal-modal-title" variant="h6" component="h2">
            انتخاب طبقه
            </Typography>
            <Close onClick={()=>handleClose()} sx={{cursor:"pointer"}}/>
          </Box>
          <Typography id="modal-modal-description" sx={{ my: 2 }}>
            طبقه مورد نظر برای نمایش صف نوبت را انتخاب کنید
          </Typography>

          <Box sx={{ ...center, justifyContent: "space-between" }}>
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
              onChange={(e) => dispatch<any>(setFloorId(e.target.value))}
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
            <Button
              disabled={floor_id?.length<=0?true:false}
              onClick={() => navigate(reactRouts.queue.main)}
              variant="contained"
            >
              ورود به صف نوبت
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
