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
import { useQuery, gql } from "@apollo/client";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

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

function NestedDropDown({ categories, category }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  const names = categories.map((cat) => <p>{cat.Category}</p>);
  console.log(names);
  return (
    <>
      <div onMouseOver={handleClick} className={styles.menuItem}>
        <Link href={`/categoria/${category.Category}`}>
          <a>{category.Category}</a>
        </Link>
        <IconButton>
          <ArrowForwardIosOutlinedIcon fontSize="small"></ArrowForwardIosOutlinedIcon>
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          onMouseLeave: handleClose,
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {categories.map((category) => (
          <MenuItem
            onClick={handleClose}
            divider={true}
            key={category.id}
            sx={{
              height: "49px",
            }}
          >
            <Link href={`/categoria/${category.Category}`}>
              <a>{category.Category}</a>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, loading, error } = useQuery(CATEGORYQUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  // filtrar categorias que no tienen padre
  const parentCategories = data.categories.filter(
    (category) => category.parentCategories.length === 0
  );
  console.log(data?.categories);
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
              // onClick={handleClick}
              onMouseOver={handleClick}
              sx={{ color: "var(--pure-white)", background: "transparent" }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              <Typography>Productos</Typography>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                onMouseLeave: handleClose,
              }}
            >
              {parentCategories.map((category) => {
                return (
                  <MenuItem
                    onClick={handleClose}
                    key={category.id}
                    divider={true}
                    sx={{
                      height: "49px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {category.categories.length === 0 ? (
                      <Link href={`/categoria/${category.Category}`}>
                        <a>{category.Category}</a>
                      </Link>
                    ) : (
                      <NestedDropDown
                        categories={category.categories}
                        category={category}
                      />
                    )}
                  </MenuItem>
                );
              })}
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
