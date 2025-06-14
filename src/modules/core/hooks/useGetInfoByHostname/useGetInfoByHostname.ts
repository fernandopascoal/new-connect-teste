
/* import { useLocation } from 'react-use'; */

import { useQuery } from '@tanstack/react-query';
import { getPublicAPI } from '../../configs/api';
import { IdApiRoutes } from '../../enums/apiRoutes';
import { W3blockAPI } from '../../enums/w3BlockAPI';
import { IcompanyInfo } from '../../interfaces/ICompanyInfo';
import { useGetApiUrl } from '../useGetApiUrl/useGetApiUrl';

export const useGetInfoByHostname = () => {
  /* const { hostname: location } = useLocation(); */
  const baseUrl = useGetApiUrl(W3blockAPI.ID);
  const hostname = 'foodbusters.com.br'
    
  const apiUrl =
    'https://pixwayid.w3block.io/' + IdApiRoutes.TENANT_BY_HOSTNAME + '?hostname=' + hostname;



  return useQuery(
    [apiUrl],
    async (): Promise<IcompanyInfo> => {
      const info = await getPublicAPI(baseUrl).get(apiUrl);
      return info.data;
    },
    { enabled: hostname && hostname != undefined }
  );
};
