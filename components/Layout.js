import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge, Menu, MenuItem } from "@mui/material";
import logo from "../public/logo.png";
import Link from "next/link";
import styles from "../styles/Layout.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    console.log(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header>
      <AppBar position="static" sx={{ backgroundColor: "var(--pure-white)" }}>
        <Toolbar className={`${styles.headerFlex} app-container`}>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            className={styles.menuIcon}
          >
            <MenuIcon />
          </IconButton>
          <Link href="/">
            <a>
              <img src={logo.src} alt="itmarket logo" className={styles.logo} />
            </a>
          </Link>
          <IconButton size="large" aria-label="shopping-cart">
            <Badge badgeContent={4} color="primary">
              <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={styles.navigation}>
        <AppBar position="static">
          <Toolbar className={`${styles.headerFlex} app-container`}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: "var(--pure-white)", background: "transparent" }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              <Typography>Productos</Typography>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleClose}>
                test
                <Menu
                  open={true}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </MenuItem>
            </Menu>
            <Link href="/ofertas">
              <a>
                <Typography>OFERTAS</Typography>
              </a>
            </Link>
            <Link href="/pcCompleta">
              <a>
                <Typography>PC Completa</Typography>
              </a>
            </Link>
            <Link href="/contacto">
              <a>
                <Typography>Contacto</Typography>
              </a>
            </Link>
          </Toolbar>
        </AppBar>
      </nav>
    </header>
  );
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <footer>I am the footer</footer>
    </div>
  );
}

export default Layout;
