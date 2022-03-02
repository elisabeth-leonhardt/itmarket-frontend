import { Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

function FourColumnSlider({ children, title }) {
  return (
    <section className="app-container">
      <Typography component="h1" variant="h4" className="red-text">
        {title}
      </Typography>
      <Swiper
        spaceBetween={40}
        navigation
        id="four-column-slider"
        breakpoints={{
          2: {
            slidesPerView: 1,
          },
          450: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {children}
      </Swiper>
    </section>
  );
}

export default FourColumnSlider;
