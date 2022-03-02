import { Typography } from "@mui/material";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import Banner from "../components/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ProductCard from "../components/ProductCard";
import FourColumnSlider from "../components/FourColumnSlider";
import BrandCard from "../components/BrandCard";

const endpoint = "http://localhost:1337/graphql";

export const FEATURED_PRODUCT_QUERY = gql`
  query FEATURED_PRODUCT_QUERY {
    products(where: { featured: true }) {
      Nombre
      Price
      picture {
        alternativeText
        url
      }
      stock {
        Stock
      }
      discount
      featured
      id
      categories {
        Category
      }
    }
    usd {
      usd
      emergency
    }
    brands(sort: "Position:asc", where: { Position_gt: 0 }) {
      Name
      Logo {
        url
      }
    }
  }
`;

export default function Home() {
  const { data, error, loading } = useQuery(
    "sliderProducts",
    async () => await request(endpoint, FEATURED_PRODUCT_QUERY)
  );
  if (loading) return <p>Obteniendo Productos...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  return (
    <div>
      <Banner></Banner>
      <FourColumnSlider title="Destacados">
        {data?.products.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} usd={data.usd}></ProductCard>
          </SwiperSlide>
        ))}
      </FourColumnSlider>
      <FourColumnSlider title="Las mejores marcas">
        {data?.brands.map((brand) => (
          <SwiperSlide key={brand.Name}>
            <BrandCard brand={brand}></BrandCard>
          </SwiperSlide>
        ))}
      </FourColumnSlider>
    </div>
  );
}
