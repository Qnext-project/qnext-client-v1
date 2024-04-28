import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../components/Queue/Footer";
import { DocumentFullScreen } from "@chiragrupani/fullscreen-react";
import { useDispatch, useSelector } from "react-redux";
import { changeFullScreen } from "../Redux/slices/General";
import { SignleCard } from "../components/Queue/SignleCard";
import {
  getAdminsListWithDoctor,
  setActiveQueueCard,
} from "../Redux/slices/Admin";

export const Queue = () => {
  // const [userName, setUsername] = useState("");
  // useEffect(() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   setUsername(userInfo?.username);
  // }, []);
  const { queueDt, activeQueueCard } = useSelector((state) => state.admin);
  const { floor_id } = useSelector((state) => state.general);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminsListWithDoctor(floor_id));
  }, [floor_id]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAdminsListWithDoctor(floor_id));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [floor_id]);

  const playAudio = async (audios) => {
    for (let i = 0; i < audios.length; i++) {
      let audio = new Audio(audios[i]);
      if (audio === undefined) {
        console.log("Error creating audio instance");
      }
      await audio.play();
      await new Promise((resolve) => audio.addEventListener("ended", resolve));
    }
  };

  const playNextAudio = async (audios) => {
    if (audios.length > 0 && activeQueueCard === null) {
      let toPlay = audios[0];
      dispatch(setActiveQueueCard(toPlay?.id));

      await playAudio(toPlay?.audios);

      dispatch(setActiveQueueCard(null));

      audios.splice(0, 1);

      if (audios.length > 0) {
        localStorage.setItem("audios", JSON.stringify(audios));
        playNextAudio(audios);
      } else {
        localStorage.removeItem("audios");
      }
    }
  };

  useEffect(() => {
    let audios = JSON.parse(localStorage.getItem("audios"));
    if (audios?.length > 0 && activeQueueCard === null) {
      playNextAudio(audios);
    }
  }, [activeQueueCard]);

  const { fullScreen } = useSelector((state) => state.general);
  return (
    <DocumentFullScreen
      isFullScreen={fullScreen}
      onChange={(isFullScreen) => {
        dispatch < any > changeFullScreen(isFullScreen);
      }}
    >
      <Box>
        <Grid container sx={{ width: "100%" }}>
          {queueDt?.data?.length > 0 &&
            queueDt?.data?.filter((d) => d?.doc_info?.id)?.length > 0
            ? queueDt?.data?.map((dt, index) => (
              <Grid key={index} xs={6} sx={{}}>
                {dt?.doc_info?.id ? (
                  <SignleCard activeQueueCard={activeQueueCard} data={dt} />
                ) : null}
              </Grid>
            ))
            : null}
        </Grid>
      </Box>
      <Footer />
    </DocumentFullScreen>
  );
};
