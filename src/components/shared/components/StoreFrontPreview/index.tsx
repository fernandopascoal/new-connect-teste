/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
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
  MainModuleThemeInterface,
  ModulesType,
  TemplateData,
  Theme,
} from "../../interfaces";

import { Banner } from "../Banner/Banner";
import { Cookies } from "../Cookies";
import { ImagePlusText } from "../ImagePlusText/ImagePlusText";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useLocale } from "../../hooks/useLocale";
import { useEffectOnce, useLocation } from "react-use";
import { useRouterConnect } from "../../hooks/useRouterConnect";
import { PixwayAppRoutes } from "../../enums/PixwayAppRoutes";
import {
  breakpointsEnum,
  useBreakpoints,
} from "../../hooks/useBreakpoints/useBreakpoints";
import { DynamicApiProvider } from "../../providers/DynamicApiProvider";
import { convertSpacingToCSS } from "../../utils/convertSpacingToCSS";

import classNames from "classnames";
import { StoreFrontMenu } from "../StoreFrontMenu";
import { Hello } from "w3block-new-lib";

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
  const locale = useLocale();
  const { host } = useLocation();
  const { asPath, pushConnect } = useRouterConnect();
  const [currentPage, setCurrentPage] = useState<TemplateData | null | any>({});
  const [themeListener, setThemeListener] = useState<Theme | null | any>({});
  const [currentHighlight, setCurrentHighlight] = useState("");
  const breakpoint = useBreakpoints();
  const mobileBreakpoints = [breakpointsEnum.SM, breakpointsEnum.XS];
  const [mainCoin, setMainCoin] = useState()


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
        setMainCoin?.(mergedConfigStyleData.mainCoin);
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
          ?.slice(1) ?? [],
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
          <Hello />
        </div>
      </DynamicApiProvider>
    </Suspense>
  );
};

