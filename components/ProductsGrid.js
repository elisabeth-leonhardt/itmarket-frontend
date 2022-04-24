import {
  Button,
  Drawer,
  IconButton,
  Pagination,
  Typography,
} from "@mui/material";
import request from "graphql-request";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useQuery } from "react-query";
import styles from "../styles/ProductsGrid.module.css";
import ProductCard from "./ProductCard";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import ProductsFilter from "./ProductsFilter";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";

function extractSideBarCategories(data) {
  // 1. is it a father category? Has it subcategories?
  const subCategories = data?.categories?.length;
  const hasParent = data?.parentCategories?.length;

  if (subCategories > 0) {
    // it's a father category, return children
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

function ProductsGrid({
  categories,
  products,
  page,
  setPage,
  setStock,
  setSort,
  data,
  stock,
  sort,
}) {
  const router = useRouter();
  const associatedCategories = extractSideBarCategories(categories);

  const [drawerOpen, setDrawerOpen] = useState(false);

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
        <ProductsFilter
          associatedCategories={associatedCategories}
          setDrawerOpen={setDrawerOpen}
          setSort={setSort}
          setStock={setStock}
          stock={stock}
          sort={sort}
        ></ProductsFilter>
      </aside>
      {products && products.length > 0 ? (
        <div className={styles.products}>
          {products.map((product) => (
            <ProductCard
              product={product}
              usd={data?.usd}
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
        <div className={styles.noProducts}>
          <AnnouncementOutlinedIcon fontSize="large"></AnnouncementOutlinedIcon>
          <Typography>Lo sentimos! No hay productos disponibles.</Typography>
        </div>
      )}

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box className={styles.drawer}>
          <IconButton
            sx={{ alignSelf: "flex-end" }}
            onClick={() => setDrawerOpen(false)}
          >
            <CloseIcon></CloseIcon>
          </IconButton>
          <ProductsFilter
            associatedCategories={associatedCategories}
            setDrawerOpen={setDrawerOpen}
            setSort={setSort}
            setStock={setStock}
            stock={stock}
            sort={sort}
          ></ProductsFilter>
        </Box>
      </Drawer>
    </div>
  );
}

export default ProductsGrid;
