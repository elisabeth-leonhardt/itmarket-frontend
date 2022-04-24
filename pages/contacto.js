import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Breadcrumbs,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import styles from "../styles/Contacto.module.css";
import { transformPhone } from "../utils/transformPhone";
import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

const CONTACT_QUERY = gql`
  query CONTACT_QUERY {
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

function Contacto(props) {
  const { data, status } = useQuery(
    "contactData",
    async () => await request(process.env.NEXT_PUBLIC_ENDPOINT, CONTACT_QUERY)
  );

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error</p>;

  const Map = dynamic(
    () => import("../components/Map"), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  );

  return (
    <div className="app-container">
      <Breadcrumbs className="breadcrumbs">
        <Link href="/" passHref>
          <a>Home</a>
        </Link>
        <Typography>Contacto</Typography>
      </Breadcrumbs>
      <Typography component="h1" variant="h4">
        Contacto
      </Typography>

      <div className={styles.contactGrid}>
        <div className={styles.map}>
          <Map></Map>
        </div>
        <div className={styles.contactDetails}>
          <Typography component="h2" variant="h5">
            Visitanos!
          </Typography>

          <Typography>
            Dirección <br /> 25 de Mayo 147, <br />
            Galería La Merced Local 30
          </Typography>
          <Typography></Typography>

          <Typography>
            Teléfono <br /> {data.address.phone}
          </Typography>
          <Typography>
            Horarios <br /> {data.address.open}
          </Typography>
          <div>
            <Typography>Redes</Typography>

            <IconButton
              className={styles.wa}
              href={`https://wa.me/${transformPhone(data.address.phone)}`}
            >
              <WhatsAppIcon></WhatsAppIcon>
            </IconButton>
            <IconButton href={data.address.instagram} className={styles.ig}>
              <InstagramIcon></InstagramIcon>
            </IconButton>
          </div>
        </div>
        <ContactForm phone={data.address.phone}></ContactForm>
      </div>
    </div>
  );
}

export default Contacto;

function ContactForm({ phone }) {
  const [formState, setFormState] = useState({ name: "", question: "" });

  function formChangeHandler(e) {
    const temp = {};
    temp[e.target.name] = e.target.value;
    setFormState({ ...formState, ...temp });
  }

  function computeWhatsappMsg() {
    if (formState.name.length === 0 && formState.question.length === 0) {
      return "";
    } else if (formState.name.length === 0 && formState.question.length !== 0) {
      return `Hola, buen día! ${formState.question}`;
    } else if (formState.name.length !== 0 && formState.question.length !== 0) {
      return `Hola, mi nombre es ${formState.name}. ${formState.question}`;
    } else {
      return "";
    }
  }

  return (
    <div className={styles.contactForm}>
      <Typography component="h2" variant="h5">
        Escribinos!
      </Typography>
      <TextField
        variant="filled"
        label="Tu nombre"
        name="name"
        fullWidth
        value={formState.name}
        onChange={formChangeHandler}
      ></TextField>
      <TextField
        variant="filled"
        onChange={formChangeHandler}
        multiline
        rows={5}
        fullWidth
        label="Tu consulta"
        name="question"
        value={formState.question}
      ></TextField>
      <Button
        variant="contained"
        href={`https://wa.me/${transformPhone(
          phone
        )}?text=${computeWhatsappMsg()}`}
        startIcon={<WhatsAppIcon />}
        target="_blank"
        rel="noopener noreferrer"
      >
        Preguntar
      </Button>
    </div>
  );
}
