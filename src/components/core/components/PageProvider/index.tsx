'use client'

import Head from "next/head";
import { ReactNode, useRef } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import StyleConnectConfigProvider from "../../providers/StyleConnectConfigProvider";

export const PageProvider = ({
    children,
  }: {
    children: ReactNode
  }) => {
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
          <Hydrate>
            <StyleConnectConfigProvider>
              {children}
            </StyleConnectConfigProvider>
          </Hydrate>
        </QueryClientProvider>
      </>
    )
}