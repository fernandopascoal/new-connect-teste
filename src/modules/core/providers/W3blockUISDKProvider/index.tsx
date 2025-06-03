/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect } from "react";
import { useLocalStorage } from "react-use";

import Bugsnag from "@bugsnag/js";

import LogRocket from "logrocket";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/navigation";

import W3blockAuthenticationProvider from "../W3blockAuthenticationProvider";
import { useStyleConnectConfig } from "../../../shared/hooks/useStyleConnectConfig/useStyleConnectConfig";
import { PixwayUISdkLocale } from "../../context/LocaleContext";
import { PixwaySDKNextRouterAdapter, PixwaySessionContext, UiSDKUtmProvider, W3blockUISDKGeneralConfigProvider } from "w3block-new-lib";



interface Props {
  children: ReactNode;
  client: any;
}

const W3blockUISdkProvider = ({ children, client }: Props) => {
  const session = useSession();
  const router = useRouter();
  const [, i18n] = useTranslation();
  const [langToUse] = useLocalStorage("userLocale");
  const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === "production";
  const { logoUrl, companyId, connectProxyPass, connectBaseUrl, name } =
    useStyleConnectConfig();
  const hostname =
    typeof window !== "undefined" && window.location.hostname
      ? window.location.hostname
      : "";

  useEffect(() => {
    if (
      session &&
      session?.data?.id &&
      session?.data?.user?.email &&
      companyId
    ) {
      LogRocket.identify(session?.data?.id, {
        tenantId: companyId,
        email: session?.data?.user?.email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.data?.id]);

  const onError = (error: any, extra?: object) => {
    Bugsnag.notify(error, (event) => {
      if (
        session &&
        session?.data?.id &&
        session?.data?.user?.email &&
        session?.data?.user?.name
      ) {
        event.setUser(
          session?.data?.id,
          session?.data?.user?.email,
          session?.data?.user?.name
        );
      }
      if (companyId) {
        event.addMetadata("company", { companyId: companyId, name: name });
      }
      if (extra) {
        event.addMetadata("extra", { ...extra });
      }
    });
  };

  const dispatchGaEvent = (event: any, params?: object) => {
    if (window.gtag) window.gtag("event", event, params);
  };

  return (
    <PixwaySessionContext.Provider value={session}>
      <W3blockAuthenticationProvider>
        <PixwaySDKNextRouterAdapter router={router as any}>
          <W3blockUISDKGeneralConfigProvider
            client={client}
            name={name ?? ""}
            connectProxyPass={connectProxyPass ?? ""}
            isProduction={isProduction}
            api={{
              idUrl: process.env.NEXT_PUBLIC_PIXWAY_ID_API_URL ?? "",
              keyUrl: process.env.NEXT_PUBLIC_PIXWAY_KEY_API_URL ?? "",
              commerceUrl: process.env.NEXT_PUBLIC_COMMERCE_API_URL ?? "",
              pdfUrl: process.env.NEXT_PUBLIC_PDF_API_URL ?? "",
              pollUrl: process.env.NEXT_PUBLIC_POLL_API_URL ?? "",
              passUrl: process.env.NEXT_PUBLIC_PASS_API_URL ?? "",
            }}
            companyId={companyId ?? ""}
            locale={
              (langToUse as PixwayUISdkLocale) ??
              (i18n.language as PixwayUISdkLocale) ??
              "pt-BR"
            }
            logoUrl={logoUrl ?? ""}
            appBaseUrl={connectBaseUrl ?? "https://" + hostname}
            logError={onError}
            gtag={dispatchGaEvent}
          >
            <W3blockAuthenticationProvider>
              <UiSDKUtmProvider
                expiration={
                  process.env.NEXT_UTM_EXPIRATION
                    ? parseInt(process.env.NEXT_UTM_EXPIRATION)
                    : Number("3600000")
                }
              >
                {children}
              </UiSDKUtmProvider>
            </W3blockAuthenticationProvider>
          </W3blockUISDKGeneralConfigProvider>
        </PixwaySDKNextRouterAdapter>
      </W3blockAuthenticationProvider>
    </PixwaySessionContext.Provider>
  );
};

export default W3blockUISdkProvider;
