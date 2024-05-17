// import { Box, CircularProgress, Grid } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import Footer from "../components/Queue/Footer";
// import { DocumentFullScreen } from "@chiragrupani/fullscreen-react";
// import { useDispatch, useSelector } from "react-redux";
// import { changeFullScreen } from "../Redux/slices/General";
// import { SignleCard } from "../components/Queue/SignleCard";
// import {
//   getAdminsListWithDoctor,
//   setActiveQueueCard,
// } from "../Redux/slices/Admin";

// export const Queue = () => {
//   const [localQueue, setLocalQueue] = useState();
//   const [isPlaying, setIsPlaying] = useState(true);
//   const { queueDt, activeQueueCard } = useSelector((state) => state.admin);
//   const { floor_id } = useSelector((state) => state.general);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAdminsListWithDoctor(floor_id));
//   }, []);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       dispatch(getAdminsListWithDoctor(floor_id));
//     }, 3000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [floor_id]);

//   const playAudio = async (audios) => {
//     for (let i = 0; i < audios?.length; i++) {
//       let audio = new Audio(audios[i]);
//       await new Promise((resolve) => {
//         audio.addEventListener("play", () => {
//           console.log("Audio is playing!");
//         });
//         audio.addEventListener("ended", () => {
//           resolve();
//           console.log("Audio is  not playing!");
//         });
//         audio.play();
//       });
//     }
//   };

//   const playNextAudio = async (audios) => {
//     if (audios?.length > 0 && activeQueueCard === null) {
//       let toPlay = audios[0];
//       dispatch(setActiveQueueCard(toPlay?.id));
//       console.log("Audio is playing!", isPlaying);

//       setIsPlaying(false);
//       await playAudio(toPlay?.audios);
//       setIsPlaying(true);

//       console.log("Audio is not playing!", isPlaying);
//       dispatch(setActiveQueueCard(null));

//       // audios.splice(0, 1);
//       audios.shift();

//       if (audios?.length > 0) {
//         localStorage.setItem("audios", JSON.stringify(audios));
//         await playNextAudio(audios);
//       } else {
//         localStorage.removeItem("audios");
//       }
//     }
//   };

//   useEffect(() => {
//     let audios = JSON.parse(localStorage.getItem("audios"));
//     if (audios?.length > 0 && activeQueueCard === null) {
//       setLocalQueue(audios);
//     }
//   }, [activeQueueCard]);

//   useEffect(() => {
//     if (isPlaying) {
//       console.log("here");
//       playNextAudio(localQueue);
//     }
//   }, [localQueue, isPlaying]);

//   const { fullScreen } = useSelector((state) => state.general);
//   return (
//     <DocumentFullScreen
//       isFullScreen={fullScreen}
//       onChange={(isFullScreen) => {
//         dispatch < any > changeFullScreen(isFullScreen);
//       }}
//     >
//       <Box>
//         <Grid container sx={{ width: "100%" }}>
//           {queueDt?.data?.length > 0 &&
//             queueDt?.data?.filter((d) => d?.doc_info?.id)?.length > 0
//             ? queueDt?.data?.map((dt, index) => (
//               <Grid key={index} xs={6} sx={{}}>
//                 {dt?.doc_info?.id ? (
//                   <SignleCard activeQueueCard={activeQueueCard} data={dt} />
//                 ) : null}
//               </Grid>
//             ))
//             : null}
//         </Grid>
//       </Box>
//       <Footer />
//     </DocumentFullScreen>
//   );
// };

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
  const [localQueue, setLocalQueue] = useState();
  const [isPlaying, setIsPlaying] = useState(true);
  const { queueDt, activeQueueCard } = useSelector((state) => state.admin);
  const { floor_id } = useSelector((state) => state.general);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminsListWithDoctor(floor_id));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getAdminsListWithDoctor(floor_id));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [floor_id]);

  const playAudio = async (audios) => {
    for (let i = 0; i < audios?.length; i++) {
      let audio = new Audio(audios[i]);
      await new Promise((resolve) => {
        audio.addEventListener("play", () => {
          console.log("Audio is playing!");
        });
        audio.addEventListener("ended", () => {
          resolve();
          console.log("Audio is not playing!");
        });
        audio.play();
      });
    }
  };

  const playNextAudio = async (audios) => {
    if (audios?.length > 0 && activeQueueCard === null) {
      let toPlay = audios[0];
      const lastPlayedAudio = localStorage.getItem("lastPlayedAudio");

      if (lastPlayedAudio && JSON.stringify(toPlay.audios) === lastPlayedAudio) {
        console.log("Skipping duplicate audio");
        audios.shift(); // Remove the first audio as it's the same
        if (audios.length > 0) {
          localStorage.setItem("audios", JSON.stringify(audios));
          await playNextAudio(audios); // Recursively play the next audio
        } else {
          localStorage.removeItem("audios");
        }
        return;
      }

      dispatch(setActiveQueueCard(toPlay?.id));


      setIsPlaying(false);
      await playAudio(toPlay?.audios);
      setIsPlaying(true);


      dispatch(setActiveQueueCard(null));

      // Store the last played audio
      localStorage.setItem("lastPlayedAudio", JSON.stringify(toPlay.audios));

      audios.shift();

      if (audios?.length > 0) {
        localStorage.setItem("audios", JSON.stringify(audios));
        await playNextAudio(audios);
      } else {
        localStorage.removeItem("audios");
      }
    }
  };

  useEffect(() => {
    let audios = JSON.parse(localStorage.getItem("audios"));
    if (audios?.length > 0 && activeQueueCard === null) {
      setLocalQueue(audios);
    }
  }, [activeQueueCard]);

  useEffect(() => {
    if (isPlaying) {

      playNextAudio(localQueue);
    }
  }, [localQueue, isPlaying]);

  const { fullScreen } = useSelector((state) => state.general);
  return (
    <DocumentFullScreen
      isFullScreen={fullScreen}
      onChange={(isFullScreen) => {
        dispatch(changeFullScreen(isFullScreen));
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
