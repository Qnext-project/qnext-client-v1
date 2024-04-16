import { Box } from "@mui/material";
import Header from "../../components/Setting/Header";
import { DefineUsers } from "../../components/Setting/DefineUsers";
import { useSelector } from "react-redux";
import { RoomSetting } from "../../components/Setting/Room/RoomSetting";

function Setting() {
  const { tab }: { tab: number } = useSelector((state: any) => state.setting);
  return (
    <Box sx={{ height: "100svh" }}>
      <Box sx={{ height: "10%" }}>
        <Header />
      </Box>
      {tab === 1 ? <DefineUsers /> : <RoomSetting/>}
    </Box>
  );
}

export default Setting;
