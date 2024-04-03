import { Box, Divider, TextField, Typography } from "@mui/material";
import logo from "../../assets/images/logoWhite.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reactRouts } from "../../utils/reactRouts";
import { changeFullScreen, setFloorId } from "../../Redux/slices/General";
import { useEffect, useState } from "react";
const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
function Footer() {
  const navigate: (to: string) => void = useNavigate();
  const dispatch = useDispatch();
  const { fullScreen }: { fullScreen: boolean } = useSelector(
    (state: any) => state.general
  );
  const { floor }: { floor: any  } = useSelector(
    (state: any) => state.admin
  );




  interface clinicItem {
    name: string;
    id: number;
  }
  const [clinicInfo, setClicnicInfo] = useState<clinicItem | null>();

  useEffect(() => {
    const getClinicInfo = localStorage.getItem("clinic");
    if (getClinicInfo !== null) {
      setClicnicInfo(JSON.parse(getClinicInfo));
    }
  }, []);
  return (
    <Box
      sx={{
        bgcolor: (theme) => theme.palette.primary.light,
        ...center,
        justifyContent: "space-between",
        p: 2,
        position: "fixed",
        width: "100%",
        bottom: "0px",
      }}
    >
      <Box sx={{ ...center }}>
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: 500,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {clinicInfo?.name}
        </Typography>
      </Box>
      <Box sx={{ ...center, gap: "15px" }}>
        {!fullScreen ? (
          <FullscreenIcon
            onClick={() => dispatch<any>(changeFullScreen(true))}
            fontSize="large"
            sx={{
              fill: (theme) => theme.palette.text.secondary,
              cursor: "pointer",
            }}
          />
        ) : (
          <FullscreenExitIcon
            onClick={() => dispatch<any>(changeFullScreen(false))}
            fontSize="large"
            sx={{
              fill: (theme) => theme.palette.text.secondary,
              cursor: "pointer",
            }}
          />
        )}
        <HomeOutlinedIcon
          onClick={() => navigate(reactRouts.home)}
          fontSize="large"
          sx={{
            fill: (theme) => theme.palette.text.secondary,
            cursor: "pointer",
          }}
        />
        <TextField
            select
            InputProps={{
              style: {
                background: "#F2F2F2",
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

        <Divider orientation="vertical" variant="middle" flexItem />
        <img src={logo} width={120} height={50} />
      </Box>
    </Box>
  );
}

export default Footer;
