import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Footer from "../components/Queue/Footer";
import { DocumentFullScreen } from "@chiragrupani/fullscreen-react";
import { useDispatch, useSelector } from "react-redux";
import { changeFullScreen } from "../Redux/slices/General";
import { SignleCard } from "../components/Queue/SignleCard";
import io from "socket.io-client";
import { getAdminsListWithDoctor, setActiveQueueCard } from "../Redux/slices/Admin";

export const Queue = () => {
  const [userName, setUsername] = useState("");
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUsername(userInfo?.username);
  }, []);

  const [webSocket, setWebSocket] = useState(false);
  const { queueDt, activeQueueCard } = useSelector(state => state.admin)

  const socketReceiver = () => {
    const socket = io(`wss://rt.artps.ir:4545?username=${userName}`).connect();
    socket.on("message", function (data) {
      console.log("SOCKET_DATA: => ", data);
      for (let a; a < data?.audios?.length; a++) {
        const audio = new Audio(data.audios[a]);
        try {
          audio.play();
        } catch (err) {
          console.log("socket_error", err);
        }
      }
    });
  };

  const requestNotificationPermission = () => {
    if (window.Notification) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted");
        } else {
          console.log("Notification permission denied");
        }
      });
    }
  };

  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAdminsListWithDoctor())
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAdminsListWithDoctor());
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  // useEffect(() => {
  //   const interval = setInterval(async() => {

  //   let audios = JSON.parse(localStorage.getItem("audios"))
  // if(audios?.length > 0 && activeQueueCard === null){
  // let toPlay = audios[0]
  // dispatch(setActiveQueueCard(toPlay?.id));

  // const playAudio = async () => {
  //         for (let i = 0; i < toPlay?.audios?.length; i++) {
  //           let audio = new Audio(toPlay?.audios[i]);
  //           if (audio === undefined) {
  //             console.log("tes", audio);
  //           }
  //           await audio.play();
  //           await new Promise((resolve) =>
  //             audio.addEventListener("ended", resolve)
  //           );
  //         }
  //       };

  //       await playAudio();

  //       dispatch(setActiveQueueCard(null));
  // let newaud = audios?.filter(itm => itm?.id !== toPlay?.id)
  // if(newaud?.length > 0) {
  // localStorage.setItem("audios", JSON.stringify(audios?.filter(itm => itm?.id !== toPlay?.id)))
  // }else{
  // localStorage.removeItem("audios")
  // }

  // }
  // }, 2000);

  // return () => {
  //   clearInterval(interval);
  // };
  // }, []);


  //?
  // const playAudio = async (audios) => {
  //   for (let i = 0; i < audios.length; i++) {
  //     let audio = new Audio(audios[i]);
  //     if (audio === undefined) {
  //       console.log("Error creating audio instance");
  //     }
  //     await audio.play();
  //     await new Promise((resolve) => audio.addEventListener("ended", resolve));
  //   }
  // };

  // const playNextAudio = async (audios) => {
  //   if (audios.length > 0 && activeQueueCard === null) {
  //     let toPlay = audios[0];
  //     dispatch(setActiveQueueCard(toPlay?.id));

  //     await playAudio(toPlay?.audios);

  //     dispatch(setActiveQueueCard(null));

  //     let newAudios = audios.filter((itm) => itm?.id !== toPlay?.id);
  //     if (newAudios.length > 0) {
  //       playNextAudio(newAudios);
  //     }
  //   }
  // };

  // useEffect(() => {
  //   let audios = JSON.parse(localStorage.getItem("audios"));
  //   if (audios?.length > 0 && activeQueueCard === null) {
  //     playNextAudio(audios);
  //   }
  // }, [activeQueueCard]);

  //!

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
      {/* <Box sx={{ height: "100%",position:"relative" }}> */}
      <Box sx={{}}>

        <Grid container sx={{ width: "100%" }}>
          {
            (queueDt?.data?.length > 0 && queueDt?.data?.filter(d => d?.doc_info?.id)?.length > 0) ?
              queueDt?.data?.map((dt, index) => (
                <Grid key={index} xs={6} sx={{}}>
                  <SignleCard activeQueueCard={activeQueueCard} data={dt} />
                </Grid>
              )) : null}
        </Grid>
      </Box>
      <Footer />
      {/* </Box> */}
    </DocumentFullScreen>
  );
};
