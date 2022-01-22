import React from "react";

import { useQuery, gql } from "@apollo/client";

const QUERY = gql`
  query Products {
    products {
      id
      Nombre
      picture {
        url
      }
    }
  }
`;

const Test = () => {
  const { data, loading, error } = useQuery(QUERY);
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2>Error!</h2>;
  }
  return <div></div>;
};

export default Test;
