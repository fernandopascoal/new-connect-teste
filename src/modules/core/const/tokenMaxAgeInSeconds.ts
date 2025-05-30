
export const tokenMaxAgeInSeconds =
  process.env.NEXT_PUBLIC_ENVIRONMENT != 'development'
    ? process.env.NEXT_PUBLIC_SESSION_EXPIRES_IN_SECONDS
      ? parseInt(process.env.NEXT_PUBLIC_SESSION_EXPIRES_IN_SECONDS)
      : 120 * 60
    : 120 * 60;

export const BEFORE_TOKEN_EXPIRES = tokenMaxAgeInSeconds / 2;
