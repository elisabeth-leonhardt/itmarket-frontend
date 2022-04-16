import { Breadcrumbs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Link from "next/link";
import { gql } from "graphql-request";
import { request } from "graphql-request";
import { useQuery } from "react-query";
import { useEffect } from "react";
import {
  CATEGORY_QUERY,
  CATEGORY_QUERY_STOCK,
  CATEGORY_QUERY_WITHOUT_STOCK,
  CATEGORY_QUERY_PRICE,
} from "../../utils/categoryQueries";
import ProductsGrid from "../../components/ProductsGrid";
const endpoint = "http://localhost:1337/graphql";

const HAS_CHILD_CATEGORIES_QUERY = gql`
  query HAS_CHILD_CATEGORIES_QUERY($category: String) {
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
  }
`;

function Product(props) {
  const router = useRouter();
  const [parentCat, setParentCat] = useState(undefined);
  const { data: categories, status } = useQuery(
    ["breadcrumbs", router.query.slug],
    async () =>
      await request(endpoint, HAS_CHILD_CATEGORIES_QUERY, {
        category: router.query.slug,
      })
  );

  useEffect(() => {
    if (categories && categories.categories[0].parentCategories.length > 0) {
      const parentCategory =
        categories.categories[0].parentCategories[0].Category;
      setParentCat(parentCategory);
    } else {
      setParentCat(undefined);
    }
  }, [categories]);

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
      <ProductsGrid categories={categories}></ProductsGrid>
    </div>
  );
}

export default Product;
