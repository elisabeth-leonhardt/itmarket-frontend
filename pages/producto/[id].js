import React from "react";
import { useRouter } from "next/router";
import { gql } from "graphql-request";
import { request } from "graphql-request";
import { useQuery } from "react-query";
import {
  Breadcrumbs,
  Button,
  Input,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import useParentCategory from "../../utils/useParentCategory";
import styles from "../../styles/SingleProduct.module.css";
import Image from "next/image";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ReactMarkdown from "react-markdown";

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!, $category: String!) {
    product(id: $id) {
      Nombre
      Price
      Descripcion
      stock {
        Stock
      }
      categories {
        Category
        parentCategories {
          Category
        }
      }
      picture {
        url
        alternativeText
        id
      }
      imageGallery {
        url
        alternativeText
        id
      }
    }
    products(where: { categories: { Category_contains: $category } }) {
      Nombre
      Price
      id
      stock {
        Stock
      }
      discount
      categories {
        Category
      }
      picture {
        url
        alternativeText
      }
    }
  }
`;

const endpoint = "http://localhost:1337/graphql";
function ProductPage(props) {
  const router = useRouter();
  const { data, isSuccess } = useQuery(
    ["singleProductData", router.query.id, router.query.category],
    async () => {
      return await request(endpoint, SINGLE_ITEM_QUERY, {
        id: router.query.id,
        category: router.query.category,
      });
    },
    {
      enabled: !!router.query.id && !!router.query.category,
    }
  );
  const parentCat = useParentCategory(data?.product?.categories);
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
        <Typography>{router.query.category}</Typography>
      </Breadcrumbs>
      {isSuccess && (
        <div className={styles.singleProductGrid}>
          <div className={styles.mainImageWrapper}>
            <Image
              src={data.product.picture.url}
              objectFit="contain"
              layout="fill"
              alt={data.product.picture.alternativeText}
            ></Image>
          </div>
          <div className={styles.priceComponent}>
            <Typography component="h1" variant="h4">
              {data.product.Nombre}
            </Typography>
            <Typography component="h2" variant="h4">
              {data.product.Price}
            </Typography>
            <Typography>{data.product.stock.Stock}</Typography>
            <div className={styles.buy}>
              <TextField
                type="number"
                variant="outlined"
                defaultValue={1}
                inputProps={{ min: 1 }}
                label="Cantidad"
              />
              <Button
                variant="contained"
                size="large"
                sx={{ width: "100%" }}
                startIcon={<AddShoppingCartIcon></AddShoppingCartIcon>}
              >
                Agregar
              </Button>
            </div>
            <Button
              variant="contained"
              size="large"
              sx={{
                width: "100%",
                backgroundColor: "green",
                minHeight: "56px",
              }}
              startIcon={<WhatsAppIcon></WhatsAppIcon>}
            >
              Consultar por Whatsapp
            </Button>
          </div>
          <div className={styles.productDescription}>
            <Typography comoponent="h2" variant="h5">
              Descripción del producto:
            </Typography>
            <ReactMarkdown>{data.product.Descripcion}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
