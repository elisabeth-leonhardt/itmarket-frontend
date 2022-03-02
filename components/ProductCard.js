import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Card.module.css";
import formatMoney from "../utils/formatMoney";

function ProductCard({ product, usd }) {
  const { id, categories, stock, discount, picture, Price, Nombre } = product;
  return (
    <Link
      href={{
        pathname: "/producto/[id]",
        query: { id, category: categories[0]?.Category },
      }}
    >
      <a>
        <div className={styles.cardWrapper}>
          <div
            className={
              stock.Stock === "Sin Stock"
                ? `${styles.imageWrapper} ${styles.noStock}`
                : styles.imageWrapper
            }
          >
            <Image
              src={picture.url}
              layout="fill"
              alt={picture.alternativeText}
              objectFit="contain"
              className={styles.productImage}
            ></Image>
            {discount && (
              <span className={styles.discount}>
                <Typography component="span" variant="body2">
                  {discount}% OFF
                </Typography>
              </span>
            )}
          </div>
          {stock.Stock === "Sin Stock" ? (
            <Typography component="p" variant="h5">
              {stock.Stock}
            </Typography>
          ) : (
            <Typography component="p" variant="h5">
              {formatMoney(Price, usd.usd, usd.emergency)}
            </Typography>
          )}
          <Typography>{Nombre}</Typography>
        </div>
      </a>
    </Link>
  );
}

export default ProductCard;
