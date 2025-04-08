/* eslint-disable react-hooks/rules-of-hooks */
import { getPublicAPI } from '../../core/configs/api';
import { W3blockAPI } from '../../core/enums/w3BlockAPI';
import { useGetApiUrl } from '../../core/hooks/useGetApiUrl/useGetApiUrl';

export async function GetTheme() {
  const baseUrl = useGetApiUrl(W3blockAPI.COMMERCE);
/*   const hrefNew =
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production' &&
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'development'
      ? 'https://foodbusters.stg.w3block.io/?' + Date.now()
      : href; */

  return await getPublicAPI(baseUrl)
    .get('/projects/get-theme' + `?url=https://foodbusters.stg.w3block.io/?${Date.now()}`)
    .then((data) => {
      return data.data;
    })
    .catch(() => {
      throw new Error('Error on get theme');
    });
}
