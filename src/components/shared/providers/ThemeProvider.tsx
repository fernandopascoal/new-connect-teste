"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSessionStorage } from "react-use";
import { GetPageInfoInterface, TemplateData, Theme } from "../interfaces";
import { useGetTheme } from "../hooks/useGetTheme";
import { useGetPageModules } from "../hooks/useGetPageModules";
import { ThemeContext } from "w3block-new-lib";

export interface IThemeContext {
  defaultTheme?: Theme | null;
  setDefaultTheme?: (Theme: Theme) => void;
  pageTheme?: TemplateData | null;
  setPageName?: Dispatch<SetStateAction<string>>;
  isError?: boolean;
  isThemeError?: boolean;
  isThemeSuccess?: boolean;
  setPageTheme?: (TemplateData: TemplateData) => void;
  pageInfo?: GetPageInfoInterface;
}

const BASE_THEME_KEY = "baseThem_key";

export const ThemeProvider = ({
  children,
  upperTheme,
  upperPage,
  upperPageInfo,
}: {
  children: ReactNode;
  upperTheme?: Theme | null;
  upperPage?: TemplateData | null;
  upperPageInfo?: GetPageInfoInterface | undefined;
}) => {
  console.log(upperTheme, "upperTheme")
  const [defaultTheme, setDefaultTheme] = useState<Theme | null>(upperTheme ? upperTheme : null);
  const [pageInfo, setPageInfo] = useState<GetPageInfoInterface | undefined>(upperPageInfo ? upperPageInfo : undefined);
  const [pageTheme, setPageTheme] = useState<TemplateData | null>(upperPage ? upperPage : null);
  const [pageThemeSession, setPageThemeSession] =
    useSessionStorage<TemplateData | null>(BASE_THEME_KEY);
  const [, setPageName] = useState("");

  useEffect(() => {
    if (upperTheme) {
      console.log(upperTheme, 'upperTheme')
      setDefaultTheme(upperTheme);
    } else {
      console.log("sem upperTheme")
    }
  }, [upperTheme]);

  useEffect(() => {
    if (upperPage) {
      setPageTheme(upperPage);
    }
  }, [upperPage]);
  useEffect(() => {
    if (upperPageInfo) {
      setPageInfo(upperPageInfo);
    }
  }, [upperPageInfo]);

  const {
    data: theme,
    isError: isThemeError,
    isSuccess: isThemeSuccess,
  } = useGetTheme(upperTheme ? true : false);

  const { data: pageModules, isError } = useGetPageModules(
    upperPage ? true : false
  );

  useEffect(() => {
    if (theme) {
      setDefaultTheme(theme.data);
      setPageThemeSession(theme.data);
      console.log(theme, 'theme')
    } else if (isThemeError) {
      setPageTheme(pageThemeSession);
      console.log(isThemeError, 'error')
    } else {
      console.log("sem theme")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, isThemeError]);

  useEffect(() => {
    if (pageModules) {
      setPageTheme(pageModules.data);
      setPageInfo(pageModules);
    }
  }, [pageModules]);

  return (
    <ThemeContext.Provider
      value={{
        defaultTheme,
        pageTheme,
        setPageName,
        setDefaultTheme,
        isError,
        isThemeError,
        isThemeSuccess,
        setPageTheme,
        pageInfo,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
