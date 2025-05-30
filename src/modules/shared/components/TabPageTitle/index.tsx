
import Head from 'next/head';
import { useStyleConnectConfig } from '../../hooks/useStyleConnectConfig/useStyleConnectConfig';
import { useGetTheme } from '../../hooks/useGetTheme';



interface Props {
  pageTitle: string;
}

const TabPageTitle = ({ pageTitle }: Props) => {
  const { name, slug, connectProxyPass } = useStyleConnectConfig();
  const { data } = useGetTheme();
  return (
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <link rel="manifest" href={`${connectProxyPass}/${slug}/manifest.json`} />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content={
          (data?.data?.configurations?.styleData?.favicon?.assetUrl ||
            data?.data?.configurations?.styleData?.favicon) ??
          ''
        }
      />
      <meta name="theme-color" content="#ffffff"></meta>
      <title>
        {pageTitle} | {name}
      </title>
    </Head>
  );
};

export default TabPageTitle;
