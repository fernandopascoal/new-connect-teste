

import LogoFoodbusters from '../../shared/assets/logos/fooodbusters_logo.png';
import LogoStoryChain from '../../shared/assets/logos/logo_storychain.png';
import { ContentTypeEnum } from '../../shared/enums/contentType';
import { position } from '../../shared/enums/styleConfigs';
import { IStyleConnectConfigAll } from '../interfaces/IStyleConnectConfigContext';

export const StyleConnectConfigDefault: IStyleConnectConfigAll = {
  companyId: '927657fe-ea7d-40b6-a957-ff5f38f27daf',
  name: '[web/lock]',
  logoUrl:
    'https://res.cloudinary.com/tropix-dev/image/upload/v1677526985/commerce/cff66c4a-32ad-4a09-8acd-3bf5aa6197ad/934a7a72-9cfe-4f39-9aec-936ee74cb645.jpg',
  primaryColorRGB: 'rgb(0, 80, 255)',
};

export const StyleConnectConfigGreenies: IStyleConnectConfigAll = {
  companyId:
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production'
      ? 'a0dc462c-e7f7-4841-a77c-94ad33acbdb6'
      : 'a0dc462c-e7f7-4841-a77c-94ad33acbdb6',
  name: 'Greenies',
  logoUrl:
    'https://res.cloudinary.com/tropix/image/upload/v1678987341/pixway/a0dc462c-e7f7-4841-a77c-94ad33acbdb6/Logo_greenies_bzukqj.webp',
  primaryColorRGB: 'rgb(0, 151, 58)',
  completeProfilePage: {
    backgroundColor: 'rgba(255, 219, 93, 1)',
  },
  verifyEmailPage: {
    backgroundColor: 'rgba(255, 219, 93, 1)',
  },
  sigInSignUpPages: {
    backgroundColor: 'rgba(255, 219, 93, 1)',
  },
  connectWalletPage: {
    backgroundColor: 'rgba(255, 219, 93, 1)',
  },
  requestPasswordChangePage: {
    backgroundColor: 'rgba(255, 219, 93, 1)',
  },
};

export const StyleConnectConfigEventix: IStyleConnectConfigAll = {
  companyId:
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production'
      ? '927657fe-ea7d-40b6-a957-ff5f38f27daf'
      : '062183af-6900-40a6-bc50-15dffbd13c62',
  name: 'Eventix',
  privacyLink: 'https://www.eventix.ai/politica-de-privacidade',
  termsLink: 'https://www.eventix.ai/termos-de-uso',

  forceVault: true,
  logoUrl:
    'https://res.cloudinary.com/tropix/image/upload/v1677688042/commerce/062183af-6900-40a6-bc50-15dffbd13c62/99a23e47-4089-4c91-babe-f09c206b54e2.png',
  primaryColorRGB: 'rgb(255, 85, 79)',
};

