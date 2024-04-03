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
import { deleteRoom, getRoomList } from "../../../Redux/slices/Admin";
import { RoomExpEdit } from "./RoomTableEdit";

export default function RoomTable() {
  const { room, refresh }: { room: any; refresh: boolean } = useSelector(
    (state: any) => state.admin
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(getRoomList());
  }, [refresh]);
  return (
    <TableContainer sx={{ maxHeight: 350 }}>
      {room.list.length > 0 ? (
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                نام اتاق ـ طبقه
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                شماره
              </TableCell>
              <TableCell sx={{ fontWeight: 600 }} align="center">
                عملیات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {room?.list.map((row: any) => (
              <TableRow
                key={row?.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  {row?.name === "room" ? "اتاق" : "پذیرش"}-{row?.floor_name}
                </TableCell>
                <TableCell align="center">{row?.number}</TableCell>

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
                    onClick={() => dispatch<any>(deleteRoom(row?.id))}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        fill: (theme) => theme.palette.warning.main,
                      },
                    }}
                  />
                  <RoomExpEdit
                    name={row?.name}
                    floor_name={row?.floor_name}
                    number={`${row?.number}`}
                    room_id={row?.id}
                    media_id={row?.media_id}
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
