/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import { getToken } from "next-auth/jwt";


import { loadFonts } from "../modules/core/utils/loadFonts";
import { GetTheme } from "../modules/shared/functions/getTheme";
import { GetPage } from "../modules/shared/functions/getPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ThemeProvider } from "../modules/shared/contexts/ThemeContext";
import { StorefrontPreview } from "../modules/shared/components/StoreFrontPreview";

interface HomePageProps {
  params: string[];
  url: string;
  theme: any;
  page: any; // Ajuste para tipagem adequada se necessário
}

const HomePage: React.FC<HomePageProps> = ({ page, params, theme, url }) => {
  if (theme?.data?.configurations?.contentData?.customFonts)
    loadFonts(theme?.data?.configurations?.contentData?.customFonts);

  const metatags = {
    "property-og:title": {
      property: "og:title",
      content: theme?.data?.configurations?.styleData?.siteTitle ?? "",
    },
    "property-og:type": {
      property: "og:type",
      content: "article",
    },
    "property-og:description": {
      property: "og:description",
      content: theme?.data?.configurations?.styleData?.ogDescription ?? "",
    },
    "property-og:image": {
      property: "og:image",
      content:
        (theme?.data?.configurations?.styleData?.ogImage?.assetUrl ||
          theme?.data?.configurations?.styleData?.ogImage) ??
        "",
    },
    "property-og:url": {
      property: "og:url",
      content: url,
    },
    "name-twitter:card": {
      name: "twitter:card",
      content: "summary_large_image",
    },
  };

  page?.data?.metatags?.forEach(
    (item: { name: string; property: string; id: string }) => {
      const key = item?.name
        ? `name-${item.name}`
        : item?.property
        ? `property-${item.property}`
        : `id-${item.id}`;

      (metatags as any)[key] = item;
    }
  );


  console.log(theme, 'theme')
  console.log(page, 'page')

  return (
    <>
      <Head>
        {theme?.data?.configurations?.styleData?.favicon && (
          <link
            rel="icon"
            type="image/x-icon"
            href={
              theme.themeData.data.configurations.styleData.favicon.assetUrl
            }
          />
        )}
        {theme.themeData?.data?.configurations?.styleData?.siteTitle && (
          <title>
            {theme.themeData.data.configurations.styleData.siteTitle}
          </title>
        )}
      </Head>
      <ThemeProvider
        upperPageInfo={page as any}
        upperPage={page?.data as any}
        upperTheme={theme?.data as any}
      >
        <StorefrontPreview params={params} />
      </ThemeProvider>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
  resolvedUrl,
}) => {
  const token = await getToken({
    req,
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET ?? "",
  });
  const host = "https://" + req.headers.host;

  const returns: any = {};
  try {
    const pageCall = await GetPage(host, (token as any)?.accessToken);
    console.log(pageCall, 'pageCall')
    returns.page = pageCall;
  } catch (error) {
    console.log(error);
  }
  try {
    const theme = await GetTheme(host);
    console.log(theme, 'GetTheme')
    returns.theme = theme;
  } catch (error) {
    console.log(error);
  }
  const url = resolvedUrl
    ? "https://" + req.headers.host + resolvedUrl
    : "https://" + req.headers.host;

    console.log(returns, 'returns')

  return {
    props: {
      ...(await serverSideTranslations("pt-BR")),
      params: params?.page ?? null,
      url: url,
      ...returns,
    },
  };
};

export default HomePage;
