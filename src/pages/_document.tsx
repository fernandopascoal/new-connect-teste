/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Document, { Html, Main, NextScript, Head } from 'next/document';
import Script from 'next/script';

import { GetTheme } from '../modules/shared/functions/getTheme';

class MyDocument extends Document {
  static async getInitialProps(ctx: any): Promise<any> {
    const initialProps = await Document.getInitialProps(ctx);
    const { req } = ctx;
    const host = 'https://' + (req?.headers?.host ?? '');
    const theme = await GetTheme(host).catch((e) => e.message);
    if (theme) {
      const data = await theme.data;
      return { ...initialProps, theme: data };
    } else return initialProps;
  }
  render() {
    const theme = (this.props as any).theme;
    return (
      <Html>
        <Head>
          <script
            async
            type="text/javascript"
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
          ></script>
          {theme?.configurations?.gtmId && (
            <>
              <script
                id="gt-manager"
                dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${theme?.configurations?.gtmId}');`,
                }}
              />
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${theme?.configurations?.gtmId}`}
              />
              <script
                id="gtag"
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${theme?.configurations?.gtmId}', {
                    page_path: window.location.pathname
                  });`,
                }}
              />
            </>
          )}
          {theme?.configurations?.metaEventsId && (
            <Script
              strategy="beforeInteractive"
              id="gt-manager"
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${theme?.configurations?.metaEventsId}');
                fbq('track', 'PageView');
                `,
              }}
            />
          )}
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;200;300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="overflow-x-hidden">
          {theme?.configurations?.gtmId && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${theme?.configurations?.gtmId}`}
                height="0"
                width="0"
                style={{ display: 'none', visibility: 'hidden' }}
              />
            </noscript>
          )}
          {theme?.configurations?.metaEventsId && (
            <noscript>
              <img
                height="1"
                width="1"
                alt=""
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${theme?.configurations?.metaEventsId}&ev=PageView&noscript=1`}
              />
            </noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
