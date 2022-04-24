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
    usd {
      usd
      emergency
    }
  }
`;

const filterOptions = {
  todoStock: ["Sin Stock", "Disponible", "Quedan Pocos"],
  sinStock: ["Sin Stock"],
  enStock: ["Disponible", "Quedan Pocos"],
  menorPrecio: "Price:asc",
  mayorPrecio: "Price:desc",
  todoPrecio: undefined,
};

function Product(props) {
  const router = useRouter();
  const [parentCat, setParentCat] = useState(undefined);
  const [page, setPage] = useState(props.page);
  const [stock, setStock] = useState("todoStock");
  const [sort, setSort] = useState("todoPrecio");

  const { data, isSuccess } = useQuery(
    ["categoryPage", router.query.slug, page, stock, sort],
    async () => {
      const skip = (page - 1) * 9;
      return await request(endpoint, CATEGORY_PAGE_QUERY, {
        category: router.query.slug,
        skip: skip,
        stock: filterOptions[stock],
        sort: filterOptions[sort],
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

  useEffect(() => {
    setStock("todoStock");
    setSort("todoPrecio");
  }, [router.query.slug]);

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
      {isSuccess && (
        <ProductsGrid
          categories={data?.categories[0]}
          products={data?.products}
          data={data}
          page={page}
          setPage={setPage}
          setStock={setStock}
          stock={stock}
          setSort={setSort}
          sort={sort}
        ></ProductsGrid>
      )}
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
