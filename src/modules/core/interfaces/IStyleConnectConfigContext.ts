import { ContentTypeEnum, position } from '@w3block/w3block-ui-sdk';

export interface IStyleConnectConfigAll {
  companyId: string;
  name: string;
  slug?: string;
  primaryColorRGB?: string;
  extraBy?: ExtraBy[];
  logoUrl?: string;
  header?: IStyleConnectConfigHeader;
  footer?: IStyleConnectConfigFooter;
  pollPage?: IStyleConnectConfigAuthPages;
  completeProfilePage?: IStyleConnectConfigAuthPages;
  verifyEmailPage?: IStyleConnectConfigAuthPages;
  sigInSignUpPages?: IStyleConnectConfigAuthPages;
  connectWalletPage?: IStyleConnectConfigAuthPages;
  requestPasswordChangePage?: IStyleConnectConfigAuthPages;
  hasSignUp?: boolean;
  mainWebsite?: string;
  loginRedirectPage?: string;
  connectProxyPass?: string;
  connectBaseUrl?: string;
  forceVault?: boolean;
  privacyLink?: string;
  termsLink?: string;
}

interface ExtraBy {
  title: string;
  logoSrc: string;
}

interface IStyleConnectConfigHeader {
  headerLogo?: string;
  backgroundColor?: string;
  textColor?: string;
  tabs?: IStyleConnectConfigNavigationTabs[];
}

interface IStyleConnectConfigFooter {
  footerLogo?: string;
  backgroundColor?: string;
  textColor?: string;
  tabs?: IStyleConnectConfigNavigationTabs[];
  socialMedias?: IStyleSocialMediasConfig[];
  infoAboutSite?: string;
  poweredByLogoColor?: 'black' | 'white';
}

interface IStyleSocialMediasConfig {
  id: string;
  url: string;
  type: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'whatsapp' | 'url';
}

interface IStyleConnectConfigNavigationTabs {
  name: string;
  router: string;
}

interface IStyleConnectConfigContainerText {
  mainText?: string;
  subtitleText?: string;
  auxiliarText?: string;
  textColor?: string;
}

interface IStyleConnectConfigAuthPages {
  backgroundColor?: string;
  position?: position;
  logoUrl?: string;
  contentType?: ContentTypeEnum;
  textContainer?: IStyleConnectConfigContainerText;
}
