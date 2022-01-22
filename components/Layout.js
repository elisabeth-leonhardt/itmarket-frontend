import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {
  Badge,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import logo from "../public/logo.png";
import Link from "next/link";
import styles from "../styles/Layout.module.css";
import { useQuery, gql } from "@apollo/client";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const CATEGORYQUERY = gql`
  query Categories {
    categories {
      id
      Category
      parentCategories {
        id
        Category
      }
      categories {
        Category
        id
      }
    }
  }
`;

function CollapsableListItem({ category, setMobileMenuOpen }) {
  const [collapseOpen, setCollapseOpen] = useState(false);
  if (category.categories.length === 0) {
    return (
      <Link href={`/categoria/${category.Category}`} passHref>
        <ListItemButton
          className={collapseOpen && styles.collapseOpen}
          component="a"
          onClick={() => setMobileMenuOpen(false)}
        >
          <ListItemText primary={category.Category} />
        </ListItemButton>
      </Link>
    );
  }
  return (
    <>
      <ListItemButton
        onClick={() => setCollapseOpen(!collapseOpen)}
        className={collapseOpen && styles.collapseOpen}
      >
        <ListItemText primary={category.Category} />
        {category.categories.length > 0 && (
          <ListItemIcon sx={{ justifyContent: "end" }}>
            {collapseOpen ? (
              <ExpandLess></ExpandLess>
            ) : (
              <ExpandMore></ExpandMore>
            )}
          </ListItemIcon>
        )}
      </ListItemButton>
      <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          className={collapseOpen && styles.collapseOpen}
        >
          {category.categories.map((category) => (
            <Link
              href={`/categoria/${category.Category}`}
              key={category.id}
              passHref
            >
              <ListItemButton
                sx={{ pl: 4, justifyContent: "end" }}
                component="a"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ListItemText primary={category.Category}></ListItemText>
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
}

function Header() {
  const { data, loading, error } = useQuery(CATEGORYQUERY);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  const parentCategories = data.categories.filter(
    (category) => category.parentCategories.length === 0
  );
  return (
    <header>
      <AppBar position="static" sx={{ backgroundColor: "var(--pure-white)" }}>
        <Toolbar className={`${styles.headerFlex} app-container`}>
          <IconButton
            className={styles.menuIcon}
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            sx={{ width: "30ch" }}
          >
            <Box sx={{ width: "27ch", textTransform: "capitalize" }}>
              <List>
                <ListItem sx={{ justifyContent: "flex-end" }} divider>
                  <IconButton
                    onClick={() => setMobileMenuOpen(false)}
                    sx={{ padding: 0 }}
                  >
                    <CloseIcon></CloseIcon>
                  </IconButton>
                </ListItem>
                {parentCategories.map((category) => (
                  <CollapsableListItem
                    category={category}
                    key={category.id}
                    setMobileMenuOpen={setMobileMenuOpen}
                  ></CollapsableListItem>
                ))}
              </List>
            </Box>
          </Drawer>
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
              sx={{ color: "var(--pure-white)", background: "transparent" }}
              endIcon={<ExpandMoreIcon />}
              className={`${styles.dropDown} `}
            >
              <Typography>Productos</Typography>
              <ul className={styles.parentMenu}>
                {parentCategories.map((category) => (
                  <>
                    <Link href={`/categoria/${category.Category}`}>
                      <a>
                        {category.Category}
                        {category.categories.length > 0 && (
                          <>
                            <ChevronRightIcon fontSize="small"></ChevronRightIcon>
                            <ul className={styles.childMenu}>
                              {category.categories.map((category) => (
                                <Link
                                  href={`/categoria/${category.Category}`}
                                  key={category.id}
                                >
                                  <a>{category.Category}</a>
                                </Link>
                              ))}
                            </ul>
                          </>
                        )}
                      </a>
                    </Link>
                  </>
                ))}
              </ul>
            </Button>
            <Link href="/ofertas">
              <a className={styles.buttonStyles}>
                <Typography>Ofertas</Typography>
              </a>
            </Link>
            <Link href="/pcCompleta">
              <a className={styles.buttonStyles}>
                <Typography>PC Completa</Typography>
              </a>
            </Link>
            <Link href="/contacto">
              <a className={styles.buttonStyles}>
                <Typography>Contacto</Typography>
              </a>
            </Link>
          </Toolbar>
        </AppBar>
      </nav>
    </header>
  );
}

function Footer() {
  return <footer>I am the footer!</footer>;
}

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
