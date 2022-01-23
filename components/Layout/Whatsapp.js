import React from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { transformPhone } from "../../utils/transformPhone";
import styles from "./Layout.module.css";

function Whatsapp() {
  return (
    <a
      href={`https://wa.me/`}
      // href={`https://wa.me/${transformPhone(data.address.phone)}`}
      target="_blank"
      rel="noreferrer"
      className={styles.whatsapp}
    >
      <WhatsAppIcon fontSize="large"></WhatsAppIcon>
    </a>
  );
}

export default Whatsapp;
