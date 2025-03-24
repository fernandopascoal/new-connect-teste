import { useMemo } from 'react';

import { getPublicAPI } from '../../config/api';
import { W3blockAPI } from '../../enums/W3blockAPI';
import { usePixwayAPIURL } from '../usePixwayAPIURL/usePixwayAPIURL';

export const useAxios = (type: W3blockAPI) => {
  const apisUrl = usePixwayAPIURL();
  const apiBaseURLMap = new Map([
    [W3blockAPI.ID, apisUrl.w3blockIdAPIUrl],
    [W3blockAPI.KEY, apisUrl.w3blockKeyAPIUrl],
    [W3blockAPI.COMMERCE, apisUrl.w3blockCommerceAPIUrl],
    [W3blockAPI.POLL, apisUrl.w3BlockPollApiUrl],
    [W3blockAPI.PASS, apisUrl.w3BlockPassApiUrl],
  ]);


  const baseUrl = apiBaseURLMap.get(type) ?? '';



  return useMemo(() => {

    return getPublicAPI('https://commerce.stg.w3block.io');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseUrl]);
};
