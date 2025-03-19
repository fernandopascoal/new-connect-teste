/* eslint-disable @typescript-eslint/no-explicit-any */

import { StorefrontPreview, ThemeProvider } from '@w3block/w3block-ui-sdk';
import React from 'react';
import '@w3block/w3block-ui-sdk/dist/style.css';

import { loadFonts } from '../modules/core/utils/loadFonts';
import { removeUndefinedOrEmpty } from '../modules/core/utils/removeUndefinedOrEmpty';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { GetPage } from '../modules/shared/functions/getPage';
import { GetTheme } from '../modules/shared/functions/getTheme';



const HomePage = ({
  params,
  theme,
  page,
  url,
}: {
  params: string[];
  theme: any;
  page: any;
  url: string;
}) => {
  if (theme?.data?.configurations?.contentData?.customFonts)
    loadFonts(theme?.data?.configurations?.contentData?.customFonts);

  const metatags = {
    'property-og:title': {
      property: 'og:title',
      content: theme?.data?.configurations?.styleData?.siteTitle ?? '',
    },
    'property-og:type': {
      property: 'og:type',
      content: 'article',
    },
    'property-og:description': {
      property: 'og:description',
      content: theme?.data?.configurations?.styleData?.ogDescription ?? '',
    },
    'property-og:image': {
      property: 'og:image',
      content:
        (theme?.data?.configurations?.styleData?.ogImage?.assetUrl ||
          theme?.data?.configurations?.styleData?.ogImage) ??
        '',
    },
    'property-og:url': {
      property: 'og:url',
      content: url,
    },
    'name-twitter:card': {
      name: 'twitter:card',
      content: 'summary_large_image',
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
              (theme?.data?.configurations?.styleData?.favicon?.assetUrl ||
                theme?.data?.configurations?.styleData?.favicon) ??
              ''
            }
          />
        )}
        {theme?.data?.configurations?.styleData?.siteTitle && (
          <title>
            {theme?.data?.configurations?.styleData?.siteTitle ?? ''}
          </title>
        )}
        {Object.keys(metatags).map((k) => {
          const attributes = removeUndefinedOrEmpty((metatags as any)[k]);
          return <meta key={k} {...attributes} />;
        })}
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