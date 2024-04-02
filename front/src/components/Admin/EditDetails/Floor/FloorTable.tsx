import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TitleExpEdit } from "../TitleExpEdit";
import { getFloorList } from "../../../../Redux/slices/Admin";


export default function FloorTable() {
  const { floor, refresh }: { floor: any; refresh: boolean } =
    useSelector((state: any) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getFloorList());
  }, [refresh]);
  return (
    <TableContainer sx={{ maxHeight: 350 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }} align="center">
              عنوان
            </TableCell>
  
            <TableCell sx={{ fontWeight: 600 }} align="center">
              عملیات
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {floor.list?.map((row: any) => (
  
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.name}</TableCell>


              <TableCell
                align="center"
                sx={{ display: "flex", justifyContent: "center", gap: "15px" }}
              >
                <DeleteOutlineIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": { fill: (theme) => theme.palette.warning.main },
                  }}
                //   onClick={() => dispatch<any>(deleteExpertise(row?.id))}
                />
                <TitleExpEdit
                  name={row?.name}
                  media={row?.media_url}
                  media_id={row?.media_id}
                  row_id={row?.id}
                  is_title={row?.is_title}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
