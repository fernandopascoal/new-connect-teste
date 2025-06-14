import { useEffect, useState } from 'react';


import { PixwayAPIRoutes } from '../../enums/PixwayAPIRoutes';


import { useRouterConnect } from '../useRouterConnect/useRouterConnect';
import { useQuery } from '@tanstack/react-query';
import { W3blockAPI } from '../../../core/enums/w3BlockAPI';
import { useAxios } from '../../../core/hooks/useAxios';

export const useGetTheme = (disabled = false) => {
  const [href, setHref] = useState('');
  const axios = useAxios(W3blockAPI.COMMERCE);
  const { query } = useRouterConnect();

  useEffect(() => {
    if (window) {
      //setHref(window.location.href);
      //setHref('https://hashdex.stg.w3block.io/' + '?' + Date.now());
      setHref('https://foodbusters.com.br/?' + Date.now());
    } else {
      setHref('https://foodbusters.com.br/?' + Date.now());
    }
  }, []);

  return useQuery(
    [PixwayAPIRoutes.GET_THEME, href],
    () =>
      axios
        .get(PixwayAPIRoutes.GET_THEME + `?url=${href}`)
        .then((data) => data.data),
    {
      enabled: href != undefined && href != '' && !query?.preview && !disabled,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );
};
