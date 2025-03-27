/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { StorefrontPreview } from "../modules/shared/components/StoreFrontPreview";

import { page, theme } from "../modules/shared/mock/page";

interface HomePageProps {
  params: string[];
  url: string;
  themeData: any; // Ajuste para tipagem adequada se necessário
}

const HomePage: React.FC<HomePageProps> = ({ params, themeData }) => {
  return (
    <>
      <Head>
        {themeData?.data?.configurations?.styleData?.favicon && (
          <link
            rel="icon"
            type="image/x-icon"
            href={themeData.data.configurations.styleData.favicon.assetUrl}
          />
        )}
        {themeData?.data?.configurations?.styleData?.siteTitle && (
          <title>{themeData.data.configurations.styleData.siteTitle}</title>
        )}
      </Head>
      <StorefrontPreview params={params} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, resolvedUrl } = context;
  const host = `https://${req.headers.host ?? ""}`;
  const url = resolvedUrl
    ? `${host}${resolvedUrl}`
    : host;

  try {
    return {
      props: {
        params: page ?? [],
        url,
        theme,
      },
    };
  } catch (error) {
    console.error("Erro ao carregar dados para a página:", error);

    return {
      props: {
        params: [],
        url,
        themeData: null,
      },
    };
  }
};

export default HomePage; 
 