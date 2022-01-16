import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";

export default function Home() {
  return (
    <div>
      <Typography>font test</Typography>
      <Badge badgeContent={4} color="primary">
        <MailIcon color="action" />
      </Badge>
    </div>
  );
}
