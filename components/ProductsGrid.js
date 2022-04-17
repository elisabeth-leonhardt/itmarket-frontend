import {
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Pagination,
  Radio,
  RadioGroup,
  Select,
  Typography,
} from "@mui/material";
import request from "graphql-request";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useQuery } from "react-query";
import styles from "../styles/ProductsGrid.module.css";
import {
  CATEGORY_QUERY,
  CATEGORY_QUERY_PRICE,
  CATEGORY_QUERY_STOCK,
  CATEGORY_QUERY_WITHOUT_STOCK,
} from "../utils/categoryQueries";
import ProductCard from "./ProductCard";
import { Box } from "@mui/system";

function extractSideBarCategories(data) {
  // 1. is it a father category? Has it subcategories?
  const subCategories = data?.categories?.length;
  const hasParent = data?.parentCategories?.length;

  if (subCategories > 0) {
    // it's a father category, return children
    console.log("father category");
    return data.categories.map((cat) => cat.Category);
  }

  // it's a child category, return the siblings
  if (hasParent > 0) {
    const siblingCategories = data.parentCategories[0].categories.map(
      (cat) => cat.Category
    );
    const parent = data.parentCategories[0].Category;
    // add the parent Category because I want it there
    siblingCategories.splice(0, 0, parent);
    // filter the current category out
    const currentCategory = data.Category;
    return siblingCategories.filter((cat) => cat !== currentCategory);
  }
  // it has neighter parents nor children
  return [];
}

const endpoint = "http://localhost:1337/graphql";

function ProductsGrid({
  categories,
  products,
  page,
  setPage,
  productFilter,
  setProductFilter,
  data,
}) {
  const router = useRouter();
  const associatedCategories = extractSideBarCategories(categories);
  console.log(categories);

  const [age, setAge] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className={styles.productsGrid}>
      <Typography component="h1" variant="h4">
        {router.query.slug}
      </Typography>
      <Button
        variant="contained"
        className={styles.filterButton}
        onClick={() => setDrawerOpen(!drawerOpen)}
        startIcon={<FilterAltOutlinedIcon />}
      >
        Filtros
      </Button>
      <aside className={`${styles.asideContent} rounded`}>
        {associatedCategories.length > 0 && (
          <div className={styles.associatedCategories}>
            <FormLabel>Categorías asociadas</FormLabel>
            {associatedCategories.map((category) => (
              <Link href={`/categoria/${category}`} passHref key={category}>
                <a>{category}</a>
              </Link>
            ))}
          </div>
        )}
        <FormControl>
          <FormLabel>Stock</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="todo"
            name="radio-buttons-group"
          >
            <FormControlLabel value="todo" control={<Radio />} label="Todo" />
            <FormControlLabel
              value="enStock"
              control={<Radio />}
              label="En Stock"
            />
            <FormControlLabel
              value="sinStock"
              control={<Radio />}
              label="Sin Stock"
            />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">Ordenar por</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="todo"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="todo"
              control={<Radio />}
              label="Sin ordenar"
            />
            <FormControlLabel
              value="sinStock"
              control={<Radio />}
              label="Mayor Precio"
            />
            <FormControlLabel
              value="enStock"
              control={<Radio />}
              label="Menor Precio"
            />
          </RadioGroup>
        </FormControl>
      </aside>
      {products && products.length > 0 ? (
        <div className={styles.products}>
          {products.map((product) => (
            <ProductCard
              product={product}
              usd={200}
              key={product.id}
            ></ProductCard>
          ))}

          <Pagination
            count={Math.ceil(data?.productsConnection?.aggregate?.count / 9)}
            variant="outlined"
            size="large"
            page={page}
            onChange={(e, page) => setPage(page)}
            className={styles.pagination}
          ></Pagination>
        </div>
      ) : (
        <div>no hay productos disponbiles!</div>
      )}

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box className={styles.drawer}>
          {associatedCategories.length > 0 && (
            <div className={styles.associatedCategories}>
              <FormLabel>Categorías asociadas</FormLabel>
              {associatedCategories.map((category) => (
                <Link href={`/categoria/${category}`} passHref key={category}>
                  <a>{category}</a>
                </Link>
              ))}
            </div>
          )}
          <FormControl>
            <FormLabel>Stock</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="todo"
              name="radio-buttons-group"
            >
              <FormControlLabel value="todo" control={<Radio />} label="Todo" />
              <FormControlLabel
                value="enStock"
                control={<Radio />}
                label="En Stock"
              />
              <FormControlLabel
                value="sinStock"
                control={<Radio />}
                label="Sin Stock"
              />
            </RadioGroup>
          </FormControl>

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Ordenar por
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="todo"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="todo"
                control={<Radio />}
                label="Sin ordenar"
              />
              <FormControlLabel
                value="sinStock"
                control={<Radio />}
                label="Mayor Precio"
              />
              <FormControlLabel
                value="enStock"
                control={<Radio />}
                label="Menor Precio"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Drawer>
    </div>
  );
}

export default ProductsGrid;
