import React from "react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import styles from "../styles/Banner.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
SwiperCore.use([Navigation, Pagination, Autoplay]);

const endpoint = "http://localhost:1337/graphql";

export const ALL_BANNERS_QUERY = gql`
  query ALL_BANNERS_QUERY {
    banners(sort: "position:asc") {
      id
      position
      Picture {
        url
        alternativeText
      }
    }
  }
`;

function Banner(props) {
  const { data, error, status } = useQuery(
    "bannerProducts",
    async () => await request(endpoint, ALL_BANNERS_QUERY)
  );
  if (status === "loading") return <p>Obteniendo Productos...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data.banners);
  return (
    <div className={styles.caroussel}>
      <Swiper
        slidesPerView={1}
        spaceBetween={50}
        loop={true}
        pagination={{ clickable: true }}
        speed={1000}
        autoplay={{
          delay: 6000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
      >
        {data.banners.map((banner) => (
          <SwiperSlide key={banner.id} className={styles.slide}>
            <Image
              src={banner.Picture.url}
              layout="fill"
              alt={banner.Picture.alternativeText}
              objectFit="cover"
            ></Image>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
export default Banner;
