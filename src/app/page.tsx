/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import React from "react";
import Head from "next/head";
import * as router from './api/route'

/* import { getToken } from "next-auth/jwt"; */

import { loadFonts } from "../components/core/utils/loadFonts";
import { GetTheme } from "../components/shared/functions/getTheme";
import { GetPage } from "../components/shared/functions/getPage";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ThemeProvider } from "../components/shared/contexts/ThemeContext";
import { StorefrontPreview } from "../components/shared/components/StoreFrontPreview";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface HomePageProps {
  params: string[];
  url: string;
  theme: any;
  page: any; // Ajuste para tipagem adequada se necessário
}

export default async function Page({
  params,
}: {
  params: Promise<{ buildId: string }>;
}) {

  const resolvedParams = await params

  console.log(resolvedParams, 'params')


  /*  if (theme?.data?.configurations?.contentData?.customFonts)
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
 */

  return (
    <>
      <Head>
        <></>
        {/* {theme?.data?.configurations?.styleData?.favicon && (
          <link
            rel="icon"
            type="image/x-icon"
            href={
              theme?.themeData.data.configurations.styleData.favicon.assetUrl
            }
          />
        )}
        {theme?.themeData?.data?.configurations?.styleData?.siteTitle && (
          <title>
            {theme?.themeData.data.configurations.styleData.siteTitle}
          </title>
        )} */}
      </Head>
      <ThemeProvider>
        <StorefrontPreview />
      </ThemeProvider>
    </>
  );
}
