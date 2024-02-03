import React from "react";
import logo from "../../assets/images/logoWhite.png";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import {
  Keyboard,
  Scrollbar,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import { ADInfo } from "../../utils/data";
import { digitsEnToFa } from "@persian-tools/persian-tools";

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const Ads: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: 2,
          width: "100%",
          ...center,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "start",
          gap: "30px",
        }}
      >
        <img src={logo} width={120} height={50} />
        <Typography
          sx={{
            fontSize: "20px",
            color: (theme) => theme.palette.text.secondary,
            fontWeight: 700,
          }}
        >
          سامانه فراخوان کلینیکی
        </Typography>
      </Box>

      <Swiper
        slidesPerView={1}
        centeredSlides={false}
        slidesPerGroupSkip={1}
        grabCursor={true}
        keyboard={{
          enabled: true,
        }}
        breakpoints={{
          769: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
        }}
        scrollbar={false}
        navigation={false}
        // pagination={pagination}

        // pagination={{
        //     clickable: true, pagination
        // }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Keyboard, Scrollbar, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {ADInfo.map((item, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                ...center,
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                mt: 2,
                width: "100%",
              }}
            >
              <Box
                key={index}
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "25px",
                  width: "100%",
                  // height: "100%",
                }}
              >
                <Typography
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    fontSize: "30px",
                    fontWeight: "bold",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    color: (theme) => theme.palette.text.secondary,
                    fontSize: "18px",
                    mt: 2,
                  }}
                >
                  {item.description}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                {/* <img src={AD} /> */}
                <Box
                  key={index}
                  sx={{
                    background: `url(${item.bg}) center / auto no-repeat  `,
                    overflow: "hidden",
                    objectFit: "fill",
                    position: "relative",
                    borderRadius: "20px",
                    width: "383px",
                    height: "183px",
                    p: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: (theme) => theme.palette.text.secondary,
                      my: 2,
                    }}
                  >
                    {item.AD.text}
                  </Typography>

                  <Box sx={{ ...center}}>
                
         
                   
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: (theme) => theme.palette.text.secondary,
                          my: 2,
                        }}
                      >
                        {digitsEnToFa(item.AD.phoneNumber)}
                      </Typography>
                   
                  </Box>
                </Box>
              </Box>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Ads;
