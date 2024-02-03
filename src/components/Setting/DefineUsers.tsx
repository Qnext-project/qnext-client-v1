import {
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import DefineUserTable from "./DefineUserTable";
import { getExpTitleList } from "../../Redux/slices/Admin";
import { addDRInfo, createDoctor } from "../../Redux/slices/Setting";

export const DefineUsers: React.FC = () => {
  const { loading, newDoctor }: { loading: number; newDoctor: any } =
    useSelector((state: any) => state.setting);

  const { expertiseTitle }: { expertiseTitle: any } = useSelector(
    (state: any) => state.admin
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(getExpTitleList());
  }, []);
  return (
    <Box>
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
              <Typography>نام </Typography>
              <TextField
                onChange={(e) =>
                  dispatch(
                    addDRInfo({
                      key: "first_name",
                      value: e.target.value,
                    })
                  )
                }
                type="text"
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
              <Typography> نام خانوادگی</Typography>
              <TextField
                onChange={(e) =>
                  dispatch(
                    addDRInfo({
                      key: "last_name",
                      value: e.target.value,
                    })
                  )
                }
                type="text"
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
              <Typography> عنوان </Typography>
              <TextField
                onChange={(e) =>
                  dispatch(
                    addDRInfo({
                      key: "title_id",
                      value: e.target.value,
                    })
                  )
                }
                select
                type="text"
                id="input-with-icon-textfield"
                InputProps={{
                  style: {
                    // background: "#F2F2F2",
                    color: "#000",
                    direction: "ltr",
                    height: "40px",
                    width: "10rem",
                  },
                }}
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">
                  <Typography
                    sx={{
                      fontSize: "12px",

                      fontWeight: 400,
                    }}
                  >
                    عنوان
                  </Typography>
                </option>
                {expertiseTitle.listTitle.map((item: any) => (
                  <option key={item.id} value={item?.id}>
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
            </Box>
            <Box>
              <Typography> نوع تخصص</Typography>
              <TextField
                onChange={(e) =>
                  dispatch(
                    addDRInfo({
                      key: "expertise_id",
                      value: e.target.value,
                    })
                  )
                }
                select
                type="text"
                id="input-with-icon-textfield"
                InputProps={{
                  style: {
                    // background: "#F2F2F2",
                    color: "#000",
                    direction: "ltr",
                    height: "40px",
                    width: "10rem",
                  },
                }}
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">
                  <Typography
                    sx={{
                      fontSize: "12px",

                      fontWeight: 400,
                    }}
                  >
                    نوع تخصص
                  </Typography>
                </option>
                {expertiseTitle.listExp.map((item: any) => (
                  <option key={item.id} value={item?.id}>
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
            </Box>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Button
              disabled={
                newDoctor.first_name.length <= 0 ||
                newDoctor.last_name.length <= 0
                  ? true
                  : false
              }
              onClick={() => dispatch<any>(createDoctor())}
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
        <DefineUserTable />
      </Box>
    </Box>
  );
};
