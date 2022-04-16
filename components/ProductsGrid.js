import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import request from "graphql-request";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import styles from "../styles/ProductsGrid.module.css";
import {
  CATEGORY_QUERY,
  CATEGORY_QUERY_PRICE,
  CATEGORY_QUERY_STOCK,
  CATEGORY_QUERY_WITHOUT_STOCK,
} from "../utils/categoryQueries";
import ProductCard from "./ProductCard";

function extractSideBarCategories(data) {
  // 1. is it a father category? Has it subcategories?
  const subCategories = data?.categories[0]?.categories?.length;
  const hasParent = data?.categories[0]?.parentCategories?.length;

  if (subCategories > 0) {
    // it's a father category, return children
    return data.categories[0].categories.map((cat) => cat.Category);
  }

  // it's a child category, return the siblings
  if (hasParent > 0) {
    const siblingCategories =
      data.categories[0].parentCategories[0].categories.map(
        (cat) => cat.Category
      );
    const parent = data.categories[0].parentCategories[0].Category;
    // add the parent Category because I want it there
    siblingCategories.splice(0, 0, parent);
    // filter the current category out
    const currentCategory = data.categories[0].Category;
    return siblingCategories.filter((cat) => cat !== currentCategory);
  }
  // it has neighter parents nor children
  return [];
}

const endpoint = "http://localhost:1337/graphql";

const queries = {
  noFilter: {
    query: CATEGORY_QUERY,
    variables: {},
  },
  lowestPrice: {
    query: CATEGORY_QUERY_PRICE,
    variables: {
      sort: "Price:asc",
    },
  },
  highestPrice: {
    query: CATEGORY_QUERY_PRICE,
    variables: {
      sort: "Price:desc",
    },
  },
  withStock: {
    query: CATEGORY_QUERY_STOCK,
    variables: {},
  },

  withoutStock: {
    query: CATEGORY_QUERY_WITHOUT_STOCK,
    variables: {},
  },
};

function ProductsGrid({ categories }) {
  const router = useRouter();
  const { data } = useQuery(
    ["products", router.query.slug, categories],
    async () => {
      const subcategories = categories.categories[0].categories.map(
        (subcategory) => subcategory.Category
      );
      return await request(endpoint, CATEGORY_QUERY, {
        category: [router.query.slug, ...subcategories],
        skip: 0,
        first: 0,
      });
    }
  );
  console.log(data);

  const associatedCategories = extractSideBarCategories(categories);

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className={styles.productsGrid}>
      <Typography component="h1" variant="h4">
        {router.query.slug}
      </Typography>
      <div className="flex justify-end">
        <FormControl sx={{ minWidth: 220 }}>
          <InputLabel id="demo-simple-select-helper-label">Filtro</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={age}
            label="Filtro"
            onChange={handleChange}
            // sx={{padding: '0.5rem'}}
          >
            <MenuItem value="">
              <em>Sin filtro</em>
            </MenuItem>
            <MenuItem value={10}>Menor Precio</MenuItem>
            <MenuItem value={20}>Mayor Precio</MenuItem>
            <MenuItem value={30}>En Stock</MenuItem>
            <MenuItem value={30}>Sin Stock</MenuItem>
          </Select>
        </FormControl>
      </div>
      {associatedCategories.length > 0 ? (
        <div className={`${styles.associatedCategories} rounded`}>
          <Typography component="h2" className="bold">
            Categorias asociadas
          </Typography>
          {associatedCategories.map((category) => (
            <Link href={`/categoria/${category}`} passHref key={category}>
              <a>{category}</a>
            </Link>
          ))}
        </div>
      ) : (
        <div></div>
      )}
      <div className={styles.products}>
        {data?.products.map((product) => (
          <ProductCard
            product={product}
            usd={200}
            key={product.id}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
}

export default ProductsGrid;
