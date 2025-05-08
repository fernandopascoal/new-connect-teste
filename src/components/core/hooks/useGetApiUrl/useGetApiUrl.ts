import { W3blockAPI } from '../../enums/w3BlockAPI';

export const useGetApiUrl = (type: W3blockAPI) => {
  const apiBaseURLMap = new Map([
    [W3blockAPI.ID, "https://pixwayid.w3block.io/"],
    [W3blockAPI.KEY, process.env.NEXT_PUBLIC_PIXWAY_KEY_API_URL ?? ''],
    [W3blockAPI.COMMERCE, "https://commerce.w3block.io"],
  ]);
  const baseUrl = apiBaseURLMap.get(type) ?? '';

  return baseUrl;
};
