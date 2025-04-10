import { getPublicAPI } from '../../core/configs/api';
import { W3blockAPI } from '../../core/enums/w3BlockAPI';
import { useGetApiUrl } from '../../core/hooks/useGetApiUrl/useGetApiUrl';

export async function GetPage() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const baseUrl = useGetApiUrl(W3blockAPI.COMMERCE);

/*   const hrefNew =
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production' &&
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'development'
      ? href.replace(
          'https://localhost:3000',
          'https://foodbusters.stg.w3block.io'
        ) +
        '?t=' +
        Date.now()
      : href; */

/*   const headers: AxiosRequestHeaders = token
    ? {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    : {
        'Content-Type': 'application/json',
      }; */

  return await getPublicAPI(baseUrl)
    .get('/projects/get-page' + `?url=https://foodbusters.stg.w3block.io?t=${Date.now()}`)
    .then((data) => {
      console.log(data, 'data dentro do GetPage')
      return data.data;
    })
    .catch((e) => {
      console.log(e);
      throw new Error('Error on get page');
    });
}
