'use client'
import {
  createContext,
  ReactNode,
  startTransition,
  useEffect,
  useState,
} from "react";
import { useLocalStorage, useLocation } from "react-use";

import {
  StyleConnectConfigDefault,
  StyleConnectConfigsPreDefined,
} from "../../const/StyleConnectConfigThemes";
import { IStyleConnectConfigAll } from "../../interfaces/IStyleConnectConfigContext";
import { convertRGBToBrandCssValue } from "../../utils/convertRGBToBrandCssValue";
interface StyleConnectConfigProviderProps {
  children: ReactNode;
}

export const StyleConnectConfigContext = createContext<
  IStyleConnectConfigAll | undefined
>(StyleConnectConfigDefault);

const StyleConnectConfigProvider = ({
  children,
}: StyleConnectConfigProviderProps) => {



  const [config, setConfig] = useState<IStyleConnectConfigAll | undefined>();
  const { hostname } = useLocation();
  const [companyInfo, setCompanyInfo] = useLocalStorage<IStyleConnectConfigAll>(
    hostname ?? ""
  );

  const data = {
    id: "a239f802-82fd-4b8b-99a4-022ff3ac72fc",
    name: "Foodbuster",
    info: {},
    hosts: [
      {
        hostname: "foodbusters.com.br",
        isMain: true,
      },
    ],
    configuration: {
      passwordless: {
        enabled: false,
      },
      googleSignIn: {
        enabled: true,
        requireReferrer: false,
      },
      appleSignIn: {
        enabled: false,
      },
    },
  };

  useEffect(() => {
    if (companyInfo) {
      startTransition(() => {
        setConfig(companyInfo);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data?.id) {
      const style = StyleConnectConfigsPreDefined.find(
        (style) => style.companyId === data.id
      ) ?? {
        ...StyleConnectConfigDefault,
        companyId: data.id,
        name: data.name,
      };

      startTransition(() => {
        setCompanyInfo(style);
        setConfig(style);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (document) {
      startTransition(() => {
        document.documentElement.style.setProperty(
          "--colors-brand-primary",
          convertRGBToBrandCssValue(
            (config?.primaryColorRGB ||
              StyleConnectConfigDefault?.primaryColorRGB) ??
              "rgb(0, 80, 255)"
          )
        );
      });
    }
  }, [config]);

  return (
    <StyleConnectConfigContext.Provider value={config}>
      {children}
    </StyleConnectConfigContext.Provider>
  );
};

export default StyleConnectConfigProvider;
