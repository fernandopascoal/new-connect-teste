/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Head from "next/head";
import { ReactNode } from "react";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StyleConnectConfigProvider from "../../providers/StyleConnectConfigProvider";
import W3blockUISdkProvider from "../../providers/W3blockUISDKProvider";
import ErrorBoundaryConnect from "../ErrorBoundary/ErrorBoundary";
import { getSession, SessionProvider } from "next-auth/react";
import LogRocket from "logrocket";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";
import { generateRandomUUID } from "../../../shared/utils/generateRandomUUID";
import BugsnagPerformance from "@bugsnag/browser-performance";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT == "production";
if (isProduction) {
  LogRocket.init("j2aqel/connect-2", {
    network: {
      requestSanitizer: (request) => {
        if (
          request.url.toLowerCase().indexOf("signin") !== -1 ||
          request.url.toLowerCase().indexOf("signup") !== -1 ||
          request.url.toLowerCase().indexOf("changepasswordandsignin") !== -1
        ) {
          if (request.body) {
            const newbody = JSON.parse(request.body);
            newbody.password = "";
            newbody.confirmation = "";
            request.body = JSON.stringify(newbody);
          }
        }
        if (request.url.toLowerCase().indexOf("orders") !== -1) {
          if (request.body) {
            try {
              const newbody = JSON.parse(request.body);
              newbody.providerInputs.credit_card_ccv =
                newbody?.providerInputs?.credit_card_ccv?.replace(
                  /[0-9]/g,
                  "x"
                );
              newbody.providerInputs.credit_card_number =
                newbody?.providerInputs?.credit_card_number?.substring(0, 4) +
                newbody?.providerInputs?.credit_card_number
                  ?.substring(4)
                  ?.replace(/[0-9]/g, "x");
              newbody.payments.find(
                (e: any) =>
                  e.currencyId === "65fe1119-6ec0-4b78-8d30-cb989914bdcb"
              ).providerInputs.credit_card_number =
                newbody?.providerInputs?.credit_card_number?.substring(0, 4) +
                newbody?.providerInputs?.credit_card_number
                  ?.substring(4)
                  ?.replace(/[0-9]/g, "x");
              newbody.payments.find(
                (e: any) =>
                  e.currencyId === "65fe1119-6ec0-4b78-8d30-cb989914bdcb"
              ).providerInputs.credit_card_ccv =
                newbody?.providerInputs?.credit_card_ccv?.replace(
                  /[0-9]/g,
                  "x"
                );
              request.body = JSON.stringify(newbody);
            } catch {
              /* empty */
            }
          }
        }
        return request;
      },
    },
  });
  Bugsnag.start({
    apiKey: "2d2609ab42a8845732a2a7359e38bec6",
    plugins: [new BugsnagPluginReact()],
    onError: async (event) => {
      const session = await getSession();
      if (session && session.id) {
        event.setUser(
          session.id,
          session.user?.email ?? "",
          session.user?.name ?? ""
        );
      }
      const errorId = generateRandomUUID();
      event.addMetadata("errorId", { errorId: errorId });
    },
  });
  BugsnagPerformance.start({ apiKey: "2d2609ab42a8845732a2a7359e38bec6" });
}

const queryClient = new QueryClient();

export const PageProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SessionProvider
        refetchInterval={120}
        refetchOnWindowFocus
        basePath={
          process.env.NEXT_PUBLIC_BUILD_PATH &&
          process.env.NEXT_PUBLIC_BUILD_PATH != "/"
            ? process.env.NEXT_PUBLIC_BUILD_PATH + "/api/auth"
            : "/api/auth"
        }
      >
        <QueryClientProvider client={queryClient}>
          <Head>
            <title>Meu Aplicativo</title>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
            />
            <meta name="description" content="Descrição do meu aplicativo." />
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <StyleConnectConfigProvider>
            <W3blockUISdkProvider client={queryClient}>
              <ErrorBoundaryConnect>{children}</ErrorBoundaryConnect>
              <ReactQueryDevtools initialIsOpen={false} />
            </W3blockUISdkProvider>
          </StyleConnectConfigProvider>
          {/*   <Hydrate state={dehydratedState}>
           
          </Hydrate> */}
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
};
