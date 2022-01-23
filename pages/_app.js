import "../styles/globals.css";
import "../styles/utils.css";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
// import Layout from "../components/Layout/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "../apollo-client";
import dynamic from 'next/dynamic'

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

const DynamicLayout = dynamic(() => import('../components/Layout/Layout'));

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <DynamicLayout>
            <Component {...pageProps} />
          </DynamicLayout>
        </ThemeProvider>
      </StyledEngineProvider>
    </ApolloProvider>
  );
}

export default MyApp;
