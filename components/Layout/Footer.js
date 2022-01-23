import React from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./Layout.module.css";
import Image from "next/image";
import logoWhite from "../../public/logo-blanco.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Typography } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WhatsappOutlinedIcon from "@mui/icons-material/WhatsappOutlined";
import Link from "next/link";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const FOOTER_QUERY = gql`
  query FOOTER_QUERY {
    deliveryAndPayments {
      Title
      Description
      Category
      Position
    }
    address {
      phone
      email
      open
      twitter
      facebook
      instagram
    }
  }
`;

function Footer() {
  const { data, loading, error } = useQuery(FOOTER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);
  return (
    <footer className={styles.completeFooter}>
      <div className={styles.modalGrid}>aca va la parte de los modales</div>
      <div className={`${styles.informationGrid} app-container`}>
        <div className={styles.logoWrapper}>
          <Image
            src={logoWhite}
            height="80px"
            width="200px"
            objectFit="contain"
            alt="itmarket logo"
          ></Image>
        </div>
        <div className={styles.addressData}>
          <LocationOnOutlinedIcon></LocationOnOutlinedIcon>
          <Typography>
            25 de Mayo 147 <br /> Galería La Merced Local 30
          </Typography>
          <AccessTimeOutlinedIcon></AccessTimeOutlinedIcon>
          <Typography>{data.address.open}</Typography>
          <EmailOutlinedIcon></EmailOutlinedIcon>
          <Typography>{data.address.email}</Typography>
          <WhatsappOutlinedIcon></WhatsappOutlinedIcon>
          <Typography>{data.address.phone}</Typography>
        </div>
        <div className={styles.informationColumn}>
          <Typography component="p" variant="h4">
            Información
          </Typography>
          <Link href="/" prefetch={false}>
            <a>Home</a>
          </Link>
          <Link href="/contacto" prefetch={false}>
            <a>Contacto</a>
          </Link>
        </div>
        <div className={styles.informationColumn}>
          <Typography component="p" variant="h4">
            Productos
          </Typography>
          <Link href="/categoria/Periféricos" prefetch={false}>
            <a>Periféricos</a>
          </Link>
          <Link href="/categoria/Conectividad y Redes" prefetch={false}>
            <a>Conectividad y Redes</a>
          </Link>
          <Link href="/categoria/Estabilizadores" prefetch={false}>
            <a>Estabilizadores</a>
          </Link>
          <Link href="/categoria/Accesorios" prefetch={false}>
            <a>Accesorios</a>
          </Link>
          <Link href="/categoria/Monitores" prefetch={false}>
            <a>Monitores</a>
          </Link>
        </div>
        <div className={styles.socialMedia}>
          <Typography component="p" variant="h4">
            Seguinos
          </Typography>
          <div className={styles.iconWrapper}>
            <a href={data.address.twitter}>
              <TwitterIcon fontSize="large"></TwitterIcon>
            </a>
            <a href={data.address.facebook}>
              <FacebookIcon fontSize="large"></FacebookIcon>
            </a>
            <a href={data.address.instagram}>
              <InstagramIcon fontSize="large"></InstagramIcon>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
