import "../styles/globals.css";
import "../styles/utils.css";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import Layout from "../components/Layout/Layout";
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
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </StyledEngineProvider>
    </ApolloProvider>
  );
}

export default MyApp;