const StyleConnectConfigRioInnovationWeek: IStyleConnectConfigAll = {
  companyId:
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production'
      ? 'a5034565-b577-4c37-9d4f-f96ce0a23e81'
      : 'e0742b5e-9df0-4cf7-9a1c-40fd341d8042',
  name: 'Rio Innovation Week',
  slug: 'rioinnovationweek',
  logoUrl:
    'https://res.cloudinary.com/tropix/image/upload/v1667330338/assets/Asset-2_anfoz9.png',
  connectProxyPass: '/connect',
  primaryColorRGB: 'rgb(68, 193, 246)',
  connectBaseUrl:
    process.env.NEXT_PUBLIC_ENVIRONMENT == 'development'
      ? 'https://rioinnovationweek.stg.w3block.io/connect/'
      : 'https://rioinnovationweek.w3block.io/connect/',
  hasSignUp: false,
  loginRedirectPage:
    process.env.NEXT_PUBLIC_ENVIRONMENT == 'development'
      ? 'https://rioinnovationweek.stg.w3block.io/connect/tokens'
      : 'https://rioinnovationweek.w3block.io/connect/tokens',
  extraBy: [
    { title: 'designed By', logoSrc: '/connect/tensegrity-logo.png' },
    { title: 'sponsored By', logoSrc: '/connect/saiDoPapel-logo.png' },
  ],
  header: {
    backgroundColor: '#520094',
    textColor: 'white',
    tabs: [],
  },
  footer: {
    backgroundColor: '#520094',
    textColor: 'white',
    poweredByLogoColor: 'white',
    socialMedias: [
      {
        id: 'facebook',
        url: 'https://www.facebook.com/rioinnovationweek/',
        type: 'facebook',
      },
      {
        id: 'instagram',
        url: 'https://www.instagram.com/rioinnovationweek/',
        type: 'instagram',
      },
      {
        id: 'linkedin',
        url: 'https://www.linkedin.com/company/rioinnovationweek/',
        type: 'linkedin',
      },
      {
        id: 'link',
        url: 'https://rioinnovationweek.com.br/',
        type: 'url',
      },
    ],
    tabs: [
      {
        name: 'Política de privacidade',
        router: 'https://w3block.io/privacy-policy',
      },
      {
        name: 'Termos de uso',
        router: 'https://w3block.io/terms',
      },
    ],
  },
  pollPage: {
    logoUrl:
      'https://res.cloudinary.com/tropix/image/upload/v1667330338/assets/Asset-2_anfoz9.png',
    backgroundColor: '#520094',
    position: position.RIGHT,
    contentType: ContentTypeEnum.TEXT_LOGO,
    textContainer: {
      mainText: 'Avalie e ganhe um NFT do evento.',
      subtitleText:
        'Ao avaliar você ganha um NFT Token Pass, para ser utilizado de maneira digital no dia do evento. Participe!',
      textColor: 'white',
    },
  },
  completeProfilePage: {
    logoUrl:
      'https://res.cloudinary.com/tropix/image/upload/v1667330338/assets/Asset-2_anfoz9.png',
    backgroundColor: '#520094',
    position: position.RIGHT,
    contentType: ContentTypeEnum.TEXT_LOGO,
    textContainer: {
      mainText:
        'Agora falta pouco. Termine o cadastro e colecione os NFTs do evento.',
      subtitleText:
        'O maior evento de tecnologia, inovação e negócios da america latina agora também conectando você a Web 3.0',
      auxiliarText:
        'Ao terminar o cadastro, você acessa a sua carteira digital e recebe o seu primeiro NFT do evento. Participe!',
      textColor: 'white',
    },
  },
  verifyEmailPage: {
    logoUrl:
      'https://res.cloudinary.com/tropix/image/upload/v1667330338/assets/Asset-2_anfoz9.png',
    backgroundColor: '#520094',
    position: position.RIGHT,
    contentType: ContentTypeEnum.TEXT_LOGO,
    textContainer: {
      mainText: 'Estamos quase lá. Verifique seu e-mail para fazer o cadastro.',
      subtitleText:
        'O objetivo do cadastro é validar seu dados para que você possa resgatar seus NFTs.',

      textColor: 'white',
    },
  },
  sigInSignUpPages: {
    logoUrl:
      'https://res.cloudinary.com/tropix/image/upload/v1667330338/assets/Asset-2_anfoz9.png',
    backgroundColor: '#520094',
    position: position.RIGHT,
    contentType: ContentTypeEnum.TEXT_LOGO,
    textContainer: {
      mainText: 'Estamos quase lá. Verifique seu e-mail para fazer o cadastro.',
      subtitleText:
        'O maior evento de tecnologia, inovação e negócios da america latina.',
      textColor: 'white',
    },
  },
  connectWalletPage: {
    logoUrl:
      'https://res.cloudinary.com/tropix/image/upload/v1667330338/assets/Asset-2_anfoz9.png',
    backgroundColor: '#520094',
    position: position.RIGHT,
    contentType: ContentTypeEnum.TEXT_LOGO,
    textContainer: {
      mainText:
        'Agora é só criar uma carteira ou conectar sua Metamask, caso já tenha uma.',
      subtitleText:
        'O maior evento de tecnologia, inovação e negócios da america latina.',
      textColor: 'white',
    },
  },
  requestPasswordChangePage: {
    backgroundColor: '#520094',
  },
};

const StyleConnectConfigStoryChain: IStyleConnectConfigAll = {
  companyId:
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production'
      ? '53cf8437-2db5-47ea-9ed8-63e2ebe2916f'
      : 'f0f992fd-37d7-40ad-92b9-fc719b3835ff',
  name: 'StoryChain',
  logoUrl: LogoStoryChain.src,
  slug: 'storychain',
  primaryColorRGB: 'rgb(78, 128, 61)',
  hasSignUp: false,
  connectProxyPass: '/connect',
  connectBaseUrl:
    process.env.NEXT_PUBLIC_ENVIRONMENT == 'development'
      ? 'https://stg.storychain.tech/connect/'
      : 'https://storychain.tech/connect/',
  loginRedirectPage:
    process.env.NEXT_PUBLIC_ENVIRONMENT == 'development'
      ? 'https://stg.storychain.tech/connect/tokens'
      : 'https://storychain.tech/connect/tokens',
  header: {
    backgroundColor: 'white',
    tabs: [{ name: 'Sobre', router: '/sobre' }],
  },
  footer: {
    backgroundColor: 'white',
    tabs: [],
    socialMedias: [],
  },
};

