import { Box, Grid, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { DoctorList } from "../../../Redux/slices/Admin";
import { useDispatch, useSelector } from "react-redux";
import { UserLable } from "./UserLable";

export const RoomSetting: FC = () => {
  const { doctors, refresh }: { doctors: any; refresh: boolean } = useSelector(
    (state: any) => state.admin
  );
  const dispach = useDispatch();
  useEffect(() => {
    dispach<any>(DoctorList());
  }, [refresh]);
  return (
    <Box sx={{ p: 1, width: "100%" }}>
      <Typography sx={{ fontSize: "24px", fontWeight: 600 }}>
        لیست کاربران
      </Typography>
      <Typography
        sx={{
          fontSize: "14px",
          my: 4,
          fontWeight: "700",
                  color: (theme) => theme.palette.warning.light,
          textAlign:"center"
        }}
      >
        برای خروج از اتاق بر روی دکمه خروج کلیک کنید
      </Typography>

      <Grid container spacing={1} sx={{ mt: 2 }}>
        {doctors &&
          doctors?.map((item: any, index: number) => (
            <Grid xs={4} key={index} sx={{}}>
              <UserLable userName={item.username} user_id={item?.id} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};
