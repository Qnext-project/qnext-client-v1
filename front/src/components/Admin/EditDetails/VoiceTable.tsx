import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteExpertise } from "../../../Redux/slices/Admin";

import { VoiceList } from "../../../Redux/slices/General";
import { Box, Typography } from "@mui/material";

export default function VoiceTable() {
  const {
    voiceList,
    refresh,
    voiceType,
  }: { voiceList: []; refresh: boolean; voiceType: string } = useSelector(
    (state: any) => state.general
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(VoiceList(voiceType));
  }, [refresh]);
  return (
    <>
      {voiceList?.length > 0 ? (
        <TableContainer sx={{ maxHeight: 310 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  عنوان
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  فایل صوتی
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  عملیات
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {voiceList?.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">
                    <audio controls>
                      <source src={row?.url} type="audio/wav" />
                      <source src={row?.url} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "15px",
                    }}
                  >
                    <DeleteOutlineIcon
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          fill: (theme) => theme.palette.warning.main,
                        },
                      }}
                      onClick={() => dispatch<any>(deleteExpertise(row?.id))}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: (theme) => theme.palette.warning.main,
              textAlign: "center",
            }}
          >
            موردی یافت نشد
          </Typography>
        </Box>
      )}
    </>
  );
}
