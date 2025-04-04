/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ReactNode,
  startTransition,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DynamicApiModuleInterface,
  ModulesType,
  TemplateData,
  Theme,
} from "../../interfaces";

import { Banner } from "../Banner/Banner";
import { Cookies } from "../Cookies";
import { ImagePlusText } from "../ImagePlusText/ImagePlusText";
import { ThemeContext } from "../../contexts/ThemeContext";
/* import { useLocale } from "../../hooks/useLocale"; */
import { useEffectOnce, useLocation } from "react-use";
import { useRouterConnect } from "../../hooks/useRouterConnect";
import { PixwayAppRoutes } from "../../enums/PixwayAppRoutes";
import {
  breakpointsEnum,
  useBreakpoints,
} from "../../hooks/useBreakpoints/useBreakpoints";
import { DynamicApiProvider } from "../../providers/DynamicApiProvider";
import { convertSpacingToCSS } from "../../utils/convertSpacingToCSS";

import { StoreFrontMenu } from "../StoreFrontMenu";

interface StorefrontPreviewProps {
  params?: string[];
  children?: ReactNode;
  hasHeader?: boolean;
  hasFooter?: boolean;
  upperTheme?: Theme | null;
  upperPage?: TemplateData | null;
}

export const StorefrontPreview = ({
  children,
  params,
}: StorefrontPreviewProps) => {
  const context = useContext(ThemeContext);
/*   const locale = useLocale(); */
  const { host } = useLocation();
  const { asPath, pushConnect } = useRouterConnect();
  const [currentPage, setCurrentPage] = useState<TemplateData | null | any>({});

  const [themeListener, setThemeListener] = useState<Theme | null>();
  const [currentHighlight, setCurrentHighlight] = useState("");
  const breakpoint = useBreakpoints();
  const mobileBreakpoints = [breakpointsEnum.SM, breakpointsEnum.XS];

  console.log(host, "host");
  console.log(params, "params");

  console.log(children, 'children')

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
    document.getElementById(currentHighlight)?.classList?.add("highlighted");
    return () => {
      if (!currentHighlight) return;
      document
        .getElementById(currentHighlight)
        ?.classList?.remove("highlighted");
    };
  }, [currentHighlight]);

  useEffectOnce(() => {
    addEventListener("message", listener);

    return () => removeEventListener("message", listener);
  });

  useEffect(() => {
    if (context?.isThemeError && !children) {
      pushConnect(PixwayAppRoutes.SIGN_IN);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.isThemeError, children]);

  useEffectOnce(() => {
    addEventListener("message", listener);

    return () => removeEventListener("message", listener);
  });

  const preventOutsideLinkClick = (e: MouseEvent) => {
    if (e.target instanceof HTMLAnchorElement) {
      e.preventDefault();
    }
  };

  useEffectOnce(() => {
    const insideIframe = false;
    if (insideIframe) {
      addEventListener("click", preventOutsideLinkClick);

      return () => removeEventListener("click", preventOutsideLinkClick);
    }
  });

  useEffect(() => {
    const theme = { ...context?.defaultTheme, ...themeListener };

    const configStyleData = theme.configurations?.styleData;
    const configMobileStyleData = theme.configurations?.mobileStyleData;

    const mergedConfigStyleData = mobileBreakpoints.includes(breakpoint)
      ? { ...configStyleData, ...configMobileStyleData }
      : configStyleData;

    if (
      mergedConfigStyleData?.mainCoin &&
      mergedConfigStyleData?.mainCoin != ""
    ) {
      startTransition(() => {
        console.log("TESTE");
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.defaultTheme, themeListener]);

  let data = { ...context?.pageTheme, ...currentPage };

  const dynamicApi = useMemo<DynamicApiModuleInterface | undefined>(() => {
    if (context?.pageInfo && context.pageInfo.isRoutePatternRegex) {
      return {
        regexp: context.pageInfo.routePatternRegex,
        groups: RegExp(context.pageInfo.routePatternRegex, "g").exec(
          asPath || ""
        )?.groups,
        matches: RegExp(context.pageInfo.routePatternRegex, "g")
          .exec(asPath || "")
          ?.slice(1),
        apis: data.dynamicApi?.apis ?? [],
      };
    } else if (data.dynamicApi?.apis) {
      return {
        regexp: "",
        matches: [],
        apis: data.dynamicApi?.apis ?? [],
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [context?.pageInfo, data]);

  const themeContext = context?.defaultTheme;

  if (!themeContext) return <div>teste</div>;

  const theme = { ...context?.defaultTheme, ...themeListener };

  const configStyleData = theme.configurations?.styleData;
  const configMobileStyleData = theme.configurations?.mobileStyleData;

  const mergedConfigStyleData = mobileBreakpoints.includes(breakpoint)
    ? { ...configStyleData, ...configMobileStyleData }
    : configStyleData;

  const fontName = mergedConfigStyleData?.fontFamily ?? "Roboto";
  const fontFamily = fontName
    ? `"${fontName}", ${fontName === "Aref Ruqaa" ? "serif" : "sans-serif"}`
    : "sans-serif";

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
        id: "",
        name: "header",
        type: ModulesType.HEADER,
        styleData: {},
      };

  const hasHeaderDefault =
    mergedConfigStyleData?.hasHeader != undefined &&
    (asPath || "").includes("/auth/")
      ? mergedConfigStyleData?.hasHeader
      : true;

  const hasFooterDefault =
    mergedConfigStyleData?.hasFooter != undefined &&
    (asPath || "").includes("/auth/")
      ? mergedConfigStyleData?.hasFooter
      : true;
  data = {
    ...data,
    dynamicApi,
  };

  console.log("Versão sem breakpoints e locale");

  return (
    <Suspense
      fallback={
        <div className="h-dvh flex items-center justify-center bg-slate-50" />
      }
    >
      <DynamicApiProvider dynamicModule={data.dynamicApi}>
        <div
          style={{
            color: mergedConfigStyleData?.textColor ?? "black",
            background: mergedConfigStyleData?.backgroundColor ?? "white",
            padding: convertSpacingToCSS(mergedConfigStyleData?.padding),
            fontFamily,
          }}
        >
          {hasHeaderDefault && headerData ? <div></div> : null}
          <Cookies
            data={
              theme.cookies ?? {
                id: "",
                name: "cookies",
                type: ModulesType.COOKIE,
                styleData: {},
                contentData: {},
                mobileStyleData: {},
                mobileContentData: {},
              }
            }
          />
          {context?.isError && !children ? (
            <div>TESTE</div>
          ) : (
            <>
              {children ? (
                <>{children ? children : 'teste'}</>
                
              ) : (
                <div>
                  {(data as TemplateData)?.modules?.map((item) => {
                    if (item.deviceType == "none") return null;

                   /*  if (
                      item.deviceType == "desktop" &&
                      mobileBreakpoints.includes(breakpoint)
                    )
                      return null;
                    if (
                      item.deviceType == "mobile" &&
                      !mobileBreakpoints.includes(breakpoint)
                    )
                      return null; */
                    if (
                      item.languageType &&
                      //locale !== item.languageType &&
                      item.languageType !== "all"
                    )
                      return null;

                    switch (item.type) {
                      case ModulesType.CATEGORIES:
                        return (
                          <StoreFrontMenu
                            data={{ ...theme.categories, ...item }}
                          />
                        );

                      case ModulesType.BANNER:
                        return <Banner data={{ ...theme.banner, ...item }} />;
                      case ModulesType.CARDS:
                        return <div>Products</div>;
                      case ModulesType.ACCORDIONS:
                        return <div>Accordions</div>;
                      case ModulesType.IMAGE_PLUS_TEXT:
                        return (
                          <ImagePlusText
                            data={{ ...theme.imagePlusText, ...item }}
                          />
                        );
                      case ModulesType.PARAGRAPH:
                        return <div>Paragraph</div>;
                      case ModulesType.GRID_ITEM_AREA:
                        return <div>GridItemArea</div>;
                      case ModulesType.PASS_BENEFIT:
                        return <div>PassBenefit</div>;
                      case ModulesType.MIDIA:
                        return <div>Midia</div>;
                      case ModulesType.TABLE:
                        return <div>GenericTableWrapper</div>;
                      case ModulesType.BANNER_WJJC:
                        return <div>BannerWJJC</div>;

                      default:
                        break;
                    }
                  })}
                </div>
              )}
              {/* {(data as TemplateData)?.modules?.map((item) => {
                switch (item.type) {
                  case ModulesType.BANNER:
                    return <Banner data={{ ...theme.banner, ...item }} />;
                  case ModulesType.CARDS:
                    return <Products data={{ ...theme.products, ...item }} />;
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
                    return <Paragraph data={{ ...theme.paragraph, ...item }} />;
                  case ModulesType.GRID_ITEM_AREA:
                    return (
                      <GridItemArea data={{ ...theme.GridItemArea, ...item }} />
                    );
                  case ModulesType.PASS_BENEFIT:
                    return (
                      <PassBenefit data={{ ...theme.passBenefit, ...item }} />
                    );
                  case ModulesType.MIDIA:
                    return <Midia data={{ ...theme.midia, ...item }} />;
                  case ModulesType.TABLE:
                    return <GenericTableWrapper data={{ ...item }} />;

                  case ModulesType.BANNER_WJJC:
                    return (
                      <BannerWJJC data={{ ...theme.bannerWjjc, ...item }} />
                    );

                  default:
                    break;
                }
              })} */}
            </>
          )}
          {hasFooterDefault && <div>Footer</div>}
        </div>
      </DynamicApiProvider>
    </Suspense>
  );
};
