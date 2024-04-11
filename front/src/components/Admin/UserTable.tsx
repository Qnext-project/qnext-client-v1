import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { DeleteUser, DoctorList, purgeUser } from "../../Redux/slices/Admin";
import { Box, Typography } from "@mui/material";
import { EditUserInfo } from "./EditUser";
import LogoutIcon from "@mui/icons-material/Logout";
export default function UserTable() {
  const { doctors, refresh }: { doctors: []; refresh: boolean } = useSelector(
    (state: any) => state.admin
  );
  const dispach = useDispatch();
  React.useEffect(() => {
    dispach<any>(DoctorList());
  }, [refresh]);
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

  function translateArrayToPersian(array: any[]) {
    const persianArray = array?.map((word: any) => translateToPersian(word));
    const resultString = persianArray?.join(" -  ");
    return resultString;
  }

  return (
    <>
      {doctors?.length > 0 ? (
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  نام کاربری
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  رمز عبور
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  دسترسی
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  عملیات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {doctors &&
                doctors?.map((row: any, index: number) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row?.username}</TableCell>
                    <TableCell align="center">{row?.fpass}</TableCell>
                    <TableCell align="center">
                      {translateArrayToPersian(row?.acl)}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        gap: "15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <DeleteOutlineIcon
                        onClick={() => dispach<any>(DeleteUser(row?.id))}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            fill: (theme) => theme.palette.warning.main,
                          },
                        }}
                      />
                      {/* <EditIcon /> */}
                      <EditUserInfo
                        username={row?.username}
                        password={row?.fpass}
                        user_acl={row?.acl}
                        user_Id={row?.id}
                      />
                      <LogoutIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => dispach<any>(purgeUser(row?.id))}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: (theme) => theme.palette.primary.light,
              fontSize: "20px",
              fontWeight: 600,
            }}
          >
            موردی یافت نشد
          </Typography>
        </Box>
      )}
    </>
  );
}
