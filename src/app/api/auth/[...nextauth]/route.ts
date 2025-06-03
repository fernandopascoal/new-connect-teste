/* eslint-disable @typescript-eslint/no-explicit-any */

import NextAuth, { AuthOptions } from "next-auth";
import getNextAuthConfig from "../../functions/onGetNextAuthConfig";



export const authOptions = getNextAuthConfig({
  baseURL: process.env.NEXT_PUBLIC_PIXWAY_ID_API_URL ?? "",
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET ?? "",
});
const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };
