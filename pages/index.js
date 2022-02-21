import { Typography } from "@mui/material";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";
import Banner from "../components/Banner";

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
  }
`;

export default function Home() {
  const { data, error, loading } = useQuery(
    "sliderProducts",
    async () => await request(endpoint, FEATURED_PRODUCT_QUERY)
  );
  if (loading) return <p>Obteniendo Productos...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <Banner></Banner>
      home
    </div>
  );
}
