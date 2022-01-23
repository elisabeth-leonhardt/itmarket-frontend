import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./Layout.module.css";
import Image from "next/image";
import logoWhite from "../../public/logo-blanco.png";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import WhatsappOutlinedIcon from "@mui/icons-material/WhatsappOutlined";
import Link from "next/link";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import background from "../../public/fondo-toda-la-pagina.webp";
import { transformPhone } from "../../utils/transformPhone";

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

function ModalContent({ type, content, handleClose }) {
  console.log(type, content);
  const title = type === "delivery" ? "Medios de envio" : "Medios de pago";
  const options = content.filter((item) => item.Category === type);

  return (
    <>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        {options.map((option) => (
          <>
            <Typography component="p" variant="h6">
              {option.Title}
            </Typography>
            <Typography gutterBottom className="grey-text">
              {option.Description}
            </Typography>
          </>
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose}>
          Cerrar
        </Button>
      </DialogActions>
    </>
  );
}

function Footer() {
  const { data, loading, error } = useQuery(FOOTER_QUERY);
  const [open, setOpen] = useState({ modalOpen: false, content: null });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen({ ...open, modalOpen: false });
  };
  console.log(data);
  return (
    <footer className={styles.completeFooter}>
      <div className={styles.modalGrid}>
        <div className={`${styles.modalGridContent} app-container`}>
          <button
            onClick={() => setOpen({ modalOpen: true, content: "delivery" })}
          >
            <LocalShippingOutlinedIcon fontSize="large"></LocalShippingOutlinedIcon>
            <Typography variant="h5" component="p">
              Realizamos envios
            </Typography>
            <Typography>Conocé nuestros medios de envio disponibles</Typography>
          </button>
          <Dialog onClose={handleClose} open={open.modalOpen}>
            <ModalContent
              content={data.deliveryAndPayments}
              type={open.content}
              handleClose={handleClose}
            ></ModalContent>
          </Dialog>
          <button
            onClick={() => setOpen({ modalOpen: true, content: "payment" })}
          >
            <CreditScoreOutlinedIcon fontSize="large"></CreditScoreOutlinedIcon>
            <Typography variant="h5" component="p">
              Recibimos todas las tarjetas
            </Typography>
            <Typography>Consultanos por los medios de pago</Typography>
          </button>
          <a
            href={`https://wa.me/${transformPhone(data.address.phone)}`}
            target="_blank"
            rel="noreferrer"
          >
            <SupportAgentOutlinedIcon fontSize="large"></SupportAgentOutlinedIcon>
            <Typography variant="h5" component="p">
              Soporte técnico
            </Typography>
            <Typography>Comunicate con nosotros</Typography>
          </a>
        </div>
        <Image
          src={background.src}
          alt="boring background image"
          layout="fill"
          objectFit="cover"
        ></Image>
      </div>
      <div className={`${styles.informationGrid} app-container`}>
        <div className={styles.logoWrapper}>
          <Image
            src={logoWhite}
            height="50px"
            width="160px"
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
          <Typography component="p" variant="h5">
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
          <Typography component="p" variant="h5">
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
          <Typography component="p" variant="h5">
            Seguinos
          </Typography>
          <div className={styles.iconWrapper}>
            <a href={data.address.twitter} target="_blank" rel="noreferrer">
              <TwitterIcon fontSize="large"></TwitterIcon>
            </a>
            <a href={data.address.facebook} target="_blank" rel="noreferrer">
              <FacebookIcon fontSize="large"></FacebookIcon>
            </a>
            <a href={data.address.instagram} target="_blank" rel="noreferrer">
              <InstagramIcon fontSize="large"></InstagramIcon>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
