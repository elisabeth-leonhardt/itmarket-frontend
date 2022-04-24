import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import styles from "../styles/ProductsGrid.module.css";

function ProductsFilter({
  associatedCategories,
  setDrawerOpen,
  setSort,
  setStock,
  stock,
  sort,
}) {
  function handleStockChange(e, value) {
    if (e.target.name === "stock") {
      setStock(e.target.value);
    } else if (e.target.name === "price") {
      setSort(e.target.value);
    }
  }
  return (
    <>
      {associatedCategories.length > 0 && (
        <div className={styles.associatedCategories}>
          <FormLabel>Categorías asociadas</FormLabel>
          {associatedCategories.map((category) => (
            <Link href={`/categoria/${category}`} passHref key={category}>
              <a onClick={() => setDrawerOpen(false)}>{category}</a>
            </Link>
          ))}
        </div>
      )}

      <FormControl onChange={handleStockChange}>
        <FormLabel>Stock</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="todo"
          name="stock"
          value={stock}
        >
          <FormControlLabel
            value="todoStock"
            control={<Radio />}
            label="Todo"
          />
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

      <FormControl onChange={handleStockChange}>
        <FormLabel id="demo-radio-buttons-group-label">Ordenar por</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="todoPrecio"
          name="price"
          value={sort}
        >
          <FormControlLabel
            value="todoPrecio"
            control={<Radio />}
            label="Sin ordenar"
          />
          <FormControlLabel
            value="mayorPrecio"
            control={<Radio />}
            label="Mayor Precio"
          />
          <FormControlLabel
            value="menorPrecio"
            control={<Radio />}
            label="Menor Precio"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
}

export default ProductsFilter;
