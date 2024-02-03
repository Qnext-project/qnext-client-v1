import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteExpertise, getExpTitleList } from "../../../Redux/slices/Admin";
import { TitleExpEdit } from "./TitleExpEdit";

export default function ExpertsTable() {
  const { expertiseTitle, refresh }: { expertiseTitle: any; refresh: boolean } =
    useSelector((state: any) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(getExpTitleList());
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
              فایل صوتی
            </TableCell>
            <TableCell sx={{ fontWeight: 600 }} align="center">
              عملیات
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expertiseTitle?.listExp?.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row?.name}</TableCell>
              <TableCell align="center">
                <audio controls>
                  <source src={row?.media_url} type="audio/mp3" />
                  <source src={row?.media_url} type="audio/wav" />
                  Your browser does not support the audio element.
                </audio>
              </TableCell>

              <TableCell
                align="center"
                sx={{ display: "flex", justifyContent: "center", gap: "15px" }}
              >
                <DeleteOutlineIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": { fill: (theme) => theme.palette.warning.main },
                  }}
                  onClick={() => dispatch<any>(deleteExpertise(row?.id))}
                />
                <TitleExpEdit
                  is_title={row?.is_title}
                  name={row?.name}
                  media={row?.media_url}
                  media_id={row?.media_id}
                  row_id={row?.id}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
