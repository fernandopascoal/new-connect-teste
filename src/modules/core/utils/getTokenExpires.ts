import jwtDecode from "jwt-decode";



export function getTokenExpires(token: string, threshold = 0): number {
  const { exp } = jwtDecode(token) as { exp: number };
  return +exp * 1000 + threshold;
}