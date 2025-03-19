import { createContext, ReactNode, useEffect, useState } from 'react';
import { useLocalStorage, useLocation } from 'react-use';

import {
  StyleConnectConfigDefault,
  StyleConnectConfigsPreDefined,
} from '../../const/StyleConnectConfigThemes';
import { useGetInfoByHostname } from '../../hooks/useGetInfoByHostname/useGetInfoByHostname';
import { IStyleConnectConfigAll } from '../../interfaces/IStyleConnectConfigContext';
import { convertRGBToBrandCssValue } from '../../utils/convertRGBToBrandCssValue';

interface StyleConnectConfigProviderProps {
  children: ReactNode;
}

export const StyleConnectConfigContext = createContext<
  IStyleConnectConfigAll | undefined
>(StyleConnectConfigDefault);

const StyleConnectConfigProvider = ({
  children,
}: StyleConnectConfigProviderProps) => {
  const { data, isLoading } = useGetInfoByHostname();
  const [config, setConfig] = useState<IStyleConnectConfigAll | undefined>();
  const { hostname } = useLocation();
  const [companyInfo, setCompanyInfo] = useLocalStorage<IStyleConnectConfigAll>(
    hostname ?? ''
  );

  useEffect(() => {
    if (companyInfo) {
      setConfig(companyInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading && data?.id) {
      const style = StyleConnectConfigsPreDefined.find(
        (style) => style.companyId === data.id
      ) ?? {
        ...StyleConnectConfigDefault,
        companyId: data.id,
        name: data.name,
      };

      setCompanyInfo(style);
      setConfig(style);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (document) {
      document.documentElement.style.setProperty(
        '--colors-brand-primary',
        convertRGBToBrandCssValue(
          (config?.primaryColorRGB ||
            StyleConnectConfigDefault?.primaryColorRGB) ??
            'rgb(0, 80, 255)'
        )
      );
    }
  }, [config]);

  return (
    <StyleConnectConfigContext.Provider value={config}>
      {children}
    </StyleConnectConfigContext.Provider>
  );
};

export default StyleConnectConfigProvider;
