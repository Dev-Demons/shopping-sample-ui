
import React from "react";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";

// Internal Imports
import { store } from "../features/store";
import { extendTheme } from "@chakra-ui/react";
import { UserProvider } from "../users/providers"
import { ANONYMOUS_USER } from "../users/constants"
import "../styles/globals.css";



const theme = extendTheme(
  {
    styles: {
      global: () => (
        {
          body: { bg: "", },
        }
      ),
    },
  }
);

function MyApp({ Component, pageProps }: AppProps) {

  // Deprecated
  const userState = React.useState(ANONYMOUS_USER);

  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <UserProvider value={userState}>
          <Component {...pageProps} />
        </UserProvider>
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
