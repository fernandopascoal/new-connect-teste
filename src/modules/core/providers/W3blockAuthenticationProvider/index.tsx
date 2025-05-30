/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useMemo } from 'react';


import { signIn, signOut } from 'next-auth/react';
import { CredentialProviderName, IW3blockAuthenticationContext, W3blockAuthenticationContext } from 'w3block-new-lib';

interface Props {
  children: ReactNode;
}

const W3blockAuthenticationProvider = ({ children }: Props) => {
  const value = useMemo<IW3blockAuthenticationContext>(
    () => ({
      signIn: (payload: any) =>
        signIn(CredentialProviderName.SIGNIN_WITH_COMPANY_ID, {
          ...payload,
          redirect: false,
          callbackUrl: undefined,
        }),
      changePasswordAndSignIn: (payload: any) =>
        signIn(CredentialProviderName.CHANGE_PASSWORD_AND_SIGNIN, {
          ...payload,
          redirect: false,
          callbackUrl: undefined,
        }),
      signInWithCode: (payload: any) =>
        signIn(CredentialProviderName.SIGN_IN_WITH_CODE, {
          ...payload,
          redirect: false,
          callbackUrl: undefined,
        }),
      signInAfterSignUp: (payload: any) =>
        signIn(CredentialProviderName.SIGNIN_AFTER_SIGNUP, {
          ...payload,
          redirect: false,
          callbackUrl: undefined,
        }),
      signOut: (payload: any) =>
        signOut({
          redirect: false,
          callbackUrl: payload?.callbackUrl ?? undefined,
        }),
      signInWithGoogle: (payload: any) =>
        signIn(CredentialProviderName.SIGNIN_WITH_GOOGLE, {
          ...payload,
          redirect: false,
        }),
    }),
    []
  );

  return (
    <W3blockAuthenticationContext.Provider value={value}>
      {children}
    </W3blockAuthenticationContext.Provider>
  );
};

export default W3blockAuthenticationProvider;
