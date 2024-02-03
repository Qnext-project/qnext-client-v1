import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { deleteDoctor, getDoctors } from "../../Redux/slices/Setting";
import PlayCircleFilledWhiteOutlinedIcon from "@mui/icons-material/PlayCircleFilledWhiteOutlined";
import { EditDoctor } from "./EditDoctor";
export default function DefineUserTable() {
  const { newDoctor, refresh }: { newDoctor: any; refresh: boolean } =
    useSelector((state: any) => state.setting);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(getDoctors());
  }, [refresh]);

  const play = (audioPaths: any, index = 0) => {
    if (index < audioPaths.length) {
      const audio = new Audio(audioPaths[index]);
      audio.addEventListener("ended", function () {
        play(audioPaths, index + 1);
      });

      audio.play();
    }
  };

  return (
    <TableContainer sx={{ maxHeight: 350 }}>
      {newDoctor?.list && newDoctor?.list.length > 0 ? (
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                نام و نام خانوادگی
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                عنوان
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                نوع تخصص
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                صوت
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {newDoctor?.list &&
              newDoctor?.list.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">
                    {row?.first_name} {row?.last_name}
                  </TableCell>
                  <TableCell align="center">{row?.title_name}</TableCell>
                  <TableCell align="center">{row?.expertise_name}</TableCell>
                  <TableCell align="center">
                    <PlayCircleFilledWhiteOutlinedIcon
                      onClick={() => play(row?.expertise_audio_url)}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          fill: (theme) => theme.palette.primary.light,
                        },
                      }}
                    />
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap:"15px"
                    }}
                  >
                    <DeleteOutlineIcon
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          fill: (theme) => theme.palette.warning.main,
                        },
                      }}
                      onClick={() => dispatch<any>(deleteDoctor(row?.id))}
                    />
                    <EditDoctor
                      first_name={row?.first_name}
                      last_name={row?.last_name}
                      title_name={row?.title_name}
                      expertise_name={row?.expertise_name}
                      title_id={`${row?.title_id}`}
                      expertise_id={`${row?.expertise_id}`}
                      audios={row?.expertise_audio_url}
                      user_id={row?.id}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: " center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: (theme) => theme.palette.primary.light,
            }}
          >
            موردی یافت نشد
          </Typography>
        </Box>
      )}
    </TableContainer>
  );
}
