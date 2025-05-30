import { useEffect, useState } from 'react';


import { PixwayAPIRoutes } from '../../enums/PixwayAPIRoutes';

import { usePixwaySession } from '../usePixwaySession';
import { useRouterConnect } from '../useRouterConnect/useRouterConnect';
import { useQuery } from '@tanstack/react-query';
import { W3blockAPI } from '../../../core/enums/w3BlockAPI';
import { useAxios } from '../../../core/hooks/useAxios';


/* import { getProductSlug } from '../../utils/getProductSlug'; */
export const useGetPageModules = (disabled = false) => {
  const { status } = usePixwaySession();
  const [href, setHref] = useState('https://foodbusters.com.br/' + '?' + Date.now());
  const axios = useAxios(W3blockAPI.COMMERCE);
  const { query } = useRouterConnect();
  const [productSlug] = useState('');

/*   useEffect(() => {
    if (window) {
      setProductSlug(
        getProductSlug(window ? window?.location?.href : '') ?? ''
      );
    }
  }, []); */



useEffect(() => {
    if (window) {
      if (!productSlug) {
        setHref('https://foodbusters.com.br/' + '?' + Date.now());
        //setHref('https://hashdex.stg.w3block.io/'+ '?' + Date.now());
        //setHref(window.location.href);
      }
    }
  }, [productSlug]);

  return useQuery(
    [PixwayAPIRoutes.GET_PAGE, href],
    () =>
      axios
        .get(PixwayAPIRoutes.GET_PAGE + `?url=${href}`)
        .then((data) => {
          return data.data
        }),
    {
      retry: 0,
      enabled:
        href != undefined &&
        href != '' &&
        !productSlug &&
        !href.includes('/checkout/') &&
        status != 'loading' &&
        !query?.preview &&
        !disabled,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
};
