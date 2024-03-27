import { Box } from "@mui/material";
import Header from "../../components/Setting/Header";
import { DefineUsers } from "../../components/Setting/DefineUsers";

function Setting() {
  return (
    <Box sx={{ height: "100svh" }}>
      <Box sx={{ height: "10%" }}>
        <Header />
      </Box>
   <DefineUsers/>
    </Box>
  );
}

export default Setting;
