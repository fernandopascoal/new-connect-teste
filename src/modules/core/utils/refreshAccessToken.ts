/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWT } from "next-auth/jwt";
import { getTokenExpires } from "./getTokenExpires";
import { BEFORE_TOKEN_EXPIRES } from "../const/tokenMaxAgeInSeconds";

async function refreshAccessToken(
  token: JWT & { accessToken?: string; refreshToken?: string }
): Promise<JWT & { accessToken?: string; refreshToken?: string }> {
  try {
    const response = await fetch(
      "https://api.w3block.io/auth/refresh-token",
      {
        method: 'POST',
        body: JSON.stringify({
          refreshToken: token.refreshToken ?? '',
        }),
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${token.accessToken ?? ''}`,
        },
      }
    );
    const { token: tokenResponse, refreshToken } = await response.json();
    const result = {
      ...token,
      accessToken: tokenResponse,
      refreshToken: refreshToken || token.refreshToken,
      accessTokenExpires: getTokenExpires(tokenResponse, -BEFORE_TOKEN_EXPIRES),
    };

    return result;
  } catch (error: any) {
    if (error.isAxiosError) {
      const axiosError = error as any;
      console.error({ data: axiosError.response?.data });
    } else {
      console.error(error);
    }

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export default refreshAccessToken