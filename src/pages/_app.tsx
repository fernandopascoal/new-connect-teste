/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../styles/globals.css";

import { useRef } from "react";
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
  dehydrate,
} from "react-query";

import App, { AppContext, AppProps } from "next/app";
import Head from "next/head";

import StyleConnectConfigProvider from "../modules/core/providers/StyleConnectConfigProvider";

function MyApp({/*  */
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: DehydratedState;
}>) {
  const queryClient = useRef(new QueryClient());

  return (
    <>
      <Head>
        <title>Meu Aplicativo</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
        />
        <meta name="description" content="Descrição do meu aplicativo." />
        <link rel="icon" href="/favicon.ico" />
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

// Habilitando SSR com getInitialProps
MyApp.getInitialProps = async (appContext: AppContext) => {
  const queryClient = new QueryClient();

  try {
    // Use o queryClient para pré-carregar dados necessários
    // Exemplo: await queryClient.prefetchQuery("key", fetchData);

    const appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      pageProps: {
        ...appProps.pageProps,
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    console.error("SSR Error:", error);
    return {
      pageProps: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};

export default MyApp;