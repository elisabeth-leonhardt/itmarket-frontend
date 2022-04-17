import { Breadcrumbs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { gql } from "graphql-request";
import { request } from "graphql-request";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { useEffect } from "react";
import {
  CATEGORY_QUERY,
  CATEGORY_QUERY_STOCK,
  CATEGORY_QUERY_WITHOUT_STOCK,
  CATEGORY_QUERY_PRICE,
} from "../../utils/categoryQueries";
import ProductsGrid from "../../components/ProductsGrid";
const endpoint = "http://localhost:1337/graphql";

const CATEGORY_PAGE_QUERY = gql`
  query CATEGORY_PAGE_QUERY(
    $category: String
    $skip: Int = 0
    $first: Int = 9
    $sort: String
    $stock: [String]
  ) {
    categories(where: { Category: $category }) {
      Category
      categories {
        Category
      }
      parentCategories {
        Category
        categories {
          Category
        }
      }
    }
    products(
      where: {
        categories: { Category_contains: $category }
        stock: { Stock: $stock }
      }
      limit: $first
      start: $skip
      sort: $sort
    ) {
      Nombre
      Price
      picture {
        url
        alternativeText
      }
      discount
      id
      stock {
        Stock
      }
      categories {
        Category
      }
    }
    productsConnection(
      where: {
        categories: { Category_contains: $category }
        stock: { Stock: $stock }
      }
    ) {
      aggregate {
        count
      }
    }
  }
`;

const filterOptions = {
  sinStock: { sort: undefined, stock: ["Sin Stock"] },
  enStock: { sort: undefined, stock: ["Disponible", "Quedan Pocos"] },
  menorPrecio: { sort: "Price:asc", stock: undefined },
  mayorPrecio: { sort: "Price:desc", stock: undefined },
};

function Product(props) {
  const router = useRouter();
  const [parentCat, setParentCat] = useState(undefined);
  const [page, setPage] = useState(props.page);
  const [productFilter, setProductFilter] = useState("");

  function handlePageChange(e, page) {
    router.push;
  }

  const { data } = useQuery(
    ["categoryPage", page, productFilter, router.query.slug],
    async () => {
      const skip = (page - 1) * 9;
      const filter = filterOptions[router.query.filter];
      return await request(endpoint, CATEGORY_PAGE_QUERY, {
        category: router.query.slug,
        skip: skip,
        ...filter,
      });
    },
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    if (data && data.categories[0].parentCategories.length > 0) {
      const parentCategory = data.categories[0].parentCategories[0].Category;
      setParentCat(parentCategory);
    } else {
      setParentCat(undefined);
    }
  }, [data]);

  console.log(data);

  return (
    <div className="app-container">
      <Breadcrumbs className="breadcrumbs">
        <Link href="/" passHref>
          <a>Home</a>
        </Link>
        {parentCat && (
          <Link href={`/categoria/${parentCat}`}>
            <a>{parentCat}</a>
          </Link>
        )}
        <Typography>{router.query.slug}</Typography>
      </Breadcrumbs>
      <ProductsGrid
        categories={data?.categories[0]}
        products={data?.products}
        data={data}
        page={page}
        setPage={setPage}
      ></ProductsGrid>
    </div>
  );
}

export default Product;

export async function getServerSideProps(context) {
  return {
    props: {
      page: context.query.page || 1,
    },
  };
}
