
import {
    ReactNode,
    useContext,
    useEffect,
    useMemo,
    useState,
    Suspense,
  } from 'react';
  import { useEffectOnce } from 'react-use';
  
  import classNames from 'classnames';

/*   import { useUserWallet } from '../../shared/hooks/useUserWallet'; */

/*   import { getProductSlug } from '../utils/getProductSlug'; */
/*   import { PassBenefit } from './PassBenefit'; */
import { Accordions, Banner, BannerWJJC, Footer, GenericTableWrapper, GridItemArea, Header, ImagePlusText, Midia, Page404, Paragraph, PassBenefit, Products } from '@w3block/w3block-ui-sdk';
import { useLocale } from '../../hooks/useLocale';
import { breakpointsEnum, useBreakpoints } from '../../hooks/useBreakpoints/useBreakpoints';
import { useRouterConnect } from '../../hooks/useRouterConnect';
import { DynamicApiModuleInterface, MainModuleThemeInterface, ModulesType, TemplateData, Theme } from '../../interfaces';

import { DynamicApiProvider } from '../../providers/DynamicApiProvider';
import { convertSpacingToCSS } from '../../utils/convertSpacingToCSS';
import { ThemeContext } from '../../contexts/ThemeContext';
  

  
  interface StorefrontPreviewProps {
    params?: string[];
    children?: ReactNode;
    hasHeader?: boolean;
    hasFooter?: boolean;
    upperTheme?: Theme | null;
    upperPage?: TemplateData | null;
  }
  
  // export const StorefrontPreview = ({
  //   params,
  //   children,
  //   hasFooter = true,
  //   hasHeader = true,
  //   upperTheme,
  //   upperPage,
  // }: StorefrontPreviewProps) => {
  //   return <Storefront params={params}>{children}</Storefront>;
  // };
  
  export const StorefrontPreview = ({
    children,
  }: StorefrontPreviewProps) => {
    const context = useContext(ThemeContext);

    const locale = useLocale();
/*     const { setMainCoin } = useUserWallet(); */
   /*  const { host } = useLocation(); */
    const { asPath } = useRouterConnect();
    const [currentPage, setCurrentPage] = useState<TemplateData | null>(null);
    const [themeListener, setThemeListener] = useState<Theme | null>();
    const [currentHighlight, setCurrentHighlight] = useState('');
 /*    const productSlug = getProductSlug(host + asPath); */
  
    console.log(context, 'CONTEXT');
  
    const listener = ({
      data,
    }: MessageEvent<{
      update: string;
      theme: Theme;
      page: TemplateData;
      highlight?: string;
    }>) => {
      if (data && data.theme) {
        setThemeListener(data.theme);
        context?.setDefaultTheme?.(data.theme);
      }
      if (data && data.page) {
        setCurrentPage(data.page);
        context?.setPageTheme?.(data.page);
      }
      if (data?.highlight !== undefined) {
        setCurrentHighlight(data?.highlight);
      }
    };
    useEffect(() => {
      if (!currentHighlight) return;
      document.getElementById(currentHighlight)?.classList?.add('highlighted');
      return () => {
        if (!currentHighlight) return;
        document
          .getElementById(currentHighlight)
          ?.classList?.remove('highlighted');
      };
    }, [currentHighlight]);
  
 
  
    useEffectOnce(() => {
      addEventListener('message', listener);
  
      return () => removeEventListener('message', listener);
    });
  
    const preventOutsideLinkClick = (e: MouseEvent) => {
      if (e.target instanceof HTMLAnchorElement) {
        e.preventDefault();
      }
    };
  
    useEffectOnce(() => {
      const insideIframe = window.self !== window.top;
      if (insideIframe) {
        addEventListener('click', preventOutsideLinkClick);
  
        return () => removeEventListener('click', preventOutsideLinkClick);
      }
    });
  
/*     useEffect(() => {
      const theme = { ...context?.defaultTheme, ...themeListener };
  
      const configStyleData = theme.configurations?.styleData;
      const configMobileStyleData = theme.configurations?.mobileStyleData;
  
      const mergedConfigStyleData = mobileBreakpoints.includes(breakpoint)
        ? { ...configStyleData, ...configMobileStyleData }
        : configStyleData;
  
      if (
        mergedConfigStyleData?.mainCoin &&
        mergedConfigStyleData?.mainCoin != ''
      ) {
        setMainCoin?.(mergedConfigStyleData.mainCoin);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context?.defaultTheme, themeListener]); */
  
    let data = { ...context?.pageTheme, ...currentPage };
  
    const themeContext = context?.defaultTheme;
  
    const dynamicApi = useMemo<DynamicApiModuleInterface | undefined>(() => {
      if (context?.pageInfo && context.pageInfo.isRoutePatternRegex) {
        return {
          regexp: context.pageInfo.routePatternRegex,
          groups: RegExp(context.pageInfo.routePatternRegex, 'g').exec(
            asPath || ''
          )?.groups,
          matches: RegExp(context.pageInfo.routePatternRegex, 'g')
            .exec(asPath || '')
            ?.slice(1),
          apis: data.dynamicApi?.apis ?? [],
        };
      } else if (data.dynamicApi?.apis) {
        return {
          regexp: '',
          matches: [],
          apis: data.dynamicApi?.apis ?? [],
        };
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context?.pageInfo, data]);
  
    const breakpoint = useBreakpoints();
    const mobileBreakpoints = [breakpointsEnum.SM, breakpointsEnum.XS];
  
    if (!themeContext) return null;
    const theme = { ...context?.defaultTheme, ...themeListener };
  
    const configStyleData = theme.configurations?.styleData;
    const configMobileStyleData = theme.configurations?.mobileStyleData;
  
    const mergedConfigStyleData = mobileBreakpoints.includes(breakpoint)
      ? { ...configStyleData, ...configMobileStyleData }
      : configStyleData;
  
    const fontName = mergedConfigStyleData?.fontFamily ?? 'Roboto';
    const fontFamily = fontName
      ? `"${fontName}", ${fontName === 'Aref Ruqaa' ? 'serif' : 'sans-serif'}`
      : 'sans-serif';
  
    const headerStyleData = theme.header?.styleData;
    const headerMobileStyleData = theme.header?.mobileStyleData;
  
    const mergedHeaderStyleData = mobileBreakpoints.includes(breakpoint)
      ? { ...headerStyleData, ...headerMobileStyleData }
      : headerStyleData;
  
    const headerData = context?.defaultTheme?.header
      ? {
          ...theme.header,
          styleData: { ...mergedHeaderStyleData, fontFamily },
        }
      : {
          id: '',
          name: 'header',
          type: ModulesType.HEADER,
          styleData: {},
        };
  
    const hasHeaderDefault =
      mergedConfigStyleData?.hasHeader != undefined &&
      (asPath || '').includes('/auth/')
        ? mergedConfigStyleData?.hasHeader
        : true;
  
    const hasFooterDefault =
      mergedConfigStyleData?.hasFooter != undefined &&
      (asPath || '').includes('/auth/')
        ? mergedConfigStyleData?.hasFooter
        : true;
    data = {
      ...data,
      dynamicApi,
    };
  
    return (
      <Suspense
        fallback={
          <div className="h-dvh flex items-center justify-center bg-slate-50" />
        }
      >
        <DynamicApiProvider dynamicModule={data.dynamicApi}>
          <div
            style={{
              color: mergedConfigStyleData.textColor ?? 'black',
              background: mergedConfigStyleData.backgroundColor ?? 'white',
              padding: convertSpacingToCSS(mergedConfigStyleData.padding),
              fontFamily,
            }}
          >
            {hasHeaderDefault && headerData ? (
              <Header data={headerData as MainModuleThemeInterface} />
            ) : null}
  
           {/*  <Cookies
              data={
                theme.cookies ?? {
                  id: '',
                  name: 'cookies',
                  type: ModulesType.COOKIE,
                  styleData: {},
                  contentData: {},
                  mobileStyleData: {},
                  mobileContentData: {},
                }
              }
            /> */}
            {context?.isError && !children ? (
              <Page404 />
            ) : (
              <>
              {/*   {productSlug && (
                  <ProductPage
                    hasCart={mergedConfigStyleData.hasCart}
                    params={params}
                    data={
                      theme.productPage ?? {
                        id: '',
                        name: 'productsPage',
                        type: ModulesType.PRODUCT_PAGE,
                        styleData: {},
                        mobileStyleData: {},
                      }
                    }
                  />
                )} */}
                {children ? (
                  children
                ) :  (
                  <div
                    className={classNames(
                      `${'pw-min-h-[calc(100vh-150px)]'}`
                    )}
                  >
                    {data.modules?.map((item) => {
                      if (item.deviceType == 'none') return null;
  
                      if (
                        item.deviceType == 'desktop' &&
                        mobileBreakpoints.includes(breakpoint)
                      )
                        return null;
                      if (
                        item.deviceType == 'mobile' &&
                        !mobileBreakpoints.includes(breakpoint)
                      )
                        return null;
                      if (
                        item.languageType &&
                        locale !== item.languageType &&
                        item.languageType !== 'all'
                      )
                        return null;
  
                      switch (item.type) {
                   /*      case ModulesType.CATEGORIES:
                          return <Menu data={{ ...theme.categories, ...item }} />; */
                        case ModulesType.BANNER:
                          return <Banner data={{ ...theme.banner, ...item }} />;
                        case ModulesType.CARDS:
                          return (
                            <Products data={{ ...theme.products, ...item }} />
                          );
                        case ModulesType.ACCORDIONS:
                          return (
                            <Accordions data={{ ...theme.accordions, ...item }} />
                          );
                        case ModulesType.IMAGE_PLUS_TEXT:
                          return (
                            <ImagePlusText
                              data={{ ...theme.imagePlusText, ...item }}
                            />
                          );
                        case ModulesType.PARAGRAPH:
                          return (
                            <Paragraph data={{ ...theme.paragraph, ...item }} />
                          );
                        case ModulesType.GRID_ITEM_AREA:
                          return (
                            <GridItemArea
                              data={{ ...theme.GridItemArea, ...item }}
                            />
                          );
                        case ModulesType.PASS_BENEFIT:
                          return (
                            <PassBenefit
                              data={{ ...theme.passBenefit, ...item }}
                            />
                          );
                        case ModulesType.MIDIA:
                          return <Midia data={{ ...theme.midia, ...item }} />;
                        case ModulesType.TABLE:
                          return <GenericTableWrapper data={{ ...item }} />;
                        /* case ModulesType.BANNER_VARIANT:
                          return (
                            <BannerVariant
                              data={{ ...theme.bannerVariant, ...item }}
                            />
                          ); */
                        case ModulesType.BANNER_WJJC:
                          return (
                            <BannerWJJC data={{ ...theme.bannerWjjc, ...item }} />
                          );
  
                        default:
                          break;
                      }
                    })}
                  </div>
                )}
              </>
            )}
            {hasFooterDefault && (
              <Footer
                data={
                  theme.footer ?? {
                    id: '',
                    name: 'footer',
                    type: ModulesType.FOOTER,
                    styleData: {},
                    contentData: {},
                    mobileStyleData: {},
                    mobileContentData: {},
                  }
                }
              />
            )}
          </div>
        </DynamicApiProvider>
      </Suspense>
    );
  };
  