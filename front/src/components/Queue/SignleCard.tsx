import { Box, Typography } from "@mui/material";
import React from "react";
import { digitsEnToFa } from "@persian-tools/persian-tools";

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
interface propType {
  data: any;
  activeQueueCard: any;
}
export const SignleCard: React.FC<propType> = ({ data, activeQueueCard }) => {
  return (
    <Box
      sx={{
        ...center,
        justifyContent: "space-between",
        py: 2,
        // p: 1,
        m: 1,
        width: "90%",
        borderRadius: "12px",
        boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
        border:
          activeQueueCard == data?.id ? "3px solid yellow" : "1px solid gray",
        backgroundColor: activeQueueCard == data?.id ? "yellow" : "white",
      }}
    >
      <Box
        sx={{
          width: "40%",
          ...center,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            bgcolor: (theme) => theme.palette.primary.dark,
            color: (theme) => theme.palette.text.secondary,
            textAlign: "center",
            fontSize: "32px",
            fontWeight:600,
            p: 1,
            width: "50%",
            borderRadius: "12px",
          }}
        >
          {`اتاق ${data?.doc_info!==null? digitsEnToFa(data?.doc_info?.room):""}`}
        </Typography>
        {/* <Box sx={{...center,flexDirection:"column"}}> */}
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            color: (theme) => theme.palette.primary.light,
            textAlign: "center",
          }}
        >
          {data && data?.doc_info?.name}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            color: (theme) => theme.palette.primary.light,
            textAlign: "center",
          }}
        >
          {`${data && data?.doc_info?.title}-${
            data && data?.doc_info?.expertise
          }`}
        </Typography>
        {/* </Box> */}
      </Box>
      <Box sx={{ width: "40%" }}>
        <Typography
          sx={{
            fontSize: "5rem",
            fontWeight: 600,
            color: (theme) => theme.palette.primary.dark,
            textAlign: "center",
          }}
        >
          {data?.current_turn_number!==null? digitsEnToFa(parseInt(data?.current_turn_number)):""}
        </Typography>
      </Box>
    </Box>
  );
};
