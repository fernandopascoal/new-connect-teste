/* eslint-disable @typescript-eslint/no-explicit-any */
import "@w3block/w3block-ui-sdk/dist/style.css";
import "../../styles/globals.css";

import { useRef } from "react";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "react-query";

import { Session } from "inspector";

import { AppProps } from "next/app";
import Head from "next/head";

import StyleConnectConfigProvider from "../modules/core/providers/StyleConnectConfigProvider";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
  dehydratedState: DehydratedState;
}>) {
  const queryClient = useRef(new QueryClient());

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0 maximum-scale=1.0"
        ></meta>
      </Head>

      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <StyleConnectConfigProvider>
            <Component {...pageProps} />
          </StyleConnectConfigProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}



export default MyApp;
