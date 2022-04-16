import { Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../styles/Card.module.css";

function BrandCard({ brand }) {
  return (
    <Link href={`/marca/${brand.Name}`}>
      <a>
        <div className={styles.cardWrapper}>
          <div className={styles.imageWrapper}>
            <Image
              src={brand.Logo.url}
              layout="fill"
              objectFit="contain"
              className={styles.productImage}
              alt={brand.Name}
            ></Image>
          </div>
          <Typography component="p" variant="h5" textAlign="center">
            {brand.Name}
          </Typography>
        </div>
      </a>
    </Link>
  );
}

export default BrandCard;
