import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
// import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

import { useDispatch, useSelector } from "react-redux";
import FloorTable from './FloorTable';
import { createNewFloor, setFloorInfo } from "../../../../Redux/slices/Admin";



export const Floor: React.FC = () => {
  const dispatch = useDispatch();
  const { loading }: { loading: boolean } = useSelector(
    (state: any) => state.admin
  );

  


  return (
    <Box sx={{}}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: 500,
          color: (theme) => theme.palette.primary.main,
        }}
      >
        لیست طبقه ها
      </Typography>
      <Box sx={{ display: "flex", gap: "5px", my: 2 }}>
        <Box>
  
     <TextField
            onChange={(e) =>
              dispatch(
                setFloorInfo({
                  key: "name",
                  value: e.target.value,
                })
              )
            }
            placeholder="طبقه"
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
          <Button
            onClick={() => dispatch<any>(createNewFloor())}
            sx={{ bgcolor: (theme) => theme.palette.success.main }}
            component="label"
            variant="contained"
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <>
                <Typography
                  sx={{ color: (theme) => theme.palette.text.secondary, mx: 2 }}
                >
                  افزودن
                </Typography>
                <AddIcon
                  sx={{ fill: (theme) => theme.palette.text.secondary }}
                />
              </>
            )}
          </Button>
        </Box>
      </Box>
      <FloorTable />
      {/* </Box> */}
    </Box>
  );
};


