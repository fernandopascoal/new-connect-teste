/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";


import Head from "next/head";
import { GetServerSideProps } from "next";
import { GetPage } from "../modules/shared/functions/getPage";
import { GetTheme } from "../modules/shared/functions/getTheme";
import { theme } from "../modules/shared/mock/page";
import { StorefrontPreview } from "../modules/shared/components/StoreFrontPreview";
import { ThemeProvider } from "../modules/shared/contexts/ThemeContext";

const HomePage = ({ params }: { params: string[]; url: string }) => {
  return (
    <>
      <Head>
        {theme?.data?.configurations?.styleData?.favicon && (
          <link
            rel="icon"
            type="image/x-icon"
            href={theme?.data?.configurations?.styleData?.favicon?.assetUrl}
          />
        )}
        {theme?.data?.configurations?.styleData?.siteTitle && (
          <title>
            {theme?.data?.configurations?.styleData?.siteTitle ?? ""}
          </title>
        )}
      </Head>
      <ThemeProvider>
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
  const host = "https://" + (req.headers.host ?? "");

  const returns: any = {};
  try {
    const pageCall = await GetPage(host, "");
    console.log(pageCall, "pageCall");
    returns.page = pageCall;
  } catch (error) {
    console.log(error);
  }
  try {
    const theme = await GetTheme(host);
    returns.theme = theme;
  } catch (error) {
    console.log(error);
  }
  const url = resolvedUrl
    ? "https://" + req.headers.host + resolvedUrl
    : "https://" + req.headers.host;
  return {
    props: {
      teste: "",
      params: params?.page ?? null,
      url: url,
      ...returns,
    },
  };
};

export default HomePage;
