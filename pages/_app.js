import "../styles/globals.css";
import "../styles/utils.css";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
// import Layout from "../components/Layout/Layout";
import { CacheProvider } from "@emotion/react";
import dynamic from "next/dynamic";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import createEmotionCache from "../utils/createEmotionCache";
import { useState } from "react";
import { Typography } from "@mui/material";

export let theme = createTheme({
  typography: {
    fontFamily: "GothamMedium, sans-serif",
  },
  palette: {
    primary: {
      main: "#ef4035",
    },
  },
});

theme = responsiveFontSizes(theme);

const clientSideEmotionCache = createEmotionCache();

const DynamicLayout = dynamic(() => import("../components/Layout/Layout"));

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <DynamicLayout>
                <Component {...pageProps} />
              </DynamicLayout>
            </ThemeProvider>
          </StyledEngineProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default MyApp;
