import "../styles/globals.css";
import "../styles/utils.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "../components/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";

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
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
