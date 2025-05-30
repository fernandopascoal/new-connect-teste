/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import React from "react";
import Head from "next/head";
/* import { headers } from "next/headers"; */
/* import { getToken } from "next-auth/jwt"; */

/* import { loadFonts } from "../../components/core/utils/loadFonts"; */
import { GetTheme } from "../../modules/shared/functions/getTheme";
import { GetPage } from "../../modules/shared/functions/getPage";

import { StorefrontPreview } from "../../modules/shared/components/StoreFrontPreview";
import { ThemeProvider } from "../../modules/shared/providers/ThemeProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const fetchPage = async (href: string) => {
  const transformHost = href.includes("http") ? href : `https://${href}`;
  const page = await GetPage(transformHost);

  return page;
};

const fetchTheme = async (href: string) => {
  const transformHost = href.includes("http") ? href : `https://${href}`;
  const theme = await GetTheme(transformHost);

  return theme;
};

export default async function Page({ params }: any) {
  const pathname = params ? '/' + (params?.page?.join('/') ?? '') : '/';

  
     const session = await getServerSession(authOptions);

     console.log(session, 'session')

/*   const headersList = headers();
  const host = (await headersList).get("host"); */

  const page = await fetchPage("foodbusters.w3block.io" + pathname);
  const theme = await fetchTheme("foodbusters.w3block.io" + pathname);


 /*  if (theme?.data?.configurations?.contentData?.customFonts)
    loadFonts(theme?.data?.configurations?.contentData?.customFonts);
 */
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
      content: page?.routePattern,
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

  return (
    <>
      <Head>
        {theme?.data?.configurations?.styleData?.favicon && (
          <link
            rel="icon"
            type="image/x-icon"
            href={
              theme?.themeData?.data?.configurations?.styleData?.favicon?.assetUrl
            }
          />
        )}
        {theme?.themeData?.data?.configurations?.styleData?.siteTitle && (
          <title>
            {theme?.themeData?.data?.configurations?.styleData?.siteTitle}
          </title>
        )}
      </Head>
      <ThemeProvider upperPageInfo={page as any} upperPage={page?.data} upperTheme={theme?.data}>
        <StorefrontPreview />
      </ThemeProvider>
    </>
  );
}