const StyleConfigPrime: IStyleConnectConfigAll = {
  companyId:
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production'
      ? '010e92ea-d3af-40d9-a19e-a263fdfe6e92'
      : 'f0f992fd-37d7-40ad-92b9-fc719b3835ff',
  name: 'StoryChain',
  logoUrl: LogoStoryChain.src,
  slug: 'storychain',
  primaryColorRGB: 'rgb(78, 128, 61)',
  hasSignUp: false,
  connectProxyPass: '/connect',
  connectBaseUrl:
    process.env.NEXT_PUBLIC_ENVIRONMENT == 'development'
      ? 'https://stg.storychain.tech/connect/'
      : 'https://storychain.tech/connect/',
  loginRedirectPage:
    process.env.NEXT_PUBLIC_ENVIRONMENT == 'development'
      ? 'https://stg.storychain.tech/connect/tokens'
      : 'https://storychain.tech/connect/tokens',
  header: {
    backgroundColor: 'white',
    tabs: [{ name: 'Sobre', router: '/sobre' }],
  },
  footer: {
    backgroundColor: 'white',
    tabs: [],
    socialMedias: [],
  },
};

const StyleConfigFoodbusters: IStyleConnectConfigAll = {
  companyId:
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production'
      ? 'cff66c4a-32ad-4a09-8acd-3bf5aa6197ad'
      : 'a239f802-82fd-4b8b-99a4-022ff3ac72fc',
  name: 'Foodbusters',
  connectProxyPass: '/',
  logoUrl: LogoFoodbusters.src,
  slug: 'foodbusters',
  primaryColorRGB: 'rgb(220, 39, 39)',
  hasSignUp: true,
  privacyLink: 'https://www.eventix.ai/termos-de-uso',
  termsLink: 'https://www.eventix.ai/termos-de-uso',
  connectBaseUrl:
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production'
      ? 'https://foodbusters.stg.w3block.io/'
      : 'https://foodbusters.com.br/',
  header: {
    backgroundColor: 'white',
    tabs: [],
  },
  footer: {
    backgroundColor: 'white',
    tabs: [],
    infoAboutSite: 'teste de info',
    socialMedias: [{ url: 'teste', type: 'twitter', id: 'blabla' }],
  },
};

const StyleConfigSandbox: IStyleConnectConfigAll = {
  companyId:
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production'
      ? 'cff66c4a-32ad-4a09-8acd-3bf5aa6197ad'
      : 'c75ec1ff-6726-4cf2-8ea0-3f4d91e783a6',
  name: 'Sandbox1',
  connectProxyPass: '/',
  logoUrl: '',
  slug: 'sandbox1',
  primaryColorRGB: 'rgb(220, 39, 39)',
  hasSignUp: true,
  connectBaseUrl:
    process.env.NEXT_PUBLIC_ENVIRONMENT == 'development'
      ? 'https://sandbox1.stg.w3block.io/'
      : 'https://sandbox1.w3block.io/',
  header: {
    backgroundColor: 'white',
    tabs: [],
  },
  footer: {
    backgroundColor: 'white',
    tabs: [],
    socialMedias: [],
  },
};

const StyleConfigWjjc: IStyleConnectConfigAll = {
  companyId:
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production'
      ? 'ddd64082-d70e-4c7b-abe4-5023e304c9db'
      : '2eeffe14-1912-4032-bb93-bb5c58e60173',
  name: 'WJJC',
  connectProxyPass: '/',
  slug: 'wjjc',
  connectBaseUrl:
    process.env.NEXT_PUBLIC_ENVIRONMENT != 'production'
      ? 'https://wjjc2.store.stg.w3block.io'
      : 'https://wjjc.io',
  sigInSignUpPages: {
    position: position.CENTER,
    contentType: ContentTypeEnum.TEXT_LOGO,
  },
};

export const StyleConnectConfigsPreDefined: IStyleConnectConfigAll[] = [
  StyleConnectConfigDefault,
  StyleConnectConfigRioInnovationWeek,
  StyleConnectConfigStoryChain,
  StyleConfigPrime,
  StyleConfigFoodbusters,
  StyleConfigSandbox,
  StyleConnectConfigEventix,
  StyleConnectConfigGreenies,
  StyleConfigWjjc,
];
