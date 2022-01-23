import { Typography } from "@mui/material";
import { request, gql } from "graphql-request";
import { useQuery } from "react-query";

const endpoint = "http://localhost:1337/graphql";

export default function Home() {
  const { data, status } = useQuery("test", async () => {
    const myData = await request(
      endpoint,
      gql`
        query Categories {
          categories {
            id
            Category
            parentCategories {
              id
              Category
            }
            categories {
              Category
              id
            }
          }
        }
      `
    );
    return myData;
  });
  return (
    <div>
      <Typography>font test</Typography>
    </div>
  );
}
