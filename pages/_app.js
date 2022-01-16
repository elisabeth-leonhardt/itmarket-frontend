import "../styles/globals.css";
import "../styles/utils.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../components/Layout";

const theme = createTheme({
  typography: {
    fontFamily: "GothamMedium, sans-serif",
  },
  palette: {
    primary: {
      main: "#ef4035",
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
