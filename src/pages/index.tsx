/* eslint-disable @typescript-eslint/no-explicit-any */

import { StorefrontPreview, ThemeProvider } from '@w3block/w3block-ui-sdk';
import React from 'react';
import '@w3block/w3block-ui-sdk/dist/style.css';

import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { GetPage } from '../modules/shared/functions/getPage';
import { GetTheme } from '../modules/shared/functions/getTheme';
import { page, theme } from '../modules/shared/mock/page';



const HomePage = ({
  params,
}: {
  params: string[];
  url: string;
}) => {
 
  return (
    <>
      <Head>
        {theme?.data?.configurations?.styleData?.favicon && (
          <link
            rel="icon"
            type="image/x-icon"
            href={
              (theme?.data?.configurations?.styleData?.favicon?.assetUrl)
            }
          />
        )}
        {theme?.data?.configurations?.styleData?.siteTitle && (
          <title>
            {theme?.data?.configurations?.styleData?.siteTitle ?? ''}
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

  const host = 'https://' + (req.headers.host ?? '');

  const returns: any = {};
  try {
    const pageCall = await GetPage(host, '');
    console.log(pageCall, 'pageCall')
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
    ? 'https://' + req.headers.host + resolvedUrl
    : 'https://' + req.headers.host;
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