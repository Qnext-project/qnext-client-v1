import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "../../components/Admin/Header";
import AddIcon from "@mui/icons-material/Add";
import UserTable from "../../components/Admin/UserTable";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateNewUser,
  addNewUserInfo,
  changeSection,
} from "../../Redux/slices/Admin";
import Title from "../../components/Admin/EditDetails/Title";
import ExpertTitle from "../../components/Admin/EditDetails/ExpertTitle";
import Room from "../../components/Admin/EditDetails/Room";
import EditClinic from "../../components/Admin/EditClinic";
import { Voice } from "../../components/Admin/EditDetails/Voice";
import { getClinicName } from "../../Redux/slices/General";
import { Floor } from "../../components/Admin/EditDetails/Floor/Floor";

const Admin: React.FC = () => {
  const dispatch = useDispatch();

  const {
    tab,
    detailSection,
    loading,
    newUser,
  }: { tab: number; detailSection: number; loading: boolean; newUser: any } =
    useSelector((state: any) => state.admin);

  const { name }: { name: string } = useSelector((state: any) => state.general);
  const [acl, setAcl] = useState<any>([]);

  useEffect(() => {
    dispatch(
      addNewUserInfo({
        key: "acl",
        value: acl,
      })
    );
  }, [acl, dispatch]);

  useEffect(() => {
    const clinicDataString = localStorage.getItem("clinic");

    if (clinicDataString !== null) {
      const clinicData = JSON.parse(clinicDataString);
      dispatch<any>(getClinicName(clinicData.name));
    } else {
      console.error("No clinic data found in localStorage");
    }
  }, []);

  const handleAcl = (event: any) => {
    if (event.target.checked) {
      setAcl((prevAcl: string[]) => [...prevAcl, event.target.id]);
    } else {
      setAcl((prevAcl: any[]) =>
        prevAcl.filter((item: any) => item !== event.target.id)
      );
    }
  };
  return (
    <Box sx={{ height: "100svh" }}>
      <Box sx={{ height: "10%" }}>
        <Header />
      </Box>
      {tab && tab === 1 ? (
        <Box
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
            m: 2,
            p: 2,
            height: "85%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Box>
                <Typography>نام کاربری</Typography>
                <TextField
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
              </Box>
              <Box>
                <Typography> رمزعبور</Typography>
                <TextField
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
              </Box>
            </Box>

            <Box>
              <Typography>دسترسی</Typography>

              <Box sx={{ display: "flex" }}>
                <FormControlLabel
                  control={
                    <Checkbox id="personnel" onClick={(e) => handleAcl(e)} />
                  }
                  label="کاربر"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="queue" onClick={(e) => handleAcl(e)} />
                  }
                  label="صف نوبت"
                />
                <FormControlLabel
                  control={
                    <Checkbox id="setting" onClick={(e) => handleAcl(e)} />
                  }
                  label="تنظیمات"
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Button
                disabled={
                  newUser.username.length <= 0 || newUser.password.length <= 0
                    ? true
                    : false
                }
                onClick={() => dispatch<any>(CreateNewUser())}
                variant="contained"
                sx={{ bgcolor: (theme) => theme.palette.success.main }}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : (
                  <>
                    افزودن
                    <AddIcon
                      sx={{ fill: (theme) => theme.palette.text.secondary }}
                    />
                  </>
                )}
              </Button>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          <UserTable />
        </Box>
      ) : (
        <Box
          sx={{
            borderRadius: "12px",
            boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
            m: 2,
            p: 2,
            height: "85%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "15px",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <Typography sx={{ fontWeight: 500, fontSize: "20px" }}>
                نام کلینیک:
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: "20px",
                  color: (theme) => theme.palette.primary.light,
                }}
              >
                {name}
              </Typography>
            </Box>
            <EditClinic />
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "25px",
              justifyContent: "flex-start",
              alignItems: "center",
              my: 2,
            }}
          >
            <Button
              onClick={() => dispatch<any>(changeSection(1))}
              variant="contained"
              sx={{
                bgcolor: (theme) =>
                  detailSection === 1
                    ? theme.palette.text.secondary
                    : theme.palette.primary.dark,
                color: (theme) =>
                  detailSection === 1
                    ? theme.palette.primary.dark
                    : theme.palette.text.secondary,
                width: "5rem",
              }}
            >
              طبقه
            </Button>
            <Button
              onClick={() => dispatch<any>(changeSection(2))}
              variant="contained"
              sx={{
                bgcolor: (theme) =>
                  detailSection === 2
                    ? theme.palette.text.secondary
                    : theme.palette.primary.dark,
                color: (theme) =>
                  detailSection === 2
                    ? theme.palette.primary.dark
                    : theme.palette.text.secondary,
                width: "5rem",
              }}
            >
              بخش
            </Button>
            <Button
              onClick={() => dispatch<any>(changeSection(3))}
              variant="contained"
              sx={{
                bgcolor: (theme) =>
                  detailSection === 3
                    ? theme.palette.text.secondary
                    : theme.palette.primary.dark,
                color: (theme) =>
                  detailSection === 3
                    ? theme.palette.primary.dark
                    : theme.palette.text.secondary,
                width: "5rem",
              }}
            >
              عنوان
            </Button>

            <Button
              onClick={() => dispatch<any>(changeSection(4))}
              variant="contained"
              sx={{
                bgcolor: (theme) =>
                  detailSection === 4
                    ? theme.palette.text.secondary
                    : theme.palette.primary.dark,
                color: (theme) =>
                  detailSection === 4
                    ? theme.palette.primary.dark
                    : theme.palette.text.secondary,
                width: "7rem",
              }}
            >
              نوع تخصص
            </Button>

            <Button
              onClick={() => dispatch<any>(changeSection(5))}
              variant="contained"
              sx={{
                bgcolor: (theme) =>
                  detailSection === 5
                    ? theme.palette.text.secondary
                    : theme.palette.primary.dark,
                color: (theme) =>
                  detailSection === 5
                    ? theme.palette.primary.dark
                    : theme.palette.text.secondary,
                // width: "7rem",
              }}
            >
              فایل های صوتی
            </Button>
          </Box>
          <Box
            sx={{
              borderRadius: "12px",
              boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
              m: 2,
              p: 2,
              height: "80%",
            }}
          >
            {detailSection === 1 ? (
              <Floor />
            ) : detailSection === 2 ? (
              <Room />
            ) : detailSection === 3 ? (
              <Title />
            ) : detailSection === 4 ? (
              <ExpertTitle />
            ) : (
              <Voice />
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Admin;
